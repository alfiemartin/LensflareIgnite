import React, { useEffect, useRef, useState } from "react"
import { observer } from "mobx-react-lite"
import { StyleProp, TextInput, TextStyle, View, ViewStyle, Button } from "react-native"
import { Screen, Text } from "../../components"
import { request, gql } from "graphql-request"
import { color, spacing } from "../../theme"
import * as AppleAuthentication from "expo-apple-authentication"

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
  // const query = gql`
  //   {
  //     query
  //     Names {
  //       names {
  //         _id
  //         firstname
  //         secondname
  //       }
  //     }
  //   }
  // `

  // useEffect(() => {
  //   request("http://localhost:4000/graphql", query)
  //     .then((data) => console.log(data))
  //     .catch((err) => console.error(err))
  // }, [])

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
