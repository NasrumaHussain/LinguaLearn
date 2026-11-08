import { useState } from "react";
import "./VocabularyPage.css";
import QuizPage from "./QuizPage";

function VocabularyPage({ language, lesson, onBack,
   onComplete, savedWords, onToggleSave}) {

   const vocabulary = {
    Korean: { 
      Greetings: [
        {
          word: "안녕하세요",
          pronunciation: "Annyeonghaseyo",
          meaning: "Hello",
          exampleSentence: "안녕하세요? 저는 민지예요.",
          sentencePronunciation: "Annyeonghaseyo? Jeoneun Minji-yeyo.",
          sentenceMeaning: "Hello! I'm Minji."
        },
        {
          word: "감사합니다",
          pronunciation: "Gamsahamnida",
          meaning: "Thank you",
          exampleSentence: "도와주셔서 감사합니다.",
          sentencePronunciation: "Dowajusyeoseo gamsahamnida.",
          sentenceMeaning: "Thank you for helping me."
        },
        {
          word: "네",
          pronunciation: "Ne",
          meaning: "Yes",
          exampleSentence: "네, 알겠습니다.",
          sentencePronunciation: "Ne, algesseumnida.",
          sentenceMeaning: "Yes, I understand."
        },
        {
          word: "안녕",
          pronunciation: "Annyeong",
          meaning: "Hi",
          exampleSentence: "안녕! 내일 봐.",
          sentencePronunciation: "Annyeong! Naeil bwa.",
          sentenceMeaning: "Hi! See you tomorrow."
        },
        {
          word: "죄송합니다",
          pronunciation: "Joesonghamnida",
          meaning: "Sorry",
          exampleSentence: "늦어서 죄송합니다.",
          sentencePronunciation: "Neujeoseo joesonghamnida.",
          sentenceMeaning: "I'm sorry I'm late."
        },
        {
          word: "좋은 아침",
          pronunciation: "Joeun achim",
          meaning: "Good morning",
          exampleSentence: "좋은 아침이에요. 잘 잤어요?",
          sentencePronunciation: "Joeun achimieyo. Jal jasseoyo?",
          sentenceMeaning: "Good morning. Did you sleep well?"
        }
      ],
      "Basic Words": [
        {
          word: "물",
          pronunciation: "Mul",
          meaning: "Water",
          exampleSentence: "물 좀 주세요.",
          sentencePronunciation: "Mul jom juseyo.",
          sentenceMeaning: "Please give me some water."
        },
        {
          word: "책",
          pronunciation: "Chaek",
          meaning: "Book",
          exampleSentence: "저는 책을 읽어요.",
          sentencePronunciation: "Jeoneun chaegeul ilgeoyo.",
          sentenceMeaning: "I read books."
        },
        {
          word: "친구",
          pronunciation: "Chingu",
          meaning: "Friend",
          exampleSentence: "친구를 만났어요.",
          sentencePronunciation: "Chingureul mannasseoyo.",
          sentenceMeaning: "I met my friend."
        },
        {
          word: "음식",
          pronunciation: "Eumsik",
          meaning: "Food",
          exampleSentence: "이 음식은 정말 맛있어요.",
          sentencePronunciation: "I eumsigeun jeongmal masisseoyo.",
          sentenceMeaning: "This food is really delicious."
        },
        {
          word: "학교",
          pronunciation: "Hakgyo",
          meaning: "School",
          exampleSentence: "저는 학교에 가요.",
          sentencePronunciation: "Jeoneun hakgyoe gayo.",
          sentenceMeaning: "I go to school."
        },
        {
          word: "집",
          pronunciation: "Jip",
          meaning: "Home",
          exampleSentence: "저는 집에 있어요.",
          sentencePronunciation: "Jeoneun jibe isseoyo.",
          sentenceMeaning: "I am at home."
        }
      ],
      Numbers: [
        {
          word: "하나",
          pronunciation: "Hana",
          meaning: "One",
          exampleSentence: "하나만 주세요.",
          sentencePronunciation: "Hanaman juseyo.",
          sentenceMeaning: "Please give me just one."
        },
        {
          word: "둘",
          pronunciation: "Dul",
          meaning: "Two",
          exampleSentence: "둘 다 좋아요.",
          sentencePronunciation: "Dul da joayo.",
          sentenceMeaning: "I like both."
        },
        {
          word: "셋",
          pronunciation: "Set",
          meaning: "Three",
          exampleSentence: "셋이서 같이 갔어요.",
          sentencePronunciation: "Sesiseo gachi gasseoyo.",
          sentenceMeaning: "The three of us went together."
        },
        {
          word: "넷",
          pronunciation: "Net",
          meaning: "Four",
          exampleSentence: "넷이서 사진을 찍었어요.",
          sentencePronunciation: "Nesiseo sajineul jjigeosseoyo.",
          sentenceMeaning: "The four of us took a photo."
        },
        {
          word: "다섯",
          pronunciation: "Daseot",
          meaning: "Five",
          exampleSentence: "다섯 명이 왔어요.",
          sentencePronunciation: "Daseot myeongi wasseoyo.",
          sentenceMeaning: "Five people came."
        },
        {
          word: "여섯",
          pronunciation: "Yeoseot",
          meaning: "Six",
          exampleSentence: "여섯 시에 만나요.",
          sentencePronunciation: "Yeoseot sie mannayo.",
          sentenceMeaning: "Let's meet at six o'clock."
        }
      ],
    },

    Bangla: {
      Greetings: [
        {
          word: "হ্যালো",
          pronunciation: "Hello",
          meaning: "Hello",
          exampleSentence: "হ্যালো, আপনি কেমন আছেন?",
          sentencePronunciation: "Hello, apni kemon achhen?",
          sentenceMeaning: "Hello, how are you?"
        },
        {
          word: "ধন্যবাদ",
          pronunciation: "Dhonnobad",
          meaning: "Thank you",
          exampleSentence: "আমাকে সাহায্য করার জন্য ধন্যবাদ।",
          sentencePronunciation: "Amake shahajjo korar jonno dhonnobad.",
          sentenceMeaning: "Thank you for helping me."
        },
        {
          word: "হ্যাঁ",
          pronunciation: "Hya",
          meaning: "Yes",
          exampleSentence: "হ্যাঁ, আমি আসছি।",
          sentencePronunciation: "Hya, ami ashchhi.",
          sentenceMeaning: "Yes, I'm coming."
        },
        {
          word: "সুপ্রভাত",
          pronunciation: "Shuprobhat",
          meaning: "Good morning",
          exampleSentence: "সুপ্রভাত, আপনার দিনটি ভালো কাটুক।",
          sentencePronunciation: "Shuprobhat, apnar dintি bhalo katuk.",
          sentenceMeaning: "Good morning, have a nice day."
        },
        {
          word: "দুঃখিত",
          pronunciation: "Dukhkhito",
          meaning: "Sorry",
          exampleSentence: "দেরি করার জন্য দুঃখিত।",
          sentencePronunciation: "Deri korar jonno dukhkhito.",
          sentenceMeaning: "I'm sorry for being late."
        },
        {
          word: "বিদায়",
          pronunciation: "Biday",
          meaning: "Goodbye",
          exampleSentence: "বিদায়, আবার দেখা হবে।",
          sentencePronunciation: "Biday, abar dekha hobe.",
          sentenceMeaning: "Goodbye, see you again."
        }
      ],
      "Basic Words": [
        {
          word: "পানি",
          pronunciation: "Pani",
          meaning: "Water",
          exampleSentence: "আমাকে একটু পানি দিন।",
          sentencePronunciation: "Amake ektu pani din.",
          sentenceMeaning: "Please give me some water."
        },
        {
          word: "বই",
          pronunciation: "Boi",
          meaning: "Book",
          exampleSentence: "আমি একটি বই পড়ছি।",
          sentencePronunciation: "Ami ekti boi porchhi.",
          sentenceMeaning: "I am reading a book."
        },
        {
          word: "বন্ধু",
          pronunciation: "Bondhu",
          meaning: "Friend",
          exampleSentence: "আমার বন্ধু আজ আসবে।",
          sentencePronunciation: "Amar bondhu aj ashbe.",
          sentenceMeaning: "My friend will come today."
        },
        {
          word: "খাবার",
          pronunciation: "Khabar",
          meaning: "Food",
          exampleSentence: "খাবারটা খুব সুস্বাদু।",
          sentencePronunciation: "Khabarta khub shushadu.",
          sentenceMeaning: "The food is very delicious."
        },
        {
          word: "স্কুল",
          pronunciation: "School",
          meaning: "School",
          exampleSentence: "আমি প্রতিদিন স্কুলে যাই।",
          sentencePronunciation: "Ami protidin schoole jai.",
          sentenceMeaning: "I go to school every day."
        },
        {
          word: "বাড়ি",
          pronunciation: "Bari",
          meaning: "Home",
          exampleSentence: "আমি এখন বাড়ি যাচ্ছি।",
          sentencePronunciation: "Ami ekhon bari jachchhi.",
          sentenceMeaning: "I am going home now."
        }
      ],
      Numbers: [
        {
          word: "এক",
          pronunciation: "Ek",
          meaning: "One",
          exampleSentence: "এক মিনিট অপেক্ষা করুন।",
          sentencePronunciation: "Ek minute opekkha korun.",
          sentenceMeaning: "Please wait one minute."
        },
        {
          word: "দুই",
          pronunciation: "Dui",
          meaning: "Two",
          exampleSentence: "আমার দুই ভাই আছে।",
          sentencePronunciation: "Amar dui bhai achhe.",
          sentenceMeaning: "I have two brothers."
        },
        {
          word: "তিন",
          pronunciation: "Tin",
          meaning: "Three",
          exampleSentence: "আমরা তিনজন একসঙ্গে যাব।",
          sentencePronunciation: "Amra tinjon eksathe jabo.",
          sentenceMeaning: "The three of us will go together."
        },
        {
          word: "চার",
          pronunciation: "Char",
          meaning: "Four",
          exampleSentence: "চারজন বন্ধু এসেছে।",
          sentencePronunciation: "Charjon bondhu eshechhe.",
          sentenceMeaning: "Four friends have arrived."
        },
        {
          word: "পাঁচ",
          pronunciation: "Panch",
          meaning: "Five",
          exampleSentence: "পাঁচ মিনিট অপেক্ষা করুন।",
          sentencePronunciation: "Panch minute opekkha korun.",
          sentenceMeaning: "Please wait five minutes."
        },
        {
          word: "ছয়",
          pronunciation: "Chhoy",
          meaning: "Six",
          exampleSentence: "এখন ছয়টা বাজে।",
          sentencePronunciation: "Ekhon chhoyta baje.",
          sentenceMeaning: "It is six o'clock now."
        }
      ]
    },

     Japanese: {
      Greetings: [
        {
          word: "こんにちは",
          pronunciation: "Konnichiwa",
          meaning: "Hello",
          exampleSentence: "こんにちは、元気ですか。",
          sentencePronunciation: "Konnichiwa, genki desu ka.",
          sentenceMeaning: "Hello, how are you?"
        },
        {
          word: "ありがとう",
          pronunciation: "Arigatou",
          meaning: "Thank you",
          exampleSentence: "手伝ってくれてありがとう。",
          sentencePronunciation: "Tetsudatte kurete arigatou.",
          sentenceMeaning: "Thank you for helping me."
        },
        {
          word: "はい",
          pronunciation: "Hai",
          meaning: "Yes",
          exampleSentence: "はい、わかりました。",
          sentencePronunciation: "Hai, wakarimashita.",
          sentenceMeaning: "Yes, I understand."
        },
        {
          word: "おはよう",
          pronunciation: "Ohayou",
          meaning: "Good morning",
          exampleSentence: "おはようございます。よく眠れましたか。",
          sentencePronunciation: "Ohayou gozaimasu. Yoku nemuremashita ka.",
          sentenceMeaning: "Good morning. Did you sleep well?"
        },
        {
          word: "すみません",
          pronunciation: "Sumimasen",
          meaning: "Excuse me",
          exampleSentence: "すみません、駅はどこですか。",
          sentencePronunciation: "Sumimasen, eki wa doko desu ka.",
          sentenceMeaning: "Excuse me, where is the station?"
        },
        {
          word: "お願いします",
          pronunciation: "Onegaishimasu",
          meaning: "Please",
          exampleSentence: "これをお願いします。",
          sentencePronunciation: "Kore o onegaishimasu.",
          sentenceMeaning: "This one, please."
        }
      ],

      "Basic Words": [
        {
          word: "水",
          pronunciation: "Mizu",
          meaning: "Water",
          exampleSentence: "水をください。",
          sentencePronunciation: "Mizu o kudasai.",
          sentenceMeaning: "Please give me some water."
        },
        {
          word: "本",
          pronunciation: "Hon",
          meaning: "Book",
          exampleSentence: "この本はおもしろいです。",
          sentencePronunciation: "Kono hon wa omoshiroi desu.",
          sentenceMeaning: "This book is interesting."
        },
        {
          word: "友達",
          pronunciation: "Tomodachi",
          meaning: "Friend",
          exampleSentence: "友達と映画を見ます。",
          sentencePronunciation: "Tomodachi to eiga o mimasu.",
          sentenceMeaning: "I watch a movie with my friend."
        },
        {
          word: "食べ物",
          pronunciation: "Tabemono",
          meaning: "Food",
          exampleSentence: "日本の食べ物が好きです。",
          sentencePronunciation: "Nihon no tabemono ga suki desu.",
          sentenceMeaning: "I like Japanese food."
        },
        {
          word: "学校",
          pronunciation: "Gakkou",
          meaning: "School",
          exampleSentence: "毎日学校に行きます。",
          sentencePronunciation: "Mainichi gakkou ni ikimasu.",
          sentenceMeaning: "I go to school every day."
        },
        {
          word: "家",
          pronunciation: "Ie",
          meaning: "Home",
          exampleSentence: "今、家にいます。",
          sentencePronunciation: "Ima, ie ni imasu.",
          sentenceMeaning: "I am at home now."
        }
      ],

      Numbers: [
        {
          word: "一",
          pronunciation: "Ichi",
          meaning: "One",
          exampleSentence: "一から始めましょう。",
          sentencePronunciation: "Ichi kara hajimemashou.",
          sentenceMeaning: "Let's start from one."
        },
        {
          word: "二",
          pronunciation: "Ni",
          meaning: "Two",
          exampleSentence: "二番のバスに乗ります。",
          sentencePronunciation: "Niban no basu ni norimasu.",
          sentenceMeaning: "I will take bus number two."
        },
        {
          word: "三",
          pronunciation: "San",
          meaning: "Three",
          exampleSentence: "三時に会いましょう。",
          sentencePronunciation: "Sanji ni aimashou.",
          sentenceMeaning: "Let's meet at three o'clock."
        },
        {
          word: "四",
          pronunciation: "Yon",
          meaning: "Four",
          exampleSentence: "四番の席です。",
          sentencePronunciation: "Yonban no seki desu.",
          sentenceMeaning: "It is seat number four."
        },
        {
          word: "五",
          pronunciation: "Go",
          meaning: "Five",
          exampleSentence: "五分待ってください。",
          sentencePronunciation: "Gofun matte kudasai.",
          sentenceMeaning: "Please wait five minutes."
        },
        {
          word: "六",
          pronunciation: "Roku",
          meaning: "Six",
          exampleSentence: "六時に起きます。",
          sentencePronunciation: "Rokuji ni okimasu.",
          sentenceMeaning: "I wake up at six o'clock."
        }
      ]
    },

      Hindi: {
      Greetings: [
        {
          word: "नमस्ते",
          pronunciation: "Namaste",
          meaning: "Hello",
          exampleSentence: "नमस्ते, आप कैसे हैं?",
          sentencePronunciation: "Namaste, aap kaise hain?",
          sentenceMeaning: "Hello, how are you?"
        },
        {
          word: "धन्यवाद",
          pronunciation: "Dhanyavaad",
          meaning: "Thank you",
          exampleSentence: "आपकी मदद के लिए धन्यवाद।",
          sentencePronunciation: "Aapki madad ke liye dhanyavaad.",
          sentenceMeaning: "Thank you for your help."
        },
        {
          word: "अलविदा",
          pronunciation: "Alvida",
          meaning: "Goodbye",
          exampleSentence: "अलविदा, फिर मिलेंगे।",
          sentencePronunciation: "Alvida, phir milenge.",
          sentenceMeaning: "Goodbye, see you again."
        },
        {
          word: "सुप्रभात",
          pronunciation: "Suprabhaat",
          meaning: "Good morning",
          exampleSentence: "सुप्रभात, आपका दिन अच्छा हो।",
          sentencePronunciation: "Suprabhaat, aapka din achha ho.",
          sentenceMeaning: "Good morning, have a nice day."
        },
        {
          word: "माफ़ कीजिए",
          pronunciation: "Maaf kijiye",
          meaning: "Sorry",
          exampleSentence: "माफ़ कीजिए, मुझे देर हो गई।",
          sentencePronunciation: "Maaf kijiye, mujhe der ho gayi.",
          sentenceMeaning: "I'm sorry, I got late."
        },
        {
          word: "कृपया",
          pronunciation: "Kripaya",
          meaning: "Please",
          exampleSentence: "कृपया दरवाज़ा खोलिए।",
          sentencePronunciation: "Kripaya darwaza kholiye.",
          sentenceMeaning: "Please open the door."
        }
      ],

      "Basic Words": [
        {
          word: "पानी",
          pronunciation: "Paani",
          meaning: "Water",
          exampleSentence: "मुझे पानी चाहिए।",
          sentencePronunciation: "Mujhe paani chahiye.",
          sentenceMeaning: "I need water."
        },
        {
          word: "किताब",
          pronunciation: "Kitaab",
          meaning: "Book",
          exampleSentence: "मैं एक किताब पढ़ रहा हूँ।",
          sentencePronunciation: "Main ek kitaab padh raha hoon.",
          sentenceMeaning: "I am reading a book."
        },
        {
          word: "दोस्त",
          pronunciation: "Dost",
          meaning: "Friend",
          exampleSentence: "मेरा दोस्त बहुत अच्छा है।",
          sentencePronunciation: "Mera dost bahut achha hai.",
          sentenceMeaning: "My friend is very nice."
        },
        {
          word: "खाना",
          pronunciation: "Khaana",
          meaning: "Food",
          exampleSentence: "मुझे भारतीय खाना पसंद है।",
          sentencePronunciation: "Mujhe Bharatiya khaana pasand hai.",
          sentenceMeaning: "I like Indian food."
        },
        {
          word: "स्कूल",
          pronunciation: "School",
          meaning: "School",
          exampleSentence: "बच्चे स्कूल जा रहे हैं।",
          sentencePronunciation: "Bachche school ja rahe hain.",
          sentenceMeaning: "The children are going to school."
        },
        {
          word: "घर",
          pronunciation: "Ghar",
          meaning: "Home",
          exampleSentence: "मैं घर पर हूँ।",
          sentencePronunciation: "Main ghar par hoon.",
          sentenceMeaning: "I am at home."
        }
      ],

      Numbers: [
        {
          word: "एक",
          pronunciation: "Ek",
          meaning: "One",
          exampleSentence: "मुझे एक गिलास पानी चाहिए।",
          sentencePronunciation: "Mujhe ek gilaas paani chahiye.",
          sentenceMeaning: "I need one glass of water."
        },
        {
          word: "दो",
          pronunciation: "Do",
          meaning: "Two",
          exampleSentence: "मेरे दो दोस्त हैं।",
          sentencePronunciation: "Mere do dost hain.",
          sentenceMeaning: "I have two friends."
        },
        {
          word: "तीन",
          pronunciation: "Teen",
          meaning: "Three",
          exampleSentence: "मैं तीन बजे आऊँगा।",
          sentencePronunciation: "Main teen baje aaunga.",
          sentenceMeaning: "I will come at three o'clock."
        },
        {
          word: "चार",
          pronunciation: "Chaar",
          meaning: "Four",
          exampleSentence: "हम चार लोग हैं।",
          sentencePronunciation: "Hum chaar log hain.",
          sentenceMeaning: "There are four of us."
        },
        {
          word: "पाँच",
          pronunciation: "Paanch",
          meaning: "Five",
          exampleSentence: "मुझे पाँच मिनट दीजिए।",
          sentencePronunciation: "Mujhe paanch minute dijiye.",
          sentenceMeaning: "Please give me five minutes."
        },
        {
          word: "छह",
          pronunciation: "Chhah",
          meaning: "Six",
          exampleSentence: "अभी छह बजे हैं।",
          sentencePronunciation: "Abhi chhah baje hain.",
          sentenceMeaning: "It is six o'clock now."
        }
      ]
    },
      "Chinese (Mandarin)": {
      Greetings: [
        {
          word: "你好",
          pronunciation: "Nǐ hǎo",
          meaning: "Hello",
          exampleSentence: "你好，很高兴认识你。",
          sentencePronunciation: "Nǐ hǎo, hěn gāoxìng rènshi nǐ.",
          sentenceMeaning: "Hello, nice to meet you."
        },
        {
          word: "谢谢",
          pronunciation: "Xièxie",
          meaning: "Thank you",
          exampleSentence: "谢谢你的帮助。",
          sentencePronunciation: "Xièxie nǐ de bāngzhù.",
          sentenceMeaning: "Thank you for your help."
        },
        {
          word: "再见",
          pronunciation: "Zàijiàn",
          meaning: "Goodbye",
          exampleSentence: "再见，明天见。",
          sentencePronunciation: "Zàijiàn, míngtiān jiàn.",
          sentenceMeaning: "Goodbye, see you tomorrow."
        },
        {
          word: "早上好",
          pronunciation: "Zǎoshang hǎo",
          meaning: "Good morning",
          exampleSentence: "早上好，你睡得好吗？",
          sentencePronunciation: "Zǎoshang hǎo, nǐ shuì de hǎo ma?",
          sentenceMeaning: "Good morning, did you sleep well?"
        },
        {
          word: "对不起",
          pronunciation: "Duìbuqǐ",
          meaning: "Sorry",
          exampleSentence: "对不起，我来晚了。",
          sentencePronunciation: "Duìbuqǐ, wǒ lái wǎn le.",
          sentenceMeaning: "Sorry, I'm late."
        },
        {
          word: "请",
          pronunciation: "Qǐng",
          meaning: "Please",
          exampleSentence: "请给我一杯水。",
          sentencePronunciation: "Qǐng gěi wǒ yì bēi shuǐ.",
          sentenceMeaning: "Please give me a glass of water."
        }
      ],

      "Basic Words": [
        {
          word: "水",
          pronunciation: "Shuǐ",
          meaning: "Water",
          exampleSentence: "我想喝水。",
          sentencePronunciation: "Wǒ xiǎng hē shuǐ.",
          sentenceMeaning: "I want to drink water."
        },
        {
          word: "书",
          pronunciation: "Shū",
          meaning: "Book",
          exampleSentence: "这本书很好看。",
          sentencePronunciation: "Zhè běn shū hěn hǎokàn.",
          sentenceMeaning: "This book is very interesting."
        },
        {
          word: "朋友",
          pronunciation: "Péngyou",
          meaning: "Friend",
          exampleSentence: "我的朋友住在这里。",
          sentencePronunciation: "Wǒ de péngyou zhù zài zhèlǐ.",
          sentenceMeaning: "My friend lives here."
        },
        {
          word: "食物",
          pronunciation: "Shíwù",
          meaning: "Food",
          exampleSentence: "这些食物很好吃。",
          sentencePronunciation: "Zhèxiē shíwù hěn hǎochī.",
          sentenceMeaning: "This food is delicious."
        },
        {
          word: "学校",
          pronunciation: "Xuéxiào",
          meaning: "School",
          exampleSentence: "我每天去学校。",
          sentencePronunciation: "Wǒ měitiān qù xuéxiào.",
          sentenceMeaning: "I go to school every day."
        },
        {
          word: "家",
          pronunciation: "Jiā",
          meaning: "Home",
          exampleSentence: "我现在在家。",
          sentencePronunciation: "Wǒ xiànzài zài jiā.",
          sentenceMeaning: "I am at home now."
        }
      ],

      Numbers: [
        {
          word: "一",
          pronunciation: "Yī",
          meaning: "One",
          exampleSentence: "我有一个弟弟。",
          sentencePronunciation: "Wǒ yǒu yí ge dìdi.",
          sentenceMeaning: "I have one younger brother."
        },
        {
          word: "二",
          pronunciation: "Èr",
          meaning: "Two",
          exampleSentence: "现在是两点。",
          sentencePronunciation: "Xiànzài shì liǎng diǎn.",
          sentenceMeaning: "It is two o'clock now."
        },
        {
          word: "三",
          pronunciation: "Sān",
          meaning: "Three",
          exampleSentence: "我们三个人一起去。",
          sentencePronunciation: "Wǒmen sān ge rén yìqǐ qù.",
          sentenceMeaning: "The three of us are going together."
        },
        {
          word: "四",
          pronunciation: "Sì",
          meaning: "Four",
          exampleSentence: "我四点回家。",
          sentencePronunciation: "Wǒ sì diǎn huí jiā.",
          sentenceMeaning: "I will go home at four o'clock."
        },
        {
          word: "五",
          pronunciation: "Wǔ",
          meaning: "Five",
          exampleSentence: "请等我五分钟。",
          sentencePronunciation: "Qǐng děng wǒ wǔ fēnzhōng.",
          sentenceMeaning: "Please wait for me for five minutes."
        },
        {
          word: "六",
          pronunciation: "Liù",
          meaning: "Six",
          exampleSentence: "我六点起床。",
          sentencePronunciation: "Wǒ liù diǎn qǐchuáng.",
          sentenceMeaning: "I wake up at six o'clock."
        }
      ]
    },
  };

  const languageVocabulary = vocabulary[language] || vocabulary.Korean;
  const words = languageVocabulary[lesson] || languageVocabulary.Greetings;
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentWord, setCurrentWord] = useState(0);
  const word = words[currentWord];

    const isSaved = savedWords.some(
      (item) => 
        item.word === word.word &&
        item.language === language &&
        item.lesson === lesson 
    );

  if (showQuiz) {
  return (
    <QuizPage
      language={language}
      lesson={lesson}
      onBack={() => setShowQuiz(false)}
    />
  );
}

  return (
    <div className="vocabulary-page">
      <button className="vocabulary-back" onClick={onBack}>
        ← Back to Lessons
      </button>

      <p className="vocabulary-label">{language} · BEGINNER</p>
      <h1>{lesson}</h1>
      <p className="vocabulary-intro">
        Learn each word, read its pronunciation, and discover its meaning.
      </p>

      <div className="vocabulary-selector">
        <div className="selector-heading">
          <h3>Explore Vocabulary</h3>
          <span>{words.length} words</span>
        </div>

        <div className="word-list">
          {words.map((item, index) => (
            <button
              key={`${item.word}-${index}`}
              className={`word-select-button ${
                currentWord === index ? "active" : ""
              }`}
              onClick={() => setCurrentWord(index)}
            >
              {item.word}
            </button>
          ))}
        </div>
      </div>

      <div className="vocabulary-card">
        <p className="word-counter">
          Word {currentWord + 1} of {words.length}
        </p>

        <h2>{word.word}</h2>
        <p className="pronunciation">{word.pronunciation}</p>

        <button className="save-word-button"
        onClick={() => onToggleSave({
          ...word, language, lesson
            })
          }
        >
          {isSaved ? "♥ Saved" : "♡ Save Word"}
        </button>

        <div className="meaning-box">
          <div className="meaning-box">
            <span>Meaning</span>
            <h3>{word.meaning}</h3>
          </div>
          {word.exampleSentence && (
          <div className="example-sentence-box">
            <p className="example-label">IN A SENTENCE</p>

            <h3>{word.exampleSentence}</h3>

            <p className="example-pronunciation">
              {word.sentencePronunciation}
            </p>

            <p className="example-translation">
              {word.sentenceMeaning}
            </p>
          </div>
        )}
        </div>

        <div className="word-navigation">
          <button
            disabled={currentWord === 0}
            onClick={() => setCurrentWord(currentWord - 1)}
          >
            Previous
          </button>

          <button
            onClick={() =>
              setCurrentWord((currentWord + 1) % words.length)
            }
          >
            {currentWord === words.length - 1 ? "Start Again ↻" : "Next Word →"}
          </button>
        </div>

            <button
              className="lesson-complete-button"
              onClick={() => setShowQuiz(true)}>
              Take Vocabulary Quiz →
            </button>

            <button
              className="lesson-complete-button"
              onClick={() => {
              onComplete();
              onBack();}}>
              Mark Lesson Complete ✓
            </button>
        
      </div>
    </div>
  );
}

export default VocabularyPage;
