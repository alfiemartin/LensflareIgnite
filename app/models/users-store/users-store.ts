import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { UserModel, UserSnapshot } from "../user/user"
import { mockUser } from "../../../mockData"
import { withEnvironment } from "../extensions/with-environment"
import { CurrentUserModel } from "../current-user/current-user"
import * as SecureStore from "expo-secure-store"

/**
 * Model description here for TypeScript hints.
 */
export const UsersStoreModel = types
  .model("UsersStore")
  .props({
    users: types.optional(types.array(UserModel), []),
    currentUser: types.optional(CurrentUserModel, {}),
  })
  .extend(withEnvironment)
  .actions((self) => ({
    saveUsers: (UserSnapshots: UserSnapshot[]) => {
      self.users.replace(UserSnapshots)
    },
  }))
  .actions((self) => ({
    getUsers: async (userId?: number) => {
      const users = mockUser
      self.saveUsers(users)
    },
  }))
  .actions((self) => ({
    saveCurrentUser: async (sessionId: string) => {
      self.currentUser.sessionId = sessionId
    },
  }))
  .actions((self) => ({
    getSavedUser: async () => {
      try {
        const result = await SecureStore.getItemAsync("sessionId")

        if (result) self.saveCurrentUser(result)
      } catch (e) {
        console.log(e)
      }
    },
  }))

type UsersStoreType = Instance<typeof UsersStoreModel>
export interface UsersStore extends UsersStoreType {}
type UsersStoreSnapshotType = SnapshotOut<typeof UsersStoreModel>
export interface UsersStoreSnapshot extends UsersStoreSnapshotType {}
export const createUsersStoreDefaultModel = () => types.optional(UsersStoreModel, {})
