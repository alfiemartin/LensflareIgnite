import React, { useEffect } from "react"
import { observer } from "mobx-react-lite"
import { View, ViewStyle } from "react-native"
import { ChatPreview, CurvedScreenBox, EasyIcon, ProfileIcon, Screen } from "../../components"
import { color, spacing } from "../../theme"
import { ScrollView } from "react-native-gesture-handler"
import { useStores } from "../../models"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.fullBlack,
  flex: 1,
}

const TOP_BAR: ViewStyle = {
  flex: 1,
  flexDirection: "row",
  alignItems: "center",
  padding: spacing[2],
  backgroundColor: color.palette.fullBlack,
}

const NEWCHAT_CONTAINER: ViewStyle = {
  borderRadius: 50000,
  justifyContent: "center",
  alignItems: "center",
  width: 70,
  height: 70,
  backgroundColor: color.palette.deepPurple,
}

const TOP_BAR_PROFILES: ViewStyle = {
  flexDirection: "row",
}

export const MatchesScreen = observer(function MatchesScreen() {
  // Pull in one of our MST stores
  const { usersStore } = useStores()
  const { users } = usersStore

  useEffect(() => {
    ;(async () => {
      await usersStore.getUsers()
    })()
  }, [])

  return (
    <Screen style={ROOT}>
      {users.length > 0 && (
        <>
          <View style={TOP_BAR}>
            <View style={NEWCHAT_CONTAINER}>
              <EasyIcon name="add" size={50} color={color.palette.white} />
            </View>
            <View style={TOP_BAR_PROFILES}>
              {users
                .filter((x) => x._id < 3)
                .map((user) => {
                  return (
                    <ProfileIcon
                      style={{ marginLeft: spacing[3] }}
                      key={user._id}
                      image={user.avatar}
                      size={65}
                    />
                  )
                })}
            </View>
          </View>
          <CurvedScreenBox>
            <ScrollView showsVerticalScrollIndicator={false}>
              {users.map(({ avatar, _id, name }, i) => {
                return (
                  <ChatPreview
                    key={_id}
                    name={name}
                    image={avatar}
                    borderStyle={{ borderBottomWidth: 0 }}
                  />
                )
              })}
            </ScrollView>
          </CurvedScreenBox>
        </>
      )}
    </Screen>
  )
})
