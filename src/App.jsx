import { useState,useEffect } from 'react';
import './App.css'
import LessonPage from './pages/LessonPage'
import Navbar from "./components/Navbar";
import ProgressCard from "./components/ProgressCard";
import SavedWordsPage from "./pages/SavedWordsPage";

function App() {
  const languages = [
    {name: "Korean", native: "한국어"},
    {name: "Bangla", native: "বাংলা"},
    {name: "Japanese", native: "日本語"},
    {name: "English", native: "English"},
    { name: "Chinese (Mandarin)", native: "普通话" },
  ];

  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [showLessons, setShowLessons] = useState(false);
  const [showSavedWords, setShowSavedWords] = useState(false);
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

  if (showSavedWords) {
    return (
      <>
        <Navbar
          onHome={() => {
            setShowSavedWords(false);
            setShowLessons(false);
          }}
        />
        <SavedWordsPage
          savedWords={savedWords}
          onRemove={toggleSavedWord}
          onBack={() => setShowSavedWords(false)}
        />
      </>
    );
  }
  
      if(showLessons) {
      return (
        <LessonPage
        language={selectedLanguage}
          savedWords={savedWords}
        onToggleSave={toggleSavedWord}
        onBack={() => setShowLessons(false)} 
        onLessonComplete={(lessonTitle) => {
        setCompletedLessons((previous) =>
        previous.includes(lessonTitle) ? previous: [...previous, lessonTitle]
            );
          }}
        />
      );
    }

  return (
    <>
      
        <Navbar onHome={() =>{ setShowLessons(false);
                              setShowSavedWords(false);
        } } 
          />
         <button
        className="saved-nav-button"
        onClick={() => setShowSavedWords(true)}
      >
        ♡ My Saved Words ({savedWords.length})
      </button>
        <h1>LinguaLearn</h1>
        <p>Choose a language to start learning: </p>

        <ProgressCard completed={completedLessons.length} 
        total={3}
        />
        
       <div className="language-container"> 
        {languages.map((language) => (
          <button 
          key={language.name}
          className="language-card"
          onClick={() => {
            setSelectedLanguage(language.name)
            setShowLessons(true);
          }}
          >
            <h2>{language.name}</h2>
            <p>{language.native}</p>
            </button>
          ))}
        </div>

          {selectedLanguage && (
            <p> You selected {selectedLanguage}</p>
          )}
    </>
  );
}

export default App;
