import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FeedbackForm.css';
import './FeedbackList.css';

interface Feedback {
  id: number;
  name: string;
  feedback: string;
}

const FeedbackForm: React.FC = () => {
  const [name, setName] = useState('');
  const [feedback, setFeedback] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);

  const fetchFeedbacks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/feedback');
      setFeedbacks(response.data);
    } catch (err: any) {
      if (err.response && err.response.status === 429) {
        throw new Error('Too Many Requests');
      } else {
        console.error('Error fetching feedbacks:', err);
      }
    }
  };

  const fetchFeedbacksWithRetry = async (retries = 5, delay = 1000) => {
    for (let i = 0; i < retries; i++) {
      try {
        await fetchFeedbacks();
        return;
      } catch (err: any) {
        if (err.message === 'Too Many Requests' && i < retries - 1) {
          await new Promise(resolve => setTimeout(resolve, delay * (i + 1)));
        } else {
          throw err;
        }
      }
    }
  };

  useEffect(() => {
    fetchFeedbacksWithRetry();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      await axios.post('http://localhost:5000/feedback', { name, feedback });
      setName('');
      setFeedback('');
      await fetchFeedbacksWithRetry();
    } catch (err) {
      setError('Error submitting feedback');
      console.error('Error submitting feedback:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="feedback-container">
      <div className="feedback-form">
        <h2 className="form-title">Submit Feedback</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="feedback">Feedback:</label>
            <textarea
              id="feedback"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              required
            />
          </div>
          {isLoading ? (
            <p className="form-message">Sending feedback...</p>
          ) : error ? (
            <p className="form-message form-error">{error}</p>
          ) : null}
          <button type="submit" disabled={isLoading}>
            Submit
          </button>
        </form>
      </div>
      <div className="feedback-list">
        <h2 className="list-title">Feedback List</h2>
        {feedbacks.length === 0 ? (
          <p className="empty-list-message">No feedbacks available</p>
        ) : (
          <ul className="feedback-items">
            {feedbacks.map((feedback) => (
              <li key={feedback.id} className="feedback-item">
                <h3>{feedback.name}</h3>
                <p>{feedback.feedback}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default FeedbackForm;
