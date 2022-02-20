import React, { useEffect, useRef, useState } from "react"
import { observer } from "mobx-react-lite"
import { StyleProp, TextInput, TextStyle, View, ViewStyle, Button } from "react-native"
import { Screen, Text } from "../../components"
import { color, spacing } from "../../theme"
import * as AppleAuthentication from "expo-apple-authentication"
import { useQuery } from "../../utils/general"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import * as SecureStore from "expo-secure-store"
import { useStores } from "../../models"
import { appleLoginMutation, testAppleLoginQuery } from "../../utils/queries"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.almostWhite,
  padding: spacing[1],
  flex: 1,
  justifyContent: "flex-end",
  alignItems: "center",
}

const TEXT: StyleProp<TextStyle> = {
  fontSize: 42,
  width: "100%",
  textAlign: "center",
  fontWeight: "bold",
}

const INPUT: StyleProp<TextStyle> = {
  fontSize: 26,
  marginBottom: spacing[3],
  fontWeight: "400",
}

const BUTTON: TextStyle = {
  fontSize: 42,
  fontWeight: "bold",
  backgroundColor: color.palette.fullBlack,
  borderWidth: 0,
}

const debug = async () => {
  const result = await useQuery(process.env["GQL_URL"], testAppleLoginQuery)

  const data = await result.json()
  console.log(data)
}

const loginWithApple = async (
  credential: AppleAuthentication.AppleAuthenticationCredential,
  sessionId: string,
  saveSession: (sessionId: string, name?: string) => Promise<void>,
) => {
  const result = await useQuery(process.env["GQL_URL"], appleLoginMutation, {
    sessionId: sessionId, //: "MvQBt1TQxqPS_CEGyoT93ckgVjOU3fv4",
    credential,
  })

  const data = await result.json()

  const receivedSessionId = data.data.appleSignIn.sessionId
  const name = data.data.appleSignIn.name

  if (receivedSessionId) {
    await saveSession(receivedSessionId, name ?? undefined)
    await SecureStore.setItemAsync("sessionId", receivedSessionId)
  }

  console.log(data)
}

export const LoginScreen = observer(function LoginScreen() {
  const inset = useSafeAreaInsets()
  const { usersStore } = useStores()

  return (
    <Screen style={[ROOT, { paddingBottom: inset.bottom }]} preset="fixed">
      <Text>{usersStore.currentUser.sessionId ?? "no session found"}</Text>
      <Button title="debug" onPress={debug} />
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
              // signUp();
            }
          } catch (error) {
            console.log(error)
          }
        }}
      />
    </Screen>
  )
})
