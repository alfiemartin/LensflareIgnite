import React from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { Screen, Text } from "../../components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color } from "../../theme"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.black,
  flex: 1,
}

export const ProfileEditorScreen = observer(function ProfileEditorScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <Screen style={ROOT} preset="scroll">
      <Text preset="header" text="" />
      <Text style={{ color: "white" }}>list of previous posts which were saved</Text>
      <Text style={{ color: "white" }}>bio</Text>
      <Text style={{ color: "white" }}>organise photos</Text>
    </Screen>
  )
})
