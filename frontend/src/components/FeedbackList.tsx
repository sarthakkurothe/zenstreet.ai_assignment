import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FeedbackList.css';

interface Feedback {
  id: number;
  name: string;
  feedback: string;
}

const FeedbackList: React.FC = () => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/feedback');
      setFeedbacks(response.data);
    } catch (error) {
      console.error('Error fetching feedbacks:', error);
    }
  };

  return (
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
  );
};

export default FeedbackList;
