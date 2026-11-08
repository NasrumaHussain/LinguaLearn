
import { useState } from "react";
import "./SentencePracticePage.css";

function SentencePracticePage({ language, onBack }) {
  const questionBank = {
    Korean: [
      {
        sentence: "저는 학생이에요.",
        pronunciation: "Jeoneun haksaeng-ieyo.",
        answer: "I am a student.",
        options: ["I am a student.", "I am a teacher.", "I am at home.", "I am hungry."]
      },
      {
        sentence: "오늘 날씨가 좋아요.",
        pronunciation: "Oneul nalssiga joayo.",
        answer: "The weather is nice today.",
        options: ["It is raining today.", "The weather is nice today.", "Today is very cold.", "Tomorrow is sunny."]
      },
      {
        sentence: "이거 얼마예요?",
        pronunciation: "Igeo eolmayeyo?",
        answer: "How much is this?",
        options: ["What is this?", "Where is the shop?", "How much is this?", "Can I have this?"]
      },
      {
        sentence: "화장실이 어디예요?",
        pronunciation: "Hwajangsil-i eodiyeyo?",
        answer: "Where is the bathroom?",
        options: ["Where is the bathroom?", "Where is the station?", "Where are you going?", "Where is my hotel?"]
      },
      {
        sentence: "천천히 말해 주세요.",
        pronunciation: "Cheoncheonhi malhae juseyo.",
        answer: "Please speak slowly.",
        options: ["Please wait here.", "Please speak slowly.", "Please come inside.", "Please say it again."]
      }
    ],

    Bangla: [
      {
        sentence: "আমি একজন ছাত্র।",
        pronunciation: "Ami ekjon chhatro.",
        answer: "I am a student.",
        options: ["I am a student.", "I am a teacher.", "I am at school.", "I am tired."]
      },
      {
        sentence: "আজ আবহাওয়া খুব সুন্দর।",
        pronunciation: "Aj abohawa khub shundor.",
        answer: "The weather is very nice today.",
        options: ["It is raining today.", "The weather is very nice today.", "Today is very hot.", "Tomorrow will be cold."]
      },
      {
        sentence: "এটার দাম কত?",
        pronunciation: "Etar dam koto?",
        answer: "How much does this cost?",
        options: ["What is this called?", "Where can I buy this?", "How much does this cost?", "Do you like this?"]
      },
      {
        sentence: "বাথরুম কোথায়?",
        pronunciation: "Bathroom kothay?",
        answer: "Where is the bathroom?",
        options: ["Where is the bathroom?", "Where is the hotel?", "Where is the bus stop?", "Where are you going?"]
      },
      {
        sentence: "দয়া করে একটু আস্তে বলুন।",
        pronunciation: "Doya kore ektu aste bolun.",
        answer: "Please speak a little slowly.",
        options: ["Please wait a little.", "Please speak a little slowly.", "Please come here.", "Please help me."]
      }
    ],

    Japanese: [
      {
        sentence: "私は学生です。",
        pronunciation: "Watashi wa gakusei desu.",
        answer: "I am a student.",
        options: ["I am a student.", "I am a teacher.", "I am Japanese.", "I am busy."]
      },
      {
        sentence: "今日はいい天気です。",
        pronunciation: "Kyou wa ii tenki desu.",
        answer: "The weather is nice today.",
        options: ["It is raining today.", "The weather is nice today.", "Today is very cold.", "It is windy today."]
      },
      {
        sentence: "これはいくらですか？",
        pronunciation: "Kore wa ikura desu ka?",
        answer: "How much is this?",
        options: ["What is this?", "How much is this?", "Where is this?", "Can I buy this?"]
      },
      {
        sentence: "トイレはどこですか？",
        pronunciation: "Toire wa doko desu ka?",
        answer: "Where is the bathroom?",
        options: ["Where is the bathroom?", "Where is the station?", "Where is the restaurant?", "Where is my room?"]
      },
      {
        sentence: "ゆっくり話してください。",
        pronunciation: "Yukkuri hanashite kudasai.",
        answer: "Please speak slowly.",
        options: ["Please listen carefully.", "Please speak slowly.", "Please wait here.", "Please write it down."]
      }
    ],

    Hindi: [
      {
        sentence: "मैं एक छात्र हूँ।",
        pronunciation: "Main ek chhatra hoon.",
        answer: "I am a student.",
        options: ["I am a student.", "I am a teacher.", "I am at home.", "I am happy."]
      },
      {
        sentence: "आज मौसम अच्छा है।",
        pronunciation: "Aaj mausam achha hai.",
        answer: "The weather is nice today.",
        options: ["It is raining today.", "The weather is nice today.", "Today is very cold.", "The weather is bad."]
      },
      {
        sentence: "यह कितने का है?",
        pronunciation: "Yeh kitne ka hai?",
        answer: "How much does this cost?",
        options: ["What is this?", "How much does this cost?", "Where can I find this?", "Do you want this?"]
      },
      {
        sentence: "बाथरूम कहाँ है?",
        pronunciation: "Bathroom kahan hai?",
        answer: "Where is the bathroom?",
        options: ["Where is the bathroom?", "Where is the school?", "Where is the hotel?", "Where are you going?"]
      },
      {
        sentence: "कृपया धीरे बोलिए।",
        pronunciation: "Kripya dheere boliye.",
        answer: "Please speak slowly.",
        options: ["Please come here.", "Please speak slowly.", "Please help me.", "Please wait."]
      }
    ],

    "Chinese (Mandarin)": [
      {
        sentence: "我是学生。",
        pronunciation: "Wǒ shì xuéshēng.",
        answer: "I am a student.",
        options: ["I am a student.", "I am a teacher.", "I am at home.", "I am busy."]
      },
      {
        sentence: "今天天气很好。",
        pronunciation: "Jīntiān tiānqì hěn hǎo.",
        answer: "The weather is nice today.",
        options: ["It is raining today.", "The weather is nice today.", "Today is very cold.", "It is snowing today."]
      },
      {
        sentence: "这个多少钱？",
        pronunciation: "Zhège duōshǎo qián?",
        answer: "How much does this cost?",
        options: ["What is this?", "Where is the shop?", "How much does this cost?", "Can I buy this?"]
      },
      {
        sentence: "洗手间在哪里？",
        pronunciation: "Xǐshǒujiān zài nǎlǐ?",
        answer: "Where is the bathroom?",
        options: ["Where is the bathroom?", "Where is the hotel?", "Where is the station?", "Where is the restaurant?"]
      },
      {
        sentence: "请说慢一点。",
        pronunciation: "Qǐng shuō màn yìdiǎn.",
        answer: "Please speak a little slowly.",
        options: ["Please wait a moment.", "Please speak a little slowly.", "Please say it again.", "Please come inside."]
      }
    ]
  };

  const questions = questionBank[language] || questionBank.Korean;

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const question = questions[currentQuestion];

  function handleAnswer(option) {
    if (selectedAnswer) return;

    setSelectedAnswer(option);

    if (option === question.answer) {
      setScore(previous => previous + 1);
    }
  }

  function handleNext() {
    if (currentQuestion === questions.length - 1) {
      setFinished(true);
    } else {
      setCurrentQuestion(previous => previous + 1);
      setSelectedAnswer("");
    }
  }

  function restartPractice() {
    setCurrentQuestion(0);
    setSelectedAnswer("");
    setScore(0);
    setFinished(false);
  }

  return (
    <div className="sentence-practice-page">
      <button className="practice-back" onClick={onBack}>
        ← Back to Sentences
      </button>

      <p className="practice-label">{language} · PRACTICE</p>
      <h1>Test Your Understanding</h1>
      <p className="practice-intro">
        Choose the correct English meaning of each sentence.
      </p>

      {finished ? (
        <div className="practice-result">
          <h2>Practice Completed!</h2>
          <p>Your score</p>
          <strong>{score} / {questions.length}</strong>
          <p>
            {score === questions.length
              ? "Perfect! You got every answer right."
              : "Good effort! Keep practicing to improve."}
          </p>

          <button onClick={restartPractice}>
            Try Again
          </button>
        </div>
      ) : (
        <div className="practice-card">
          <p className="practice-progress">
            Question {currentQuestion + 1} of {questions.length}
          </p>

          <div className="practice-progress-track">
            <div
              className="practice-progress-fill"
              style={{
                width: `${((currentQuestion + 1) / questions.length) * 100}%`
              }}
            />
          </div>

          <p className="practice-instruction">
            What does this sentence mean?
          </p>

          <h2>{question.sentence}</h2>
          <p className="practice-pronunciation">
            {question.pronunciation}
          </p>

          <div className="practice-options">
            {question.options.map(option => {
              let optionClass = "";

              if (selectedAnswer) {
                if (option === question.answer) {
                  optionClass = "correct";
                } else if (option === selectedAnswer) {
                  optionClass = "incorrect";
                }
              }

              return (
                <button
                  key={option}
                  className={optionClass}
                  onClick={() => handleAnswer(option)}
                  disabled={Boolean(selectedAnswer)}
                >
                  {option}
                </button>
              );
            })}
          </div>

          {selectedAnswer && (
            <div className="practice-feedback">
              <p>
                {selectedAnswer === question.answer
                  ? "Correct! Well done."
                  : `Not quite. The correct meaning is: ${question.answer}`}
              </p>

              <button onClick={handleNext}>
                {currentQuestion === questions.length - 1
                  ? "See My Result"
                  : "Next Question →"}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default SentencePracticePage;
