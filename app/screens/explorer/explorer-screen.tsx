import React from "react"
import { observer } from "mobx-react-lite"
import { View, ViewStyle } from "react-native"
import { DualProfileCardLoader, Screen } from "../../components"
import { color } from "../../theme"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.fullBlack,
  flex: 1,
}

const CARD_CONTAINER: ViewStyle = {
  backgroundColor: color.background,
  flex: 1,
  borderBottomLeftRadius: 20,
  borderBottomRightRadius: 20,
}

export const ExplorerScreen = observer(function ExplorerScreen(props) {
  return (
    <Screen style={ROOT} statusBar="dark-content">
      <View style={CARD_CONTAINER}>
        <DualProfileCardLoader />
      </View>
    </Screen>
  )
})
