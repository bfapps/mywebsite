import { initializeApp } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";
import {
    getAuth,
    GoogleAuthProvider,
    signInWithCredential,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
    updateProfile // 👈 ۱. اضافه شدن updateProfile برای ثبت نام با ایمیل
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

let isGsiInitialized = false;

function initGoogleClient() {
    if (isGsiInitialized) return true;

    if (window.google && window.google.accounts && window.google.accounts.id) {
        google.accounts.id.initialize({
            client_id: "507461771746-vit4mvsmb92rc531bh1i0t5a47vk00ap.apps.googleusercontent.com",
            use_fedcm_for_prompt: false,
            callback: async (response) => {
                try {
                    const credential = GoogleAuthProvider.credential(response.credential);
                    const result = await signInWithCredential(auth, credential);

                    // 👈 گوگل به طور خودکار displayName کاربر را بازمی‌گرداند
                    console.log("✅ ورود موفقیت‌آمیز با گوگل. نام کاربر:", result.user.displayName);
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

// ۱. مدیریت ورود با گوگل
window.loginWithGoogle = function (e) {
    if (e) e.preventDefault();

    const isReady = initGoogleClient();

    if (isReady) {
        google.accounts.id.cancel();
        google.accounts.id.prompt((notification) => {
            if (notification.isDismissedMoment()) {
                console.log("کاربر پنجره لاگین را بست.");
            }
        });
    } else {
        alert("کتابخانه گوگل هنوز کاملاً بارگذاری نشده است. لطفاً چند ثانیه دیگر دوباره تلاش کنید.");
    }
};

// ۲. ✅ مدیریت ثبت نام با ایمیل (Sign Up با ذخیره نام کاربر)
async function handleEmailSignUp(e) {
    e.preventDefault();

    // 👈 دریافت نام از فیلد ورودی فرم ثبت‌نام
    const nameInput = document.getElementById('signupName');
    const fullName = nameInput ? nameInput.value.trim() : '';

    const email = document.getElementById('signupEmail').value.trim();
    const password = document.getElementById('signupPassword').value.trim();

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // 👈 ۲. ثبت نام کاربر در پروفایل فایربیس
        if (fullName) {
            await updateProfile(user, {
                displayName: fullName
            });
        }

        console.log("✅ ثبت‌نام و به‌روزرسانی نام با موفقیت انجام شد:", user);
        alert("حساب کاربری شما با موفقیت ساخته شد!");

        // به‌روزرسانی دستی UI جهت نمایش آنی نام
        updateUI(auth.currentUser);

    } catch (error) {
        console.error("خطا در ثبت‌نام:", error);
        switch (error.code) {
            case 'auth/email-already-in-use':
                alert("این ایمیل قبلاً ثبت شده است.");
                break;
            case 'auth/invalid-email':
                alert("فرمت ایمیل نامعتبر است.");
                break;
            case 'auth/weak-password':
                alert("رمز عبور باید حداقل ۶ کاراکتر باشد.");
                break;
            default:
                alert("خطا در ثبت‌نام: " + error.message);
        }
    }
}

// ۳. مدیریت ورود با ایمیل (Log In)
async function handleEmailLogin(e) {
    e.preventDefault();

    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value.trim();

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log("✅ ورود موفقیت‌آمیز:", userCredential.user);
    } catch (error) {
        console.error("خطا در ورود:", error);
        switch (error.code) {
            case 'auth/user-not-found':
            case 'auth/wrong-password':
            case 'auth/invalid-credential':
                alert("ایمیل یا رمز عبور اشتباه است.");
                break;
            case 'auth/invalid-email':
                alert("فرمت ایمیل نامعتبر است.");
                break;
            default:
                alert("خطا در ورود: " + error.message);
        }
    }
}

// ۴. به‌روزرسانی UI و نمایش نام کاربر (چه گوگل و چه ایمیل)
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

            // 👈 نمایش نام کاربر (اگر نام ثبت نشده بود، بخش قبل از @ ایمیل را قرار می‌دهد)
            if (nameElem) {
                nameElem.textContent = user.displayName || (user.email ? user.email.split('@')[0] : 'Learner');
            }

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

// ۵. اتصال Event Listener ها
document.addEventListener('DOMContentLoaded', () => {
    const googleBtn = document.getElementById('googleBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');

    if (googleBtn) googleBtn.addEventListener('click', window.loginWithGoogle);
    if (logoutBtn) logoutBtn.addEventListener('click', () => signOut(auth));

    if (loginForm) loginForm.addEventListener('submit', handleEmailLogin);
    if (signupForm) signupForm.addEventListener('submit', handleEmailSignUp);
});