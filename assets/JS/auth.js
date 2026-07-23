import { supabase } from './supabase-client.js'; // آدرس فایل کلاینت

// ۱. مدیریت ورود با گوگل
window.loginWithGoogle = async function (e) {
    if (e) e.preventDefault();

    try {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: window.location.origin // بازگشت به همین صفحه بعد لاگین
            }
        });
        if (error) throw error;
    } catch (err) {
        console.error("خطا در ورود با گوگل:", err.message);
        alert("خطا در برقراری ارتباط با گوگل: " + err.message);
    }
};

// ۲. مدیریت ثبت نام با ایمیل (Sign Up با ذخیره نام کاربر)
async function handleEmailSignUp(e) {
    e.preventDefault();

    const nameInput = document.getElementById('signupName');
    const fullName = nameInput ? nameInput.value.trim() : '';
    const email = document.getElementById('signupEmail').value.trim();
    const password = document.getElementById('signupPassword').value.trim();

    try {
        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
            options: {
                data: {
                    full_name: fullName // ذخیره نام کاربر در متاداده پروفایل Supabase
                }
            }
        });

        if (error) throw error;

        console.log("✅ ثبت‌نام با موفقیت انجام شد:", data.user);
        alert("حساب کاربری شما با موفقیت ساخته شد!");

    } catch (error) {
        console.error("خطا در ثبت‌نام:", error);
        alert("خطا در ثبت‌نام: " + error.message);
    }
}

// ۳. مدیریت ورود با ایمیل (Log In)
async function handleEmailLogin(e) {
    e.preventDefault();

    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value.trim();

    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password
        });

        if (error) throw error;

        console.log("✅ ورود موفقیت‌آمیز:", data.user);
    } catch (error) {
        console.error("خطا در ورود:", error);
        alert("ایمیل یا رمز عبور اشتباه است یا مشکلی در ورود پیش آمده.");
    }
}

// ۴. به‌روزرسانی UI و نمایش نام/ایمیل کاربر
function updateUI(user) {
    const authSection = document.querySelector('.auth-section');
    const userProfileSection = document.getElementById('userProfileSection');

    if (user) {
        if (authSection) authSection.style.display = 'none';
        if (userProfileSection) {
            userProfileSection.style.display = 'block';

            const emailElem = document.getElementById('userEmail');
            const nameElem = document.getElementById('userName');
            const avatarElem = document.getElementById('userAvatar');

            // استخراج اطلاعات نام و عکس
            const displayName = user.user_metadata?.full_name || user.user_metadata?.name || (user.email ? user.email.split('@')[0] : 'Learner');
            const avatarUrl = user.user_metadata?.avatar_url || user.user_metadata?.picture;

            if (emailElem) emailElem.textContent = user.email || 'No Email';
            if (nameElem) nameElem.textContent = displayName;
            if (avatarElem && avatarUrl) avatarElem.src = avatarUrl;
        }
    } else {
        if (authSection) authSection.style.display = 'block';
        if (userProfileSection) userProfileSection.style.display = 'none';
    }
}

// برسی وضعیت نشست (Session Listener)
supabase.auth.onAuthStateChange((event, session) => {
    const user = session ? session.user : null;
    updateUI(user);
});

// ۵. اتصال Event Listener ها
document.addEventListener('DOMContentLoaded', async () => {
    const googleBtn = document.getElementById('googleBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');

    if (googleBtn) googleBtn.addEventListener('click', window.loginWithGoogle);
    if (logoutBtn) logoutBtn.addEventListener('click', () => supabase.auth.signOut());

    if (loginForm) loginForm.addEventListener('submit', handleEmailLogin);
    if (signupForm) signupForm.addEventListener('submit', handleEmailSignUp);

    // بررسی اولیه وضعیت لاگین در هنگام لود صفحه
    const { data: { user } } = await supabase.auth.getUser();
    updateUI(user);
});