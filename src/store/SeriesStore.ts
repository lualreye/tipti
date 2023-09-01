import { defineStore } from 'pinia';

import type { SeriesType } from '@/types/SeriesTypes';
import APISeries from '@/services/Series/Series';

const seriesService = new APISeries();

interface Roostate {
  series: SeriesType[] | null,
  errorMessage: string | null,
  isLoading: boolean,
  count: number,
  limit: number,
  offset: number,
}

export const useSeriesStore = defineStore('SeriesStore', {
  state: (): Roostate => ({
    series: null,
    errorMessage: null,
    isLoading: false,
    count: 0,
    limit: 20,
    offset: 0,
  }),

  actions: {
    async getSeries(): Promise<void> {
      this.isLoading = true;
      const query = `series?limit=${this.limit}${this.offset ? `&offset=${this.offset}` : ''}`;
    
      try {
        const response = await seriesService.getSeries(query);
        const seriesData = response.data.results.map((serie: any) => ({
          id: serie.id,
          type: serie.type,
          title: serie.title,
          image: `${serie.thumbnail.path}.${serie.thumbnail.extension}`,
          years: `${serie.endYear} - ${serie.startYear}`,
        }));
    
        if (!this.offset) {
          this.series = seriesData;
        } else {
          this.series?.push(...seriesData);
        }
      } catch (error: any) {
        this.errorMessage = error.message;
      } finally {
        this.offset += 20;
        this.isLoading = false;
      }
    }
  }
});

export default useSeriesStore;