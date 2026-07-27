import { supabase } from './supabase-client.js';
window.supabaseClient = supabase;

let currentUser = null;

// ۱. برقراری ارتباط با Supabase و چک کردن وضعیت لاگین اولیه
async function checkAuthStatus() {
    const { data: { session } } = await supabase.auth.getSession();
    currentUser = session ? session.user : null;

    // به‌روزرسانی UI
    updateHeaderAndAccess(currentUser);

    // بررسی دسترسی مستقیم از طریق آدرس URL
    checkDirectUrlAccess(currentUser);
}

// ۲. به‌روزرسانی هدر و وضعیت ظاهری لینک‌های قفل‌شده
function updateHeaderAndAccess(user) {
    currentUser = user;

    const navUserAvatar = document.getElementById('navUserAvatar');
    const navUsername = document.getElementById('navUsername');
    const guestBox = document.querySelector('.guest-only');
    const userBox = document.querySelector('.user-only');

    if (user) {
        if (guestBox) guestBox.style.setProperty('display', 'none', 'important');
        if (userBox) userBox.style.setProperty('display', 'flex', 'important');

        const avatarUrl = user.user_metadata?.avatar_url || user.user_metadata?.picture;
        const displayName = user.user_metadata?.full_name || user.user_metadata?.name || (user.email ? user.email.split('@')[0] : 'Learner');

        if (navUserAvatar && avatarUrl) navUserAvatar.src = avatarUrl;
        if (navUsername) navUsername.textContent = displayName;
    } else {
        if (guestBox) guestBox.style.setProperty('display', 'flex', 'important');
        if (userBox) userBox.style.setProperty('display', 'none', 'important');
    }

    updateLinksStyle();
}

// ۳. اعمال کلاس auth-disabled به لینک‌های محافظت‌شده
window.updateLinksStyle = function () {
    const protectedLinks = document.querySelectorAll('[data-require-auth]');
    protectedLinks.forEach(link => {
        if (!currentUser) {
            link.classList.add('auth-disabled');
        } else {
            link.classList.remove('auth-disabled');
        }
    });
};

// ۴. بررسی دسترسی مستقیم به یونیت‌های قفل‌شده از طریق آدرس URL (بر اساس دیتابیس اختصاصی صفحه)
function checkDirectUrlAccess(user) {
    const urlParams = new URLSearchParams(window.location.search);
    const bookKey = urlParams.get('book');
    const unitVal = urlParams.get('unit');

    // اگر پارامترها موجود نباشند یا دیتابیسی برای این صفحه معرفی نشده باشد، اجرا نشود
    if (!bookKey || !unitVal || !window.pageBooksData) return;

    // خواندن دیتابیس کتاب از لیست معرفی‌شده در همان صفحه
    const sourceData = window.pageBooksData[bookKey];

    if (sourceData) {
        const currentUnit = sourceData.find(u => u.unit == unitVal);

        // اگر یونیت نیاز به لاگین داشته باشد و کاربر لاگین نباشد
        if (currentUnit && currentUnit.requireAuth && !user) {
            alert("🔒 Please sign in to your account to access this content.");

            // ذخیره آدرس فعلی جهت بازگشت بعد از لاگین
            sessionStorage.setItem('redirectAfterLogin', window.location.href);

            window.location.href = '/pages/auth.html';
        }
    }
}

// ۵. قفل کردن عمومی تمام کلیک‌ها روی عناصر data-require-auth در صورت عدم ورود
document.addEventListener('click', (e) => {
    const targetLink = e.target.closest('[data-require-auth]');

    if (targetLink && !currentUser) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();

        alert("🔒 Please sign in to your account to access this content.");
        return false;
    }
}, true); // capturing phase

// ۶. تابع کمکی اکسپورت‌شده برای بررسی دستی دسترسی در صفحات سفارشی (اختیاری)
export async function enforcePageAccess(requiresAuth = true) {
    if (!requiresAuth) return;

    const { data: { session } } = await supabase.auth.getSession();

    if (!session || !session.user) {
        alert("🔒 Please sign in to your account to access this content.");
        sessionStorage.setItem('redirectAfterLogin', window.location.href);
        window.location.href = '/pages/auth.html';
    }
}

// ۷. گوش دادن به تغییرات وضعیت لاگین / خروج (Supabase Listener)
supabase.auth.onAuthStateChange((event, session) => {
    const user = session ? session.user : null;
    updateHeaderAndAccess(user);
    checkDirectUrlAccess(user);
});

// ۸. اجرا هنگام بارگذاری کامل DOM
document.addEventListener('DOMContentLoaded', () => {
    checkAuthStatus();

    const navLogoutBtn = document.getElementById('navLogoutBtn');
    if (navLogoutBtn) {
        navLogoutBtn.addEventListener('click', async () => {
            await supabase.auth.signOut();
            window.location.reload();
        });
    }
});



