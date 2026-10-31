
import { useState } from "react";
import "./QuizPage.css";

function QuizPage({ language, lesson, onBack }) {
  const questions = {
    Korean: {
      Greetings: [
        { word: "안녕하세요", options: ["Hello", "Thank you", "Goodbye"], answer: "Hello" },
        { word: "감사합니다", options: ["Yes", "Thank you", "No"], answer: "Thank you" },
        { word: "네", options: ["Hello", "Sorry", "Yes"], answer: "Yes" },
      ],
      "Basic Words": [
        { word: "물", options: ["Water", "Book", "Friend"], answer: "Water" },
        { word: "책", options: ["Food", "Book", "Water"], answer: "Book" },
        { word: "친구", options: ["Teacher", "Friend", "Student"], answer: "Friend" },
      ],
      Numbers: [
        { word: "하나", options: ["One", "Two", "Three"], answer: "One" },
        { word: "둘", options: ["Three", "Two", "Four"], answer: "Two" },
        { word: "셋", options: ["One", "Four", "Three"], answer: "Three" },
      ],
    },

    Bangla: {
      Greetings: [
        { word: "হ্যালো", options: ["Hello", "Thank you", "Goodbye"], answer: "Hello" },
        { word: "ধন্যবাদ", options: ["Yes", "Thank you", "No"], answer: "Thank you" },
        { word: "হ্যাঁ", options: ["Hello", "Sorry", "Yes"], answer: "Yes" },
      ],
      "Basic Words": [
        { word: "পানি", options: ["Water", "Book", "Friend"], answer: "Water" },
        { word: "বই", options: ["Food", "Book", "Water"], answer: "Book" },
        { word: "বন্ধু", options: ["Teacher", "Friend", "Student"], answer: "Friend" },
      ],
      Numbers: [
        { word: "এক", options: ["One", "Two", "Three"], answer: "One" },
        { word: "দুই", options: ["Three", "Two", "Four"], answer: "Two" },
        { word: "তিন", options: ["One", "Four", "Three"], answer: "Three" },
      ],
    },

    Japanese: {
      Greetings: [
        { word: "こんにちは", options: ["Hello", "Thank you", "Goodbye"], answer: "Hello" },
        { word: "ありがとう", options: ["Yes", "Thank you", "No"], answer: "Thank you" },
        { word: "はい", options: ["Hello", "Sorry", "Yes"], answer: "Yes" },
      ],
      "Basic Words": [
        { word: "水", options: ["Water", "Book", "Friend"], answer: "Water" },
        { word: "本", options: ["Food", "Book", "Water"], answer: "Book" },
        { word: "友達", options: ["Teacher", "Friend", "Student"], answer: "Friend" },
      ],
      Numbers: [
        { word: "一", options: ["One", "Two", "Three"], answer: "One" },
        { word: "二", options: ["Three", "Two", "Four"], answer: "Two" },
        { word: "三", options: ["One", "Four", "Three"], answer: "Three" },
      ],
    },

    English: {
      Greetings: [
        { word: "Hello", options: ["A greeting", "A number", "A color"], answer: "A greeting" },
        { word: "Thank you", options: ["A question", "Showing gratitude", "A greeting"], answer: "Showing gratitude" },
        { word: "Goodbye", options: ["A farewell", "A number", "A color"], answer: "A farewell" },
      ],
      "Basic Words": [
        { word: "Water", options: ["A drink", "A book", "A person"], answer: "A drink" },
        { word: "Book", options: ["A color", "Something you read", "A drink"], answer: "Something you read" },
        { word: "Friend", options: ["A number", "A place", "Someone you trust"], answer: "Someone you trust" },
      ],
      Numbers: [
        { word: "One", options: ["1", "2", "3"], answer: "1" },
        { word: "Two", options: ["3", "2", "4"], answer: "2" },
        { word: "Three", options: ["1", "4", "3"], answer: "3" },
      ],
    },

    "Chinese (Mandarin)": {
      Greetings: [
        { word: "你好", options: ["Hello", "Thank you", "Goodbye"], answer: "Hello" },
        { word: "谢谢", options: ["Yes", "Thank you", "No"], answer: "Thank you" },
        { word: "再见", options: ["Goodbye", "Hello", "Sorry"], answer: "Goodbye" },
      ],
      "Basic Words": [
        { word: "水", options: ["Water", "Book", "Friend"], answer: "Water" },
        { word: "书", options: ["Food", "Book", "Water"], answer: "Book" },
        { word: "朋友", options: ["Teacher", "Friend", "Student"], answer: "Friend" },
      ],
      Numbers: [
        { word: "一", options: ["One", "Two", "Three"], answer: "One" },
        { word: "二", options: ["Three", "Two", "Four"], answer: "Two" },
        { word: "三", options: ["One", "Four", "Three"], answer: "Three" },
      ],
    },
  };

  const languageQuestions = questions[language] || questions.English;
  const quiz = languageQuestions[lesson] || languageQuestions.Greetings;

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [finished, setFinished] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  function checkAnswer() {
    if (!selectedAnswer || showFeedback) return;

    if (selectedAnswer === quiz[currentQuestion].answer) {
      setScore((previousScore) => previousScore + 1);
    }
      setShowFeedback(true);
    }

     function nextQuestion(){
    if (currentQuestion === quiz.length - 1) {
      setFinished(true);
    } else {
      setCurrentQuestion((previousQuestion) => previousQuestion + 1);
      setSelectedAnswer("");
       setShowFeedback(false);
    }
  }
    

  function restartQuiz() {
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer("");
    setFinished(false);
    setShowFeedback(false);
  }

 
     
return (
    <div className="quiz-page">
      <button type="button" className="quiz-back" onClick={onBack}>
        ← Back to Lesson
      </button>

      <p className="quiz-label">{language} · PRACTICE</p>
      <h1>{lesson} Quiz</h1>

      {finished ? (
        <div className="quiz-card quiz-results" aria-live="polite">
          <h2>Quiz Completed!</h2>

          <p className="quiz-score">
            {score} / {quiz.length}
          </p>

          <h3>{Math.round((score / quiz.length) * 100)}%</h3>

          <p>
            {score === quiz.length
              ? "Perfect score! Excellent work!"
              : score >= 2
              ? "Great effort! Keep practising."
              : "Keep learning. You will improve!"}
          </p>

          <button type="button" onClick={restartQuiz}>Try Again ↻</button>
        </div>

      ) : (
        <div className="quiz-card">
          <p>Question {currentQuestion + 1} of {quiz.length}</p>
          <h2>What does "{quiz[currentQuestion].word}" mean?</h2>

          <div className="quiz-options">
            {quiz[currentQuestion].options.map((option) => (
              <button type="button"
                key={option}
                className={`quiz-option ${
                  showFeedback && option === quiz[currentQuestion].answer
                    ? "correct"
                    : showFeedback && option === selectedAnswer
                    ? "incorrect"
                    : selectedAnswer === option
                    ? "selected"
                    : ""
                }`}
                disabled={showFeedback}
                onClick={() => setSelectedAnswer(option)}
              >
                {option}
              </button>
            ))}
          </div>

          {showFeedback && (
            <p className="quiz-feedback" role="status" aria-live="polite">
              {selectedAnswer === quiz[currentQuestion].answer
                ? "Correct! Well done!"
                : `Not quite! The correct answer is: ${quiz[currentQuestion].answer}`}
            </p>
          )}

          <button type="button"
            className="quiz-submit"
            disabled={!selectedAnswer}
            onClick={showFeedback ? nextQuestion : checkAnswer}
          >
            {showFeedback
              ? currentQuestion === quiz.length - 1
                ? "View Results"
                : "Next Question →"
              : "Check Answer"}
          </button>
        </div>
      )}
    </div>
  );
}

export default QuizPage;
