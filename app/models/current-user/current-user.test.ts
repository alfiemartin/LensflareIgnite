import { CurrentUserModel } from "./current-user"

test("can be created", () => {
  const instance = CurrentUserModel.create({})

  expect(instance).toBeTruthy()
})
