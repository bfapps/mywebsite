/**
 * Speed Match Game Logic - Multilingual & Audio Supported
 */

let wordsData = [];
let cardItems = [];
let selectedCards = [];
let score = 0;
let matchedPairsCount = 0;
let timer = 45;
let timerInterval = null;

// تعریف صداهای بازی (می‌توانید لینک‌ها را با مسیر فایل‌های پروژه خود جایگزین کنید)
const sounds = {
    correct: new Audio('/assets/audio/quiz/correct.mp3'),
    wrong: new Audio('/assets/audio/quiz/wrong.mp3'),
    cheer: new Audio('/assets/audio/quiz/cheer.mp3'),
    fail: new Audio('/assets/audio/quiz/fail.mp3')
};

// تابع کمکی برای پخش مجدد صدا از ابتدا بدون تداخل
function playSound(audioKey) {
    if (sounds[audioKey]) {
        sounds[audioKey].currentTime = 0;
        sounds[audioKey].play().catch(err => {
            // جلوگیری از خطای مرورگر در صورتی که تعامل قبلی کاربر وجود نداشته باشد
            console.warn("پخش صدا متوقف شد:", err);
        });
    }
}

const urlParams = new URLSearchParams(window.location.search);
const bookParam = urlParams.get('book');
const unitParam = urlParams.get('unit');
const sourceParam = urlParams.get('source') || 'ir_highschool';

document.addEventListener('DOMContentLoaded', () => {
    initGame();
});

// پشتیبانی از تغییر زبان لحظه‌ای سایت
window.addEventListener('languageChanged', () => {
    if (wordsData.length > 0) {
        restartGame();
    }
});

async function initGame() {
    showState('loading');

    const client = window.supabaseClient || window.supabase || (typeof supabase !== 'undefined' ? supabase : null);

    if (!client) {
        setTimeout(initGame, 100);
        return;
    }

    try {
        const unitNumber = parseFloat(unitParam);

        const { data, error } = await client
            .from(sourceParam)
            .select('words_data')
            .eq('book_key', bookParam)
            .eq('unit_number', unitNumber)
            .single();

        if (error || !data) {
            console.error("خطا در دریافت کلمات از دیتابیس:", error);
            alert("امکان دریافت اطلاعات لغات وجود ندارد.");
            return;
        }

        if (data.words_data && Array.isArray(data.words_data) && data.words_data.length > 0) {
            wordsData = data.words_data;
            startGame();
        } else {
            alert("هیچ کلمه‌ای برای این یونیت یافت نشد.");
        }

    } catch (err) {
        console.error("خطای غیرمنتظره:", err);
    }
}

function startGame() {
    score = 0;
    matchedPairsCount = 0;
    timer = 45;
    selectedCards = [];

    updateStatsDisplay();
    prepareCards();
    showState('gameplay');
    startTimer();
}

function prepareCards() {
    const board = document.getElementById('gameBoard');
    board.innerHTML = '';

    const lang = (typeof currentLang !== 'undefined') ? currentLang : 'fa';

    let selectedWords = [...wordsData];
    if (selectedWords.length > 10) {
        selectedWords = selectedWords.sort(() => 0.5 - Math.random()).slice(0, 10);
    }

    cardItems = [];

    selectedWords.forEach(word => {
        // ۱. کارت کلمه انگلیسی
        cardItems.push({
            id: word.id,
            type: 'en',
            text: word.name || word.en || word.word
        });

        // ۲. کارت معنی
        const meaningText = (lang === 'fa')
            ? (word.meaning || word.meaning_fa || word.fa)
            : (word.meaning_en || word.definition || word.meaning);

        cardItems.push({
            id: word.id,
            type: 'meaning',
            text: meaningText
        });
    });

    // شفل کردن کارت‌ها
    cardItems.sort(() => 0.5 - Math.random());

    // رندر کارت‌ها
    cardItems.forEach((item, index) => {
        const cardEl = document.createElement('div');
        cardEl.className = 'match-card';
        cardEl.dataset.id = item.id;
        cardEl.dataset.type = item.type;
        cardEl.dataset.index = index;
        cardEl.textContent = item.text;

        if (lang === 'fa' && item.type === 'meaning') {
            cardEl.classList.add('fa-card');
        } else {
            cardEl.style.direction = 'ltr';
        }

        cardEl.addEventListener('click', () => handleCardClick(cardEl));
        board.appendChild(cardEl);
    });
}

function handleCardClick(cardEl) {
    if (cardEl.classList.contains('matched') || cardEl.classList.contains('selected')) {
        return;
    }

    if (selectedCards.length < 2) {
        cardEl.classList.add('selected');
        selectedCards.push(cardEl);
    }

    if (selectedCards.length === 2) {
        checkMatch();
    }
}

function checkMatch() {
    const [card1, card2] = selectedCards;
    const id1 = card1.dataset.id;
    const id2 = card2.dataset.id;
    const type1 = card1.dataset.type;
    const type2 = card2.dataset.type;

    if (id1 === id2 && type1 !== type2) {
        // پاسخ درست
        playSound('correct');

        card1.classList.remove('selected');
        card2.classList.remove('selected');

        card1.classList.add('matched');
        card2.classList.add('matched');

        score += 10;
        matchedPairsCount++;
        updateStatsDisplay();

        selectedCards = [];

        if (matchedPairsCount === cardItems.length / 2) {
            setTimeout(endGame, 500);
        }
    } else {
        // پاسخ اشتباه
        playSound('wrong');

        card1.classList.add('wrong');
        card2.classList.add('wrong');

        setTimeout(() => {
            card1.classList.remove('selected', 'wrong');
            card2.classList.remove('selected', 'wrong');
            selectedCards = [];
        }, 500);
    }
}

function startTimer() {
    clearInterval(timerInterval);
    const timerEl = document.getElementById('timerDisplay');
    const timerBox = timerEl ? timerEl.parentElement : null;

    timerInterval = setInterval(() => {
        timer--;
        if (timerEl) timerEl.textContent = `${timer}s`;

        if (timerBox && timer <= 10) {
            timerBox.classList.add('warning');
        }

        if (timer <= 0) {
            clearInterval(timerInterval);
            endGame();
        }
    }, 1000);
}

function updateStatsDisplay() {
    const scoreEl = document.getElementById('scoreDisplay');
    const timerEl = document.getElementById('timerDisplay');
    if (scoreEl) scoreEl.textContent = score;
    if (timerEl) timerEl.textContent = `${timer}s`;
}

function endGame() {
    clearInterval(timerInterval);
    const finalScoreEl = document.getElementById('finalScoreVal');
    const matchedCountEl = document.getElementById('matchedCountVal');

    if (finalScoreEl) finalScoreEl.textContent = score;
    if (matchedCountEl) matchedCountEl.textContent = matchedPairsCount;

    // پخش صدای پایان بازی بر اساس میزان امتیاز
    if (score >= 60) {
        playSound('cheer');
    } else {
        playSound('fail');
    }

    showState('gameover');
}

function restartGame() {
    const timerEl = document.getElementById('timerDisplay');
    if (timerEl && timerEl.parentElement) {
        timerEl.parentElement.classList.remove('warning');
    }
    startGame();
}

function showState(state) {
    const loadingState = document.getElementById('loadingState');
    const gamePlayState = document.getElementById('gamePlayState');
    const gameOverState = document.getElementById('gameOverState');

    if (loadingState) loadingState.classList.add('hidden');
    if (gamePlayState) gamePlayState.classList.add('hidden');
    if (gameOverState) gameOverState.classList.add('hidden');

    if (state === 'loading' && loadingState) loadingState.classList.remove('hidden');
    if (state === 'gameplay' && gamePlayState) gamePlayState.classList.remove('hidden');
    if (state === 'gameover' && gameOverState) gameOverState.classList.remove('hidden');
}