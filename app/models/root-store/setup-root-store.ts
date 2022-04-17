import { onSnapshot } from "mobx-state-tree"
import { RootStoreModel, RootStore } from "./root-store"
import { Environment } from "../environment"
import * as storage from "../../utils/storage"
import cloneDeep from "lodash.clonedeep"

/**
 * The key we'll be saving our state as within async storage.
 */
const ROOT_STATE_STORAGE_KEY = "root"

/**
 * Setup the environment that all the models will be sharing.
 *
 * The environment includes other functions that will be picked from some
 * of the models that get created later. This is how we loosly couple things
 * like events between models.
 */
export async function createEnvironment() {
  const env = new Environment()
  await env.setup()
  return env
}

/**
 * Setup the root state.
 */
export async function setupRootStore() {
  let rootStore: RootStore
  let data: any

  // prepare the environment that will be associated with the RootStore.
  const env = await createEnvironment()
  try {
    // load data from storage

    // data = (await storage.load(ROOT_STATE_STORAGE_KEY)) || {}

    // console.log(data.usersStore)
    rootStore = RootStoreModel.create({}, env)
  } catch (e) {
    // if there's any problems loading, then let's at least fallback to an empty state
    // instead of crashing.
    rootStore = RootStoreModel.create({}, env)
    // but please inform us what happened
    __DEV__ && console.tron.error(e.message, null)
  }

  await rootStore.usersStore.getSavedUser()
  // await rootStore.profileCardStore.getProfileCards()
  // await storage.clear()

  // await rootStore.usersStore.destorySavedUserFromKeychain()

  // reactotron logging
  if (__DEV__) {
    env.reactotron.setRootStore(rootStore, data)
  }
  // const { name, sessionId } = rootStore.usersStore.currentUser

  // track changes & save to storage
  onSnapshot(rootStore, (snapshot) => {
    const newSnapshot = cloneDeep(snapshot)

    newSnapshot.usersStore.currentUser.sessionId = null
    newSnapshot.usersStore.currentUser.name = null

    storage.save(ROOT_STATE_STORAGE_KEY, newSnapshot)
  })

  return rootStore
}
