import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { ProfileCard, ProfileCardModel, ProfileCardSnapshot } from "../profile-card/profile-card"
import { mockProfileCardData } from "../../../mockData"
import { getAllPostsQuery } from "../../utils/queries"
import { useQuery } from "../../utils/general"
import { Post } from "../../types"

export const ProfileCardStoreModel = types
  .model("ProfileCardStore")
  .props({
    profiles: types.optional(types.array(ProfileCardModel), []),
    serverProfiles: types.optional(types.array(ProfileCardModel), []),
  })
  .actions((self) => ({
    saveProfileCards: (ProfileCardSnapshots: ProfileCardSnapshot[]) => {
      self.profiles.replace(ProfileCardSnapshots)
    },
  }))
  .actions((self) => ({
    getMockPosts: async () => {
      const results = mockProfileCardData

      self.saveProfileCards(results)
    },
  }))
  .actions((self) => ({
    getPostsFromServer: async () => {
      const users: { data: { getPosts: Post[] } } = await useQuery(
        process.env.GQL_URL,
        getAllPostsQuery,
      ).then((res) => res.json())

      const profiles: ProfileCard[] = users?.data?.getPosts?.map((user) => {
        return {
          id: user._id,
          image: user.postImage,
          name: user.posterName,
        }
      })

      self.saveProfileCards(profiles)
    },
  }))

type ProfileCardStoreType = Instance<typeof ProfileCardStoreModel>
export interface ProfileCardStore extends ProfileCardStoreType {}
type ProfileCardStoreSnapshotType = SnapshotOut<typeof ProfileCardStoreModel>
export interface ProfileCardStoreSnapshot extends ProfileCardStoreSnapshotType {}
export const createProfileCardStoreDefaultModel = () => types.optional(ProfileCardStoreModel, {})
