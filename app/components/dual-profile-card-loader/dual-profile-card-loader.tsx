import * as React from "react"
import { Dimensions, Image, StyleProp, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { ProfileCard } from ".."
import { useStores } from "../../models"
import { useEffect, useState } from "react"

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

  const screenWidth = Dimensions.get("screen").width

  const initialCardState = [
    {
      cardId: 0,
      infront: true,
      counter: 0,
      scale: 1,
      translationX: 0,
    },
    {
      cardId: 1,
      infront: false,
      counter: 1,
      scale: 0.9,
      translationX: -screenWidth,
    },
  ]
  const [cardData, setCardData] = useState(initialCardState)

  const updateCardUi = () => {
    setCardData((oldData) => {
      const noMoreProfiles = oldData.some(({ counter }) => {
        return counter >= profiles.length - 2
      })

      if (noMoreProfiles) {
        return initialCardState
      }

      return oldData.map((card) => {
        return {
          ...card,
          infront: !card.infront,
          counter: card.infront ? card.counter + 2 : card.counter,
        }
      })
    })
  }

  const scaleBackCard = (translationX: number) => {
    setCardData((oldData) => {
      return oldData.map((card) => {
        return {
          ...card,
          translationX: !card.infront ? translationX : card.translationX,
        }
      })
    })
  }

  const scaleFrontCard = (translationX: number) => {
    setCardData((oldData) => {
      return oldData.map((card) => {
        return {
          ...card,
          translationX: card.infront ? translationX : card.translationX,
        }
      })
    })
  }

  return (
    <View style={styles}>
      {cardData.map((card) => {
        return (
          <ProfileCard
            key={card.cardId}
            data={profiles[card.counter]}
            cardId={card.cardId}
            inFront={card.infront}
            updateCardsUi={updateCardUi}
            scale={card.scale}
            translationX={card.translationX}
            scaleBackCard={scaleBackCard}
            scaleFrontCard={scaleFrontCard}
          />
        )
      })}
    </View>
  )
})
