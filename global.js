let currentLang = 'en';
let translations = { en: {}, fa: {} };

/**
 * تشخیص زبان پیش‌فرض (بر اساس مرورگر یا ذخیره قبلی)
 */
function detectInitialLanguage() {
    const savedLang = localStorage.getItem('siteLanguage');
    if (savedLang) {
        return savedLang;
    }
    // اگر بار اول است، زبان سیستم/مرورگر کاربر را چک کن
    const browserLang = navigator.language || navigator.userLanguage || '';
    return browserLang.startsWith('fa') ? 'fa' : 'en';
}

/**
 * دریافت ترجمه‌ها از Supabase (با پشتیبانی از کش LocalStorage)
 */
async function loadTranslations(pageName = 'common') {
    // تعیین زبان فعلی (از localStorage یا سیستم کاربر)
    const activeLang = detectInitialLanguage();
    currentLang = activeLang;

    const cacheKey_FA = `translations_${pageName}_fa`;
    const cacheKey_EN = `translations_${pageName}_en`;

    // ۱. خواندن از کش LocalStorage برای سرعت بالا
    const cachedFA = localStorage.getItem(cacheKey_FA);
    const cachedEN = localStorage.getItem(cacheKey_EN);

    if (cachedFA) {
        try { translations.fa = JSON.parse(cachedFA); } catch (e) { }
    }
    if (cachedEN) {
        try { translations.en = JSON.parse(cachedEN); } catch (e) { }
    }

    // اگر ترجمه‌ها در کش بودند، بلافاصله اعمال کن تا صفحه معطل نماند
    if (translations[activeLang] && Object.keys(translations[activeLang]).length > 0) {
        applyLanguage(activeLang);
    }

    // ۲. دریافت آخرین اطلاعات از Supabase
    if (window.supabase) {
        try {
            const { data, error } = await window.supabase
                .from('translations')
                .select('language, content')
                .in('page_name', ['common', pageName]);

            if (error) throw error;

            if (data && data.length > 0) {
                // ریست و بازسازی آبجکت ترجمه‌ها
                data.forEach(item => {
                    const lang = item.language;
                    if (!translations[lang]) translations[lang] = {};
                    translations[lang] = { ...translations[lang], ...item.content };
                });

                // بروزرسانی کش مرورگر
                localStorage.setItem(cacheKey_FA, JSON.stringify(translations.fa));
                localStorage.setItem(cacheKey_EN, JSON.stringify(translations.en));

                // اعمال نهایی زبان
                applyLanguage(activeLang);
            }
        } catch (err) {
            console.error("خطا در دریافت ترجمه‌ها از Supabase:", err);
            // در صورت خطا هم زبان اولیه اعمال می‌شود
            applyLanguage(activeLang);
        }
    } else {
        // اگر Supabase هنوز لود نشده بود
        applyLanguage(activeLang);
    }
}

/**
 * تابع اصلی تغییر و اعمال زبان در DOM
 */
function applyLanguage(lang) {
    localStorage.setItem('siteLanguage', lang);

    document.documentElement.dir = lang === 'fa' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;

    currentLang = lang;

    // جایگذاری متن‌ها در المان‌های دارای data-i18n
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key] !== undefined) {
            element.innerHTML = translations[lang][key];
        }
    });

    // اطلاع‌رسانی تغییر زبان به سایر بخش‌های برنامه
    window.dispatchEvent(new CustomEvent('languageChanged', {
        detail: { language: lang }
    }));
}

// مقداردهی اولیه پس از بارگذاری کامل صفحه
document.addEventListener('DOMContentLoaded', () => {
    const pageName = window.PAGE_NAME || 'common';
    loadTranslations(pageName);
});

/* ==========================================
   توابع منوی همبرگری و آکاردئون UI
   ========================================== */
function toggleMenu() {
    const menu = document.getElementById('sideMenu');
    const icon = document.getElementById('menuIcon');
    const btn = document.getElementById('menuBtn');

    if (!menu) return;

    menu.classList.toggle('active');
    if (btn) btn.classList.toggle('menu-open-rotate');

    setTimeout(() => {
        if (icon) {
            if (menu.classList.contains('active')) {
                icon.classList.replace('fa-bars', 'fa-xmark');
            } else {
                icon.classList.replace('fa-xmark', 'fa-bars');
            }
        }
    }, 150);

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

function toggleAccordion(element) {
    const item = element.closest('.accordion-item');
    if (!item) return;

    const content = item.querySelector('.accordion-content');
    const isOpen = item.classList.contains('is-open');

    if (isOpen) {
        item.classList.remove('is-open');
        if (content) content.style.maxHeight = null;
    } else {
        document.querySelectorAll('.accordion-item').forEach(el => {
            el.classList.remove('is-open');
            const c = el.querySelector('.accordion-content');
            if (c) c.style.maxHeight = null;
        });

        item.classList.add('is-open');
        if (content) content.style.maxHeight = content.scrollHeight + "px";
    }
}