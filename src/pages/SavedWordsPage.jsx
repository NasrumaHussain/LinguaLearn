import "./SavedWordsPage.css";

function SavedWordsPage({ savedWords, onRemove, onBack }) {
  return (
    <div className="saved-words-page">
      <button type="button" className="saved-back-button" onClick={onBack}>
        ← Back to Home
      </button>

      <header className="saved-header">
        <p>YOUR PERSONAL COLLECTION</p>
        <h1>My Saved Words</h1>
        <p>Keep your favourite vocabulary close and revise anytime.</p>
      </header>

      {savedWords.length === 0 ? (
        <div className="empty-saved">
          <h2>No saved words yet</h2>
          <p>Bookmark words while learning to find them here.</p>
        </div>
      ) : (
        <div className="saved-words-container">
          {savedWords.map((item) => (
            <div
              className="saved-word-card"
              key={`${item.language}-${item.lesson}-${item.word}`}
            >
              <p>{item.language} · {item.lesson}</p>
              <h2>{item.word}</h2>
              <h3>{item.pronunciation}</h3>
              <p className="saved-meaning">{item.meaning}</p>

              <button type="button" onClick={() => onRemove(item)}>
                Remove ♥
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SavedWordsPage;