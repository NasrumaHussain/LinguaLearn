import { useState } from "react";
import { sentences } from "./SentencePage";
import { vocabulary } from "./VocabularyPage";
import "./PracticePage.css";

// Randomly rearranges questions and answer choices
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

// Combines vocabulary and sentences into one quiz
function createQuestions(language) {
  const languageVocabulary = vocabulary[language] || vocabulary.Korean;
  const languageSentences = sentences[language] || sentences.Korean;

  const vocabularyQuestions = Object.values(languageVocabulary)
    .flat()
    .map((item) => ({
      type: "Vocabulary",
      prompt: item.word,
      pronunciation: item.pronunciation,
      answer: item.meaning,
    }));

  const sentenceQuestions = languageSentences.map((item) => ({
    type: "Sentence",
    prompt: item.sentence,
    pronunciation: item.pronunciation,
    answer: item.meaning,
  }));

  const allQuestions = [
    ...vocabularyQuestions,
    ...sentenceQuestions,
  ];

  const allMeanings = [
    ...new Set(allQuestions.map((item) => item.answer)),
  ];

  return shuffleArray(allQuestions).map((item) => {
    const wrongAnswers = shuffleArray(
      allMeanings.filter((meaning) => meaning !== item.answer)
    ).slice(0, 3);

    return {
      ...item,
      options: shuffleArray([item.answer, ...wrongAnswers]),
    };
  });
}

function PracticePage({ onBack }) {
  const [selectedLanguage, setSelectedLanguage] = useState("Korean");
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);

  const question = questions[currentQuestion];

  function startPractice() {
    setQuestions(createQuestions(selectedLanguage));
    setCurrentQuestion(0);
    setSelectedAnswer("");
    setScore(0);
    setFinished(false);
    setStarted(true);
  }

  function handleAnswer(answer) {
    if (selectedAnswer) return;

    setSelectedAnswer(answer);

    if (answer === question.answer) {
      setScore((previousScore) => previousScore + 1);
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

  return (
    <div className="practice-page">
      <button
        className="practice-back-button"
        onClick={() => {
          if (started || finished) {
            setStarted(false);
            setFinished(false);
            setQuestions([]);
            setCurrentQuestion(0);
            setSelectedAnswer("");
            setScore(0);
          } else {
            onBack();
          }
        }}
      >
        {started || finished ? "← Back to Choose Language" : "← Back to Home"}
      </button>

      {!started && (
        <div className="practice-intro">
          <p className="practice-label">PRACTICE & IMPROVE</p>

          <h1>Test What You've Learned</h1>

          <p className="practice-description">
            A little vocabulary, a few sentences, and one
            combined quiz to help you remember more.
          </p>

          <div className="practice-setup-card">
            <label htmlFor="practice-language">
              Choose a language
            </label>

            <select
              id="practice-language"
              value={selectedLanguage}
              onChange={(event) =>
                setSelectedLanguage(event.target.value)
              }
            >
              <option value="Korean">Korean</option>
              <option value="Bangla">Bangla</option>
              <option value="Japanese">Japanese</option>
              <option value="Hindi">Hindi</option>
              <option value="Chinese (Mandarin)">
                Chinese (Mandarin)
              </option>
            </select>

            <div className="practice-info">
              <div>
                <strong>18</strong>
                <span>Vocabulary questions</span>
              </div>

              <div>
                <strong>20</strong>
                <span>Sentence questions</span>
              </div>

              <div>
                <strong>38</strong>
                <span>Total questions</span>
              </div>
            </div>

            <button
              className="start-practice-button"
              onClick={startPractice}
            >
              Start Mixed Practice →
            </button>
          </div>
        </div>
      )}

      {started && !finished && question && (
        <div className="practice-quiz-card">
          <div className="practice-quiz-top">
            <span>{selectedLanguage}</span>
            <span>
              Question {currentQuestion + 1} of {questions.length}
            </span>
          </div>

          <div className="practice-progress-track">
            <div
              className="practice-progress-fill"
              style={{
                width: `${
                  ((currentQuestion + 1) / questions.length) * 100
                }%`,
              }}
            />
          </div>

          <span className="question-type">
            {question.type} question
          </span>

          <h2>{question.prompt}</h2>

          <p className="practice-pronunciation">
            {question.pronunciation}
          </p>

          <p className="practice-question">
            What does this {question.type.toLowerCase()} mean?
          </p>

          <div className="practice-options">
            {question.options.map((option, index) => {
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
                  key={`${option}-${index}`}
                  className={`practice-option ${optionClass}`}
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
              {selectedAnswer === question.answer
                ? "Correct! Well done 🎉"
                : `Not quite! The correct answer is: ${question.answer}`}
            </div>
          )}

          <div className="practice-quiz-bottom">
            <span>Score: {score}</span>

            <button
              onClick={handleNext}
              disabled={!selectedAnswer}
            >
              {currentQuestion === questions.length - 1
                ? "See Results"
                : "Next Question →"}
            </button>
          </div>
        </div>
      )}

      {finished && (
        <div className="practice-result-card">
          <p className="practice-label">PRACTICE COMPLETED</p>

          <h1>Great Work!</h1>

          <p>
            You've completed the {selectedLanguage} mixed practice.
          </p>

          <div className="practice-final-score">
            <strong>{score} / {questions.length}</strong>
            <span>Your final score</span>
          </div>

          <button
            className="start-practice-button"
            onClick={startPractice}
          >
            Try Again ↻
          </button>

          <button
            className="change-language-button"
            onClick={() => {
              setStarted(false);
              setFinished(false);
            }}
          >
            Choose Another Language
          </button>
        </div>
      )}
    </div>
  );
}

export default PracticePage;