import * as React from "react"
import { Dimensions, StyleProp, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { CardFooter, ProfileCard, TState } from ".."
import { ProfileCardSnapshot, useStores } from "../../models"
import { useEffect, useState } from "react"
import { PanGestureHandler } from "react-native-gesture-handler"
import Animated, {
  interpolate,
  runOnJS,
  useAnimatedGestureHandler,
  withTiming,
} from "react-native-reanimated"

const CONTAINER: ViewStyle = {
  justifyContent: "flex-end",
  flex: 1,
}

export interface DualProfileCardLoaderProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
}

export interface ICardState {
  counter: number
  translationX: number
  state: TState
  data: ProfileCardSnapshot
}

/**
 * Describe your component here
 */
export const DualProfileCardLoader = observer(function DualProfileCardLoader(
  props: DualProfileCardLoaderProps,
) {
  const { style } = props
  const styles = Object.assign({}, CONTAINER, style)

  const { profileCardStore } = useStores()
  const { profiles } = profileCardStore

  const [cardData, setCardData] = useState<ICardState[]>()

  useEffect(() => {
    const initialCardState: ICardState[] = [
      {
        counter: 0,
        translationX: -screenWidth,
        state: "PREV",
        data: profiles[0],
      },
      {
        counter: 0,
        translationX: 0,
        state: "CURRENT",
        data: profiles[0],
      },
      {
        counter: 1,
        translationX: screenWidth,
        state: "NEXT",
        data: profiles[1],
      },
    ]

    setCardData(initialCardState)
  }, [])

  const screenWidth = Dimensions.get("screen").width

  const bringNewCard = (state: TState) => {
    setCardData((prevData) => {
      return prevData.map((card) => {
        if (card.state === state) {
          return {
            ...card,
            translationX: withTiming(0),
          }
        }

        return card
      })
    })

    setTimeout(() => {
      setCardData((prevData) => {
        return prevData.map((card) => {
          if (state === "PREV") {
            switch (card.state) {
              case "PREV":
                return { ...card, state: "CURRENT", translationX: card.translationX }
              case "NEXT":
                return { ...card }
              case "CURRENT":
                return { ...card, state: "PREV", translationX: -screenWidth }
            }
          }

          if (state === "NEXT") {
            switch (card.state) {
              case "NEXT":
                return { ...card, state: "CURRENT", translationX: card.translationX }
              case "PREV":
                return { ...card }
              case "CURRENT":
                return {
                  ...card,
                  state: "NEXT",
                  translationX: screenWidth,
                  counter: card.counter + 2,
                  data: profiles[card.counter + 2],
                }
            }
          }

          return card
        })
      })
    }, 300)
  }

  const translatePrevCard = (translationX: number) => {
    setCardData((prevData) => {
      return prevData.map((card) => {
        switch (card.state) {
          case "PREV":
            return {
              ...card,
              translationX: interpolate(translationX, [0, screenWidth], [-screenWidth, 0]),
            }
          case "NEXT":
            return {
              ...card,
              translationX: screenWidth,
            }
          default:
            return card
        }
      })
    })
  }

  const translateNextCard = (translationX: number) => {
    setCardData((prevData) => {
      return prevData.map((card) => {
        switch (card.state) {
          case "NEXT":
            return {
              ...card,
              translationX: interpolate(translationX, [0, -screenWidth], [screenWidth, 0]),
            }
          case "PREV":
            return {
              ...card,
              translationX: -screenWidth,
            }
          default:
            return card
        }
      })
    })
  }

  const translateCardsToDefault = () => {
    setCardData((prevData) => {
      return prevData.map((card) => {
        switch (card.state) {
          case "PREV":
            return {
              ...card,
              translationX: withTiming(-screenWidth),
            }
          case "NEXT":
            return {
              ...card,
              translationX: withTiming(screenWidth),
            }
          default:
            return card
        }
      })
    })
  }

  const gestureHandler = useAnimatedGestureHandler({
    onActive: (event, ctx: { transX: number }) => {
      ctx.transX = event.translationX

      if (event.translationX > 0) {
        runOnJS(translatePrevCard)(event.translationX)
      } else if (event.translationX) {
        runOnJS(translateNextCard)(event.translationX)
      }
    },
    onEnd: (_, ctx) => {
      const completeThreshold = 100

      if (ctx.transX > completeThreshold) {
        runOnJS(bringNewCard)("PREV")
        return
      } else if (ctx.transX < -completeThreshold) {
        runOnJS(bringNewCard)("NEXT")
        return
      }

      runOnJS(translateCardsToDefault)()
    },
  })

  return (
    <View style={styles}>
      {cardData?.length > 0 && (
        <>
          <PanGestureHandler onGestureEvent={gestureHandler}>
            <Animated.View style={{ flex: 1 }}>
              {cardData.map((card, i) => {
                return <ProfileCard key={i} data={card} state={card.state} />
              })}
            </Animated.View>
          </PanGestureHandler>
          <CardFooter />
        </>
      )}
    </View>
  )
})
