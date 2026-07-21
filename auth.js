import { initializeApp } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";
import {
    getAuth,
    GoogleAuthProvider,
    signInWithCredential,
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyA8G93Dez_X4QJJ5yixnoGP3BjDhEr5cNw",
    authDomain: "eslisland-a233f.firebaseapp.com",
    projectId: "eslisland-a233f",
    storageBucket: "eslisland-a233f.firebasestorage.app",
    messagingSenderId: "507461771746",
    appId: "1:507461771746:web:7dd0c8c8457a81721559bb"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// متغیر برای جلوگیری از چندباره Initialize شدن
let isGsiInitialized = false;

// ۱. تابع آماده‌سازی اولیه گوگل (فقط یک‌بار اجرا می‌شود)
function initGoogleClient() {
    if (isGsiInitialized) return true;

    if (window.google && window.google.accounts && window.google.accounts.id) {
        google.accounts.id.initialize({
            client_id: "507461771746-vit4mvsmb92rc531bh1i0t5a47vk00ap.apps.googleusercontent.com",
            use_fedcm_for_prompt: false, // ✅ غیرفعال کردن FedCM برای جلوگیری از AbortError در برخی مرورگرها
            callback: async (response) => {
                try {
                    const credential = GoogleAuthProvider.credential(response.credential);
                    const result = await signInWithCredential(auth, credential);
                    console.log("✅ ورود موفقیت‌آمیز:", result.user.email);
                } catch (err) {
                    console.error("خطا در ثبت توکن ورود:", err);
                }
            }
        });
        isGsiInitialized = true;
        return true;
    }
    return false;
}

// ۲. تابع مدیریت کلیک روی دکمه گوگل
window.loginWithGoogle = function (e) {
    if (e) e.preventDefault();

    const isReady = initGoogleClient();

    if (isReady) {
        // لغو درخواست‌های قبلی جهت جلوگیری از AbortError
        google.accounts.id.cancel();

        // نمایش پرامپت انتخاب حساب
        google.accounts.id.prompt((notification) => {
            if (notification.isDismissedMoment()) {
                console.log("کاربر پنجره لاگین را بست.");
            }
        });
    } else {
        alert("کتابخانه گوگل هنوز کاملاً بارگذاری نشده است. لطفاً چند ثانیه دیگر دوباره تلاش کنید.");
    }
};

// ۳. به‌روزرسانی UI و بررسی نشست
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

            if (emailElem) emailElem.textContent = user.email || 'No Email';
            if (nameElem) nameElem.textContent = user.displayName || (user.email ? user.email.split('@')[0] : 'Learner');
            if (avatarElem && user.photoURL) avatarElem.src = user.photoURL;
        }
    } else {
        if (authSection) authSection.style.display = 'block';
        if (userProfileSection) userProfileSection.style.display = 'none';
    }
}

onAuthStateChanged(auth, (user) => {
    updateUI(user);
});

document.addEventListener('DOMContentLoaded', () => {
    const googleBtn = document.getElementById('googleBtn');
    const logoutBtn = document.getElementById('logoutBtn');

    if (googleBtn) googleBtn.addEventListener('click', window.loginWithGoogle);
    if (logoutBtn) logoutBtn.addEventListener('click', () => signOut(auth));
});