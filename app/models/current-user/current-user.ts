import { Instance, SnapshotOut, types } from "mobx-state-tree"
/**
 * Model description here for TypeScript hints.
 */
export const CurrentUserModel = types
  .model("CurrentUser")
  .props({
    sessionId: types.maybe(types.string),
    name: types.maybe(types.string),
  })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

type CurrentUserType = Instance<typeof CurrentUserModel>
export interface CurrentUser extends CurrentUserType {}
type CurrentUserSnapshotType = SnapshotOut<typeof CurrentUserModel>
export interface CurrentUserSnapshot extends CurrentUserSnapshotType {}
export const createCurrentUserDefaultModel = () => types.optional(CurrentUserModel, {})
