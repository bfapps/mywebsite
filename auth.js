import { initializeApp } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    signInWithRedirect
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-auth.js";

// تنضیمات پروژه
const firebaseConfig = {
    apiKey: "AIzaSyA8G93Dez_X4QJJ5yixnoGP3BjDhEr5cNw",
    authDomain: "eslisland-a233f.firebaseapp.com",
    projectId: "eslisland-a233f",
    storageBucket: "eslisland-a233f.firebasestorage.app",
    messagingSenderId: "507461771746",
    appId: "1:507461771746:web:7dd0c8c8457a81721559bb"
};

// راه‌اندازی فایربیس
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// تابع ورود با گوگل
async function loginWithGoogle() {
    try {
        await signInWithRedirect(auth, googleProvider);
    } catch (error) {
        console.error(error);
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

// گوش‌به‌زنگ بودن برای کلیک دکمه‌ها پس از لود کامل صفحه
document.addEventListener('DOMContentLoaded', () => {
    const googleBtn = document.getElementById('googleBtn');
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');

    if (googleBtn) googleBtn.addEventListener('click', loginWithGoogle);
    if (loginForm) loginForm.addEventListener('submit', handleLogin);
    if (signupForm) signupForm.addEventListener('submit', handleSignUp);
});