import { supabase } from './supabase-client.js';

// تابع احرازهویت کاربر معتبر
async function getValidUser() {
    if (typeof supabase === 'undefined') {
        console.warn("Supabase client بارگذاری نشده است.");
        return null;
    }

    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return null;

    const { data: { user }, error } = await supabase.auth.getUser();
    if (error || !user) {
        console.warn("سشن کاربر نامعتبر است یا منقضی شده.");
        return null;
    }
    return user;
}

// ۱. دریافت اطلاعات یک یونیت خاص از کاربر
async function getUnitProgress(bookId, unitId) {
    const user = await getValidUser();
    if (!user) return null;

    const { data, error } = await supabase
        .from('user_unit_progress')
        .select('*')
        .eq('user_id', user.id)
        .eq('book_id', bookId)
        .eq('unit_id', unitId)
        .maybeSingle();

    if (error) {
        console.error("خطا در دریافت اطلاعات یونیت:", error.message);
        return null;
    }

    return data;
}

// ۲. ذخیره یا بروزرسانی متغیرهای یک یونیت خاص (Upsert)
async function saveUnitProgress(bookId, unitId, updatedData) {
    const user = await getValidUser();
    if (!user) return;

    const { error } = await supabase
        .from('user_unit_progress')
        .upsert({
            user_id: user.id,
            book_id: bookId,
            unit_id: unitId,
            ...updatedData,
            updated_at: new Date().toISOString()
        }, {
            onConflict: 'user_id, book_id, unit_id'
        });

    if (error) {
        console.error("خطا در ثبت اطلاعات یونیت:", error.message);
    }
}

// ۳. ذخیره شماره آخرین کارت دیده‌شده در یونیت
async function updateCardProgress(bookId, unitId, cardIndex) {
    await saveUnitProgress(bookId, unitId, { last_card_index: cardIndex });
}

// ۴. ذخیره تنظیمات پخش خودکار برای این یونیت
async function updateAutoPlayStatus(bookId, unitId, isAutoPlay) {
    await saveUnitProgress(bookId, unitId, { is_autoplay: isAutoPlay });
}

// ۵. اضافه/حذف کلمه ستاره‌دار در این یونیت
async function toggleStarredWord(bookId, unitId, wordId) {
    const currentData = await getUnitProgress(bookId, unitId);
    let starredList = currentData?.starred_words || [];

    if (starredList.includes(wordId)) {
        starredList = starredList.filter(id => id !== wordId);
    } else {
        starredList.push(wordId);
    }

    await saveUnitProgress(bookId, unitId, { starred_words: starredList });
}

// ۶. بروزرسانی وضعیت لایتنر کلمه (easy, medium, hard) در این یونیت
async function updateWordStatus(bookId, unitId, wordId, status) {
    const currentData = await getUnitProgress(bookId, unitId);
    const currentStatuses = currentData?.words_status || {};

    const updatedStatuses = { ...currentStatuses, [wordId]: status };
    await saveUnitProgress(bookId, unitId, { words_status: updatedStatuses });
}

// ۷. ذخیره یا ویرایش یادداشت کاربر برای یک کلمه در این یونیت
async function updateWordNote(bookId, unitId, wordId, noteText) {
    const currentData = await getUnitProgress(bookId, unitId);
    const currentNotes = currentData?.word_notes || {};

    if (noteText.trim() === "") {
        delete currentNotes[wordId];
    } else {
        currentNotes[wordId] = noteText;
    }

    await saveUnitProgress(bookId, unitId, { word_notes: currentNotes });
}


window.resetUnitDataInSupabase = async function (book, unit) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    // فرض بر این است که جدول شما user_progress نام دارد و بر اساس user_id, book, unit رکورد را نگه می‌دارد
    const { error } = await supabase
        .from('user_unit_progress') // نام جدول خود را در صورت متفاوت بودن اصلاح کنید
        .delete()
        .eq('user_id', user.id)
        .eq('book_id', book)
        .eq('unit_id', unit);

    if (error) {
        console.error("خطا در پاک‌سازی اطلاعات در Supabase:", error);
    } else {
        console.log("اطلاعات این یونیت در Supabase با موفقیت پاک شد.");
    }
};




// متصل کردن توابع به window برای دسترسی اسکریپت‌های HTML
window.getValidUser = getValidUser;
window.getUnitProgress = getUnitProgress;
window.saveUnitProgress = saveUnitProgress;
window.updateCardProgress = updateCardProgress;
window.updateAutoPlayStatus = updateAutoPlayStatus;
window.toggleStarredWord = toggleStarredWord;
window.updateWordStatus = updateWordStatus;
window.updateWordNote = updateWordNote;
window.resetUnitDataInSupabase = resetUnitDataInSupabase;