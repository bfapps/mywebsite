// vision3_data.js
const currentBookDatabase = {
    // کلمات مربوط به ویژن 3 - یونیت 1)
    "u1": [
        {
            id: 1,
            name: "take temperature",
            pronunciation: "/teɪk ˈtem.prə.tʃər/",
            example: "The doctor will take your temperature.",
            type: "verb phrase",
            meaning: "دما را اندازه‌گیری کردن",
            audio: "https://translate.google.com/translate_tts?ie=UTF-8&tl=en&client=tw-ob&q=take+temperature",
            image: ""
        },
        {
            id: 2,
            name: "physician",
            pronunciation: "/fɪˈzɪʃ.ən/",
            example: "The physician gave me some medicine.",
            type: "noun",
            meaning: "پزشک",
            audio: "https://translate.google.com/translate_tts?ie=UTF-8&tl=en&client=tw-ob&q=physician",
            image: ""
        },
        {
            id: 3,
            name: "regard",
            pronunciation: "/rɪˈɡɑːrd/",
            example: "I regard him as my best friend.",
            type: "verb",
            meaning: "تلقی کردن، در نظر گرفتن",
            audio: "https://translate.google.com/translate_tts?ie=UTF-8&tl=en&client=tw-ob&q=regard",
            image: ""
        },
        {
            id: 4,
            name: "dedicated",
            pronunciation: "/ˈded.ɪ.keɪ.tɪd/",
            example: "She is a dedicated teacher.",
            type: "adjective",
            meaning: "متعهد، دلسوز",
            audio: "https://translate.google.com/translate_tts?ie=UTF-8&tl=en&client=tw-ob&q=dedicated",
            image: ""
        },
        {
            id: 5,
            name: "spare no pains",
            pronunciation: "/sper noʊ peɪnz/",
            example: "They spared no pains to help the poor.",
            type: "idiom",
            meaning: "از هیچ تلاشی دریغ نکردن",
            audio: "https://translate.google.com/translate_tts?ie=UTF-8&tl=en&client=tw-ob&q=spare+no+pains",
            image: ""
        },
        {
            id: 6,
            name: "distinguished",
            pronunciation: "/dɪˈstɪŋ.ɡwɪʃt/",
            example: "He is a distinguished scientist.",
            type: "adjective",
            meaning: "برجسته، ممتاز",
            audio: "https://translate.google.com/translate_tts?ie=UTF-8&tl=en&client=tw-ob&q=distinguished",
            image: ""
        },
        {
            id: 7,
            name: "not surprisingly",
            pronunciation: "/nɒt səˈpraɪ.zɪŋ.li/",
            example: "Not surprisingly, he was late again.",
            type: "adverb",
            meaning: "جای تعجب نیست که",
            audio: "https://translate.google.com/translate_tts?ie=UTF-8&tl=en&client=tw-ob&q=not+surprisingly",
            image: ""
        },
        {
            id: 8,
            name: "found",
            pronunciation: "/faʊnd/",
            example: "They want to found a new school.",
            type: "verb",
            meaning: "تأسیس کردن",
            audio: "https://translate.google.com/translate_tts?ie=UTF-8&tl=en&client=tw-ob&q=found",
            image: ""
        },
        {
            id: 9,
            name: "receive",
            pronunciation: "/rɪˈsiːv/",
            example: "I want to receive a letter from you.",
            type: "verb",
            meaning: "دریافت کردن",
            audio: "https://translate.google.com/translate_tts?ie=UTF-8&tl=en&client=tw-ob&q=receive",
            image: ""
        },
        {
            id: 10,
            name: "abroad",
            pronunciation: "/əˈbrɔːd/",
            example: "My brother lives abroad.",
            type: "adverb",
            meaning: "خارج از کشور",
            audio: "https://translate.google.com/translate_tts?ie=UTF-8&tl=en&client=tw-ob&q=abroad",
            image: ""
        },
        {
            id: 11,
            name: "cure",
            pronunciation: "/kjʊər/",
            example: "The doctor can cure this illness.",
            type: "verb",
            meaning: "درمان کردن",
            audio: "https://translate.google.com/translate_tts?ie=UTF-8&tl=en&client=tw-ob&q=cure",
            image: ""
        },
        {
            id: 12,
            name: "regarded as",
            pronunciation: "/rɪˈɡɑːrdɪd əz/",
            example: "He is regarded as a hero.",
            type: "verb phrase",
            meaning: "به عنوان ... تلقی شدن",
            audio: "https://translate.google.com/translate_tts?ie=UTF-8&tl=en&client=tw-ob&q=regarded+as",
            image: ""
        },
        {
            id: 13,
            name: "It's a pity!",
            pronunciation: "/ɪts ə ˈpɪt.i/",
            example: "It's a pity that you can't come.",
            type: "exclamation",
            meaning: "حیف شد!",
            audio: "https://translate.google.com/translate_tts?ie=UTF-8&tl=en&client=tw-ob&q=It%27s+a+pity",
            image: ""
        },
        {
            id: 14,
            name: "disease",
            pronunciation: "/dɪˈziːz/",
            example: "He has a serious disease.",
            type: "noun",
            meaning: "بیماری",
            audio: "https://translate.google.com/translate_tts?ie=UTF-8&tl=en&client=tw-ob&q=disease",
            image: ""
        },
        {
            id: 15,
            name: "sofa",
            pronunciation: "/ˈsəʊ.fə/",
            example: "We sit on the sofa and watch TV.",
            type: "noun",
            meaning: "مبل",
            audio: "https://translate.google.com/translate_tts?ie=UTF-8&tl=en&client=tw-ob&q=sofa",
            image: ""
        },
        {
            id: 16,
            name: "pigeon",
            pronunciation: "/ˈpɪdʒ.ən/",
            example: "I saw a pigeon in the park.",
            type: "noun",
            meaning: "کبوتر",
            audio: "https://translate.google.com/translate_tts?ie=UTF-8&tl=en&client=tw-ob&q=pigeon",
            image: ""
        },
        {
            id: 17,
            name: "shouted",
            pronunciation: "/ˈʃaʊ.tɪd/",
            example: "He shouted when he was happy.",
            type: "verb",
            meaning: "فریاد زد",
            audio: "https://translate.google.com/translate_tts?ie=UTF-8&tl=en&client=tw-ob&q=shouted",
            image: ""
        },
        {
            id: 18,
            name: "hard of hearing",
            pronunciation: "/hɑːrd əv ˈhɪr.ɪŋ/",
            example: "My grandfather is a bit hard of hearing.",
            type: "adjective",
            meaning: "کم‌شنوا",
            audio: "https://translate.google.com/translate_tts?ie=UTF-8&tl=en&client=tw-ob&q=hard+of+hearing",
            image: ""
        },
        {
            id: 19,
            name: "was born",
            pronunciation: "/wɒz bɔːrn/",
            example: "I was born in Iran.",
            type: "verb phrase",
            meaning: "متولد شد",
            audio: "https://translate.google.com/translate_tts?ie=UTF-8&tl=en&client=tw-ob&q=was+born",
            image: ""
        },
        {
            id: 20,
            name: "hug",
            pronunciation: "/hʌɡ/",
            example: "Give me a big hug!",
            type: "verb/noun",
            meaning: "بغل کردن، آغوش",
            audio: "https://translate.google.com/translate_tts?ie=UTF-8&tl=en&client=tw-ob&q=hug",
            image: ""
        },
        {
            id: 21,
            name: "lap",
            pronunciation: "/læp/",
            example: "The cat sat on my lap.",
            type: "noun",
            meaning: "دامان، زانو",
            audio: "https://translate.google.com/translate_tts?ie=UTF-8&tl=en&client=tw-ob&q=lap",
            image: ""
        },
        {
            id: 22,
            name: "burst into tears",
            pronunciation: "/bɜːrst ˈɪntə tɪərz/",
            example: "She burst into tears when she heard the news.",
            type: "verb phrase",
            meaning: "ناگهان به گریه افتادن",
            audio: "https://translate.google.com/translate_tts?ie=UTF-8&tl=en&client=tw-ob&q=burst+into+tears",
            image: ""
        },
        {
            id: 23,
            name: "repeatedly",
            pronunciation: "/rɪˈpiː.tɪd.li/",
            example: "He called me repeatedly.",
            type: "adverb",
            meaning: "مکرراً، بارها",
            audio: "https://translate.google.com/translate_tts?ie=UTF-8&tl=en&client=tw-ob&q=repeatedly",
            image: ""
        },
        {
            id: 24,
            name: "forgive",
            pronunciation: "/fəˈɡɪv/",
            example: "Please forgive me for being late.",
            type: "verb",
            meaning: "بخشیدن",
            audio: "https://translate.google.com/translate_tts?ie=UTF-8&tl=en&client=tw-ob&q=forgive",
            image: ""
        },
        {
            id: 25,
            name: "calmly",
            pronunciation: "/ˈkɑːm.li/",
            example: "She spoke very calmly.",
            type: "adverb",
            meaning: "با آرامش",
            audio: "https://translate.google.com/translate_tts?ie=UTF-8&tl=en&client=tw-ob&q=calmly",
            image: ""
        },
        {
            id: 26,
            name: "diary",
            pronunciation: "/ˈdaɪə.ri/",
            example: "I write in my diary every night.",
            type: "noun",
            meaning: "دفتر خاطرات",
            audio: "https://translate.google.com/translate_tts?ie=UTF-8&tl=en&client=tw-ob&q=diary",
            image: ""
        }
    ],

    // نمونه کلمات برای ویژن 3 - یونیت 2
    "u2": [
        {
            id: 1,
            name: "recommend",
            pronunciation: "/ˌrek.əˈmend/",
            example: "Can you recommend a good dictionary?",
            type: "verb",
            meaning: "توصیه کردن، پیشنهاد دادن",
            audio: "https://translate.google.com/translate_tts?ie=UTF-8&tl=en&client=tw-ob&q=recommend",
            image: ""
        },
        {
            id: 2,
            name: "suppose",
            pronunciation: "/səˈpəʊz/",
            example: "I suppose we should start studying now.",
            type: "verb",
            meaning: "فرض کردن، گمان کردن",
            audio: "https://translate.google.com/translate_tts?ie=UTF-8&tl=en&client=tw-ob&q=suppose",
            image: ""
        },
        {
            id: 3,
            name: "elementary",
            pronunciation: "/ˌel.ɪˈmen.tər.i/",
            example: "This book is suitable for elementary students.",
            type: "adjective",
            meaning: "ابتدایی، مقدماتی",
            audio: "https://translate.google.com/translate_tts?ie=UTF-8&tl=en&client=tw-ob&q=elementary",
            image: ""
        },
        {
            id: 4,
            name: "intermediate",
            pronunciation: "/ˌɪn.təˈmiː.di.ət/",
            example: "She has an intermediate level of English.",
            type: "adjective",
            meaning: "متوسط، میان‌دوره",
            audio: "https://translate.google.com/translate_tts?ie=UTF-8&tl=en&client=tw-ob&q=intermediate",
            image: ""
        },
        {
            id: 5,
            name: "advanced",
            pronunciation: "/ədˈvɑːnst/",
            example: "This is an advanced course in English grammar.",
            type: "adjective",
            meaning: "پیشرفته",
            audio: "https://translate.google.com/translate_tts?ie=UTF-8&tl=en&client=tw-ob&q=advanced",
            image: ""
        },
        {
            id: 6,
            name: "app",
            pronunciation: "/æp/",
            example: "I downloaded a new dictionary app on my phone.",
            type: "noun",
            meaning: "اپلیکیشن، برنامه کاربردی",
            audio: "https://translate.google.com/translate_tts?ie=UTF-8&tl=en&client=tw-ob&q=app",
            image: ""
        },
        {
            id: 7,
            name: "PC",
            pronunciation: "/ˌpiːˈsiː/",
            example: "I prefer working on a PC rather than a laptop.",
            type: "noun",
            meaning: "کامپیوتر شخصی",
            audio: "https://translate.google.com/translate_tts?ie=UTF-8&tl=en&client=tw-ob&q=PC",
            image: ""
        },
        {
            id: 8,
            name: "smart phone",
            pronunciation: "/ˈsmɑːt.fəʊn/",
            example: "Almost everyone has a smart phone nowadays.",
            type: "noun",
            meaning: "گوشی هوشمند",
            audio: "https://translate.google.com/translate_tts?ie=UTF-8&tl=en&client=tw-ob&q=smart+phone",
            image: ""
        },
        {
            id: 9,
            name: "wonder",
            pronunciation: "/ˈwʌn.dər/",
            example: "I wonder why he didn't come to school today.",
            type: "verb",
            meaning: "فکر کردن، با خود اندیشیدن (به همراه کنجکاوی)",
            audio: "https://translate.google.com/translate_tts?ie=UTF-8&tl=en&client=tw-ob&q=wonder",
            image: ""
        },
        {
            id: 10,
            name: "foreign",
            pronunciation: "/ˈfɒr.ən/",
            example: "Learning a foreign language takes time.",
            type: "adjective",
            meaning: "خارجی، بیگانه",
            audio: "https://translate.google.com/translate_tts?ie=UTF-8&tl=en&client=tw-ob&q=foreign",
            image: ""
        },
        {
            id: 11,
            name: "monolingual",
            pronunciation: "/ˌmɒn.əʊˈlɪŋ.ɡwəl/",
            example: "Using a monolingual dictionary is better for learners.",
            type: "adjective",
            meaning: "تک‌زبانه",
            audio: "https://translate.google.com/translate_tts?ie=UTF-8&tl=en&client=tw-ob&q=monolingual",
            image: ""
        },
        {
            id: 12,
            name: "bilingual",
            pronunciation: "/baɪˈlɪŋ.ɡwəl/",
            example: "She is bilingual in English and Persian.",
            type: "adjective",
            meaning: "دوزبانه",
            audio: "https://translate.google.com/translate_tts?ie=UTF-8&tl=en&client=tw-ob&q=bilingual",
            image: ""
        },
        {
            id: 13,
            name: "expensive",
            pronunciation: "/ɪkˈspen.sɪv/",
            example: "This leather bag is very expensive.",
            type: "adjective",
            meaning: "گران‌قیمت",
            audio: "https://translate.google.com/translate_tts?ie=UTF-8&tl=en&client=tw-ob&q=expensive",
            image: ""
        },
        {
            id: 14,
            name: "pocket dictionary",
            pronunciation: "/ˈpɒk.ɪt ˈdɪk.ʃən.ər.i/",
            example: "A pocket dictionary is easy to carry around.",
            type: "noun",
            meaning: "دیکشنری جیبی",
            audio: "https://translate.google.com/translate_tts?ie=UTF-8&tl=en&client=tw-ob&q=pocket+dictionary",
            image: ""
        },
        {
            id: 15,
            name: "by the way",
            pronunciation: "/baɪ ðə weɪ/",
            example: "By the way, did you finish your homework?",
            type: "idiom",
            meaning: "راستی، در ضمن",
            audio: "https://translate.google.com/translate_tts?ie=UTF-8&tl=en&client=tw-ob&q=by+the+way",
            image: ""
        },
        {
            id: 16,
            name: "contain",
            pronunciation: "/kənˈteɪn/",
            example: "This box contains old photos.",
            type: "verb",
            meaning: "شامل بودن، حاوی بودن",
            audio: "https://translate.google.com/translate_tts?ie=UTF-8&tl=en&client=tw-ob&q=contain",
            image: ""
        },
        {
            id: 17,
            name: "entry",
            pronunciation: "/ˈen.tri/",
            example: "How many entries does this dictionary have?",
            type: "noun",
            meaning: "کلمات داخل لغت‌نامه (مدخل)",
            audio: "https://translate.google.com/translate_tts?ie=UTF-8&tl=en&client=tw-ob&q=entry",
            image: ""
        },
        {
            id: 18,
            name: "symbol",
            pronunciation: "/ˈsɪm.bəl/",
            example: "The dove is a symbol of peace.",
            type: "noun",
            meaning: "نماد، نشانه",
            audio: "https://translate.google.com/translate_tts?ie=UTF-8&tl=en&client=tw-ob&q=symbol",
            image: ""
        },
        {
            id: 19,
            name: "stand for",
            pronunciation: "/stænd fɔːr/",
            example: "What does UN stand for? It stands for United Nations.",
            type: "phrasal verb",
            meaning: "دلالت داشتن بر، مخففِ ... بودن",
            audio: "https://translate.google.com/translate_tts?ie=UTF-8&tl=en&client=tw-ob&q=stand+for",
            image: ""
        },
        {
            id: 20,
            name: "figure out",
            pronunciation: "/ˈfɪɡ.ər aʊt/",
            example: "I can't figure out how to open this box.",
            type: "phrasal verb",
            meaning: "فهمیدن، سر در آوردن، حل کردن",
            audio: "https://translate.google.com/translate_tts?ie=UTF-8&tl=en&client=tw-ob&q=figure+out",
            image: ""
        },
        {
            id: 21,
            name: "combination",
            pronunciation: "/ˌkɒm.bɪˈneɪ.ʃən/",
            example: "The team was a great combination of youth and experience.",
            type: "noun",
            meaning: "ترکیب",
            audio: "https://translate.google.com/translate_tts?ie=UTF-8&tl=en&client=tw-ob&q=combination",
            image: ""
        },
        {
            id: 22,
            name: "introduction",
            pronunciation: "/ˌɪn.trəˈdʌk.ʃən/",
            example: "Please read the introduction of the book.",
            type: "noun",
            meaning: "مقدمه، معرفی",
            audio: "https://translate.google.com/translate_tts?ie=UTF-8&tl=en&client=tw-ob&q=introduction",
            image: ""
        },
        {
            id: 23,
            name: "effectively",
            pronunciation: "/ɪˈfek.tɪv.li/",
            example: "You need to use your time more effectively.",
            type: "adverb",
            meaning: "به طور مؤثر، به طور کارآمد",
            audio: "https://translate.google.com/translate_tts?ie=UTF-8&tl=en&client=tw-ob&q=effectively",
            image: ""
        },
        {
            id: 24,
            name: "arrange",
            pronunciation: "/əˈreɪndʒ/",
            example: "The books are arranged in alphabetical order.",
            type: "verb",
            meaning: "مرتب کردن، چیدن",
            audio: "https://translate.google.com/translate_tts?ie=UTF-8&tl=en&client=tw-ob&q=arrange",
            image: ""
        },
        {
            id: 25,
            name: "jump into",
            pronunciation: "/dʒʌmp ˈɪntuː/",
            example: "Don't jump into a decision without thinking first.",
            type: "phrasal verb",
            meaning: "شروع کردن ناگهانی کاری (شیرجه زدن درون کاری)",
            audio: "https://translate.google.com/translate_tts?ie=UTF-8&tl=en&client=tw-ob&q=jump+into",
            image: ""
        }

    ],

    // نمونه کلمات برای ویژن 3 - یونیت 3
    "u3": [
        {
            id: 1,
            name: "wind machine",
            pronunciation: "/wɪnd məˈʃiːn/",
            example: "In ancient times, people used a wind machine to grind wheat into flour.",
            type: "noun",
            meaning: "آسیاب بادی",
            audio: "https://translate.google.com/translate_tts?ie=UTF-8&tl=en&client=tw-ob&q=wind+machine",
            image: ""
        },
        {
            id: 2,
            name: "ancient",
            pronunciation: "/ˈeɪn.ʃənt/",
            example: "We saw the ruins of an ancient temple.",
            type: "adjective",
            meaning: "باستانی، کهن، بسیار قدیمی",
            audio: "https://translate.google.com/translate_tts?ie=UTF-8&tl=en&client=tw-ob&q=ancient",
            image: ""
        },
        {
            id: 3,
            name: "wind turbine",
            pronunciation: "/wɪnd ˈtɜː.baɪn/",
            example: "A single wind turbine can generate electricity for many homes.",
            type: "noun",
            meaning: "توربین بادی",
            audio: "https://translate.google.com/translate_tts?ie=UTF-8&tl=en&client=tw-ob&q=wind+turbine",
            image: ""
        },
        {
            id: 4,
            name: "produce",
            pronunciation: "/prəˈdʒuːs/",
            example: "The factory produces thousands of cars every year.",
            type: "verb",
            meaning: "تولید کردن",
            audio: "https://translate.google.com/translate_tts?ie=UTF-8&tl=en&client=tw-ob&q=produce",
            image: ""
        },
        {
            id: 5,
            name: "enough",
            pronunciation: "/ɪˈnʌf/",
            example: "Do we have enough bread for breakfast?",
            type: "adjective/adverb",
            meaning: "کافی، به اندازه کافی",
            audio: "https://translate.google.com/translate_tts?ie=UTF-8&tl=en&client=tw-ob&q=enough",
            image: ""
        },
        {
            id: 6,
            name: "renewable",
            pronunciation: "/rɪˈnjuː.ə.bəl/",
            example: "Wind and solar energy are renewable resources.",
            type: "adjective",
            meaning: "تجدیدپذیر",
            audio: "https://translate.google.com/translate_tts?ie=UTF-8&tl=en&client=tw-ob&q=renewable",
            image: ""
        },
        {
            id: 7,
            name: "resource",
            pronunciation: "/rɪˈzɔːs/",
            example: "Water is our most precious natural resource.",
            type: "noun",
            meaning: "منبع، ذخیره",
            audio: "https://translate.google.com/translate_tts?ie=UTF-8&tl=en&client=tw-ob&q=resource",
            image: ""
        },
        {
            id: 8,
            name: "fuel",
            pronunciation: "/fjuːəl/",
            example: "Wood was once the main fuel used for heating.",
            type: "noun/verb",
            meaning: "سوخت، سوخت‌رسانی کردن",
            audio: "https://translate.google.com/translate_tts?ie=UTF-8&tl=en&client=tw-ob&q=fuel",
            image: ""
        },
        {
            id: 9,
            name: "prize",
            pronunciation: "/praɪz/",
            example: "He won first prize in the school science competition.",
            type: "noun",
            meaning: "جایزه",
            audio: "https://translate.google.com/translate_tts?ie=UTF-8&tl=en&client=tw-ob&q=prize",
            image: ""
        },
        {
            id: 10,
            name: "solar power",
            pronunciation: "/ˈsəʊ.lər paʊ.ər/",
            example: "Many homes are now using solar power to heat water.",
            type: "noun",
            meaning: "انرژی خورشیدی",
            audio: "https://translate.google.com/translate_tts?ie=UTF-8&tl=en&client=tw-ob&q=solar+power",
            image: ""
        },
        {
            id: 11,
            name: "hydropower",
            pronunciation: "/ˈhaɪ.drəʊˌpaʊ.ər/",
            example: "Hydropower is electricity generated by moving water.",
            type: "noun",
            meaning: "انرژی برق‌آبی (انرژی هیدروالکتریک)",
            audio: "https://translate.google.com/translate_tts?ie=UTF-8&tl=en&client=tw-ob&q=hydropower",
            image: ""
        },
        {
            id: 12,
            name: "heat",
            pronunciation: "/hiːt/",
            example: "The sun provides us with light and heat.",
            type: "noun/verb",
            meaning: "گرما، گرم کردن",
            audio: "https://translate.google.com/translate_tts?ie=UTF-8&tl=en&client=tw-ob&q=heat",
            image: ""
        },
        {
            id: 13,
            name: "kinetic energy",
            pronunciation: "/kɪˈnet.ɪk ˈen.ə.dʒi/",
            example: "Any moving object has kinetic energy.",
            type: "noun",
            meaning: "انرژی جنبشی",
            audio: "https://translate.google.com/translate_tts?ie=UTF-8&tl=en&client=tw-ob&q=kinetic+energy",
            image: ""
        },
        {
            id: 14,
            name: "convert",
            pronunciation: "/kənˈvɜːt/",
            example: "Solar panels convert sunlight into electricity.",
            type: "verb",
            meaning: "تبدیل کردن",
            audio: "https://translate.google.com/translate_tts?ie=UTF-8&tl=en&client=tw-ob&q=convert",
            image: ""
        },
        {
            id: 15,
            name: "mechanical power",
            pronunciation: "/mɪˈkæn.ɪ.kəl paʊ.ər/",
            example: "Windmills use mechanical power to grind grain.",
            type: "noun",
            meaning: "نیروی مکانیکی، قدرت مکانیکی",
            audio: "https://translate.google.com/translate_tts?ie=UTF-8&tl=en&client=tw-ob&q=mechanical+power",
            image: ""
        },
        {
            id: 16,
            name: "dishwasher",
            pronunciation: "/ˈdɪʃˌwɒʃ.ər/",
            example: "We put all the dirty plates into the dishwasher.",
            type: "noun",
            meaning: "ماشین ظرفشویی",
            audio: "https://translate.google.com/translate_tts?ie=UTF-8&tl=en&client=tw-ob&q=dishwasher",
            image: ""
        },
        {
            id: 17,
            name: "cost",
            pronunciation: "/kɒst/",
            example: "How much did this new camera cost?",
            type: "noun/verb",
            meaning: "هزینه، هزینه داشتن، قیمت داشتن",
            audio: "https://translate.google.com/translate_tts?ie=UTF-8&tl=en&client=tw-ob&q=cost",
            image: ""
        },
        {
            id: 18,
            name: "generate",
            pronunciation: "/ˈdʒen.ə.reɪt/",
            example: "The wind turbines generate clean electricity.",
            type: "verb",
            meaning: "تولید کردن (نیرو، برق، ایده، درآمد)",
            audio: "https://translate.google.com/translate_tts?ie=UTF-8&tl=en&client=tw-ob&q=generate",
            image: ""
        },
        {
            id: 19,
            name: "opposite",
            pronunciation: "/ˈɒp.ə.zɪt/",
            example: "North is the opposite direction of South.",
            type: "noun/adjective",
            meaning: "مخالف، روبرو، برعکس",
            audio: "https://translate.google.com/translate_tts?ie=UTF-8&tl=en&client=tw-ob&q=opposite",
            image: ""
        },
        {
            id: 20,
            name: "blow",
            pronunciation: "/bləʊ/",
            example: "The strong wind blew my hat away.",
            type: "verb",
            meaning: "وزیدن، فوت کردن",
            audio: "https://translate.google.com/translate_tts?ie=UTF-8&tl=en&client=tw-ob&q=blow",
            image: ""
        },
        {
            id: 21,
            name: "remind",
            pronunciation: "/rɪˈmaɪnd/",
            example: "Please remind me to call my mom tonight.",
            type: "verb",
            meaning: "یادآوری کردن، به یاد کسی آوردن",
            audio: "https://translate.google.com/translate_tts?ie=UTF-8&tl=en&client=tw-ob&q=remind",
            image: ""
        },
        {
            id: 22,
            name: "air conditioner",
            pronunciation: "/ˈeə kənˌdɪʃ.ən.ər/",
            example: "We turned on the air conditioner because it was very hot.",
            type: "noun",
            meaning: "کولر، تهویه مطبوع",
            audio: "https://translate.google.com/translate_tts?ie=UTF-8&tl=en&client=tw-ob&q=air+conditioner",
            image: ""
        },
        {
            id: 23,
            name: "fan",
            pronunciation: "/fæn/",
            example: "It's a warm day, so please turn on the ceiling fan.",
            type: "noun",
            meaning: "پنکه (فن، بادبزن)",
            audio: "https://translate.google.com/translate_tts?ie=UTF-8&tl=en&client=tw-ob&q=fan",
            image: ""
        },
        {
            id: 24,
            name: "instead",
            pronunciation: "/ɪnˈsted/",
            example: "There is no tea, so I will have coffee instead.",
            type: "adverb",
            meaning: "در عوض، به جای آن",
            audio: "https://translate.google.com/translate_tts?ie=UTF-8&tl=en&client=tw-ob&q=instead",
            image: ""
        },
        {
            id: 25,
            name: "clean energy",
            pronunciation: "/kliːn ˈen.ə.dʒi/",
            example: "Wind power is a great source of clean energy.",
            type: "noun",
            meaning: "انرژی پاک",
            audio: "https://translate.google.com/translate_tts?ie=UTF-8&tl=en&client=tw-ob&q=clean+energy",
            image: ""
        },
        {
            id: 26,
            name: "pollute",
            pronunciation: "/pəˈluːt/",
            example: "Factories should not pollute our air and rivers.",
            type: "verb",
            meaning: "آلوده کردن",
            audio: "https://translate.google.com/translate_tts?ie=UTF-8&tl=en&client=tw-ob&q=pollute",
            image: ""
        },
        {
            id: 27,
            name: "consume",
            pronunciation: "/kənˈsjuːm/",
            example: "Electric cars consume less energy than traditional ones.",
            type: "verb",
            meaning: "مصرف کردن",
            audio: "https://translate.google.com/translate_tts?ie=UTF-8&tl=en&client=tw-ob&q=consume",
            image: ""
        },
        {
            id: 28,
            name: "balcony",
            pronunciation: "/ˈbæl.kə.ni/",
            example: "We can see the garden from our balcony.",
            type: "noun",
            meaning: "بالکن، تراس",
            audio: "https://translate.google.com/translate_tts?ie=UTF-8&tl=en&client=tw-ob&q=balcony",
            image: ""
        },
        {
            id: 29,
            name: "variety",
            pronunciation: "/vəˈraɪ.ə.ti/",
            example: "The shop sells a wide variety of fresh fruits.",
            type: "noun",
            meaning: "تنوع، گوناگونی",
            audio: "https://translate.google.com/translate_tts?ie=UTF-8&tl=en&client=tw-ob&q=variety",
            image: ""
        },
        {
            id: 30,
            name: "tide",
            pronunciation: "/taɪd/",
            example: "The high tide covered the sandy beach.",
            type: "noun",
            meaning: "جزر و مد",
            audio: "https://translate.google.com/translate_tts?ie=UTF-8&tl=en&client=tw-ob&q=tide",
            image: ""
        },
        {
            id: 31,
            name: "replace",
            pronunciation: "/rɪˈpleɪs/",
            example: "You must replace the old battery. Also, please replace the book on the shelf.",
            type: "verb",
            meaning: "جایگزین کردن / دوباره سر جای خود قرار دادن",
            audio: "https://translate.google.com/translate_tts?ie=UTF-8&tl=en&client=tw-ob&q=replace",
            image: ""
        },
        {
            id: 32,
            name: "used up",
            pronunciation: "/juːzd ʌp/",
            example: "All our resources will be used up if we are not careful.",
            type: "adjective/verb phrase",
            meaning: "تمام شده، ته کشیده، مصرف کردن تا انتها",
            audio: "https://translate.google.com/translate_tts?ie=UTF-8&tl=en&client=tw-ob&q=used+up",
            image: ""
        },
        {
            id: 33,
            name: "forever",
            pronunciation: "/fəˈrev.ər/",
            example: "Nothing lasts forever, so enjoy every moment.",
            type: "adverb",
            meaning: "برای همیشه، جاودانه",
            audio: "https://translate.google.com/translate_tts?ie=UTF-8&tl=en&client=tw-ob&q=forever",
            image: ""
        },
        {
            id: 34,
            name: "demand",
            pronunciation: "/dɪˈmɑːnd/",
            example: "There is a high demand for electricity in the summer.",
            type: "noun/verb",
            meaning: "تقاضا، تقاضا کردن، نیاز شدید",
            audio: "https://translate.google.com/translate_tts?ie=UTF-8&tl=en&client=tw-ob&q=demand",
            image: ""
        },
        {
            id: 35,
            name: "absorb",
            pronunciation: "/əbˈzɔːb/",
            example: "Plants absorb sunlight to make their own food.",
            type: "verb",
            meaning: "جذب کردن",
            audio: "https://translate.google.com/translate_tts?ie=UTF-8&tl=en&client=tw-ob&q=absorb",
            image: ""
        }

    ]
};