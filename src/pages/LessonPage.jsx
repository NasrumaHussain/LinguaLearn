import { useState } from "react";
import "./LessonPage.css"
import VocabularyPage from "./VocabularyPage";

function LessonPage({language, onBack, onLessonComplete, savedWords, onToggleSave, completedLessons = [] }){
  const lessons = [
    { 
      title: "Greetings", 
      description: "Learn how to say hello and goodbye.",
      number:"01",
    },
    
    {
      title: "Basic Words",
      description: "Learn common words and expressions.",
      number:"02",
    },
    { 
      title: "Numbers", 
      description: "Learn to count from 1 to 10.",
      number:"03",
    },
  ];

  const [selectedLesson, setSelectedLesson] = useState(null);

  if (selectedLesson) {
  return (
    <VocabularyPage
      language={language}
      lesson={selectedLesson}
      onBack={() => setSelectedLesson(null)}
      onComplete={() => onLessonComplete(selectedLesson)}
      isLessonComplete={completedLessons.includes(selectedLesson)}
      savedWords={savedWords}
      onToggleSave={onToggleSave}
    />
  );
}

  return (
    <div className="lesson-page">
      <button  type="button" className="back-button" onClick={onBack}>
        ← All Languages
      </button>

      <header className="lesson-header">
        <p className="lesson-label">YOUR LEARNING JOURNEY</p>
        <h1>Learn {language}</h1>
        <p>Start with the basics and build your skills one lesson at a time.</p>
      </header>

      <h2 className="lesson-section-title">Beginner Lessons</h2>

      <div className="lesson-container">
        {lessons.map((lesson) => (
          <div className="lesson-card" key={lesson.number}>
            <span className="lesson-number">{lesson.number}</span>
            <h3>{lesson.title}</h3>
             {completedLessons.includes(lesson.title) && (
              <p className="lesson-completed" role="status">Completed ✓</p>
            )}
            <p>{lesson.description}</p>
            <button type="button"
              className="start-button"
              onClick={() => setSelectedLesson(lesson.title)}
            >
              Start Learning →
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LessonPage

