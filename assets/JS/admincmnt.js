// admincmnt.js

// ۱. گرفتن نمونه Supabase
function getSupabase() {
    if (typeof supabase !== 'undefined') return supabase;
    if (window.supabaseClient) return window.supabaseClient;
    if (window.supabase) return window.supabase;
    return null;
}

// ۲. متون پیش‌فرض سیستم (در صورتی که translations در window تعریف نشده باشد)
const fallbackMsgs = {
    en: {
        msgSuccessPublic: "Your message has been sent successfully and will be published after review!",
        msgSuccessPrivate: "Your private message has been sent to the admin successfully.",
        msgError: "Failed to send message.",
        msgEmpty: "No messages yet. Be the first to leave a message!"
    },
    fa: {
        msgSuccessPublic: "پیام شما با موفقیت ثبت شد و پس از بررسی و تایید ادمین نمایش داده خواهد شد.",
        msgSuccessPrivate: "پیام خصوصی شما با موفقیت برای ادمین ارسال شد.",
        msgError: "خطا در ارسال پیام.",
        msgEmpty: "هنوز پیامی ثبت نشده است. اولین نفری باشید که پیام می‌گذارید!"
    }
};

// دریافت متون بر اساس زبان فعال
function getMsgText(key) {
    const lang = localStorage.getItem('appLang') || 'en';
    if (window.translations && window.translations[lang] && window.translations[lang][key]) {
        return window.translations[lang][key];
    }
    return fallbackMsgs[lang] ? fallbackMsgs[lang][key] : fallbackMsgs['en'][key];
}

// ۳. جلوگیری از حملات XSS
function escapeHTML(str) {
    if (!str) return '';
    return str.replace(/[&<>'"]/g,
        tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
    );
}

// ۴. دریافت و نمایش پیام‌ها
async function fetchAdminMessages() {
    const listContainer = document.getElementById('messagesList');
    if (!listContainer) return;

    const client = getSupabase();
    if (!client) {
        console.warn("Supabase client is not ready yet.");
        return;
    }

    try {
        const { data, error } = await client
            .from('admin_messages')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(20);

        if (error) throw error;

        if (!data || data.length === 0) {
            listContainer.innerHTML = `<p style="font-size:13px; color:var(--text-muted);">${getMsgText('msgEmpty')}</p>`;
            return;
        }

        listContainer.innerHTML = data.map(msg => {
            const dateStr = new Date(msg.created_at).toLocaleDateString();
            return `
                <div class="msg-card">
                    <div class="msg-header">
                        <span><i class="fa-regular fa-user"></i> ${escapeHTML(msg.user_name)}</span>
                        <span class="msg-date">${dateStr}</span>
                    </div>
                    <div class="msg-body">${escapeHTML(msg.message)}</div>
                </div>
            `;
        }).join('');

    } catch (err) {
        console.error("Error loading messages:", err.message);
        listContainer.innerHTML = '<p style="font-size:13px; color:red;">Failed to load messages.</p>';
    }
}

// ۵. ارسال پیام جدید به Supabase
async function handleSendMessage(e) {
    e.preventDefault();
    const client = getSupabase();

    if (!client) {
        alert("ارتباط با سرور برقرار نشد. لطفاً صفحه را مجدداً بارگذاری کنید.");
        return;
    }

    const nameInput = document.getElementById('msgUserName');
    const msgInput = document.getElementById('msgContent');
    const privateCheckbox = document.getElementById('msgIsPrivate');
    const sendBtn = document.getElementById('sendMsgBtn');

    const userName = nameInput ? nameInput.value.trim() : '';
    const message = msgInput ? msgInput.value.trim() : '';
    const isPrivate = privateCheckbox ? privateCheckbox.checked : false;

    if (!userName || !message) return;

    sendBtn.disabled = true;

    try {
        let userId = null;
        if (client.auth) {
            const { data: { user } } = await client.auth.getUser();
            if (user) userId = user.id;
        }

        const { error } = await client
            .from('admin_messages')
            .insert([
                {
                    user_name: userName,
                    message: message,
                    is_private: isPrivate,
                    user_id: userId
                }
            ]);

        if (error) throw error;

        msgInput.value = '';
        if (privateCheckbox) privateCheckbox.checked = false;

        // نمایش alert بر اساس عمومی یا خصوصی بودن
        if (isPrivate) {
            alert(getMsgText('msgSuccessPrivate'));
        } else {
            alert(getMsgText('msgSuccessPublic'));
            fetchAdminMessages();
        }

    } catch (err) {
        console.error("Error sending message:", err.message);
        alert(getMsgText('msgError') + " (" + err.message + ")");
    } finally {
        sendBtn.disabled = false;
    }
}

// ۶. اجرا پس از بارگذاری DOM
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('adminMessageForm');
    if (form) {
        form.addEventListener('submit', handleSendMessage);
    }

    setTimeout(() => {
        fetchAdminMessages();
    }, 200);
});