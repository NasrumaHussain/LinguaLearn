import "./ProgressCard.css";

function ProgressCard({ completed, total }) {
  const percentage =
    total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <section className="progress-card">
      <div className="progress-heading">
        <div>
          <p className="progress-label">YOUR PROGRESS</p>
          <h2>Keep up the great work!</h2>
        </div>

        <div className="progress-percentage">
          {percentage}%
        </div>
      </div>

      <div className="progress-track">
        <div
          className="progress-fill"
          style={{ width: `${percentage}%` }}
        />
      </div>

      <p className="progress-description">
        {completed} of {total} lessons completed
      </p>
    </section>
  );
}

export default ProgressCard;