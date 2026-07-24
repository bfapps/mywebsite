async function protectRoute() {
    const { data: { user } } = await supabase.auth.getUser();

    // اگر کاربر لاگین نکرده بود
    if (!user) {
        // ذخیره آدرس فعلی برای بازگشت کاربر پس از ورود (اختیاری)
        sessionStorage.setItem('redirectUrl', window.location.href);

        // انتقال فوری به صفحه لاگین
        window.location.replace('/pages/auth.html');
    }
}

// اجرای بررسی به محض فراخوانی
protectRoute();