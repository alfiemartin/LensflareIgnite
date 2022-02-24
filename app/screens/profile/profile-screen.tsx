import React, { useEffect } from "react"
import { observer } from "mobx-react-lite"
import { ImageStyle, ScrollView, View, ViewStyle } from "react-native"
import { CurvedScreenBox, EasyIcon, ImageBox, ProfileIcon, Screen } from "../../components"
import { color, spacing } from "../../theme"
import { useStores } from "../../models"
import { Col, Grid } from "react-native-easy-grid"
import { useNavigation } from "@react-navigation/native"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.fullBlack,
  flex: 1,
}

const HEADER: ViewStyle = {
  flex: 1,
  flexDirection: "row",
  justifyContent: "space-between",
  paddingVertical: spacing[2],
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

  const navigation = useNavigation()

  const showProfile = () => {
    navigation.navigate("profileEditor" as any)
  }

  const showUserList = () => {
    navigation.navigate("userList" as any)
  }

  const showSettings = () => {
    navigation.navigate("settings" as any)
  }

  useEffect(() => {
    ;(async () => {
      await profileCardStore.getProfileCards()
    })()
  }, [])

  return (
    <Screen style={ROOT}>
      {profiles.length > 0 && (
        <>
          <View style={[HEADER, { backgroundColor: "black" }]}>
            <View style={HEADER_LEFT}>
              <ProfileIcon imageStyles={HEADER_ICON} size={65} image={profiles[0].image} />
            </View>
            <EasyIcon
              name="settings-sharp"
              size={60}
              color={color.palette.almostWhite}
              onPress={showSettings}
            />
          </View>
          <CurvedScreenBox>
            <ScrollView style={SCROLL_VIEW}>
              <Grid>
                <Col style={{ marginRight: 5 }}>
                  <View style={{ position: "relative" }}>
                    <ImageBox
                      touchableProps={{ onPress: showUserList }}
                      image={profiles[0].image}
                      text="Friends"
                    />
                  </View>
                </Col>
                <Col style={{ marginLeft: 5 }}>
                  <ImageBox
                    touchableProps={{ onPress: showUserList }}
                    image={profiles[1].image}
                    text="Followers"
                  />
                </Col>
              </Grid>
              <ImageBox
                touchableProps={{ onPress: showProfile }}
                image={profiles[2].image}
                text="My Profile"
              />
            </ScrollView>
          </CurvedScreenBox>
        </>
      )}
    </Screen>
  )
})
