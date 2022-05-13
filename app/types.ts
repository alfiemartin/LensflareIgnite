import { ProfileCardSnapshot } from "./models"

export type AnyObject = Record<string, unknown>

export interface Post {
  _id: string
  postImage: string
  posterName: string
  posterProfilePic: string
  geometry: {
    coordinates: [number, number]
    type: "Point"
  }
}

export enum SwipeState {
  PREV,
  CURRENT,
  NEXT,
}

export interface ICardState {
  counter: number
  translationX: number
  state: SwipeState
  data: ProfileCardSnapshot
}
