import React, { useEffect, useRef, useState } from "react"
import { observer } from "mobx-react-lite"
import { StyleProp, TextInput, TextStyle, View, ViewStyle, Button } from "react-native"
import { Screen, Text } from "../../components"
import { color, spacing } from "../../theme"
import * as AppleAuthentication from "expo-apple-authentication"
import { useQuery } from "../../utils/general"
import { useSafeAreaInsets } from "react-native-safe-area-context"

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

export const LoginScreen = observer(function LoginScreen() {
  const inset = useSafeAreaInsets()

  const debug = () => {
    fetch("http://192.168.0.107:4000/test", {
      method: "GET",
    })
      .then((res) => res.text())
      .then((data) => console.log(data))
  }

  return (
    <Screen style={[ROOT, { paddingBottom: inset.bottom }]} preset="fixed">
      <Button title="debug" onPress={debug} />
      <AppleAuthentication.AppleAuthenticationButton
        buttonType={AppleAuthentication.AppleAuthenticationButtonType.CONTINUE}
        buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
        style={{
          width: "100%",
          height: 50,
        }}
        onPress={async () => {
          try {
            const credential = await AppleAuthentication.signInAsync({
              requestedScopes: [
                AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                AppleAuthentication.AppleAuthenticationScope.EMAIL,
              ],
            })

            fetch("http://192.168.0.107:4000/appleSignUp", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(credential),
            })
              .then((res) => res.json())
              .then((data) => console.log(data))
          } catch (error) {
            console.log(error)
          }
        }}
      />
    </Screen>
  )
})
