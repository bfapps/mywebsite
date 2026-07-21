import { initializeApp } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";
import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
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
const googleProvider = new GoogleAuthProvider();

// تابع به‌روزرسانی UI
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

// لیسنر نشست کاربر
onAuthStateChanged(auth, (user) => {
    console.log("وضعیت نشست کاربر:", user ? user.email : "مهمان (null)");
    updateUI(user);
});

// ✅ تابع ورود هوشمند و مقاوم در برابر خطا
window.loginWithGoogle = function (e) {
    if (e) e.preventDefault();

    if (window.google && window.google.accounts && window.google.accounts.id) {
        google.accounts.id.initialize({
            client_id: "507461771746-vit4mvsmb92rc531bh1i0t5a47vk00ap.apps.googleusercontent.com", // 👈 Client ID واقعی‌تان
            callback: async (response) => {
                try {
                    const credential = GoogleAuthProvider.credential(response.credential);
                    const result = await signInWithCredential(auth, credential);
                    console.log("ورود موفقیت‌آمیز:", result.user);
                } catch (err) {
                    console.error("خطا در ورود:", err);
                    alert("خطا در ورود: " + err.message);
                }
            }
        });

        // درخواست مستقیم و ایمن از گوگل (بدون درگیر کردن پاپ‌آپ فایربیس)
        google.accounts.id.prompt();
    } else {
        alert("کتابخانه گوگل هنوز کاملاً بارگذاری نشده است. لطفاً چند ثانیه دیگر دوباره تلاش کنید.");
    }
};

function fallbackToPopup() {
    signInWithPopup(auth, googleProvider)
        .then((result) => {
            console.log("ورود موفقیت‌آمیز با Pop-up:", result.user);
            updateUI(result.user);
        })
        .catch((error) => {
            console.error("خطا در پاپ‌آپ فایربیس:", error);
            alert("خطا در ورود به حساب: " + error.message);
        });
}

// اتصال Event ها
document.addEventListener('DOMContentLoaded', () => {
    const googleBtn = document.getElementById('googleBtn');
    const logoutBtn = document.getElementById('logoutBtn');

    if (googleBtn) {
        googleBtn.addEventListener('click', window.loginWithGoogle);
    }
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => signOut(auth));
    }
});