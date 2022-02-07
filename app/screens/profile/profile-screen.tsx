import React from "react"
import { observer } from "mobx-react-lite"
import { ImageStyle, ScrollView, TextStyle, View, ViewStyle } from "react-native"
import { EasyIcon, GradientBackground, ImageBox, ProfileIcon, Screen, Text } from "../../components"
import { color, spacing } from "../../theme"
import { useStores } from "../../models"
import { Col, Grid } from "react-native-easy-grid"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.fullBlack,
  flex: 1,
}

const PROFILE_CONTAINER: ViewStyle = {
  flex: 1,
  backgroundColor: color.background,
  paddingHorizontal: spacing[3],

  borderRadius: 20,
}

const HEADER: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
  paddingVertical: spacing[4],
  paddingHorizontal: spacing[3],
}

const HEADER_LEFT: ViewStyle = {
  flexDirection: "row",
}

const SCROLL_VIEW: ViewStyle = {
  flex: 1,
  paddingTop: spacing[4],
}

const HEADER_ICON: ImageStyle = {
  borderColor: color.palette.orange,
  borderWidth: 2,
}

export const ProfileScreen = observer(function ProfileScreen() {
  const { profileCardStore } = useStores()
  const { profiles } = profileCardStore

  return (
    <Screen style={ROOT}>
      <View>
        <View style={[HEADER, { backgroundColor: "black" }]}>
          <View style={HEADER_LEFT}>
            <ProfileIcon imageStyles={HEADER_ICON} size={55} image={profiles[0].image} />
          </View>
          <EasyIcon name="settings-sharp" size={40} color={color.palette.almostWhite} />
        </View>
      </View>
      <View style={PROFILE_CONTAINER}>
        <ScrollView style={SCROLL_VIEW}>
          <Grid>
            <Col style={{ marginRight: 5 }}>
              <ImageBox image={profiles[0].image} text="Friends" />
            </Col>
            <Col style={{ marginLeft: 5 }}>
              <ImageBox image={profiles[1].image} text="Followers" />
            </Col>
          </Grid>
          <ImageBox image={profiles[2].image} text="My Profile" />
        </ScrollView>
      </View>
    </Screen>
  )
})
