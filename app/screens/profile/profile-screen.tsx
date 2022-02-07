import React from "react"
import { observer } from "mobx-react-lite"
import { ScrollView, TextStyle, View, ViewStyle } from "react-native"
import { EasyIcon, ImageBox, Screen, Text } from "../../components"
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
  borderBottomLeftRadius: 20,
  borderBottomRightRadius: 20,
}

const HEADER: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
}

const SCROLL_VIEW: ViewStyle = {
  flex: 1,
}

const TEXT: TextStyle = {
  textAlign: "center",
  alignSelf: "center",
  fontSize: 24,
  fontWeight: "bold",
  marginTop: 2,
}

export const ProfileScreen = observer(function ProfileScreen() {
  const { profileCardStore } = useStores()
  const { profiles } = profileCardStore

  return (
    <Screen style={ROOT}>
      <View style={PROFILE_CONTAINER}>
        <View style={HEADER}>
          <Text preset="default" text="Alfie" style={TEXT} />
          <EasyIcon name="settings-sharp" size={40} color={color.primary} />
        </View>
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
