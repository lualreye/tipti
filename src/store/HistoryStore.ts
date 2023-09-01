import { defineStore } from 'pinia';

import type { SeriesType } from '@/types/SeriesTypes';

interface Roostate {
  errorMessage: string | null,
  isLoading: boolean,
  seriesSeen: SeriesType[];
  seriesSaved: SeriesType[];
}

export const useHistoryStore = defineStore('HistoryStore', {
  state: (): Roostate => ({
    errorMessage: null,
    isLoading: false,
    seriesSeen: [],
    seriesSaved: [],
  }),

  actions: {
    addSerieToHistory(serie: SeriesType) {
      if (this.seriesSeen.length) {
        const idExists = this.seriesSeen.some(serieSeen => serieSeen.id === serie.id);
        if (!idExists) {
          this.seriesSeen.push(serie);
        }
      } else {
        this.seriesSeen.push(serie);
      }
    }
  }
});

export default useHistoryStore;