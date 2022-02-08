import React from "react"
import { Dimensions, ImageBackground, StyleProp, View, ViewStyle, ImageStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { PanGestureHandler } from "react-native-gesture-handler"
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

export interface ProfileCardProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  data?: {
    name: string
    image: string
  }
  updateCardsUi?: (cardId?: number) => void
  cardId: number
  inFront: boolean
  scale: number
  translationX: number
  scaleBackCard?: (translationX: number) => void
  scaleFrontCard?: (translationX: number) => void
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
  const {
    style,
    data,
    updateCardsUi,
    cardId,
    inFront,
    scale: scaleVal,
    translationX: transXVal,
    scaleBackCard,
    scaleFrontCard,
  } = props
  const styles = Object.assign({}, CONTAINER, style)

  const screenWidth = Dimensions.get("screen").width

  const swipeTranslationX = useSharedValue(0)
  const scale = useSharedValue(scaleVal)
  const translationX = useSharedValue(transXVal)

  useEffect(() => {
    scale.value = scaleVal
  }, [scaleVal])

  useEffect(() => {
    translationX.value = transXVal
  }, [transXVal])

  const finishSwipeAnimation = () => {
    "worklet"
    const right = swipeTranslationX.value > 0

    updateCardsUi(cardId)
  }

  const gestureHandler = useAnimatedGestureHandler({
    onActive: (event, ctx) => {
      if (!inFront) return

      swipeTranslationX.value = event.translationX

      runOnJS(scaleBackCard)(
        interpolate(Math.abs(event.translationX), [0, screenWidth], [-screenWidth, 0]),
      )
    },
  })

  const onEnd = () => {
    if (!inFront) return

    swipeTranslationX.value = 0

    if (Math.abs(swipeTranslationX.value) > 100) {
      finishSwipeAnimation()
      runOnJS(scaleBackCard)(0)
      runOnJS(scaleFrontCard)(-screenWidth)
      return
    }
    runOnJS(scaleBackCard)(-screenWidth)
  }

  const aSwipeStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: translationX.value,
        },
      ],
    }
  })

  const bringNewCard = () => {
    // swipeOpacity.value = withTiming(1, instantTiming)
  }

  return (
    <PanGestureHandler onGestureEvent={gestureHandler} onEnded={onEnd}>
      <Animated.View style={[CONTAINER, styles, aSwipeStyles, { zIndex: !inFront ? 10 : 5 }]}>
        <ImageBackground
          onLoad={bringNewCard}
          source={{ uri: data && data.image }}
          style={MAIN_IMAGE_CONTAINER}
          imageStyle={MAIN_IMAGE}
        ></ImageBackground>
        {data && <CardFooter />}
      </Animated.View>
    </PanGestureHandler>
  )
})

//LET PEOPLE DRAW OVER THE IMAGE
