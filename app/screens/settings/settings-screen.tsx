import React from "react"
import { observer } from "mobx-react-lite"
import { Button, ViewStyle } from "react-native"
import { ClearStorageButton, Screen, Text } from "../../components"
import { color } from "../../theme"
import { useStores } from "../../models"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.black,
  flex: 1,
}

export const SettingsScreen = observer(function SettingsScreen() {
  // Pull in one of our MST stores
  const { profileCardStore } = useStores()

  return (
    <Screen style={ROOT} preset="scroll">
      <Text preset="header" text="Settings" />
      <ClearStorageButton />
      <Button title="getPosts" onPress={profileCardStore.getPostsFromServer} />
    </Screen>
  )
})
