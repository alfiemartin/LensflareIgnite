import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { UsersStoreModel } from "../users-store/users-store"
import { CharacterStoreModel } from "../character-store/character-store"
import { MessagesStoreModel } from "../messages-store/messages-store"
import { ProfileCardStoreModel } from "../profile-card-store/profile-card-store"

/**
 * A RootStore model.
 */
// prettier-ignore
export const RootStoreModel = types.model("RootStore").props({
  characterStore: types.optional(CharacterStoreModel, {} as any),
  profileCardStore: types.optional(ProfileCardStoreModel, {} as any),
  messagesStore: types.optional(MessagesStoreModel, {} as any),
  usersStore: types.optional(UsersStoreModel, {} as any)
})

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}

/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
