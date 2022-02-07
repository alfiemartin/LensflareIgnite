import React, { useEffect } from "react"
import { observer } from "mobx-react-lite"
import { View, ViewStyle } from "react-native"
import { ChatPreview, EasyIcon, ProfileIcon, Screen, Text } from "../../components"
import { color, spacing } from "../../theme"
import { FlatList, ScrollView } from "react-native-gesture-handler"
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
  borderRadius: 20,
}

const TOP_BAR: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  padding: spacing[2],
  paddingVertical: spacing[3],
  backgroundColor: color.palette.fullBlack,
}

const NEWCHAT_CONTAINER: ViewStyle = {
  borderRadius: 50000,
  justifyContent: "center",
  alignItems: "center",
  width: 60,
  height: 60,
  backgroundColor: color.palette.deepPurple,
}

const TOP_BAR_PROFILES: ViewStyle = {
  flexDirection: "row",
}

export const MatchesScreen = observer(function MatchesScreen() {
  // Pull in one of our MST stores
  const { profileCardStore } = useStores()
  const profiles = profileCardStore.profiles

  return (
    <Screen style={ROOT}>
      <View style={MATCHES_CONTAINER}>
        <View style={TOP_BAR}>
          <View style={NEWCHAT_CONTAINER}>
            <EasyIcon name="add" size={50} color={color.palette.white} />
          </View>
          <View style={TOP_BAR_PROFILES}>
            {profiles
              .filter((x) => x.id < 3)
              .map((profile) => {
                return (
                  <ProfileIcon
                    style={{ marginLeft: spacing[3] }}
                    key={profile.id}
                    image={profile.image}
                    size={65}
                  />
                )
              })}
          </View>
        </View>
        <ScrollView style={ROUNDED_BOTTOM_CONTAINER}>
          {profiles.map(({ image, id, name }, i) => {
            return <ChatPreview key={id} name={name} image={image} />
          })}
        </ScrollView>
      </View>
    </Screen>
  )
})
