import { MessagesStoreModel } from "./messages-store"

test("can be created", () => {
  const instance = MessagesStoreModel.create({})

  expect(instance).toBeTruthy()
})
