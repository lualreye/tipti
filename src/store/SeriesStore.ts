import { defineStore } from 'pinia';

import type { SeriesType } from '@/types/SeriesTypes';
import APISeries from '@/services/Series/Series';

const seriesService = new APISeries();

interface Roostate {
  series: SeriesType[] | null,
  errorMessage: string | null,
  isLoading: boolean,
  count: 0,
  limit: 10,
  offset: 0,
}

export const useSeriesStore = defineStore('SeriesStore', {
  state: (): Roostate => ({
    series: null,
    errorMessage: null,
    isLoading: false,
    count: 0,
    limit: 10,
    offset: 0,
  }),

  actions: {
    async getSeries(): Promise<void> {
      this.isLoading = true;
      try {
        const response = await seriesService.getSeries('series');
        this.count = response.data.count;
        this.limit = response.data.limit;
        this.offset = response.data.offset;
        this.series = response.data.results.map((serie: any) => {
          return {
            id: serie.id,
            type: serie.type,
            title: serie.title,
            image: serie.thumbnail.path + serie.thumbnail.extension,
            years: `${serie.endYear} - ${serie.startYear}`
          }
        })
        // this.series = response;
      } catch (error: any) {
        this.errorMessage = error.message;
      } finally {
        this.isLoading = false;
      }
    }
  }
});

export default useSeriesStore;