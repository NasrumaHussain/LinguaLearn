import { useState } from 'react';
import './App.css'
import LessonPage from './pages/LessonPage'
import Navbar from "./components/Navbar";
import ProgressCard from "./components/ProgressCard";

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
  const [completedLessons, setCompletedLessons] = useState([]);

      if(showLessons) {
      return (
        <LessonPage
        language={selectedLanguage}
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
      <div>
        <Navbar onHome={() => setShowLessons(false)} />

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
      </div>
    </>
  )
}

export default App
