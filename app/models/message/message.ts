import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { UserModel } from "../user/user"

/**
 * Model description here for TypeScript hints.
 */
export const MessageModel = types.model("Message").props({
  id: types.identifierNumber,
  text: types.string,
  createdAt: types.number,
  image: types.maybe(types.string),
  user: UserModel,
})

export type MessageType = Instance<typeof MessageModel>
export interface Message extends MessageType {}
type MessageSnapshotType = SnapshotOut<typeof MessageModel>
export interface MessageSnapshot extends MessageSnapshotType {}
export const createMessageDefaultModel = () => types.optional(MessageModel, {})
