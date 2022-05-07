import React from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, Button, View } from "react-native"
import * as storage from "../../utils/storage/storage"
import { ClearStorageButton, Screen, Text } from "../../components"
import { color, spacing } from "../../theme"
import * as AppleAuthentication from "expo-apple-authentication"
import { useQuery } from "../../utils/general"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import * as SecureStore from "expo-secure-store"
import { useStores } from "../../models"
import { appleLoginQuery, appleSignupMutation, testAppleLoginQuery } from "../../utils/queries"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.almostWhite,
  padding: spacing[1],
  flex: 1,
  justifyContent: "space-between",
  alignItems: "center",
}

const debug = async () => {
  const result = await useQuery(process.env.GQL_URL, testAppleLoginQuery)

  const { data } = await result.json()

  console.log(data)
}

const loginWithApple = async (
  credential: AppleAuthentication.AppleAuthenticationCredential,
  sessionId: string,
  saveSession: (sessionId: string, name?: string) => Promise<void>,
) => {
  const result = await useQuery(process.env.GQL_URL, appleLoginQuery, {
    sessionId: sessionId, //  "MvQBt1TQxqPS_CEGyoT93ckgVjOU3fv4",
    credential,
  })

  const { data } = await result.json()

  const receivedSessionId = data.appleSignIn.sessionId
  const name = data.appleSignIn.name

  if (receivedSessionId) {
    await saveSession(receivedSessionId, name)
    await SecureStore.setItemAsync("sessionId", receivedSessionId)
  }

  console.log(data)
}

const appleSignUp = async (
  credential: AppleAuthentication.AppleAuthenticationCredential,
  saveSession: (sessionId: string, name?: string) => Promise<void>,
) => {
  //  TODO process.env
  const result = await useQuery(process.env.GQL_URL, appleSignupMutation, {
    credential,
  })

  const data = await result.json()
  console.log(data)
  const receivedSessionId = data.data.appleSignUp.sessionId
  const name = data.data.appleSignUp.name

  if (receivedSessionId) {
    await saveSession(receivedSessionId, name)
    await SecureStore.setItemAsync("sessionId", receivedSessionId)
  }
}

export const LoginScreen = observer(function LoginScreen() {
  const inset = useSafeAreaInsets()
  const { usersStore } = useStores()

  return (
    <Screen style={[ROOT, { paddingBottom: inset.bottom }]} preset="fixed">
      <ClearStorageButton />
      <View></View>
      <View>
        <Text>{usersStore.currentUser.name}</Text>
        <Text>{usersStore.currentUser.sessionId ?? "no session found"}</Text>
        <Button title="debug" onPress={debug} />
      </View>
      <AppleAuthentication.AppleAuthenticationButton
        buttonType={AppleAuthentication.AppleAuthenticationButtonType.CONTINUE}
        buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
        style={{
          width: "100%",
          height: 60,
        }}
        onPress={async () => {
          try {
            const credential = await AppleAuthentication.signInAsync({
              requestedScopes: [
                AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                AppleAuthentication.AppleAuthenticationScope.EMAIL,
              ],
            })

            if (!credential.fullName.givenName) {
              loginWithApple(
                credential,
                usersStore.currentUser.sessionId,
                usersStore.saveCurrentUser,
              )
            } else {
              appleSignUp(credential, usersStore.saveCurrentUser)
            }
          } catch (error) {
            console.log(error)
          }
        }}
      />
    </Screen>
  )
})
