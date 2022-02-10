import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { MessageSnapshot } from ".."
import { mockMessages } from "../../../mockData"
import { withEnvironment } from "../extensions/with-environment"
import { MessageModel, MessageType } from "../message/message"

/**
 * Model description here for TypeScript hints.
 */
export const MessagesStoreModel = types
  .model("MessagesStore")
  .props({
    messages: types.optional(types.array(MessageModel), []),
  })
  .extend(withEnvironment)
  .actions((self) => ({
    saveMessages: (MessageSnapshots: MessageSnapshot[]) => {
      self.messages.replace(MessageSnapshots)
    },
  }))
  .actions((self) => ({
    getMessages: async (userId: number) => {
      const messages = mockMessages
      self.saveMessages(messages)
    },
  }))

type MessagesStoreType = Instance<typeof MessagesStoreModel>
export interface MessagesStore extends MessagesStoreType {}
type MessagesStoreSnapshotType = SnapshotOut<typeof MessagesStoreModel>
export interface MessagesStoreSnapshot extends MessagesStoreSnapshotType {}
export const createMessagesStoreDefaultModel = () => types.optional(MessagesStoreModel, {})
