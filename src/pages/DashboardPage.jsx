
import "./DashboardPage.css";
import ProgressCard from "../components/ProgressCard";

function DashboardPage({
  selectedLanguage,
  completedLessons,
  savedWords,
  onContinueLearning,
}) {
  return (
    <main className="dashboard-page">

      <section className="dashboard-header">
        <p className="dashboard-label">YOUR LEARNING SPACE</p>
        <h1>Welcome to your dashboard.</h1>
        <p>
          Keep track of your progress and continue your
          language-learning journey.
        </p>
      </section>

      <section className="dashboard-stats">

        <div className="dashboard-stat-card">
          <span>Lessons Completed</span>
          <h2>{completedLessons.length}</h2>
          <p>Keep learning!</p>
        </div>

        <div className="dashboard-stat-card">
          <span>Saved Words</span>
          <h2>{savedWords.length}</h2>
          <p>Your personal vocabulary collection</p>
        </div>

        <div className="dashboard-stat-card">
          <span>Learning Language</span>
          <h2>{selectedLanguage || "Not selected"}</h2>
          <p>Your current learning choice</p>
        </div>

      </section>

      <section className="dashboard-progress">
        <h2>Your Overall Progress</h2>

        <ProgressCard
          completed={completedLessons.length}
          total={3}
        />
      </section>

      <section className="continue-learning">
        <div>
          <p className="dashboard-label">PICK UP WHERE YOU LEFT OFF</p>
          <h2>Ready for your next lesson?</h2>
          <p>
            Continue learning and build your vocabulary
            one step at a time.
          </p>
        </div>

        <button onClick={onContinueLearning}>
          Continue Learning →
        </button>
      </section>

    </main>
  );
}

export default DashboardPage;
