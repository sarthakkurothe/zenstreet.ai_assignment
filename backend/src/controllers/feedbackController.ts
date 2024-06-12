import { Request, Response } from 'express';
import { FeedbackService } from '../services/feedbackService';

const feedbackService = new FeedbackService();

export const getFeedback = (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const pageSize = 10; // Adjust page size as needed
  const feedbacks = feedbackService.getAllFeedback(page, pageSize);
  res.json(feedbacks);
};

export const addFeedback = (req: Request, res: Response) => {
  const { name, feedback } = req.body;
  feedbackService.addFeedback({ name, feedback });
  res.status(201).json({ message: 'Feedback added successfully' });
};
