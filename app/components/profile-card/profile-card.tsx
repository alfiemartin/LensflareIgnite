import React from "react"
import {
  Dimensions,
  ImageBackground,
  StyleProp,
  View,
  ViewStyle,
  ImageStyle,
  TextInput,
  TextStyle,
  NativeSyntheticEvent,
  TextInputContentSizeChangeEventData,
} from "react-native"
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
import { EasyIcon } from "../easy-icon/easy-icon"
import { useEffect } from "react"
import { color, spacing } from "../../theme"
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
  scaleBackCard?: (scale: number) => void
  scaleFrontCard?: (scale: number) => void
}

type TSwipeDirection = "left" | "right"

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
  const swipeOpacity = useSharedValue(1)
  const swipeRotation = useSharedValue(0)
  const scale = useSharedValue(scaleVal)
  const translationX = useSharedValue(transXVal)

  useEffect(() => {
    scale.value = scaleVal
  }, [scaleVal])

  const finishSwipeAnimation = () => {
    "worklet"
    const right = swipeTranslationX.value > 0

    swipeTranslationX.value = withSequence(
      withTiming(
        right ? screenWidth * 1.5 : -screenWidth * 1.5,
        {
          duration: 200,
        },
        () => runOnJS(scaleFrontCard)(0.9),
      ),
      withTiming(0, instantTiming, () => {
        if (updateCardsUi) runOnJS(updateCardsUi)()
      }),
    )

    swipeOpacity.value = withDelay(200, withTiming(0, instantTiming))

    swipeRotation.value = withSequence(
      withTiming(right ? 45 : -45, { duration: 200 }),
      withTiming(0, instantTiming),
    )
  }

  const gestureHandler = useAnimatedGestureHandler({
    onActive: (event, ctx) => {
      if (!inFront) return

      swipeTranslationX.value = event.translationX
      swipeRotation.value = interpolate(event.translationX, [0, screenWidth], [0, 45])

      runOnJS(scaleBackCard)(interpolate(Math.abs(event.translationX), [0, screenWidth], [0.9, 1]))
    },
  })

  const onEnd = () => {
    if (!inFront) return
    if (Math.abs(swipeTranslationX.value) > 100) {
      finishSwipeAnimation()
      runOnJS(scaleBackCard)(1)
      return
    }
    runOnJS(scaleBackCard)(0.9)
    swipeTranslationX.value = withTiming(0, aSwipeConfig)
    swipeRotation.value = withTiming(0, aSwipeConfig)
  }

  const aSwipeStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: swipeTranslationX.value,
        },
        {
          rotate: `${swipeRotation.value}deg`,
        },
        {
          scale: withTiming(scale.value, { duration: 150, easing: Easing.out(Easing.ease) }),
        },
        {
          translateX: withTiming(translationX.value),
        },
      ],
      opacity: swipeOpacity.value,
    }
  })

  const swipeInDirection = (direction: TSwipeDirection) => {
    const right = direction === "right"
    if (!inFront) return

    swipeTranslationX.value = withSequence(
      withTiming((right ? screenWidth : -screenWidth) * 1.3, { duration: 300 }, () =>
        runOnJS(scaleFrontCard)(0.9),
      ),
      withTiming(0, instantTiming, () => {
        if (updateCardsUi) {
          runOnJS(updateCardsUi)(cardId)
        }
      }),
    )

    scaleBackCard(1)

    swipeRotation.value = withSequence(
      withTiming(right ? 45 : -45, { duration: 300 }),
      withTiming(0, instantTiming),
    )

    swipeOpacity.value = withDelay(300, withTiming(0, instantTiming))
  }

  const bringNewCard = () => {
    swipeOpacity.value = withTiming(1, instantTiming)
  }

  return (
    <PanGestureHandler onGestureEvent={gestureHandler} onEnded={onEnd}>
      <Animated.View style={[CONTAINER, styles, aSwipeStyles, { zIndex: inFront ? 10 : 5 }]}>
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
