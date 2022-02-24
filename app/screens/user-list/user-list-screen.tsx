import React, { useEffect } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { ChatPreview, Screen, Text } from "../../components"
// import { useNavigation } from "@react-navigation/native"
import { useStores } from "../../models"
import { color } from "../../theme"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.black,
  flex: 1,
}

export const UserListScreen = observer(function UserListScreen() {
  // Pull in one of our MST stores
  const { usersStore } = useStores()
  const users = usersStore.users

  useEffect(() => {
    ;(async () => {
      await usersStore.getUsers()
    })()
  }, [])

  return (
    <Screen style={ROOT} preset="scroll">
      <Text preset="header" text="" />
      {users &&
        users.map((user) => {
          return <ChatPreview key={user._id} name={user.name} image={user.avatar} />
        })}
    </Screen>
  )
})
