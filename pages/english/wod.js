/* ==========================================================================
   DAILY STREAK & WORD OF THE DAY SYSTEM (Fixes & Improvements)
   ========================================================================== */

let currentAudioObject = null;

document.addEventListener('DOMContentLoaded', () => {
    initWordOfTheDay();
    updateStreakUI();
});

// داده‌های پیش‌فرض کلمه روز مطابق با ساختار JSONB دیتابیس
const defaultWotd = {
    word: "resilient",
    phonetic: "/rɪˈzɪl.jənt/",
    audio_url: "https://translate.google.com/translate_tts?ie=UTF-8&tl=en&client=tw-ob&q=resilient",
    definition_en: "Able to withstand or recover quickly from difficult conditions.",
    meaning_fa: "مقاوم، سرسخت",
    example_en: "She is a resilient person who never gives up."
};

/**
 * تابع اختصاصی پخش صوت (ارتقا یافته بر اساس راهکار flashcard.html)
 */
function playRealAudio(audioPath, wordText) {
    if (!audioPath && !wordText) return;

    // ۱. متوقف کردن صدای قبلی برای جلوگیری از تداخل
    if (currentAudioObject) {
        currentAudioObject.pause();
        currentAudioObject.removeAttribute('src');
        currentAudioObject.load();
    }

    // ۲. تعریف تابع پشتیبان (Fallback) برای استفاده از سخنگوی بومی مرورگر
    const playFallbackTTS = () => {
        try {
            let textToSpeak = wordText;

            if (!textToSpeak && typeof audioPath === 'string') {
                if (audioPath.includes('translate.google.com')) {
                    const urlObj = new URL(audioPath);
                    textToSpeak = urlObj.searchParams.get('q');
                } else {
                    const fileName = audioPath.split('/').pop().split('.')[0];
                    textToSpeak = fileName.replace(/[-_]/g, ' ');
                }
            }

            if (textToSpeak) {
                window.speechSynthesis.cancel(); // لغو سخنگوی قبلی
                const utterance = new SpeechSynthesisUtterance(decodeURIComponent(textToSpeak));
                utterance.lang = 'en-US';
                utterance.rate = 0.9;
                window.speechSynthesis.speak(utterance);
                console.log("صدا از طریق سخنگوی مرورگر (TTS) پخش شد.");
            }
        } catch (e) {
            console.log("خطا در اجرای سخنگوی مرورگر:", e.message);
        }
    };

    // ۳. ساخت المان صوتی جدید + حذف Referrer برای دور زدن محدودیت‌های CORS/Google
    currentAudioObject = document.createElement('audio');
    currentAudioObject.referrerPolicy = "no-referrer";
    currentAudioObject.src = audioPath;

    // ۴. تلاش برای پخش فایل صوتی (گوگل یا فایل محلی)
    const playPromise = currentAudioObject.play();
    if (playPromise !== undefined) {
        playPromise.then(() => {
            // پخش با موفقیت انجام شد
        }).catch(error => {
            if (error.name === 'AbortError') return;

            console.log("لود فایل صوتی ناموفق بود؛ سوئیچ روی سخنگوی مرورگر...");
            playFallbackTTS();
        });
    }
}

/**
 * مقداردهی اولیه کارت کلمه روز
 */
async function initWordOfTheDay() {
    const wordEl = document.getElementById('wotdWord');
    const phoneticEl = document.getElementById('wotdPhonetic');
    const meaningTextEl = document.getElementById('wotdMeaningText');
    const exampleEl = document.getElementById('wotdExample');
    const audioBtn = document.getElementById('wotdAudioBtn');
    const revealBtn = document.getElementById('wotdRevealBtn');
    const meaningContent = document.getElementById('wotdMeaningContent');
    const collapseBtn = document.getElementById('wotdCollapseBtn');

    // مدیریت بستن کارت و برگشت به حالت اولیه
    if (collapseBtn) {
        collapseBtn.addEventListener('click', () => {
            if (meaningContent) meaningContent.style.display = 'none';
            if (revealBtn) revealBtn.style.display = 'flex';
        });
    }

    if (!wordEl || !revealBtn) return;

    let activeWordData = defaultWotd;
    const client = window.supabase || window.supabaseClient;

    // ۱. دریافت کلمه روز از Supabase
    if (client) {
        try {
            const todayStr = new Date().toISOString().split('T')[0];
            const { data, error } = await client
                .from('daily_words')
                .select('word_data')
                .eq('publish_date', todayStr)
                .maybeSingle();

            if (data && data.word_data && !error) {
                activeWordData = data.word_data;
            }
        } catch (e) {
            console.log("استفاده از کلمه پیش‌فرض به علت عدم بازخوانی از دیتابیس");
        }
    }

    // جایگذاری اطلاعات در عناصر HTML
    wordEl.textContent = activeWordData.word || '';
    phoneticEl.textContent = activeWordData.phonetic || '';

    if (meaningTextEl) {
        let faMeaning = activeWordData.meaning_fa || '';
        let enMeaning = '';
        if (activeWordData.definition_en) {
          /* fullMeaning += ` (${activeWordData.definition_en})`; */
            enMeaning = activeWordData.definition_en
        }
        meaningTextEl.innerHTML = `<span id="faMeaning">${faMeaning}</span><br><span id="enMeaning">${enMeaning}</span>`;
    }

    if (exampleEl) {
        exampleEl.textContent = activeWordData.example_en || '';
    }

    // ۲. اتصال دکمه پخش صوتی (ارسال هم‌زمان URL و متن کلمه)
    if (audioBtn) {
        const newAudioBtn = audioBtn.cloneNode(true);
        if (audioBtn.parentNode) {
            audioBtn.parentNode.replaceChild(newAudioBtn, audioBtn);
        }

        newAudioBtn.addEventListener('click', () => {
            playRealAudio(activeWordData.audio_url, activeWordData.word);
        });
    }

    // ۳. بررسی وضعیت نشست کاربر (Session)
    let session = null;
    if (client) {
        try {
            const { data } = await client.auth.getSession();
            session = data.session;
        } catch (e) {
            session = null;
        }
    }

    // ۴. مدیریت مشاهده معنی و ثبت استریک
    revealBtn.addEventListener('click', async () => {
        revealBtn.style.display = 'none';
        if (meaningContent) meaningContent.style.display = 'block';

        // پخش خودکار صوت هنگام کلیک روی دکمه نمایش معنی
        playRealAudio(activeWordData.audio_url, activeWordData.word);

        if (!session) {
            console.log("کاربر مهمان است؛ فقط معنی کلمه نمایش داده شد.");
            return;
        }

        try {
            const { error } = await client.rpc('increment_user_streak');
            if (error) {
                console.error("خطا در به‌روزرسانی استریک دیتابیس:", error.message);
            } else {
                console.log("استریک کاربر با موفقیت محاسبه و ثبت شد.");
                updateStreakUI();

            }
        } catch (err) {
            console.error("خطا در فراخوانی تابع استریک:", err);
        }
    });
}



/**
 * به‌روزرسانی نمایش ظاهر ویجت Streak
 */
async function updateStreakUI() {
    const streakText = document.getElementById('streakCountText');
    const navStreakText = document.getElementById('navStreakCountText');
    if (!streakText) return;

    const client = window.supabase || window.supabaseClient;
    let currentStreak = 0;

    if (client) {
        try {
            const { data: { session } } = await client.auth.getSession();
            if (session) {
                const { data, error } = await client
                    .from('profiles')
                    .select('streak_count')
                    .eq('id', session.user.id)
                    .maybeSingle();

                if (data && !error) {
                    currentStreak = data.streak_count || 0;
                }
            }
        } catch (e) {
            console.error("خطا در بازخوانی استریک:", e);
        }
    }

    const lang = document.documentElement.lang || 'en';
    if (lang === 'fa') {
        streakText.innerHTML = `${currentStreak} <span class="streakText" data-i18n="streakText">روز زنجییره فعال</span>`;
    }
    else if (lang ==='en'){
        streakText.innerHTML = `${currentStreak} <span class="streakText" data-i18n="streakText"> Days Streak </span>`;
    } else {
        streakText.textContent = `${currentStreak} Day${currentStreak === 1 ? '' : 's'} Streak`;
    }
    navStreakText.textContent = `${currentStreak}`;

}