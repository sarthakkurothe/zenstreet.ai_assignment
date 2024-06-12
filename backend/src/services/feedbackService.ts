interface Feedback {
  id: number;
  name: string;
  feedback: string;
}

export class FeedbackService {
  private feedbacks: Feedback[] = [];
  private nextId = 1;

  addFeedback(feedback: Omit<Feedback, 'id'>) {
    const newFeedback = { id: this.nextId++, ...feedback };
    this.feedbacks.push(newFeedback);
  }

  getAllFeedback(page: number, pageSize: number): Feedback[] {
    const startIndex = (page - 1) * pageSize;
    const endIndex = page * pageSize;
    return this.feedbacks.slice(startIndex, endIndex);
  }
}
