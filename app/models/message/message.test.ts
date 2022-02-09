import { MessageModel } from "./message"

test("can be created", () => {
  const instance = MessageModel.create({})

  expect(instance).toBeTruthy()
})
