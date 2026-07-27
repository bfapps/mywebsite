const prospectData = {
    prospect1: [
        {
            unit: 1,
            icon: "fa-solid fa-door-open",
            titleEn: "Beginning – Welcome",
            titleFa: "شروع – خوش‌آمدگویی",
            descEn: "What you may already know.",
            descFa: "آنچه ممکن است از قبل بدانید."
        },
        {
            unit: 2,
            icon: "fa-solid fa-users-rectangle",
            titleEn: "Lesson 1 & 2 – My Name & Classmates",
            titleFa: "درس ۱ و ۲ – نام من و همکلاسی‌های من",
            descEn: "Introducing yourself & Greeting",
            descFa: "معرفی خود و احوالپرسی",
        },
        {
            unit: 3.1,
            icon: "fa-solid fa-cake-candles",
            titleEn: "Lesson 3.1 – My Age: Dates",
            titleFa: "درس ۳.۱ – سن من: تاریخ‌ها",
            descEn: "Talking about your age & Talking about dates",
            descFa: "صحبت درباره سن و گفتگو در مورد تاریخ‌ها"
        },
        {
            unit: 3.2,
            icon: "fa-solid fa-cake-candles",
            titleEn: "Lesson 3.2 – My Age: Numbers:",
            titleFa: "درس ۳.۲ – سن من: اعداد",
            descEn: "Talking about your age & Talking about dates",
            descFa: "صحبت درباره سن و گفتگو در مورد تاریخ‌ها",
            requireAuth: true
        },
        {
            unit: 4.1,
            icon: "fa-solid fa-people-roof",
            titleEn: "Lesson 4.1 – My family: Family Members",
            titleFa: "درس ۴.۱ – خانواده من: اعضای خانواده",
            descEn: "Talking about your family",
            descFa: "صحبت درباره خانواده",
            requireAuth: true
        },
        {
            unit: 4.2,
            icon: "fa-solid fa-people-roof",
            titleEn: "Lesson 4.2 – My family: Jobs",
            titleFa: "درس ۴.۲ – خانواده من: شغل‌ها",
            descEn: "Talking about your family",
            descFa: "صحبت درباره خانواده",
            requireAuth: true
        },
        {
            unit: 5.1,
            icon: "fa-solid fa-user-tie",
            titleEn: "Lesson 5.1 – My Appearance: Clothes",
            titleFa: "درس ۵.۱ – ظاهر من: لباس‌ها",
            descEn: "Talking about appearance",
            descFa: "صحبت درباره ویژگی‌های ظاهری",
            requireAuth: true
        },
        {
            unit: 5.2,
            icon: "fa-solid fa-user-tie",
            titleEn: "Lesson 5.2 – My Appearance: Colors",
            titleFa: "درس ۵.۲ – ظاهر من: رنگ‌ها",
            descEn: "Talking about appearance",
            descFa: "صحبت درباره ویژگی‌های ظاهری",
            requireAuth: true
        },
        {
            unit: 6.1,
            icon: "fa-solid fa-house-chimney",
            titleEn: "Lesson 6.1 – My House: Places & Household Appliances",
            titleFa: "درس ۶.۱ – خانه من: مکان‌ها و لوازم خانگی",
            descEn: "Where people are & What people are doing",
            descFa: "افراد کجا هستند و در حال انجام چه کاری می‌باشند",
            requireAuth: true
        },
        {
            unit: 6.2,
            icon: "fa-solid fa-house-chimney",
            titleEn: "Lesson 6.2 – My House: Activities",
            titleFa: "درس ۶.۲ – خانه من: فعالیت‌ها",
            descEn: "Where people are & What people are doing",
            descFa: "افراد کجا هستند و در حال انجام چه کاری می‌باشند",
            requireAuth: true
        },
        {
            unit: 7,
            icon: "fa-solid fa-map-location-dot",
            titleEn: "Lesson 7 – My Address",
            titleFa: "درس ۷ – آدرس من",
            descEn: "Address-phone number & Telling the time",
            descFa: "آدرس، شماره تلفن و اعلام ساعت",
            requireAuth: true
        },
        {
            unit: 8.1,
            icon: "fa-solid fa-utensils",
            titleEn: "Lesson 8.1 – My Favorite Food: Fruits & Vegetables",
            titleFa: "درس ۸.۱ – غذای مورد علاقه من: میوه‌ها و سبزیجات",
            descEn: "Your favorite food & Making suggestions",
            descFa: "غذای مورد علاقه شما و پیشنهاد دادن",
            requireAuth: true
        },
        {
            unit: 8.2,
            icon: "fa-solid fa-utensils",
            titleEn: "Lesson 8.2 – My Favorite Food: Foods & Drinks",
            titleFa: "درس ۸.۲ – غذای مورد علاقه من: غذاها ونوشیدنی‌ها",
            descEn: "Your favorite food & Making suggestions",
            descFa: "غذای مورد علاقه شما و پیشنهاد دادن",
            requireAuth: true
        }
    ],
    prospect2: [
        {
            unit: 1,
            icon: "fa-solid fa-earth-americas", // نماد کره زمین و ملیت‌ها
            titleEn: "Lesson 1 – My Nationality",
            titleFa: "درس ۱ – ملیت من",
            descEn: "Talking about Nationalities",
            descFa: "صحبت درباره ملیت‌ها"
        },
        {
            unit: 2,
            icon: "fa-solid fa-calendar-days", // نماد تقویم برای روزهای هفته و برنامه‌های روزانه
            titleEn: "Lesson 2 – My Week",
            titleFa: "درس ۲ – هفته من",
            descEn: "Talking about Daily Activities",
            descFa: "صحبت درباره فعالیت‌های روزانه"
        },
        {
            unit: 3,
            icon: "fa-solid fa-star", // نماد ستاره برای استعدادها و توانایی‌ها
            titleEn: "Lesson 3 – My Abilities",
            titleFa: "درس ۳ – توانایی‌های من",
            descEn: "Talking about Abilities",
            descFa: "صحبت درباره توانایی‌ها"
        },
        {
            unit: 4,
            icon: "fa-solid fa-heart-pulse", // نماد ضربان قلب و سلامتی
            titleEn: "Lesson 4 – My Health",
            titleFa: "درس ۴ – سلامت من",
            descEn: "Health Problems & Giving Health Advice",
            descFa: "مشکلات سلامتی و دادن توصیه‌های پزشکی",
            requireAuth: true
        },
        {
            unit: 5,
            icon: "fa-solid fa-city", // نماد ساختمان‌ها و شهر
            titleEn: "Lesson 5 – My City",
            titleFa: "درس ۵ – شهر من",
            descEn: "Talking about a Place",
            descFa: "صحبت درباره یک مکان (شهر)",
            requireAuth: true
        },
        {
            unit: 6,
            icon: "fa-solid fa-tree", // نماد درخت و طبیعت برای روستا و آب‌وهوا
            titleEn: "Lesson 6 – My Village",
            titleFa: "درس ۶ – روستای من",
            descEn: "Talking about a Place & Weather",
            descFa: "صحبت درباره یک مکان (روستا) و آب‌وهوا",
            requireAuth: true
        },
        {
            unit: 7,
            icon: "fa-solid fa-gamepad", // نماد بازی و سرگرمی برای اوقات فراغت
            titleEn: "Lesson 7 – My Hobbies",
            titleFa: "درس ۷ – سرگرمی‌های من",
            descEn: "Talking about Free Time Activities",
            descFa: "صحبت درباره فعالیت‌های اوقات فراغت",
            requireAuth: true
        }
        
    ],
    prospect3: [
        {
            unit: 1,
            icon: "fa-solid fa-masks-theater", // نماد ماسک‌های تئاتر و شخصیت‌های مختلف انسانی
            titleEn: "Lesson 1 – Personality",
            titleFa: "درس ۱ – شخصیت",
            descEn: "Talking about Personality",
            descFa: "صحبت درباره ویژگی‌های شخصیتی"
        },
        {
            unit: 2,
            icon: "fa-solid fa-passport", // نماد پاسپورت و مدارک سفر برای مسافرت
            titleEn: "Lesson 2 – Travel",
            titleFa: "درس ۲ – سفر",
            descEn: "Talking about Travel",
            descFa: "صحبت درباره سفر و مسافرت"
        },
        {
            unit: 3,
            icon: "fa-solid fa-gifts", // نماد کادوها و جشن‌ها برای فستیوال‌ها و مراسم‌ها
            titleEn: "Lesson 3 – Festivals & Ceremonies",
            titleFa: "درس ۳ – جشنواره‌ها و مراسم‌ها",
            descEn: "Talking about Festivals and Ceremonies",
            descFa: "صحبت درباره جشنواره‌ها و آیین‌ها"
        },
        {
            unit: 4,
            icon: "fa-solid fa-bell-concierge", // نماد زنگ خدمات یا سرویس‌دهی
            titleEn: "Lesson 4 – Services",
            titleFa: "درس ۴ – خدمات",
            descEn: "Talking about Service",
            descFa: "صحبت درباره خدمات عمومی و رفاهی",
            requireAuth: true
        },
        {
            unit: 5,
            icon: "fa-solid fa-tv", // نماد تلویزیون و رسانه‌های جمعی
            titleEn: "Lesson 5 – Media",
            titleFa: "درس ۵ – رسانه‌ها",
            descEn: "Talking about Media",
            descFa: "صحبت درباره رسانه‌ها و اخبار",
            requireAuth: true
        },
        {
            unit: 6,
            icon: "fa-solid fa-user-injured", // نماد فرد آسیب‌دیده برای مبحث سلامت و جراحت‌ها
            titleEn: "Lesson 6 – Health & Injuries",
            titleFa: "درس ۶ – سلامت و جراحت‌ها",
            descEn: "Talking about Health & Injuries",
            descFa: "صحبت درباره وضعیت سلامتی و آسیب‌دیدگی‌ها",
            requireAuth: true
        }
    ]
};
