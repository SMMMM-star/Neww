import create from 'zustand';
import { persist } from 'zustand/middleware';

interface FeedbackItem {
  id: string;
  userId: string;
  username: string;
  message: string;
  date: string;
  status: 'pending' | 'reviewed';
}

interface FeedbackState {
  feedback: FeedbackItem[];
  addFeedback: (userId: string, username: string, message: string) => void;
  updateFeedbackStatus: (id: string, status: 'pending' | 'reviewed') => void;
}

export const useFeedbackStore = create<FeedbackState>()(
  persist(
    (set) => ({
      feedback: [],
      addFeedback: (userId, username, message) =>
        set((state) => ({
          feedback: [
            {
              id: Math.random().toString(36).substr(2, 9),
              userId,
              username,
              message,
              date: new Date().toISOString(),
              status: 'pending',
            },
            ...state.feedback,
          ],
        })),
      updateFeedbackStatus: (id, status) =>
        set((state) => ({
          feedback: state.feedback.map((item) =>
            item.id === id ? { ...item, status } : item
          ),
        })),
    }),
    {
      name: 'feedback-storage',
    }
  )
);