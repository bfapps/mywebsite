import { initializeApp } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    signInWithRedirect,
    getRedirectResult,
    onAuthStateChanged,
    signOut,
    setPersistence,
    browserLocalPersistence
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
const googleProvider = new GoogleAuthProvider();

// ۱. ذخیره پایدار نشست کاربر در مرورگر
setPersistence(auth, browserLocalPersistence);

// متغیر برای تشخیص اینکه آیا بررسی اولیه فایربیس انجام شده یا خیر
let isAuthResolved = false;

// ۲. تابع تغییر نمایش UI
function updateUI(user) {
    const authSection = document.querySelector('.auth-section');
    const userProfileSection = document.getElementById('userProfileSection');

    // اگر فایربیس هنوز پاسخ قطعی نداده، هیچ فرمی نشان داده نشود
    if (!isAuthResolved) return;

    if (user) {
        // کاربر ورود موفق داشته است
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
        // کاربر واقعاً مهمان است
        if (authSection) authSection.style.display = 'block';
        if (userProfileSection) userProfileSection.style.display = 'none';
    }
}

// ۳. پردازش بازگشت از ریدایرکت (در صورت استفاده از redirect)
getRedirectResult(auth)
    .then((result) => {
        if (result && result.user) {
            console.log("ورود موفقیت‌آمیز از Redirect:", result.user);
            isAuthResolved = true;
            updateUI(result.user);
        }
    })
    .catch((error) => console.error("خطای Redirect:", error));

// ۴. مدیریت وضعیت نشست (حل مشکل اصلی رفرش صفحه)
onAuthStateChanged(auth, (user) => {
    // تایید اینکه فایربیس پاسخ قطعی خود را داد
    isAuthResolved = true;

    if (user) {
        console.log("✅ کاربر احراز هویت شد:", user.email);
        updateUI(user);
    } else {
        console.log("ℹ️ کاربر وارد نشده است (مهمان)");
        updateUI(null);
    }
});

// ۵. تابع ورود با گوگل
window.loginWithGoogle = function (e) {
    if (e) e.preventDefault();

    signInWithPopup(auth, googleProvider)
        .then((result) => {
            console.log("ورود موفق با Pop-up:", result.user);
            updateUI(result.user);
        })
        .catch((error) => {
            if (error.code === 'auth/popup-blocked' || error.code === 'auth/popup-closed-by-user') {
                signInWithRedirect(auth, googleProvider);
            } else {
                alert("خطا در ورود: " + error.message);
            }
        });
};

// ۶. سایر توابع فرم‌ها و Event Listenerها
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

async function handleLogout() {
    try {
        await signOut(auth);
        alert("با موفقیت خارج شدید.");
    } catch (error) {
        alert("خطا در خروج: " + error.message);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const googleBtn = document.getElementById('googleBtn');
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const logoutBtn = document.getElementById('logoutBtn');

    if (googleBtn) googleBtn.addEventListener('click', window.loginWithGoogle);
    if (loginForm) loginForm.addEventListener('submit', handleLogin);
    if (signupForm) signupForm.addEventListener('submit', handleSignUp);
    if (logoutBtn) logoutBtn.addEventListener('click', handleLogout);
});