

// تابع اصلی تغییر زبان
function applyLanguage(lang) {
    // ذخیره در مرورگر
    localStorage.setItem('siteLanguage', lang);

    // تغییر جهت صفحه (RTL/LTR)
     document.documentElement.dir = lang === 'fa' ? 'rtl' : 'ltr';
     document.documentElement.lang = lang;

    // اگر نمیخواهیم استایل به کل صفحه اعمال شود و فقط به یک المنت اعمال شود از کد زیر استفاده کنیم
    

    // پیدا کردن تمام تگ‌هایی که کلاس [data-i18n] دارند و ترجمه آن‌ها
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang][key]) {
            element.innerText = translations[lang][key];
        }
    });
}

// تشخیص زبان سیستم هنگام ورود
document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('siteLanguage');
    if (savedLang) {
        applyLanguage(savedLang);
    } else {
        // اگر کاربر اولین بار است می‌آید، زبان مرورگرش را چک کن
        const browserLang = navigator.language.startsWith('fa') ? 'fa' : 'en';
        applyLanguage(browserLang);
    }
});