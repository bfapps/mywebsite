
let currentLang = 'en';

// تابع اصلی تغییر زبان
function applyLanguage(lang) {
    // ذخیره در مرورگر
    localStorage.setItem('siteLanguage', lang);

    // تغییر جهت صفحه (RTL/LTR)
     document.documentElement.dir = lang === 'fa' ? 'rtl' : 'ltr';
     document.documentElement.lang = lang;

    // اگر نمیخواهیم استایل به کل صفحه اعمال شود و فقط به یک المنت اعمال شود از کد زیر استفاده کنیم
    currentLang = lang;

    // پیدا کردن تمام تگ‌هایی که کلاس [data-i18n] دارند و ترجمه آن‌ها
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang][key]) {
            element.innerHTML = translations[lang][key];
        }
    });
    // ۲. بررسی اینکه آیا در صفحه فلش‌کارت هستیم یا خیر
    if (typeof renderCard === 'function') {
        renderCard(); // فراخوانی مجدد برای رندر مجدد کارت‌ها
    }

    //  در صفحه منو یونیت های هر درس. فراخوانی مجدد تابع رندر برای بازسازی درس‌ها با زبان جدید
    // ۳. رندر مجدد یونیت‌ها به صورت تفکیک‌شده و مستقل (بدون وابستگی AND)
    if (typeof renderBookUnits === 'function') {

        // اگر دیتای انگلیسی وجود دارد
        if (typeof prospectData !== 'undefined') {
            renderBookUnits("prospect1", "prospect1-list", prospectData);
            renderBookUnits("prospect2", "prospect2-list", prospectData);
            renderBookUnits("prospect3", "prospect3-list", prospectData);
        }

        // اگر دیتای دبیرستان وجود دارد
        if (typeof visionData !== 'undefined') {
            renderBookUnits("vision1", "vision1-list", visionData);
            renderBookUnits("vision2", "vision2-list", visionData);
            renderBookUnits("vision3", "vision3-list", visionData);
        }

        // اگر دیتای افعال چینی وجود دارد
        if (typeof ch200verbsData !== 'undefined') {
            renderBookUnits("ch200verbs", "ch200verbs_list", ch200verbsData);
        }
    }
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







// تابع های منو همبرگری
function toggleMenu() {
    const menu = document.getElementById('sideMenu');
    const icon = document.getElementById('menuIcon');
    const btn = document.getElementById('menuBtn');

    menu.classList.toggle('active');
    btn.classList.toggle('menu-open-rotate');

    // تغییر آیکون
    setTimeout(() => {
        if (menu.classList.contains('active')) {
            icon.classList.replace('fa-bars', 'fa-xmark');
        } else {
            icon.classList.replace('fa-xmark', 'fa-bars');
        }
    }, 150);

    // مدیریت Overlay تیره

    let overlay = document.getElementById('menu-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.id = 'menu-overlay';
        overlay.style = "position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.3); z-index:999;";
        overlay.onclick = toggleMenu;
        document.body.appendChild(overlay);
    }
    overlay.style.display = menu.classList.contains('active') ? 'block' : 'none';
}

// تایع مربوط به باز شدن منو زبان و منو لیست کتابها
function toggleAccordion(element) {
    // پیدا کردن والدِ اصلیِ آکاردئون (چه در درس‌ها باشد چه در منوی زبان)
    const item = element.closest('.accordion-item');
    const content = item.querySelector('.accordion-content');
    const isOpen = item.classList.contains('is-open');

    if (isOpen) {
        item.classList.remove('is-open');
        content.style.maxHeight = null;
    } else {
        // بستن بقیه آکاردئون‌های باز (اختیاری برای زیبایی بیشتر)
        document.querySelectorAll('.accordion-item').forEach(el => {
            el.classList.remove('is-open');
            el.querySelector('.accordion-content').style.maxHeight = null;
        });

        item.classList.add('is-open');
        content.style.maxHeight = content.scrollHeight + "px";
    }
}


