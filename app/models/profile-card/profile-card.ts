import { Instance, SnapshotOut, types } from "mobx-state-tree"

/**
 * Model description here for TypeScript hints.
 */
export const ProfileCardModel = types.model("ProfileCard").props({
  id: types.identifierNumber,
  name: types.string,
  image: types.string,
})

type ProfileCardType = Instance<typeof ProfileCardModel>
export interface ProfileCard extends ProfileCardType {}
type ProfileCardSnapshotType = SnapshotOut<typeof ProfileCardModel>
export interface ProfileCardSnapshot extends ProfileCardSnapshotType {}
export const createProfileCardDefaultModel = () => types.optional(ProfileCardModel, {})
