import { Router } from 'express';
import { getFeedback, addFeedback } from '../controllers/feedbackController';

const router = Router();

router.get('/', getFeedback);
router.post('/', addFeedback);

export default router;
