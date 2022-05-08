import React, { useEffect } from "react"
import { observer } from "mobx-react-lite"
import { View, ViewStyle } from "react-native"
import { DualProfileCardLoader, Screen } from "../../components"
import { color } from "../../theme"
import { useStores } from "../../models"

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
  const { profileCardStore } = useStores()
  const { profiles } = profileCardStore

  useEffect(() => {
    ;(async () => {
      await profileCardStore.getPostsFromServer()
    })()
  }, [])

  return (
    <Screen style={ROOT} statusBar="dark-content">
      <View style={CARD_CONTAINER}>{profiles.length > 0 && <DualProfileCardLoader />}</View>
    </Screen>
  )
})
