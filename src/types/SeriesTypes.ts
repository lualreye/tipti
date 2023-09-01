import { SeriesTypeEnum } from "../enums/SeriesEnum"

export type SeriesType = {
  id: number,
  years: string,
  title: string,
  type: SeriesTypeEnum,
  image: string,
  resourcesNumber: number
}