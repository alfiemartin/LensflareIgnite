import * as React from "react"
import { Dimensions, StyleProp, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { CardFooter, ProfileCard } from ".."
import { useStores } from "../../models"
import { useEffect, useState } from "react"
import { PanGestureHandler } from "react-native-gesture-handler"
import Animated, {
  interpolate,
  runOnJS,
  useAnimatedGestureHandler,
  withTiming,
} from "react-native-reanimated"
import { ICardState, SwipeState } from "../../types"

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
        state: SwipeState.PREV,
        data: profiles[0],
      },
      {
        counter: 0,
        translationX: 0,
        state: SwipeState.CURRENT,
        data: profiles[0],
      },
      {
        counter: 1,
        translationX: screenWidth,
        state: SwipeState.NEXT,
        data: profiles[1],
      },
    ]

    setCardData(initialCardState)
  }, [])

  const screenWidth = Dimensions.get("screen").width

  /**
   * Move a card to the center
   */
  const bringNewCard = (state: SwipeState) => {
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
      setCardData((prevData: ICardState[]) => {
        return prevData.map((card) => {
          if (state === SwipeState.PREV) {
            switch (card.state) {
              case SwipeState.PREV:
                return { ...card, state: SwipeState.CURRENT }
              case SwipeState.NEXT:
                return card
              default:
                return { ...card, state: SwipeState.PREV, translationX: -screenWidth }
            }
          }

          if (state === SwipeState.NEXT) {
            switch (card.state) {
              case SwipeState.NEXT:
                return { ...card, state: SwipeState.CURRENT }
              case SwipeState.PREV:
                return card
              default:
                return {
                  ...card,
                  state: SwipeState.NEXT,
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
          case SwipeState.PREV:
            return {
              ...card,
              translationX: interpolate(translationX, [0, screenWidth], [-screenWidth, 0]),
            }
          case SwipeState.NEXT:
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
          case SwipeState.NEXT:
            return {
              ...card,
              translationX: interpolate(translationX, [0, -screenWidth], [screenWidth, 0]),
            }
          case SwipeState.PREV:
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
          case SwipeState.PREV:
            return {
              ...card,
              translationX: withTiming(-screenWidth),
            }
          case SwipeState.NEXT:
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
        runOnJS(bringNewCard)(SwipeState.PREV)
      } else if (ctx.transX < -completeThreshold) {
        runOnJS(bringNewCard)(SwipeState.NEXT)
      } else {
        runOnJS(translateCardsToDefault)()
      }
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
