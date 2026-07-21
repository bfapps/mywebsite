import { initializeApp } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";
import {
    getAuth,
    GoogleAuthProvider,
    signInWithCredential, // ✅ به جای signInWithPopup / signInWithRedirect
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

// تابع آپدیت UI
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
            if (nameElem) nameElem.textContent = user.displayName || user.email.split('@')[0];
            if (avatarElem && user.photoURL) avatarElem.src = user.photoURL;
        }
    } else {
        if (authSection) authSection.style.display = 'block';
        if (userProfileSection) userProfileSection.style.display = 'none';
    }
}

// مدیریت نشست کاربر
onAuthStateChanged(auth, (user) => {
    console.log("وضعیت کاربر در Vercel:", user ? user.email : "مهمان (null)");
    updateUI(user);
});

// ✅ تابع لاگین جدید و بدون ارور برای Vercel
window.loginWithGoogle = function (e) {
    if (e) e.preventDefault();

    if (typeof google === 'undefined') {
        alert("کتابخانه گوگل در حال بارگذاری است، دوباره تلاش کنید.");
        return;
    }

    google.accounts.id.initialize({
        // این Client ID اختصاصی پروژه فایربیس شماست
        client_id: "507461771746-880479155938.apps.googleusercontent.com",
        callback: async (response) => {
            try {
                // ساخت کریپتو توکن و ورود مستقیم در فایربیس بدون ریدایرکت دامنه‌ای
                const credential = GoogleAuthProvider.credential(response.credential);
                const result = await signInWithCredential(auth, credential);
                console.log("ورود موفق در Vercel:", result.user);
            } catch (error) {
                console.error("خطا در ورود:", error);
                alert("خطا در ورود: " + error.message);
            }
        }
    });

    // باز کردن پنجره ایمن گوگل
    google.accounts.id.prompt((notification) => {
        if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
            // اگر پنجره شناور نیاامد، حالت استاندارد را اجرا کن
            google.accounts.id.renderButton(
                document.getElementById('googleBtn'),
                { theme: 'outline', size: 'large' }
            );
        }
    });
};