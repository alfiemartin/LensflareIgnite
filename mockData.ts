import { User } from "./app/models"
import { Message } from "./app/models/message/message"

const mockProfileCardData = [
  {
    id: 0,
    name: "nerd",
    image:
      "https://firebasestorage.googleapis.com/v0/b/lensflare-41b96.appspot.com/o/IMG_5360.jpg?alt=media&token=0fe11ea4-f56e-4711-a0d0-144b5522ae97",
  },
  {
    id: 1,
    name: "seb",
    image:
      "https://firebasestorage.googleapis.com/v0/b/lensflare-41b96.appspot.com/o/groups.jpg?alt=media&token=1cb0b7a8-93f7-467f-934e-11f74a18ddd3",
  },
  {
    id: 2,
    name: "roy",
    image:
      "https://firebasestorage.googleapis.com/v0/b/lensflare-41b96.appspot.com/o/MeTwo.jpeg?alt=media&token=8d7f46d1-cd24-4974-b1be-ba85f0527d66",
  },
  {
    id: 3,
    name: "henrt",
    image:
      "https://firebasestorage.googleapis.com/v0/b/lensflare-41b96.appspot.com/o/follower.jpg?alt=media&token=efe34f28-3806-4626-a4a3-b30bb49f0fa4",
  },
  {
    id: 4,
    name: "jack",
    image:
      "https://firebasestorage.googleapis.com/v0/b/lensflare-41b96.appspot.com/o/jack.jpeg?alt=media&token=5ac29c38-47e8-4fe8-99da-2fc543c21b85",
  },
  {
    id: 5,
    name: "nerd",
    image:
      "https://firebasestorage.googleapis.com/v0/b/lensflare-41b96.appspot.com/o/IMG_5360.jpg?alt=media&token=0fe11ea4-f56e-4711-a0d0-144b5522ae97",
  },
  {
    id: 6,
    name: "seb",
    image:
      "https://firebasestorage.googleapis.com/v0/b/lensflare-41b96.appspot.com/o/groups.jpg?alt=media&token=1cb0b7a8-93f7-467f-934e-11f74a18ddd3",
  },
  {
    id: 7,
    name: "roy",
    image:
      "https://firebasestorage.googleapis.com/v0/b/lensflare-41b96.appspot.com/o/MeTwo.jpeg?alt=media&token=8d7f46d1-cd24-4974-b1be-ba85f0527d66",
  },
  {
    id: 8,
    name: "henrt",
    image:
      "https://firebasestorage.googleapis.com/v0/b/lensflare-41b96.appspot.com/o/follower.jpg?alt=media&token=efe34f28-3806-4626-a4a3-b30bb49f0fa4",
  },
  {
    id: 9,
    name: "jack",
    image:
      "https://firebasestorage.googleapis.com/v0/b/lensflare-41b96.appspot.com/o/jack.jpeg?alt=media&token=5ac29c38-47e8-4fe8-99da-2fc543c21b85",
  },
]

const mockUser: User[] = [
  {
    id: 0,
    avatar: mockProfileCardData[0].image,
    name: mockProfileCardData[0].name,
  },
  {
    id: 1,
    avatar: mockProfileCardData[1].image,
    name: mockProfileCardData[1].name,
  },
  {
    id: 2,
    avatar: mockProfileCardData[2].image,
    name: mockProfileCardData[2].name,
  },
  {
    id: 3,
    avatar: mockProfileCardData[3].image,
    name: mockProfileCardData[3].name,
  },
  {
    id: 4,
    avatar: mockProfileCardData[4].image,
    name: mockProfileCardData[4].name,
  },
  {
    id: 5,
    avatar: mockProfileCardData[5].image,
    name: mockProfileCardData[5].name,
  },
]

const mockMessages: Message[] = [
  {
    id: 0,
    createdAt: 74384837,
    user: mockUser[0],
    text: "test text",
    image: undefined,
  },
  {
    id: 1,
    createdAt: 743837,
    user: mockUser[1],
    text: "test textdsadsadsa",
    image: undefined,
  },
]

export { mockProfileCardData, mockUser, mockMessages }
