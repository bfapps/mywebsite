import { supabase } from './supabase-client.js';

// ۱. مدیریت ورود با گوگل
window.loginWithGoogle = async function (e) {
    if (e) e.preventDefault();

    try {
        const cleanRedirectUrl = window.location.protocol + '//' + window.location.host + window.location.pathname;

        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: cleanRedirectUrl
            }
        });
        if (error) throw error;
    } catch (err) {
        console.error("خطا در ورود با گوگل:", err.message);
        alert("خطا در برقراری ارتباط با گوگل: " + err.message);
    }
};

// ۲. ثبت‌نام با ایمیل
async function handleEmailSignUp(e) {
    e.preventDefault();

    const nameInput = document.getElementById('signupName');
    const fullName = nameInput ? nameInput.value.trim() : '';
    const emailInput = document.getElementById('signupEmail');
    const passwordInput = document.getElementById('signupPassword');

    if (!emailInput || !passwordInput || !emailInput.value.trim() || !passwordInput.value.trim()) {
        alert("لطفاً ایمیل و رمز عبور را وارد کنید.");
        return;
    }

    try {
        const { data, error } = await supabase.auth.signUp({
            email: emailInput.value.trim(),
            password: passwordInput.value.trim(),
            options: {
                data: { full_name: fullName }
            }
        });

        if (error) throw error;
        alert("حساب کاربری شما با موفقیت ساخته شد!");

    } catch (error) {
        console.error("خطا در ثبت‌نام:", error);
        alert("خطا در ثبت‌نام: " + error.message);
    }
}

// ۳. ورود با ایمیل
async function handleEmailLogin(e) {
    e.preventDefault();

    const emailInput = document.getElementById('loginEmail');
    const passwordInput = document.getElementById('loginPassword');

    if (!emailInput || !passwordInput || !emailInput.value.trim() || !passwordInput.value.trim()) {
        alert("لطفاً ایمیل و رمز عبور را وارد کنید.");
        return;
    }

    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: emailInput.value.trim(),
            password: passwordInput.value.trim()
        });

        if (error) throw error;

    } catch (error) {
        console.error("خطا در ورود:", error);
        alert("ایمیل یا رمز عبور اشتباه است یا مشکلی در ورود پیش آمده.");
    }
}

// ۴. تابع مدیریت خروج امن
async function logoutUser() {
    try {
        const { error } = await supabase.auth.signOut({ scope: 'local' });
        if (error) console.warn("هشدار در خروج از Supabase:", error.message);
    } catch (err) {
        console.error("خطای غیرمنتظره هنگام خروج:", err);
    } finally {
        localStorage.clear();
        sessionStorage.clear();
        updateUI(null);
        console.log("حافظه محلی پاک شد و کاربر خارج گردید.");
    }
}

// ۵. به‌روزرسانی UI و نمایش نام/ایمیل کاربر
function updateUI(user) {
    const authSection = document.querySelector('.auth-section');
    const userProfileSection = document.getElementById('userProfileSection');
    const navUserAvatar = document.getElementById('navUserAvatar');
    const guestOnly = document.querySelector('.guest-only');
    const userOnly = document.querySelector('.user-only');

    if (user) {
        if (authSection) authSection.style.display = 'none';
        if (userProfileSection) userProfileSection.style.display = 'block';
        if (guestOnly) guestOnly.style.display = 'none';
        if (userOnly) userOnly.style.display = 'flex';

        const emailElem = document.getElementById('userEmail');
        const nameElem = document.getElementById('userName');
        const avatarElem = document.getElementById('userAvatar');

        const displayName = user.user_metadata?.full_name || user.user_metadata?.name || (user.email ? user.email.split('@')[0] : 'Learner');
        const avatarUrl = user.user_metadata?.avatar_url || user.user_metadata?.picture || "https://cdn-icons-png.flaticon.com/512/847/847969.png";

        if (emailElem) emailElem.textContent = user.email || 'No Email';
        if (nameElem) nameElem.textContent = displayName;
        if (avatarElem) avatarElem.src = avatarUrl;
        if (navUserAvatar) navUserAvatar.src = avatarUrl;
    } else {
        if (authSection) authSection.style.display = 'block';
        if (userProfileSection) userProfileSection.style.display = 'none';
        if (guestOnly) guestOnly.style.display = 'block';
        if (userOnly) userOnly.style.display = 'none';
    }
}

// ۶. شنود تغییرات وضعیت نشست (Session Listener)
supabase.auth.onAuthStateChange((event, session) => {
    const user = session ? session.user : null;
    updateUI(user);

    if (window.location.hash) {
        window.history.replaceState(null, document.title, window.location.pathname + window.location.search);
    }
});

// تابع پاک‌سازی کامل تمام پیشرفت‌های فلش‌کارت در Supabase و LocalStorage
async function resetAllUserProgress() {
    const confirmMessage = "آیا مطمئن هستید؟ با این کار تمام پیشرفت‌ها، کلمات ستاره‌دار و وضعیت فلش‌کارت‌های شما در تمامی کتاب‌ها و یونیت‌ها پاک خواهد شد.";

    if (!confirm(confirmMessage)) return;

    try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
            alert("کاربری یافت نشد!");
            return;
        }

        // حذف تمامی رکوردهای مربوط به این کاربر از جدول user_unit_progress
        const { error } = await supabase
            .from('user_unit_progress')
            .delete()
            .eq('user_id', user.id);

        if (error) throw error;

        // پاک‌سازی حافظه مرورگر برای اطمینان از سینک شدن UI local
        const keysToRemove = [];
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key.startsWith('starred_words_') ||
                key.startsWith('words_status_') ||
                key.startsWith('saved_progress_') ||
                key.startsWith('autoplay_')) {
                keysToRemove.push(key);
            }
        }
        keysToRemove.forEach(k => localStorage.removeItem(k));

        alert("تمام پیشرفت‌های فلش‌کارت با موفقیت ریست شدند.");
        window.location.reload(); // ریلود صفحه برای اعمال تغییرات

    } catch (err) {
        console.error("خطا در ریست کردن اطلاعات:", err.message);
        alert("خطا در پاک‌سازی اطلاعات: " + err.message);
    }
}




// ۷. اتصال Event Listener ها پس از لود شدن کامل DOM
document.addEventListener('DOMContentLoaded', async () => {
    const googleBtn = document.getElementById('googleBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    const navLogoutBtn = document.getElementById('navLogoutBtn');
    const resetAllDataBtn = document.getElementById('resetAllDataBtn');
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');

    if (googleBtn) googleBtn.addEventListener('click', window.loginWithGoogle);
    if (logoutBtn) logoutBtn.addEventListener('click', logoutUser);
    if (navLogoutBtn) navLogoutBtn.addEventListener('click', logoutUser);
    if (resetAllDataBtn) resetAllDataBtn.addEventListener('click', resetAllUserProgress);
    if (loginForm) loginForm.addEventListener('submit', handleEmailLogin);
    if (signupForm) signupForm.addEventListener('submit', handleEmailSignUp);

    const { data: { user } } = await supabase.auth.getUser();
    updateUI(user);
});



