import * as React from "react"
import { StyleProp, Button, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import * as storage from "../../utils/storage/storage"
import { useStores } from "../../models"
export interface ClearStorageButtonProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
}

/**
 * Describe your component here
 */
export const ClearStorageButton = observer(function ClearStorageButton(
  props: ClearStorageButtonProps,
) {
  const { usersStore } = useStores()

  const clearStorage = () => {
    usersStore.destorySavedUserFromKeychain()
    usersStore.deleteCurrentUser()
    storage.clear()
  }

  return (
    <View style={{ backgroundColor: "#333333" }}>
      <Button title="clear storage" onPress={clearStorage}></Button>
    </View>
  )
})
