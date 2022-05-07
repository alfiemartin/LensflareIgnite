import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { ProfileCardModel } from "../profile-card/profile-card"

/**
 * Model description here for TypeScript hints.
 */
export const UserModel = types.model("User").props({
  _id: types.identifierNumber,
  name: types.string,
  avatar: types.maybe(types.string),
  posts: types.optional(types.array(ProfileCardModel), []),
})

type UserType = Instance<typeof UserModel>
export interface User extends UserType {}
type UserSnapshotType = SnapshotOut<typeof UserModel>
export interface UserSnapshot extends UserSnapshotType {}
export const createUserDefaultModel = () => types.optional(UserModel, {})
