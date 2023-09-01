export function getResources(serie: any): number {
  const { stories, comics, events } = serie;
  const storiesReturned = stories ? stories.returned || 0 : 0;
  const comicsReturned = comics ? comics.returned || 0 : 0;
  const eventsReturned = events ? events.returned || 0 : 0;

  return storiesReturned + comicsReturned + eventsReturned;
}