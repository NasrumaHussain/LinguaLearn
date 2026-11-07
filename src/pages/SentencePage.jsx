import { useState } from "react";
import "./SentencePage.css";

function SentencePage({ language, onBack, onPractice }) {
  const [selectedLanguage, setSelectedLanguage] = useState(language || "Korean");
  const [selectedCategory, setSelectedCategory] = useState("All");

  
const sentences = {
  Korean: [
    // Daily Conversations
    { sentence: "뭐 하고 있어요?", pronunciation: "Mwo hago isseoyo?", meaning: "What are you doing?", category: "Daily Conversations" },
    { sentence: "오늘 뭐 해요?", pronunciation: "Oneul mwo haeyo?", meaning: "What are you doing today?", category: "Daily Conversations" },
    { sentence: "지금 어디예요?", pronunciation: "Jigeum eodiyeyo?", meaning: "Where are you now?", category: "Daily Conversations" },
    { sentence: "조금 바빠요.", pronunciation: "Jogeum bappayo.", meaning: "I'm a little busy.", category: "Daily Conversations" },

    // Introductions & Social Life
    { sentence: "이름이 뭐예요?", pronunciation: "Ireumi mwoyeyo?", meaning: "What's your name?", category: "Introductions & Social Life" },
    { sentence: "어디에서 왔어요?", pronunciation: "Eodieseo wasseoyo?", meaning: "Where are you from?", category: "Introductions & Social Life" },
    { sentence: "만나서 정말 반가워요.", pronunciation: "Mannaseo jeongmal bangawoyo.", meaning: "It's really nice to meet you.", category: "Introductions & Social Life" },
    { sentence: "이번 주말에 시간 있어요?", pronunciation: "Ibeon jumare sigan isseoyo?", meaning: "Are you free this weekend?", category: "Introductions & Social Life" },

    // Shopping & Restaurants
    { sentence: "이거 얼마예요?", pronunciation: "Igeo eolmayeyo?", meaning: "How much is this?", category: "Shopping & Restaurants" },
    { sentence: "다른 색도 있어요?", pronunciation: "Dareun saekdo isseoyo?", meaning: "Do you have this in another color?", category: "Shopping & Restaurants" },
    { sentence: "메뉴 좀 보여 주세요.", pronunciation: "Menyu jom boyeo juseyo.", meaning: "Could you show me the menu?", category: "Shopping & Restaurants" },
    { sentence: "이거 하나 주세요.", pronunciation: "Igeo hana juseyo.", meaning: "I'll have one of these, please.", category: "Shopping & Restaurants" },

    // Travel & Directions
    { sentence: "여기 어떻게 가요?", pronunciation: "Yeogi eotteoke gayo?", meaning: "How do I get there?", category: "Travel & Directions" },
    { sentence: "가장 가까운 지하철역이 어디예요?", pronunciation: "Gajang gakkaun jihacheollyeogi eodiyeyo?", meaning: "Where is the nearest subway station?", category: "Travel & Directions" },
    { sentence: "이 근처에 약국 있어요?", pronunciation: "I geuncheoe yakguk isseoyo?", meaning: "Is there a pharmacy nearby?", category: "Travel & Directions" },
    { sentence: "여기서 얼마나 걸려요?", pronunciation: "Yeogiseo eolmana geollyeoyo?", meaning: "How long does it take from here?", category: "Travel & Directions" },

    // University, Work & Asking for Help
    { sentence: "수업이 몇 시에 시작해요?", pronunciation: "Sueobi myeot sie sijakaeyo?", meaning: "What time does the class start?", category: "University, Work & Asking for Help" },
    { sentence: "숙제는 언제까지예요?", pronunciation: "Sukjeneun eonjekkajiyeyo?", meaning: "When is the homework due?", category: "University, Work & Asking for Help" },
    { sentence: "다시 설명해 주실 수 있어요?", pronunciation: "Dasi seolmyeonghae jusil su isseoyo?", meaning: "Could you explain that again?", category: "University, Work & Asking for Help" },
    { sentence: "도와주실 수 있어요?", pronunciation: "Dowajusil su isseoyo?", meaning: "Could you help me?", category: "University, Work & Asking for Help" }
  ],

  Bangla: [
    // Daily Conversations
    { sentence: "তুমি কী করছ?", pronunciation: "Tumi ki korchho?", meaning: "What are you doing?", category: "Daily Conversations" },
    { sentence: "আজ কী করছ?", pronunciation: "Aj ki korchho?", meaning: "What are you doing today?", category: "Daily Conversations" },
    { sentence: "তুমি এখন কোথায়?", pronunciation: "Tumi ekhon kothay?", meaning: "Where are you now?", category: "Daily Conversations" },
    { sentence: "আমি একটু ব্যস্ত।", pronunciation: "Ami ektu byasto.", meaning: "I'm a little busy.", category: "Daily Conversations" },

    // Introductions & Social Life
    { sentence: "তোমার নাম কী?", pronunciation: "Tomar nam ki?", meaning: "What's your name?", category: "Introductions & Social Life" },
    { sentence: "তুমি কোথা থেকে এসেছ?", pronunciation: "Tumi kotha theke eshechho?", meaning: "Where are you from?", category: "Introductions & Social Life" },
    { sentence: "তোমার সঙ্গে দেখা হয়ে ভালো লাগল।", pronunciation: "Tomar shonge dekha hoye bhalo laglo.", meaning: "It was nice meeting you.", category: "Introductions & Social Life" },
    { sentence: "এই সপ্তাহান্তে তোমার সময় হবে?", pronunciation: "Ei shoptahante tomar shomoy hobe?", meaning: "Will you be free this weekend?", category: "Introductions & Social Life" },

    // Shopping & Restaurants
    { sentence: "এটার দাম কত?", pronunciation: "Etar dam koto?", meaning: "How much does this cost?", category: "Shopping & Restaurants" },
    { sentence: "অন্য রঙে আছে?", pronunciation: "Onno ronge achhe?", meaning: "Do you have this in another color?", category: "Shopping & Restaurants" },
    { sentence: "মেনুটা একটু দেখাবেন?", pronunciation: "Menuta ektu dekhaben?", meaning: "Could you show me the menu?", category: "Shopping & Restaurants" },
    { sentence: "আমাকে এটা একটা দিন।", pronunciation: "Amake eta ekta din.", meaning: "Please give me one of these.", category: "Shopping & Restaurants" },

    // Travel & Directions
    { sentence: "এখানে কীভাবে যাব?", pronunciation: "Ekhane kibhabe jabo?", meaning: "How do I get there?", category: "Travel & Directions" },
    { sentence: "সবচেয়ে কাছের মেট্রো স্টেশন কোথায়?", pronunciation: "Shobcheye kachher metro station kothay?", meaning: "Where is the nearest metro station?", category: "Travel & Directions" },
    { sentence: "এখানে কাছাকাছি কোনো ফার্মেসি আছে?", pronunciation: "Ekhane kachhakachhi kono pharmacy achhe?", meaning: "Is there a pharmacy nearby?", category: "Travel & Directions" },
    { sentence: "এখান থেকে যেতে কতক্ষণ লাগবে?", pronunciation: "Ekhan theke jete kotokkhon lagbe?", meaning: "How long will it take to get there from here?", category: "Travel & Directions" },

    // University, Work & Asking for Help
    { sentence: "ক্লাস কয়টায় শুরু হবে?", pronunciation: "Class koytay shuru hobe?", meaning: "What time will the class start?", category: "University, Work & Asking for Help" },
    { sentence: "অ্যাসাইনমেন্ট জমা দেওয়ার শেষ তারিখ কবে?", pronunciation: "Assignment joma dewar shesh tarikh kobe?", meaning: "When is the assignment deadline?", category: "University, Work & Asking for Help" },
    { sentence: "আপনি কি আবার বুঝিয়ে বলতে পারবেন?", pronunciation: "Apni ki abar bujhiye bolte parben?", meaning: "Could you explain that again?", category: "University, Work & Asking for Help" },
    { sentence: "আপনি কি আমাকে একটু সাহায্য করবেন?", pronunciation: "Apni ki amake ektu shahajjo korben?", meaning: "Could you help me?", category: "University, Work & Asking for Help" }
  ],

  Japanese: [
    // Daily Conversations
    { sentence: "何をしていますか？", pronunciation: "Nani o shite imasu ka?", meaning: "What are you doing?", category: "Daily Conversations" },
    { sentence: "今日は何をしますか？", pronunciation: "Kyou wa nani o shimasu ka?", meaning: "What are you doing today?", category: "Daily Conversations" },
    { sentence: "今どこにいますか？", pronunciation: "Ima doko ni imasu ka?", meaning: "Where are you now?", category: "Daily Conversations" },
    { sentence: "ちょっと忙しいです。", pronunciation: "Chotto isogashii desu.", meaning: "I'm a little busy.", category: "Daily Conversations" },

    // Introductions & Social Life
    { sentence: "お名前は何ですか？", pronunciation: "Onamae wa nan desu ka?", meaning: "What's your name?", category: "Introductions & Social Life" },
    { sentence: "どちらから来ましたか？", pronunciation: "Dochira kara kimashita ka?", meaning: "Where are you from?", category: "Introductions & Social Life" },
    { sentence: "お会いできてうれしいです。", pronunciation: "Oai dekite ureshii desu.", meaning: "I'm happy to meet you.", category: "Introductions & Social Life" },
    { sentence: "今週末、時間がありますか？", pronunciation: "Konshuumatsu, jikan ga arimasu ka?", meaning: "Are you free this weekend?", category: "Introductions & Social Life" },

    // Shopping & Restaurants
    { sentence: "これはいくらですか？", pronunciation: "Kore wa ikura desu ka?", meaning: "How much is this?", category: "Shopping & Restaurants" },
    { sentence: "ほかの色はありますか？", pronunciation: "Hoka no iro wa arimasu ka?", meaning: "Do you have this in another color?", category: "Shopping & Restaurants" },
    { sentence: "メニューを見せてください。", pronunciation: "Menyuu o misete kudasai.", meaning: "Please show me the menu.", category: "Shopping & Restaurants" },
    { sentence: "これを一つください。", pronunciation: "Kore o hitotsu kudasai.", meaning: "One of these, please.", category: "Shopping & Restaurants" },

    // Travel & Directions
    { sentence: "ここへはどうやって行きますか？", pronunciation: "Koko e wa dou yatte ikimasu ka?", meaning: "How do I get there?", category: "Travel & Directions" },
    { sentence: "一番近い駅はどこですか？", pronunciation: "Ichiban chikai eki wa doko desu ka?", meaning: "Where is the nearest station?", category: "Travel & Directions" },
    { sentence: "この近くに薬局はありますか？", pronunciation: "Kono chikaku ni yakkyoku wa arimasu ka?", meaning: "Is there a pharmacy nearby?", category: "Travel & Directions" },
    { sentence: "ここからどのくらいかかりますか？", pronunciation: "Koko kara dono kurai kakarimasu ka?", meaning: "How long does it take from here?", category: "Travel & Directions" },

    // University, Work & Asking for Help
    { sentence: "授業は何時に始まりますか？", pronunciation: "Jugyou wa nanji ni hajimarimasu ka?", meaning: "What time does the class start?", category: "University, Work & Asking for Help" },
    { sentence: "宿題の締め切りはいつですか？", pronunciation: "Shukudai no shimekiri wa itsu desu ka?", meaning: "When is the homework deadline?", category: "University, Work & Asking for Help" },
    { sentence: "もう一度説明してもらえますか？", pronunciation: "Mou ichido setsumei shite moraemasu ka?", meaning: "Could you explain that one more time?", category: "University, Work & Asking for Help" },
    { sentence: "手伝ってもらえますか？", pronunciation: "Tetsudatte moraemasu ka?", meaning: "Could you help me?", category: "University, Work & Asking for Help" }
  ],

  Hindi: [
    // Daily Conversations
    { sentence: "तुम क्या कर रहे हो?", pronunciation: "Tum kya kar rahe ho?", meaning: "What are you doing?", category: "Daily Conversations" },
    { sentence: "आज क्या कर रहे हो?", pronunciation: "Aaj kya kar rahe ho?", meaning: "What are you doing today?", category: "Daily Conversations" },
    { sentence: "तुम अभी कहाँ हो?", pronunciation: "Tum abhi kahan ho?", meaning: "Where are you now?", category: "Daily Conversations" },
    { sentence: "मैं थोड़ा व्यस्त हूँ।", pronunciation: "Main thoda vyast hoon.", meaning: "I'm a little busy.", category: "Daily Conversations" },

    // Introductions & Social Life
    { sentence: "तुम्हारा नाम क्या है?", pronunciation: "Tumhara naam kya hai?", meaning: "What's your name?", category: "Introductions & Social Life" },
    { sentence: "तुम कहाँ से हो?", pronunciation: "Tum kahan se ho?", meaning: "Where are you from?", category: "Introductions & Social Life" },
    { sentence: "तुमसे मिलकर बहुत अच्छा लगा।", pronunciation: "Tumse milkar bahut achha laga.", meaning: "It was really nice meeting you.", category: "Introductions & Social Life" },
    { sentence: "क्या तुम इस वीकेंड खाली हो?", pronunciation: "Kya tum is weekend khaali ho?", meaning: "Are you free this weekend?", category: "Introductions & Social Life" },

    // Shopping & Restaurants
    { sentence: "इसकी कीमत कितनी है?", pronunciation: "Iski keemat kitni hai?", meaning: "How much does this cost?", category: "Shopping & Restaurants" },
    { sentence: "क्या यह किसी और रंग में है?", pronunciation: "Kya yeh kisi aur rang mein hai?", meaning: "Do you have this in another color?", category: "Shopping & Restaurants" },
    { sentence: "क्या आप मेन्यू दिखा सकते हैं?", pronunciation: "Kya aap menu dikha sakte hain?", meaning: "Could you show me the menu?", category: "Shopping & Restaurants" },
    { sentence: "मुझे यह एक दे दीजिए।", pronunciation: "Mujhe yeh ek de dijiye.", meaning: "Please give me one of these.", category: "Shopping & Restaurants" },

    // Travel & Directions
    { sentence: "मैं यहाँ कैसे पहुँचूँ?", pronunciation: "Main yahan kaise pahunchun?", meaning: "How do I get here?", category: "Travel & Directions" },
    { sentence: "सबसे नज़दीकी मेट्रो स्टेशन कहाँ है?", pronunciation: "Sabse nazdeeki metro station kahan hai?", meaning: "Where is the nearest metro station?", category: "Travel & Directions" },
    { sentence: "क्या यहाँ पास में कोई दवाई की दुकान है?", pronunciation: "Kya yahan paas mein koi dawaai ki dukaan hai?", meaning: "Is there a pharmacy nearby?", category: "Travel & Directions" },
    { sentence: "यहाँ से वहाँ पहुँचने में कितना समय लगेगा?", pronunciation: "Yahan se wahan pahunchne mein kitna samay lagega?", meaning: "How long will it take to get there from here?", category: "Travel & Directions" },

    // University, Work & Asking for Help
    { sentence: "कक्षा कितने बजे शुरू होगी?", pronunciation: "Kaksha kitne baje shuru hogi?", meaning: "What time will the class start?", category: "University, Work & Asking for Help" },
    { sentence: "असाइनमेंट जमा करने की आख़िरी तारीख़ क्या है?", pronunciation: "Assignment jama karne ki aakhiri tareekh kya hai?", meaning: "What is the assignment deadline?", category: "University, Work & Asking for Help" },
    { sentence: "क्या आप इसे एक बार फिर समझा सकते हैं?", pronunciation: "Kya aap ise ek baar phir samjha sakte hain?", meaning: "Could you explain this one more time?", category: "University, Work & Asking for Help" },
    { sentence: "क्या आप मेरी मदद कर सकते हैं?", pronunciation: "Kya aap meri madad kar sakte hain?", meaning: "Could you help me?", category: "University, Work & Asking for Help" }
  ],

  "Chinese (Mandarin)": [
    // Daily Conversations
    { sentence: "你在做什么？", pronunciation: "Nǐ zài zuò shénme?", meaning: "What are you doing?", category: "Daily Conversations" },
    { sentence: "你今天有什么安排？", pronunciation: "Nǐ jīntiān yǒu shénme ānpái?", meaning: "What are your plans today?", category: "Daily Conversations" },
    { sentence: "你现在在哪里？", pronunciation: "Nǐ xiànzài zài nǎlǐ?", meaning: "Where are you now?", category: "Daily Conversations" },
    { sentence: "我有点忙。", pronunciation: "Wǒ yǒudiǎn máng.", meaning: "I'm a little busy.", category: "Daily Conversations" },

    // Introductions & Social Life
    { sentence: "你叫什么名字？", pronunciation: "Nǐ jiào shénme míngzi?", meaning: "What's your name?", category: "Introductions & Social Life" },
    { sentence: "你从哪里来？", pronunciation: "Nǐ cóng nǎlǐ lái?", meaning: "Where are you from?", category: "Introductions & Social Life" },
    { sentence: "很高兴认识你。", pronunciation: "Hěn gāoxìng rènshi nǐ.", meaning: "It's nice to meet you.", category: "Introductions & Social Life" },
    { sentence: "这个周末你有空吗？", pronunciation: "Zhège zhōumò nǐ yǒu kòng ma?", meaning: "Are you free this weekend?", category: "Introductions & Social Life" },

    // Shopping & Restaurants
    { sentence: "这个多少钱？", pronunciation: "Zhège duōshǎo qián?", meaning: "How much is this?", category: "Shopping & Restaurants" },
    { sentence: "有别的颜色吗？", pronunciation: "Yǒu bié de yánsè ma?", meaning: "Do you have another color?", category: "Shopping & Restaurants" },
    { sentence: "可以给我看一下菜单吗？", pronunciation: "Kěyǐ gěi wǒ kàn yíxià càidān ma?", meaning: "Could you show me the menu?", category: "Shopping & Restaurants" },
    { sentence: "我要一个这个。", pronunciation: "Wǒ yào yí ge zhège.", meaning: "I'll have one of these.", category: "Shopping & Restaurants" },

    // Travel & Directions
    { sentence: "怎么去那里？", pronunciation: "Zěnme qù nàlǐ?", meaning: "How do I get there?", category: "Travel & Directions" },
    { sentence: "最近的地铁站在哪里？", pronunciation: "Zuìjìn de dìtiězhàn zài nǎlǐ?", meaning: "Where is the nearest subway station?", category: "Travel & Directions" },
    { sentence: "这附近有药店吗？", pronunciation: "Zhè fùjìn yǒu yàodiàn ma?", meaning: "Is there a pharmacy nearby?", category: "Travel & Directions" },
    { sentence: "从这里到那里要多久？", pronunciation: "Cóng zhèlǐ dào nàlǐ yào duōjiǔ?", meaning: "How long does it take to get there from here?", category: "Travel & Directions" },

    // University, Work & Asking for Help
    { sentence: "课几点开始？", pronunciation: "Kè jǐ diǎn kāishǐ?", meaning: "What time does the class start?", category: "University, Work & Asking for Help" },
    { sentence: "作业什么时候截止？", pronunciation: "Zuòyè shénme shíhou jiézhǐ?", meaning: "When is the homework due?", category: "University, Work & Asking for Help" },
    { sentence: "你可以再解释一遍吗？", pronunciation: "Nǐ kěyǐ zài jiěshì yí biàn ma?", meaning: "Could you explain that one more time?", category: "University, Work & Asking for Help" },
    { sentence: "你可以帮帮我吗？", pronunciation: "Nǐ kěyǐ bāngbang wǒ ma?", meaning: "Could you help me?", category: "University, Work & Asking for Help" }
  ]
};


  const languageSentences = sentences[selectedLanguage] || sentences.Korean;

  const categories = [
    "All",
    ...new Set(languageSentences.map((item) => item.category))
  ];

  const filteredSentences =
    selectedCategory === "All"
      ? languageSentences
      : languageSentences.filter(
          (item) => item.category === selectedCategory
        );

  const visibleCategories =
    selectedCategory === "All"
      ? categories.filter((category) => category !== "All")
      : [selectedCategory];

  return (
    <div className="sentence-page">
      <button className="sentence-back" onClick={onBack}>
        ← Back
      </button>

      <p className="sentence-label">SENTENCE LEARNING</p>

      <h1>Learn Real Sentences</h1>

      <p className="sentence-intro">
        Explore useful everyday sentences, understand their pronunciation,
        and learn how to use them in real conversations.
      </p>

      <div className="sentence-language-select">
        <label htmlFor="sentence-language">Choose a language:</label>

        <select
          id="sentence-language"
          value={selectedLanguage}
          onChange={(e) => {
            setSelectedLanguage(e.target.value);
            setSelectedCategory("All");
          }}
        >
          {Object.keys(sentences).map((lang) => (
            <option key={lang} value={lang}>
              {lang}
            </option>
          ))}
        </select>
      </div>

      <div className="sentence-categories">
        {categories.map((category) => (
          <button
            key={category}
            className={selectedCategory === category ? "active" : ""}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="sentence-list">
        {visibleCategories.map((category) => {
          const categorySentences = filteredSentences.filter(
            (item) => item.category === category
          );

          return (
            <section className="sentence-category-section" key={category}>
              <h2 className="sentence-category-heading">
                {category}
                <span>{categorySentences.length} sentences</span>
              </h2>

              <div className="sentence-category-rows">
                {categorySentences.map((item, index) => (
                  <div className="sentence-row" key={index}>
                    <div className="sentence-row-number">
                      {String(index + 1).padStart(2, "0")}
                    </div>

                    <div className="sentence-row-content">
                      <h3>{item.sentence}</h3>
                      <p className="sentence-pronunciation">
                        {item.pronunciation}
                      </p>
                      <p className="sentence-meaning">
                        {item.meaning}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          );
        })}
      </div>

      <div className="sentence-practice-cta">
        <h3>Ready to test yourself?</h3>
        <p>
          Check how well you understand the sentences you've learned.
        </p>
        <button onClick={() => onPractice(selectedLanguage)}>
          Start Sentence Practice →
        </button>
      </div>
    </div>
  );
}

export default SentencePage;