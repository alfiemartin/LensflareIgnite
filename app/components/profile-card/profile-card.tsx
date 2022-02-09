import React from "react"
import { Dimensions, ImageBackground, StyleProp, View, ViewStyle, ImageStyle } from "react-native"
import { observer } from "mobx-react-lite"
import Animated, {
  Easing,
  interpolate,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withTiming,
  WithTimingConfig,
} from "react-native-reanimated"
import { useEffect } from "react"
import { CardFooter } from "../card-footer/card-footer"

export interface IUpdateCardUI {
  cardId: number
  onlyScale: boolean
}

export type TState = "PREV" | "NEXT" | "CURRENT"

export interface ProfileCardProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  data?: {
    name: string
    image: string
  }
  cardId?: number
  translationX: number
  state: TState
}

const CONTAINER: ViewStyle = {
  flex: 1,
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
}

const MAIN_IMAGE_CONTAINER: ViewStyle = {
  flex: 1,
  justifyContent: "space-between",
  backgroundColor: "#fbcfe8",
  borderTopLeftRadius: 20,
  borderTopRightRadius: 20,
}

const MAIN_IMAGE: ImageStyle = {
  flex: 1,
  justifyContent: "space-between",
  backgroundColor: "#fce7f3",
}

const aSwipeConfig: WithTimingConfig = {
  duration: 300,
}
const instantTiming: WithTimingConfig = {
  duration: 0,
}

export const ProfileCard = observer(function ProfileCard(props: ProfileCardProps) {
  const { style, data, translationX: transXVal, state } = props
  const styles = Object.assign({}, CONTAINER, style)

  const translationX = useSharedValue(transXVal)

  useEffect(() => {
    translationX.value = transXVal
  }, [transXVal])

  const aSwipeStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: translationX.value,
        },
      ],
    }
  })

  return (
    <Animated.View style={[styles, aSwipeStyles, { zIndex: state == "CURRENT" ? 5 : 10 }]}>
      <ImageBackground
        source={{ uri: data && data.image }}
        style={MAIN_IMAGE_CONTAINER}
        imageStyle={MAIN_IMAGE}
      ></ImageBackground>
    </Animated.View>
  )
})

//LET PEOPLE DRAW OVER THE IMAGE
