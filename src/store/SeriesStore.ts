import { defineStore } from 'pinia';

import type { SeriesType } from '@/types/SeriesTypes';
import { getResources } from '@/utils/Series';
import APISeries from '@/services/Series/Series';

const seriesService = new APISeries();

interface Roostate {
  series: SeriesType[] | null,
  errorMessage: string | null,
  isLoading: boolean,
  count: number,
  limit: number,
  offset: number,
  serieSelected: SeriesType | null
}

export const useSeriesStore = defineStore('SeriesStore', {
  state: (): Roostate => ({
    series: null,
    errorMessage: null,
    isLoading: false,
    count: 0,
    limit: 20,
    offset: 0,
    serieSelected: null
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
          resourcesNumber: getResources(serie),
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
    },

    async getSeriesById(seriesId: string): Promise<void> {
      this.isLoading = true;
      const query = `series`
      try {
        const response = await seriesService.getSeriesById(query, seriesId);
        const serie = response.data.results[0]; 
        const seriesByIdData = {
          id: serie.id,
          type: serie.type,
          title: serie.title,
          image: `${serie.thumbnail.path}.${serie.thumbnail.extension}`,
          years: `${serie.endYear} - ${serie.startYear}`,
          comics: serie.comics,
          stories: serie.stories,
          resourcesNumber: getResources(serie)
        }
        this.serieSelected = seriesByIdData;
      } catch (error: any) {
        this.errorMessage = error.message;
      } finally {
        this.isLoading = false
      }
    }
  }
});

export default useSeriesStore;