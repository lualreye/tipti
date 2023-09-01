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
    addSerieToHistory(serie: SeriesType): void {
      if (this.seriesSeen.length) {
        const idExists = this.seriesSeen.some(serieSeen => serieSeen.id === serie.id);
        if (!idExists) {
          this.seriesSeen.push(serie);
        }
      } else {
        this.seriesSeen.push(serie);
      }
    },

    saveSerie(id: number): void {
      const indexInSeen = this.seriesSeen.findIndex(item => item.id === id);
      const indexInSaved = this.seriesSaved.findIndex(item => item.id === id);

      if (indexInSeen !== -1) {
        const removedserie = this.seriesSeen.splice(indexInSeen, 1)[0];
        if (indexInSaved !== -1) {
          this.seriesSaved.splice(indexInSaved, 1);
        }
        this.seriesSaved.push(removedserie);
      } else if (indexInSaved !== -1) {
        this.seriesSaved.splice(indexInSaved, 1);
      }
    }
  },

  getters: {
    getTotalResources(): number {
      const total = this.seriesSaved.reduce((accumulator, currentObject) => {
        if (currentObject.hasOwnProperty('number')) {
          return accumulator + currentObject.resourcesNumber;
        } else {
          return accumulator;
        }
      }, 0);
    
      return total;
    }
  }
});

export default useHistoryStore;