import { useState, useEffect } from 'react';
import './App.css';

import LessonPage from './pages/LessonPage';
import Navbar from "./components/Navbar";
import ProgressCard from "./components/ProgressCard";
import SavedWordsPage from "./pages/SavedWordsPage";
import DashboardPage from "./pages/DashboardPage";
import SentencePage from "./pages/SentencePage";
import SentencePracticePage from "./pages/SentencePracticePage";
import SentenceLanguagePage from "./pages/SentenceLanguagePage";

function App() {
  const languages = [
    { name: "Korean", native: "한국어" },
    { name: "Bangla", native: "বাংলা" },
    { name: "Japanese", native: "日本語" },
    { name: "Hindi", native: "हिन्दी" },
    { name: "Chinese (Mandarin)", native: "普通话" },
  ];

  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [showLessons, setShowLessons] = useState(false);
  const [showSavedWords, setShowSavedWords] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
  const [showSentences, setShowSentences] = useState(false);
  const [showSentencePractice, setShowSentencePractice] = useState(false);
  const [practiceLanguage, setPracticeLanguage] = useState("Korean");
  const [showSentenceLanguage, setShowSentenceLanguage] = useState(false);

  const [completedLessons, setCompletedLessons] = useState([]);

  const [savedWords, setSavedWords] = useState(() => {
    const storedWords = localStorage.getItem("lingualearn-saved-words");
    return storedWords ? JSON.parse(storedWords) : [];
  });

  useEffect(() => {
    localStorage.setItem(
      "lingualearn-saved-words",
      JSON.stringify(savedWords)
    );
  }, [savedWords]);

  function toggleSavedWord(word) {
    setSavedWords((previous) => {
      const alreadySaved = previous.some(
        (item) =>
          item.word === word.word &&
          item.language === word.language &&
          item.lesson === word.lesson
      );

      if (alreadySaved) {
        return previous.filter(
          (item) =>
            !(
              item.word === word.word &&
              item.language === word.language &&
              item.lesson === word.lesson
            )
        );
      }

      return [...previous, word];
    });
  }

  function goHome() {
    setShowDashboard(false);
    setShowSavedWords(false);
    setShowLessons(false);
    setShowSentences(false);
    setShowSentencePractice(false);
    setShowSentenceLanguage(false);
  }

  function openSentenceLearning() {
    setShowDashboard(false);
    setShowSavedWords(false);
    setShowLessons(false);
    setShowSentences(true);
    setShowSentencePractice(false);
    setShowSentenceLanguage(true);
  }

  function openSentencePractice(language) {
  setPracticeLanguage(language);
  setShowSentences(false);
  setShowSentencePractice(true);
  }

  if (showSentenceLanguage) {
    return (
      <>
        <Navbar
          onHome={goHome}
          onDashboard={() => setShowDashboard(true)}
          onSavedWords={() => setShowSavedWords(true)}
        />

        <SentenceLanguagePage
          onSelectLanguage={(language) => {
            setSelectedLanguage(language);
            setShowSentenceLanguage(false);
            setShowSentences(true);
          }}
          onBack={goHome}
        />
      </>
    );
  }

  if (showSentencePractice) {
    return (
      <>
        <Navbar onHome={goHome} />

        <SentencePracticePage
          language={practiceLanguage}
          onBack={() => {
            setShowSentencePractice(false);
            setShowSentences(true);
          }}
        />
      </>
    );
  }

  if (showSentences) {
    return (
      <>
        <Navbar
          onHome={goHome}
        />
        <SentencePage
          language={selectedLanguage || "Korean"}
          onBack={goHome}
          onPractice={openSentencePractice}
        />
      </>
    );
  }

  if (showDashboard) {
    return (
      <>
        <Navbar
          onHome={goHome}
        />
        <DashboardPage
          selectedLanguage={selectedLanguage}
          completedLessons={completedLessons}
          savedWords={savedWords}
          onContinueLearning={() => {
            setSelectedLanguage(selectedLanguage || "Korean");
            setShowDashboard(false);
            setShowLessons(true);
          }}
        />
      </>
    );
  }

  if (showSavedWords) {
    return (
      <>
        <Navbar
          onHome={goHome}
        />

        <SavedWordsPage
          savedWords={savedWords}
          onRemove={toggleSavedWord}
          onBack={goHome}
        />
      </>
    );
  }

  if (showLessons) {
    return (
      <LessonPage
        language={selectedLanguage}
        savedWords={savedWords}
        onToggleSave={toggleSavedWord}
        onBack={goHome}
        onLessonComplete={(lessonTitle) => {
          setCompletedLessons((previous) =>
            previous.includes(lessonTitle)
              ? previous
              : [...previous, lessonTitle]
          );
        }}
      />
    );
  }

  return (
    <>
      <Navbar
        onHome={goHome}
      />
      <div className="home-actions">

        <button
          className="sentence-nav-button"
          onClick={openSentenceLearning}
        >
          Sentences
        </button>

        <button
          className="dashboard-nav-button"
          onClick={() => setShowDashboard(true)}
        >
          My Dashboard
        </button>

        <button
          className="saved-nav-button"
          onClick={() => setShowSavedWords(true)}
        >
          ♡ My Saved Words ({savedWords.length})
        </button>
      </div>

      <section className="hero-section">
        <p className="hero-label">WELCOME TO LINGUALEARN</p>
        <h1>Choose your next language.</h1>
        <p className="hero-description">
          A new language, a new world to explore.
        </p>
      </section>

      <ProgressCard
        completed={completedLessons.length}
        total={3}
      />

      <div className="language-container">
        {languages.map((language) => (
          <button
            key={language.name}
            className="language-card"
            onClick={() => {
              setSelectedLanguage(language.name);
              setShowLessons(true);
            }}
          >
            <h2>{language.name}</h2>
            <p>{language.native}</p>
          </button>
        ))}
      </div>

      <section className="sentence-feature-section">
        <div className="sentence-feature-card">
          <div className="sentence-feature-content">
            <p className="sentence-feature-label">PRACTICE & IMPROVE</p>
            <h2>Learn sentences, speak with confidence.</h2>
            <p>
              Explore useful everyday sentences, understand their meanings,
              and practice real-life conversations.
            </p>

            <button
              onClick={openSentenceLearning}
            >
              Explore Sentences →
            </button>
          </div>

          <div className="sentence-feature-icon">
            💬
          </div>
        </div>
      </section>

    </>
  );
}

export default App;
