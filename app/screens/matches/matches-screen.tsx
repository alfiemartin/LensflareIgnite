import React, { useEffect } from "react"
import { observer } from "mobx-react-lite"
import { View, ViewStyle } from "react-native"
import { ChatPreview, Screen, Text } from "../../components"
import { color } from "../../theme"
import { FlatList } from "react-native-gesture-handler"
import { useStores } from "../../models"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.fullBlack,
  flex: 1,
}

const MATCHES_CONTAINER: ViewStyle = {
  flex: 1,
  backgroundColor: color.background,
  borderBottomLeftRadius: 20,
  borderBottomRightRadius: 20,
}

const ROUNDED_BOTTOM_CONTAINER: ViewStyle = {
  flex: 1,
  overflow: "hidden",
  borderBottomLeftRadius: 20,
  borderBottomRightRadius: 20,
}

export const MatchesScreen = observer(function MatchesScreen() {
  // Pull in one of our MST stores
  const { profileCardStore } = useStores()
  const profiles = profileCardStore.profiles

  return (
    <Screen style={ROOT}>
      <View style={MATCHES_CONTAINER}>
        <View style={ROUNDED_BOTTOM_CONTAINER}>
          <FlatList
            data={profiles}
            style={{ overflow: "hidden" }}
            contentContainerStyle={{
              overflow: "hidden",
            }}
            renderItem={({ item, index }) => {
              return <ChatPreview key={index} name={item.name} image={item.image} />
            }}
          />
        </View>
      </View>
    </Screen>
  )
})
