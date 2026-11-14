import { useState } from "react";
import { sentences } from "./SentencePage";
import "./SentencePracticePage.css";

// Randomly rearranges an array
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

// Creates questions from the sentences learners study
function createQuestions(sentenceList) {
  const allMeanings = [...new Set(
    sentenceList.map((item) => item.meaning)
  )];

  return shuffleArray(sentenceList).map((item) => {
    const wrongAnswers = shuffleArray(
      allMeanings.filter((meaning) => meaning !== item.meaning)
    ).slice(0, 3);

    return {
      ...item,
      answer: item.meaning,
      options: shuffleArray([item.meaning, ...wrongAnswers]),
    };
  });
}

function SentencePracticePage({ language, onBack }) {
  const languageSentences = sentences[language] || sentences.Korean;

  const [questions, setQuestions] = useState(() =>
    createQuestions(languageSentences)
  );

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const question = questions[currentQuestion];

  function handleAnswer(option) {
    if (selectedAnswer) return;

    setSelectedAnswer(option);

    if (option === question.answer) {
      setScore((previous) => previous + 1);
    }
  }

  function handleNext() {
    if (currentQuestion === questions.length - 1) {
      setFinished(true);
    } else {
      setCurrentQuestion((previous) => previous + 1);
      setSelectedAnswer("");
    }
  }

  function restartPractice() {
    setQuestions(createQuestions(languageSentences));
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
        Practise all {questions.length} sentences from your learning collection.
      </p>

      {finished ? (
        <div className="practice-result">
          <h2>Practice Completed!</h2>
          <p>Your score</p>

          <strong>{score} / {questions.length}</strong>

          <p>
            {score === questions.length
              ? "Perfect! You got every answer right."
              : "Good effort! Keep practising to improve."}
          </p>

          <button onClick={restartPractice}>
            Try Again ↻
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
                width: `${((currentQuestion + 1) / questions.length) * 100}%`,
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
            {question.options.map((option) => {
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
