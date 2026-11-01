import { useState } from "react";
import "./VocabularyPage.css";
import QuizPage from "./QuizPage";

function VocabularyPage({ language, lesson, onBack, onComplete, isLessonComplete = false, savedWords, onToggleSave}) {
   const vocabulary = {
    Korean: {
      Greetings: [
        { word: "안녕하세요", pronunciation: "Annyeonghaseyo", meaning: "Hello" },
        { word: "감사합니다", pronunciation: "Gamsahamnida", meaning: "Thank you" },
        { word: "네", pronunciation: "Ne", meaning: "Yes" },
      ],
      "Basic Words": [
        { word: "물", pronunciation: "Mul", meaning: "Water" },
        { word: "책", pronunciation: "Chaek", meaning: "Book" },
        { word: "친구", pronunciation: "Chingu", meaning: "Friend" },
      ],
      Numbers: [
        { word: "하나", pronunciation: "Hana", meaning: "One" },
        { word: "둘", pronunciation: "Dul", meaning: "Two" },
        { word: "셋", pronunciation: "Set", meaning: "Three" },
      ],
    },

    Bangla: {
      Greetings: [
        { word: "হ্যালো", pronunciation: "Hello", meaning: "Hello" },
        { word: "ধন্যবাদ", pronunciation: "Dhonnobad", meaning: "Thank you" },
        { word: "হ্যাঁ", pronunciation: "Hya", meaning: "Yes" },
      ],
      "Basic Words": [
        { word: "পানি", pronunciation: "Pani", meaning: "Water" },
        { word: "বই", pronunciation: "Boi", meaning: "Book" },
        { word: "বন্ধু", pronunciation: "Bondhu", meaning: "Friend" },
      ],
      Numbers: [
        { word: "এক", pronunciation: "Ek", meaning: "One" },
        { word: "দুই", pronunciation: "Dui", meaning: "Two" },
        { word: "তিন", pronunciation: "Tin", meaning: "Three" },
      ],
    },

    Japanese: {
      Greetings: [
        { word: "こんにちは", pronunciation: "Konnichiwa", meaning: "Hello" },
        { word: "ありがとう", pronunciation: "Arigatou", meaning: "Thank you" },
        { word: "はい", pronunciation: "Hai", meaning: "Yes" },
      ],
      "Basic Words": [
        { word: "水", pronunciation: "Mizu", meaning: "Water" },
        { word: "本", pronunciation: "Hon", meaning: "Book" },
        { word: "友達", pronunciation: "Tomodachi", meaning: "Friend" },
      ],
      Numbers: [
        { word: "一", pronunciation: "Ichi", meaning: "One" },
        { word: "二", pronunciation: "Ni", meaning: "Two" },
        { word: "三", pronunciation: "San", meaning: "Three" },
      ],
    },

    English: {
      Greetings: [
        { word: "Hello", pronunciation: "Heh-low", meaning: "A greeting" },
        { word: "Thank you", pronunciation: "Thank you", meaning: "Showing gratitude" },
        { word: "Goodbye", pronunciation: "Good-bye", meaning: "A farewell" },
      ],
      "Basic Words": [
        { word: "Water", pronunciation: "Waw-ter", meaning: "A drink" },
        { word: "Book", pronunciation: "Book", meaning: "Something you read" },
        { word: "Friend", pronunciation: "Frend", meaning: "Someone you like and trust" },
      ],
      Numbers: [
        { word: "One", pronunciation: "Wun", meaning: "1" },
        { word: "Two", pronunciation: "Too", meaning: "2" },
        { word: "Three", pronunciation: "Three", meaning: "3" },
      ],
    },
  "Chinese (Mandarin)": {
      Greetings: [
        { word: "你好", pronunciation: "Nǐ hǎo", meaning: "Hello" },
        { word: "谢谢", pronunciation: "Xièxie", meaning: "Thank you" },
        { word: "再见", pronunciation: "Zàijiàn", meaning: "Goodbye" },
      ],
      "Basic Words": [
        { word: "水", pronunciation: "Shuǐ", meaning: "Water" },
        { word: "书", pronunciation: "Shū", meaning: "Book" },
        { word: "朋友", pronunciation: "Péngyou", meaning: "Friend" },
      ],
      Numbers: [
        { word: "一", pronunciation: "Yī", meaning: "One" },
        { word: "二", pronunciation: "Èr", meaning: "Two" },
        { word: "三", pronunciation: "Sān", meaning: "Three" },
      ],
    },
  };

  const languageVocabulary = vocabulary[language] || vocabulary.English;
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
      <button type="button" className="vocabulary-back" onClick={onBack}>
        ← Back to Lessons
      </button>

      <p className="vocabulary-label">{language} · BEGINNER</p>
      <h1>{lesson}</h1>
      <p className="vocabulary-intro">
        Learn each word, read its pronunciation, and discover its meaning.
      </p>

      <div className="vocabulary-card">
        <p className="word-counter">
          Word {currentWord + 1} of {words.length}
        </p>

        <h2>{word.word}</h2>
        <p className="pronunciation">{word.pronunciation}</p>

        <button type="button" className="save-word-button" aria-pressed={isSaved}
        onClick={() => onToggleSave({
          ...word, language, lesson
            })
          }
        >
          {isSaved ? "♥ Saved" : "♡ Save Word"}
        </button>

        <div className="meaning-box">
          <span>Meaning</span>
          <h3>{word.meaning}</h3>
        </div>

        <div className="word-navigation">
          <button type="button"
            disabled={currentWord === 0}
            onClick={() => setCurrentWord(currentWord - 1)}
          >
            Previous
          </button>

          <button type="button"
            onClick={() =>
              setCurrentWord((currentWord + 1) % words.length)
            }
          >
            {currentWord === words.length - 1 ? "Start Again ↻" : "Next Word →"}
          </button>
        </div>

            <button
              type="button"
              className="start-quiz-button"
              onClick={() => setShowQuiz(true)}>
              Take Vocabulary Quiz →
            </button>

            <button
              type="button"
              className="start-quiz-button"
              disabled={isLessonComplete}
              onClick={() => {
                onComplete();
                onBack();
              }}>
              {isLessonComplete ? "Lesson Completed ✓" : "Mark Lesson Complete ✓"}
            </button>
      </div>
    </div>
  );
}

export default VocabularyPage;
