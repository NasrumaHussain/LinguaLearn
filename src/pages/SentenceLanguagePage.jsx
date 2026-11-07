
import "./SentenceLanguagePage.css";

function SentenceLanguagePage({ onSelectLanguage, onBack }) {
  const languages = [
    { name: "Korean", native: "한국어", description: "Learn everyday Korean sentences." },
    { name: "Bangla", native: "বাংলা", description: "Learn useful Bangla sentences." },
    { name: "Japanese", native: "日本語", description: "Explore everyday Japanese." },
    { name: "Hindi", native: "हिन्दी", description: "Practice common Hindi sentences." },
    { name: "Chinese (Mandarin)", native: "普通话", description: "Learn practical Mandarin sentences." }
  ];

  return (
    <section className="sentence-language-page">
      <button className="sentence-back" onClick={onBack}>
        ← Back to Home
      </button>

      <p className="sentence-label">SENTENCE LEARNING</p>
      <h1>Which language would you like to learn?</h1>
      <p className="sentence-intro">
        Choose a language to explore useful everyday sentences
        and practice real conversations.
      </p>

      <div className="sentence-language-grid">
        {languages.map((language) => (
          <button
            key={language.name}
            className="sentence-language-card"
            onClick={() => onSelectLanguage(language.name)}
          >
            <span className="sentence-native">
              {language.native}
            </span>

            <h2>{language.name}</h2>
            <p>{language.description}</p>

            <span className="sentence-card-link">
              Explore sentences →
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}

export default SentenceLanguagePage;
