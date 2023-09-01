import { ResourceEnum } from "@/enums/ResourcesEnum"

export type ResourceSummaryType = {
  resourceURI?: string,
  name?: string
}

export type ResourcesListType = {
  available: number,
  returned: number,
  collectionURI: string,
  items: ResourceSummaryType[]
}

export type ResourceType = {
  id: number,
  image: string,
  description: string,
  title: string,
  component: ResourceEnum
}