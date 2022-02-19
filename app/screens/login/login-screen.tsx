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

const debug = () => {
  fetch("http://192.168.0.107:4000/test", {
    method: "GET",
  })
    .then((res) => res.text())
    .then((data) => console.log(data))
}

const loginWithApple = async (
  credential: AppleAuthentication.AppleAuthenticationCredential,
  saveSession: (sessionId: string) => Promise<void>,
) => {
  const savedSessionId = await SecureStore.getItemAsync("sessionId")
  console.log(savedSessionId)

  const res = await fetch("http://192.168.0.107:4000/appleSignIn", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...credential, sessionId: savedSessionId }),
  })
  const data = await res.json()

  console.log(data)

  if (data.success && data.sessionId) {
    // try {
    //   await SecureStore.setItemAsync("sessionId", data.sessionId)
    //   await saveSession(data.sessionId)
    //   console.log("saved session id")
    // } catch (e) {
    //   console.error("could not save session Id")
    // }
  }
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
              loginWithApple(credential, usersStore.saveCurrentUser)
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
