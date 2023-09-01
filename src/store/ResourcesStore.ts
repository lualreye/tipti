import { defineStore } from 'pinia';

import { ResourceType } from '@/types/ResourcesTypes';
import { ResourceEnum } from '@/enums/ResourcesEnum';
import APIStories from '@/services/Resources/Stories';
import APIComics from '@/services/Resources/Comics';

const comicsService = new APIComics();
const storiesService = new APIStories();

interface Roostate {
  comics: ResourceType[] | null,
  stories: ResourceType[] | null,
  errorMessage: string | null,
  isLoading: boolean,
  count: number,
  limit: number,
  offset: number,
}

export const useResourcesStore = defineStore('ResourcesStore', {
  state: (): Roostate => ({
    comics: null,
    stories: null,
    errorMessage: null,
    isLoading: false,
    count: 0,
    limit: 20,
    offset: 0,
  }),

  actions: {
    async getResources(resourceType: string, seriesId: number): Promise<void> {
      this.isLoading = true;
      let query: string;

      try {
        if (resourceType === ResourceEnum.COMICS) {
          query = `series/${seriesId}/comics?`;
          const response = await comicsService.getComics(query);
          const comicsData: ResourceType[] = response.data.results.map((comic: any) => ({
            id: comic.id,
            component: ResourceEnum.COMICS,
            description: comic.description,
            title: comic.title,
            image: !comic.thumbnail ? '' : `${comic.thumbnail.path}.${comic.thumbnail.extension}`,
          }));

          this.comics = comicsData;
        } else {
          query = `series/${seriesId}/stories?`;
          const response = await storiesService.getStories(query);
          const storiesData: ResourceType[] = response.data.results.map((story: any) => ({
            id: story.id,
            component: ResourceEnum.STORIES,
            description: story.description,
            title: story.title,
            image: !story.thumbnail ? '' : `${story.thumbnail.path}.${story.thumbnail.extension}`,
          }));
          this.stories = storiesData;
        }    
      } catch (error: any) {
        this.errorMessage = error.message;
      } finally {
        this.isLoading = false;
      }
    },
  }
});

export default useResourcesStore;