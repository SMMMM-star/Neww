import create from 'zustand';
import { persist } from 'zustand/middleware';

interface Prediction {
  id: string;
  date: string;
  state: string;
  zone: string;
  weapon: string;
  ammunition: string;
  currentStock: number;
  prediction: any;
}

interface HistoryState {
  predictions: Prediction[];
  addPrediction: (prediction: Omit<Prediction, 'id' | 'date'>) => void;
}

export const useHistoryStore = create<HistoryState>()(
  persist(
    (set) => ({
      predictions: [],
      addPrediction: (prediction) =>
        set((state) => ({
          predictions: [
            {
              ...prediction,
              id: Math.random().toString(36).substr(2, 9),
              date: new Date().toISOString(),
            },
            ...state.predictions,
          ],
        })),
    }),
    {
      name: 'history-storage',
    }
  )
);