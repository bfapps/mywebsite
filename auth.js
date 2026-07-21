import { initializeApp } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    signInWithRedirect,
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-auth.js";

// ۱. تنظیمات فایربیس
const firebaseConfig = {
    apiKey: "AIzaSyA8G93Dez_X4QJJ5yixnoGP3BjDhEr5cNw",
    authDomain: "eslisland-a233f.firebaseapp.com",
    projectId: "eslisland-a233f",
    storageBucket: "eslisland-a233f.firebasestorage.app",
    messagingSenderId: "507461771746",
    appId: "1:507461771746:web:7dd0c8c8457a81721559bb"
};

// ۲. راه‌اندازی
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// ۳. تعریف توابع ورود و ثبت‌نام (حتماً قبل از addEventListener باشند)

// تابع ورود با گوگل
async function loginWithGoogle() {
    try {
        await signInWithPopup(auth, googleProvider);
    } catch (error) {
        if (error.code === 'auth/popup-blocked') {
            alert("لطفاً در مرورگر خود اجازه باز شدن پاپ‌آپ (Pop-up) را بدهید.");
        } else {
            alert("خطا در ورود با گوگل: " + error.message);
        }
    }
}

// تابع ثبت‌نام با ایمیل
async function handleSignUp(e) {
    e.preventDefault();
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        alert("ثبت‌نام با موفقیت انجام شد: " + userCredential.user.email);
    } catch (error) {
        alert("خطا در ثبت‌نام: " + error.message);
    }
}

// تابع ورود با ایمیل
async function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        alert("خوش آمدید: " + userCredential.user.email);
    } catch (error) {
        alert("خطا در ورود: " + error.message);
    }
}

// تابع خروج
async function handleLogout() {
    try {
        await signOut(auth);
        alert("با موفقیت خارج شدید.");
    } catch (error) {
        alert("خطا در خروج: " + error.message);
    }
}

// ۴. مدیریت وضعیت لاگین بودن کاربر (نمایش/مخفی‌سازی کارت)
onAuthStateChanged(auth, (user) => {
    const authSection = document.querySelector('.auth-section');
    const userProfileSection = document.getElementById('userProfileSection');

    if (user) {
        if (authSection) authSection.style.display = 'none';
        if (userProfileSection) {
            userProfileSection.style.display = 'block';
            const emailElem = document.getElementById('userEmail');
            const nameElem = document.getElementById('userName');
            const avatarElem = document.getElementById('userAvatar');

            if (emailElem) emailElem.textContent = user.email;
            if (nameElem) nameElem.textContent = user.displayName || 'Learner';
            if (avatarElem && user.photoURL) avatarElem.src = user.photoURL;
        }
    } else {
        if (authSection) authSection.style.display = 'block';
        if (userProfileSection) userProfileSection.style.display = 'none';
    }
});

// ۵. اتصال دکمه‌ها پس از بارگذاری DOM
document.addEventListener('DOMContentLoaded', () => {
    const googleBtn = document.getElementById('googleBtn');
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const logoutBtn = document.getElementById('logoutBtn');

    if (googleBtn) googleBtn.addEventListener('click', loginWithGoogle);
    if (loginForm) loginForm.addEventListener('submit', handleLogin);
    if (signupForm) signupForm.addEventListener('submit', handleSignUp);
    if (logoutBtn) logoutBtn.addEventListener('click', handleLogout);
});