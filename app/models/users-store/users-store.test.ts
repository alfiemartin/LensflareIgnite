import { UsersStoreModel } from "./users-store"

test("can be created", () => {
  const instance = UsersStoreModel.create({})

  expect(instance).toBeTruthy()
})
