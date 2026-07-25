import { initializeApp } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";
import {
    getAuth,
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
export const auth = getAuth(app);

function updateHeaderAndAccess(user) {
    const navUserAvatar = document.getElementById('navUserAvatar');
    const guestBox = document.querySelector('.guest-only');
    const userBox = document.querySelector('.user-only');

    if (user) {
        if (guestBox) guestBox.style.setProperty('display', 'none', 'important');
        if (userBox) userBox.style.setProperty('display', 'flex', 'important');

        if (navUserAvatar && user.photoURL) {
            navUserAvatar.src = user.photoURL;
        }
    } else {
        if (guestBox) guestBox.style.setProperty('display', 'flex', 'important');
        if (userBox) userBox.style.setProperty('display', 'none', 'important');
    }

    // 🔒 ریست کردن اجباری اسکرول صفحه به بالا و چپ جهت جلوگیری از پرش موقع تغییر وضعیت
    /* window.scrollTo(0, 0); */

    setupProtectedLinks(user);
}

function setupProtectedLinks(user) {
    const protectedLinks = document.querySelectorAll('[data-require-auth]');
    protectedLinks.forEach(link => {
        if (!user) {
            link.classList.add('auth-disabled');
            link.addEventListener('click', handleProtectedClick, true);
        } else {
            link.classList.remove('auth-disabled');
            link.removeEventListener('click', handleProtectedClick, true);
        }
    });
}

function handleProtectedClick(e) {
    e.preventDefault();
    e.stopPropagation();
    alert("🔒 این بخش فقط برای اعضای سایت فعال است. لطفاً ابتدا وارد حساب کاربری خود شوید.");
}

onAuthStateChanged(auth, (user) => {
    updateHeaderAndAccess(user);
});

document.addEventListener('DOMContentLoaded', () => {
    const navLogoutBtn = document.getElementById('navLogoutBtn');
    if (navLogoutBtn) {
        navLogoutBtn.addEventListener('click', () => signOut(auth));
    }
});
/*document.addEventListener('DOMContentLoaded', () => {
    const navUserAvatar = document.getElementById('navUserAvatar');
    if (navUserAvatar) {
        navUserAvatar.addEventListener('click', () => signOut(auth));
    }
});*/