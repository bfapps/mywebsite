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
            audio: "https://translate.google.com/translate_tts?ie=UTF-8&tl=en&client=tw-ob&q=take+temperature",
            image: ""
        },
        {
            id: 3,
            name: "regard",
            pronunciation: "/rɪˈɡɑːrd/",
            example: "I regard him as my best friend.",
            type: "verb",
            meaning: "تلقی کردن، در نظر گرفتن",
            audio: "",
            image: ""
        },
        {
            id: 4,
            name: "dedicated",
            pronunciation: "/ˈded.ɪ.keɪ.tɪd/",
            example: "She is a dedicated teacher.",
            type: "adjective",
            meaning: "متعهد، دلسوز",
            audio: "",
            image: ""
        },
        {
            id: 5,
            name: "spare no pains",
            pronunciation: "/sper noʊ peɪnz/",
            example: "They spared no pains to help the poor.",
            type: "idiom",
            meaning: "از هیچ تلاشی دریغ نکردن",
            audio: "",
            image: ""
        },
        {
            id: 6,
            name: "distinguished",
            pronunciation: "/dɪˈstɪŋ.ɡwɪʃt/",
            example: "He is a distinguished scientist.",
            type: "adjective",
            meaning: "برجسته، ممتاز",
            audio: "",
            image: ""
        },
        {
            id: 7,
            name: "not surprisingly",
            pronunciation: "/nɒt səˈpraɪ.zɪŋ.li/",
            example: "Not surprisingly, he was late again.",
            type: "adverb",
            meaning: "جای تعجب نیست که",
            audio: "",
            image: ""
        },
        {
            id: 8,
            name: "found",
            pronunciation: "/faʊnd/",
            example: "They want to found a new school.",
            type: "verb",
            meaning: "تأسیس کردن",
            audio: "",
            image: ""
        },
        {
            id: 9,
            name: "receive",
            pronunciation: "/rɪˈsiːv/",
            example: "I want to receive a letter from you.",
            type: "verb",
            meaning: "دریافت کردن",
            audio: "",
            image: ""
        },
        {
            id: 10,
            name: "abroad",
            pronunciation: "/əˈbrɔːd/",
            example: "My brother lives abroad.",
            type: "adverb",
            meaning: "خارج از کشور",
            audio: "",
            image: ""
        },
        {
            id: 11,
            name: "cure",
            pronunciation: "/kjʊər/",
            example: "The doctor can cure this illness.",
            type: "verb",
            meaning: "درمان کردن",
            audio: "",
            image: ""
        },
        {
            id: 12,
            name: "regarded as",
            pronunciation: "/rɪˈɡɑːrdɪd əz/",
            example: "He is regarded as a hero.",
            type: "verb phrase",
            meaning: "به عنوان ... تلقی شدن",
            audio: "",
            image: ""
        },
        {
            id: 13,
            name: "It's a pity!",
            pronunciation: "/ɪts ə ˈpɪt.i/",
            example: "It's a pity that you can't come.",
            type: "exclamation",
            meaning: "حیف شد!",
            audio: "",
            image: ""
        },
        {
            id: 14,
            name: "disease",
            pronunciation: "/dɪˈziːz/",
            example: "He has a serious disease.",
            type: "noun",
            meaning: "بیماری",
            audio: "",
            image: ""
        },
        {
            id: 15,
            name: "sofa",
            pronunciation: "/ˈsəʊ.fə/",
            example: "We sit on the sofa and watch TV.",
            type: "noun",
            meaning: "مبل",
            audio: "",
            image: ""
        },
        {
            id: 16,
            name: "pigeon",
            pronunciation: "/ˈpɪdʒ.ən/",
            example: "I saw a pigeon in the park.",
            type: "noun",
            meaning: "کبوتر",
            audio: "",
            image: ""
        },
        {
            id: 17,
            name: "shouted",
            pronunciation: "/ˈʃaʊ.tɪd/",
            example: "He shouted when he was happy.",
            type: "verb",
            meaning: "فریاد زد",
            audio: "",
            image: ""
        },
        {
            id: 18,
            name: "hard of hearing",
            pronunciation: "/hɑːrd əv ˈhɪr.ɪŋ/",
            example: "My grandfather is a bit hard of hearing.",
            type: "adjective",
            meaning: "کم‌شنوا",
            audio: "",
            image: ""
        },
        {
            id: 19,
            name: "was born",
            pronunciation: "/wɒz bɔːrn/",
            example: "I was born in Iran.",
            type: "verb phrase",
            meaning: "متولد شد",
            audio: "",
            image: ""
        },
        {
            id: 20,
            name: "hug",
            pronunciation: "/hʌɡ/",
            example: "Give me a big hug!",
            type: "verb/noun",
            meaning: "بغل کردن، آغوش",
            audio: "",
            image: ""
        },
        {
            id: 21,
            name: "lap",
            pronunciation: "/læp/",
            example: "The cat sat on my lap.",
            type: "noun",
            meaning: "دامان، زانو",
            audio: "",
            image: ""
        },
        {
            id: 22,
            name: "burst into tears",
            pronunciation: "/bɜːrst ˈɪntə tɪərz/",
            example: "She burst into tears when she heard the news.",
            type: "verb phrase",
            meaning: "ناگهان به گریه افتادن",
            audio: "",
            image: ""
        },
        {
            id: 23,
            name: "repeatedly",
            pronunciation: "/rɪˈpiː.tɪd.li/",
            example: "He called me repeatedly.",
            type: "adverb",
            meaning: "مکرراً، بارها",
            audio: "",
            image: ""
        },
        {
            id: 24,
            name: "forgive",
            pronunciation: "/fəˈɡɪv/",
            example: "Please forgive me for being late.",
            type: "verb",
            meaning: "بخشیدن",
            audio: "",
            image: ""
        },
        {
            id: 25,
            name: "calmly",
            pronunciation: "/ˈkɑːm.li/",
            example: "She spoke very calmly.",
            type: "adverb",
            meaning: "با آرامش",
            audio: "",
            image: ""
        },
        {
            id: 26,
            name: "diary",
            pronunciation: "/ˈdaɪə.ri/",
            example: "I write in my diary every night.",
            type: "noun",
            meaning: "دفتر خاطرات",
            audio: "",
            image: ""
        }
    ],

    // نمونه کلمات برای ویژن 3 - یونیت 2
    "u2": [

    ],

    // نمونه کلمات برای ویژن 3 - یونیت 3
    "u3": [

    ]
};