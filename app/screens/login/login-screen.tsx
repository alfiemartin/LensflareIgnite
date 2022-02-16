import React, { useEffect, useRef, useState } from "react"
import { observer } from "mobx-react-lite"
import { StyleProp, TextInput, TextStyle, View, ViewStyle, Button } from "react-native"
import { Screen, Text } from "../../components"
import { color, spacing } from "../../theme"
import * as AppleAuthentication from "expo-apple-authentication"
import { useQuery } from "../../utils/general"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.almostWhite,
  flex: 1,
  justifyContent: "center",
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
  useEffect(() => {
    fetch("http://192.168.0.107:4000/test", {
      method: "GET",
    })
      .then((res) => res.text())
      .then((data) => console.log(data))
  }, [])

  return (
    <Screen style={ROOT} preset="scroll">
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

            console.log(credential)
          } catch (error) {
            console.log(error)
          }
        }}
      />
    </Screen>
  )
})
