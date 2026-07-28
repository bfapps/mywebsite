// تزریق هدر و فوتر به صفحات
document.addEventListener('DOMContentLoaded', () => {
    const headerTag = document.getElementById("header");
    const footerTag = document.getElementById("footer");

    if (headerTag) {
        headerTag.innerHTML = `
            <div class="logo-container">
                <img src="/logo.png" alt="ESL Logo" class="header-logo-icon">
                <div class="logo-text">
                    <h1>ESL Island</h1>
                    <p>Let's Learn English</p>
                </div>
            </div>

            

            <!-- وضعیت کاربر -->
            <div class="header-user-status">
                <div class="guest-only">
                    <a href="/pages/auth.html" class="nav-login-btn">
                        <span class="nav-login-btn-span" data-i18n="signinBtn">Sign In</span>
                    </a>
                </div>

                <div class="user-only" style="display: none;">
                    <div class="streak-bar-container navStreak-bar-container">
                        <div class="streak-badge" id="navStreakBadgeContainer">
                            <i class="fa-solid fa-fire"></i>
                            <span id="navStreakCountText" class="navStreakCountText">0</span>
                        </div>
                    </div>
                    <a href="/pages/auth.html"> 
                        <img id="navUserAvatar" src="https://cdn-icons-png.flaticon.com/512/847/847969.png" alt="Avatar" class="nav-avatar">
                    </a>
                    <button id="navLogoutBtn" class="nav-logout-btn" type="button" title="Log Out">
                        <i class="fa-solid fa-right-from-bracket navLogoutIcn"></i>
                    </button>
                </div>
            </div>

            <button class="hamburger" onclick="toggleMenu()" id="menuBtn" aria-label="Toggle Navigation Menu">
                <i class="fa-solid fa-bars" id="menuIcon"></i>
            </button>

            <div id="sideMenu" class="side-menu">
                <div class="menu-items">
                    <a href="/index.html"><i class="fa-solid fa-house"></i> <span data-i18n="home">Home</span></a>

                    <div class="accordion-item lang-accordion-item">
                        <div class="accordion-header" onclick="toggleAccordion(this)">
                            <div class="header-left">
                                <span><i class="fa-solid fa-globe"></i> <span data-i18n="langTitle">Language</span></span>
                            </div>
                            <i class="fa-solid fa-chevron-down chevron-icon"></i>
                        </div>

                        <div class="accordion-content">
                            <div class="lang-options">
                                <button class="lang-btn" onclick="applyLanguage('fa')">فارسی (Persian)</button>
                                <button class="lang-btn" onclick="applyLanguage('en')">English</button>
                            </div>
                        </div>
                    </div>
                    <a href="/pages/english/english.html"><i class="fa-solid fa-graduation-cap"></i> <span data-i18n="titleEnglish">Learning English</span></a>
                    <a href="/pages/wordlists/community/shared.html"><i class="fa-solid fa-users-rectangle"></i> <span data-i18n="titleComWordLists">Community Word Lists</span></a>
                    <a href="/pages/chinese/vocabulary/200verbs/vocabulary.html"><i class="fa-solid fa-language"></i> <span data-i18n="titleChinese">Learning Chinese</span></a>
                    <a href="#"><i class="fa-solid fa-beer-mug-empty"></i> <span data-i18n="titleGerman">Learning German</span></a>
                    <a href="/pages/contact.html"><i class="fa-solid fa-headset"></i> <span data-i18n="titleContact">Contact me</span></a>
                    <a href="/pages/aboutme.html"><i class="fa-solid fa-user"></i> <span data-i18n="titleAbout">About me</span></a>
                </div>
            </div>
            <div id="menu-overlay" onclick="toggleMenu()" style="display:none; position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.3); z-index:999;"></div>
        `;
    }

    if (footerTag) {
        footerTag.innerHTML = `
            <p>© 2026 ESL Island. All rights reserved.</p>
            <div class="social-row">
                <a href="#" class="social-link tg" aria-label="Telegram"><i class="fa-brands fa-telegram"></i></a>
                <a href="mailto:amirsardar9930@gmail.com" class="social-link tw" aria-label="Email"><i class="fas fa-envelope"></i></a>
                <a href="#" class="social-link ig" aria-label="Instagram"><i class="fa-brands fa-instagram"></i></a>
                <a href="#" class="social-link yt" aria-label="YouTube"><i class="fa-brands fa-youtube"></i></a>
            </div>
        `;
    }
});

let currentLang = 'en';
let translations = { en: {}, fa: {} };

/**
 * تشخیص زبان پیش‌فرض
 */
function detectInitialLanguage() {
    const savedLang = localStorage.getItem('siteLanguage');
    if (savedLang) return savedLang;
    const browserLang = navigator.language || navigator.userLanguage || '';
    return browserLang.startsWith('fa') ? 'fa' : 'en';
}

/**
 * دریافت ترجمه‌ها از Supabase (با پشتیبانی از کش LocalStorage)
 */
async function loadTranslations(pageName = 'common') {
    const activeLang = detectInitialLanguage();
    currentLang = activeLang;

    const cacheKey_FA = `translations_${pageName}_fa`;
    const cacheKey_EN = `translations_${pageName}_en`;

    // ۱. بارگذاری سریع از کش LocalStorage
    const cachedFA = localStorage.getItem(cacheKey_FA);
    const cachedEN = localStorage.getItem(cacheKey_EN);

    if (cachedFA) { try { translations.fa = JSON.parse(cachedFA); } catch (e) { } }
    if (cachedEN) { try { translations.en = JSON.parse(cachedEN); } catch (e) { } }

    if (translations[activeLang] && Object.keys(translations[activeLang]).length > 0) {
        applyLanguage(activeLang);
    }

    // ۲. دریافت آخرین داده‌ها از Supabase
    const client = window.supabase || window.supabaseClient;

    if (client) {
        try {
            const { data, error } = await client
                .from('translations')
                .select('language, content')
                .in('page_name', ['common', pageName]);

            if (error) throw error;

            if (data && data.length > 0) {
                data.forEach(item => {
                    const lang = item.language;
                    if (!translations[lang]) translations[lang] = {};
                    translations[lang] = { ...translations[lang], ...item.content };
                });

                localStorage.setItem(cacheKey_FA, JSON.stringify(translations.fa));
                localStorage.setItem(cacheKey_EN, JSON.stringify(translations.en));

                applyLanguage(activeLang);
            }
        } catch (err) {
            console.error("خطا در دریافت ترجمه‌ها از Supabase:", err);
            applyLanguage(activeLang);
        }
    } else {
        // در صورتی که کلاینت Supabase هنوز آماده نشده باشد
        applyLanguage(activeLang);
    }
}

/**
 * اعمال زبان روی DOM
 */
function applyLanguage(lang) {
    localStorage.setItem('siteLanguage', lang);

    document.documentElement.dir = lang === 'fa' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
    currentLang = lang;

    // ۱. جایگذاری متن‌های innerHTML
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key] !== undefined) {
            element.innerHTML = translations[lang][key];
        }
    });

    // ۲. جایگذاری Placeholder ورودی‌ها
    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
        const key = element.getAttribute('data-i18n-placeholder');
        if (translations[lang] && translations[lang][key] !== undefined) {
            element.setAttribute('placeholder', translations[lang][key]);
        }
    });

    // ارسال Event برای به‌روزرسانی سایر کامپوننت‌ها (مثل لیست‌های Supabase)
    window.dispatchEvent(new CustomEvent('languageChanged', {
        detail: { language: lang }
    }));
}

// مقداردهی اولیه پس از لود صفحه
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
    const overlay = document.getElementById('menu-overlay');

    if (!menu) return;

    const isActive = menu.classList.toggle('active');
    if (btn) btn.classList.toggle('menu-open-rotate');

    if (icon) {
        if (isActive) {
            icon.classList.replace('fa-bars', 'fa-xmark');
        } else {
            icon.classList.replace('fa-xmark', 'fa-bars');
        }
    }

    if (overlay) {
        overlay.style.display = isActive ? 'block' : 'none';
    }
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

/* ==========================================================================
   GLOBAL STREAK SYSTEM (Fetch & Render Badge Count by Class)
   ========================================================================== */

/**
 * دریافت تعداد استریک کاربر و نمایش آن در تمام المان‌های دارای کلاس navStreakCountText (فقط عدد)
 */
async function updateGlobalNavStreak() {
    // ۱. انتخاب تمام المان‌هایی که این کلاس را دارند
    const streakElements = document.querySelectorAll('.navStreakCountText');
    if (streakElements.length === 0) return;

    // تابع کمکی برای مقداردهی به همه المان‌ها
    const setStreakValue = (val) => {
        streakElements.forEach(el => {
            el.textContent = val;
        });
    };

    const client = window.supabase || window.supabaseClient;

    // ۲. اگر Supabase مقداردهی نشده بود، مقدار را 0 بگذار
    if (!client) {
        setStreakValue('0');
        return;
    }

    try {
        // ۳. دریافت نشست فعلی کاربر
        const { data: { session }, error: sessionError } = await client.auth.getSession();

        if (sessionError || !session) {
            setStreakValue('0');
            return;
        }

        // ۴. کوئری به جدول profiles برای گرفتن streak_count
        const { data, error } = await client
            .from('profiles')
            .select('streak_count')
            .eq('id', session.user.id)
            .maybeSingle();

        if (error) {
            console.error("خطا در دریافت استریک از دیتابیس:", error.message);
            setStreakValue('0');
            return;
        }

        // ۵. قرار دادن فقط و فقط عدد استریک در تمام المان‌های دارای این کلاس
        const count = (data && data.streak_count) ? data.streak_count : 0;
        setStreakValue(count);

    } catch (err) {
        console.error("خطا در اجرای updateGlobalNavStreak:", err);
        setStreakValue('0');
    }
}

// ۶. اجرای تابع هنگام لود کامل DOM و گوش دادن به تغییرات Auth
document.addEventListener('DOMContentLoaded', () => {
    updateGlobalNavStreak();

    const client = window.supabase || window.supabaseClient;
    if (client && client.auth) {
        // اگر کاربر ورود یا خروج کرد، عدد استریک نوبار به‌روزرسانی شود
        client.auth.onAuthStateChange((event) => {
            if (event === 'SIGNED_IN' || event === 'SIGNED_OUT' || event === 'TOKEN_REFRESHED') {
                updateGlobalNavStreak();
            }
        });
    }
});