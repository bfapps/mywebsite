// ۱. ایمپورت کتابخانه‌های مورد نیاز از فایربیس
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-auth.js";

// ۲. تنظیمات اختصاصی پروژه شما
const firebaseConfig = {
    apiKey: "AIzaSyA8G93Dez_X4QJJ5yixnoGP3BjDhEr5cNw",
    authDomain: "eslisland-a233f.firebaseapp.com",
    projectId: "eslisland-a233f",
    storageBucket: "eslisland-a233f.firebasestorage.app",
    messagingSenderId: "507461771746",
    appId: "1:507461771746:web:7dd0c8c8457a81721559bb"
};

// ۳. راه‌اندازی فایربیس
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// ۴. تعریف توابع روی شیء window تا از فرم‌های HTML قابل فراخوانی باشند

// ثبت‌نام با ایمیل و رمز عبور
window.handleSignUp = async () => {
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        alert("ثبت‌نام با موفقیت انجام شد: " + userCredential.user.email);
        // window.location.href = "../index.html";
    } catch (error) {
        alert("خطا در ثبت‌نام: " + error.message);
    }
};

// ورود با ایمیل و رمز عبور
window.handleLogin = async () => {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        alert("خوش آمدید: " + userCredential.user.email);
        // window.location.href = "../index.html";
    } catch (error) {
        alert("خطا در ورود: " + error.message);
    }
};

// ورود / ثبت‌نام سریع با حساب گوگل
window.loginWithGoogle = async () => {
    try {
        const result = await signInWithPopup(auth, googleProvider);
        alert("ورود با گوگل موفقیت‌آمیز بود: " + result.user.displayName);
        // window.location.href = "../index.html";
    } catch (error) {
        alert("خطا در ورود با گوگل: " + error.message);
    }
};