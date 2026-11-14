import { useState } from "react";
import "./QuizPage.css";

function shuffleArray(items) {
  const shuffled = [...items];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[randomIndex]] = [
      shuffled[randomIndex],
      shuffled[i],
    ];
  }

  return shuffled;
}

function createQuestions(words) {
  const allMeanings = [...new Set(
    words.map((item) => item.meaning)
  )];

  return shuffleArray(words).map((item) => {
    const wrongAnswers = shuffleArray(
      allMeanings.filter((meaning) => meaning !== item.meaning)
    ).slice(0, 3);

    return {
      word: item.word,
      answer: item.meaning,
      options: shuffleArray([item.meaning, ...wrongAnswers]),
    };
  });
}

function QuizPage({ language, lesson, words, onBack }) {
  const [quiz, setQuiz] = useState(() => createQuestions(words));

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [finished, setFinished] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);

  const question = quiz[currentQuestion];

  if (quiz.length === 0) {
  return (
    <div className="quiz-page">
      <button className="quiz-back" onClick={onBack}>
        ← Back to Vocabulary
      </button>
      <h1>No vocabulary available</h1>
      <p>There are no words available for this quiz yet.</p>
    </div>
  );
}

  function checkAnswer() {
    if (!selectedAnswer) return;

    if (selectedAnswer === question.answer) {
      setScore((previousScore) => previousScore + 1);
    }

    setShowFeedback(true);
  }

  function nextQuestion() {
    if (currentQuestion === quiz.length - 1) {
      setFinished(true);
    } else {
      setCurrentQuestion((previous) => previous + 1);
      setSelectedAnswer("");
      setShowFeedback(false);
    }
  }

  function restartQuiz() {
    setQuiz(createQuestions(words));
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer("");
    setFinished(false);
    setShowFeedback(false);
  }

  return (
    <div className="quiz-page">
      <button className="quiz-back" onClick={onBack}>
        ← Back to Vocabulary
      </button>

      <p className="quiz-label">{language} · ALL LESSONS</p>
      <h1>Vocabulary Quiz</h1>

      <p>
        Test your knowledge of all {quiz.length} words from your vocabulary lessons.
      </p>

      {finished ? (
        <div className="quiz-card quiz-results">
          <h2>Quiz Completed!</h2>

          <p className="quiz-score">
            {score} / {quiz.length}
          </p>

          <h3>{Math.round((score / quiz.length) * 100)}%</h3>

          <p>
            {score === quiz.length
              ? "Perfect score! Excellent work!"
              : score >= quiz.length / 2
              ? "Great effort! Keep practising."
              : "Keep learning. You will improve!"}
          </p>

          <button onClick={restartQuiz}>Try Again ↻</button>
        </div>
      ) : (
        <div className="quiz-card">
          <div className="quiz-progress">
            <div className="quiz-progress-info">
              <span>QUIZ PROGRESS</span>
              <span>
                {currentQuestion + 1} / {quiz.length}
              </span>
            </div>

            <div className="quiz-progress-track">
              <div
                className="quiz-progress-fill"
                style={{
                  width: `${((currentQuestion + 1) / quiz.length) * 100}%`,
                }}
              />
            </div>
          </div>

          <p>
            Question {currentQuestion + 1} of {quiz.length}
          </p>

          <h2>What does "{question.word}" mean?</h2>

          <div className="quiz-options">
            {question.options.map((option) => (
              <button
                key={option}
                className={`quiz-option ${
                  showFeedback && option === question.answer
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
            <p className="quiz-feedback">
              {selectedAnswer === question.answer
                ? "Correct! Well done!"
                : `Not quite! The correct answer is: ${question.answer}`}
            </p>
          )}

          <button
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
