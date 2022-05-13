import React from "react"
import { ImageBackground, StyleProp, ViewStyle, ImageStyle, Text, Keyboard } from "react-native"
import { observer } from "mobx-react-lite"
import Animated, { useAnimatedStyle, useSharedValue } from "react-native-reanimated"
import { useEffect } from "react"
import { ICardState, SwipeState } from "../../types"

export interface ProfileCardProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  data: ICardState
  cardId?: number
  state: SwipeState
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

export const ProfileCard = observer(function ProfileCard(props: ProfileCardProps) {
  const { style, data, state } = props
  const styles = Object.assign({}, CONTAINER, style)

  const translationX = useSharedValue(data.translationX)

  useEffect(() => {
    translationX.value = data.translationX
  }, [data.translationX])

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
    <Animated.View
      onTouchStart={() => Keyboard.dismiss()}
      style={[styles, aSwipeStyles, { zIndex: state == SwipeState.CURRENT ? 5 : 10 }]}
    >
      <ImageBackground
        source={{ uri: data?.data?.image }}
        style={MAIN_IMAGE_CONTAINER}
        imageStyle={MAIN_IMAGE}
      >
        <Text style={{ marginLeft: "auto", fontSize: 28 }}>
          {state == SwipeState.PREV ? "Prev" : state == SwipeState.NEXT ? "Next" : "Current"}
        </Text>
      </ImageBackground>
    </Animated.View>
  )
})

//LET PEOPLE DRAW OVER THE IMAGE
