import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { UserModel, UserSnapshot } from "../user/user"
import { mockUser } from "../../../mockData"
import { withEnvironment } from "../extensions/with-environment"

/**
 * Model description here for TypeScript hints.
 */
export const UsersStoreModel = types
  .model("UsersStore")
  .props({
    users: types.optional(types.array(UserModel), []),
  })
  .extend(withEnvironment)
  .actions((self) => ({
    saveUsers: (UserSnapshots: UserSnapshot[]) => {
      self.users.replace(UserSnapshots)
    },
  }))
  .actions((self) => ({
    getUsers: async (userId: number) => {
      const users = mockUser
      self.saveUsers(users)
    },
  }))

type UsersStoreType = Instance<typeof UsersStoreModel>
export interface UsersStore extends UsersStoreType {}
type UsersStoreSnapshotType = SnapshotOut<typeof UsersStoreModel>
export interface UsersStoreSnapshot extends UsersStoreSnapshotType {}
export const createUsersStoreDefaultModel = () => types.optional(UsersStoreModel, {})
