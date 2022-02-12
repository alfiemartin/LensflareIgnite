import * as React from "react"
import { Keyboard, StyleProp, TextInput, TextStyle, View, ViewStyle, Text } from "react-native"
import { observer } from "mobx-react-lite"
import { color, spacing } from "../../theme"
import { EasyIcon } from "../easy-icon/easy-icon"
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDecay,
  withSpring,
  withTiming,
} from "react-native-reanimated"
import { debounce } from "ts-debounce"
import { useCallback } from "react"

const CONTAINER: ViewStyle = {
  justifyContent: "center",
}

const CHOICES_CONTAINER: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
  backgroundColor: "#fce7f3",
  paddingHorizontal: spacing[1],
  paddingVertical: spacing[1],
  height: 60,
  borderBottomLeftRadius: 20,
  borderBottomRightRadius: 20,
}

const INPUT_BACKGROUND: ViewStyle = {
  flex: 1,
  padding: spacing[1],
  paddingLeft: spacing[2],
  backgroundColor: color.palette.fullBlack,
  borderRadius: 20,
  position: "absolute",
  bottom: 3,
  left: 0,
  right: 0,
  paddingBottom: 15,
}

const INPUT: TextStyle = {
  fontSize: 16,
  color: color.palette.almostWhite,
  paddingRight: 43,
  textAlignVertical: "center",
}

const INPUT_WRAPPER: ViewStyle = {
  flex: 1,
  position: "relative",
}

const ACTION_WRAPPER: ViewStyle = {
  position: "absolute",
  right: 0,
  bottom: 0,
  backgroundColor: color.palette.deepPurple,
  width: 43,
  height: 43,
  borderRadius: 20,
}

export interface CardFooterProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  hidden?: boolean
}

/**
 * Describe your component here
 */
export const CardFooter = observer(function CardFooter(props: CardFooterProps) {
  const { style, hidden = false } = props
  const styles = Object.assign({}, CONTAINER, style)

  const actionOpacity = useSharedValue(1)

  const actionVisibilityStyles = useAnimatedStyle(() => {
    return {
      opacity: actionOpacity.value,
    }
  })

  const handleTextInput = useCallback(() => {
    actionOpacity.value = withTiming(1)

    actionOpacity.value = withTiming(0, { duration: 0 })
  }, [])

  return (
    <View style={[styles, { opacity: hidden ? 0 : 1 }]}>
      <View style={CHOICES_CONTAINER}>
        <View style={INPUT_WRAPPER}>
          <View style={[INPUT_BACKGROUND]}>
            <TextInput style={[INPUT]} multiline onChangeText={handleTextInput} />
            <Animated.View style={[ACTION_WRAPPER, actionVisibilityStyles]}></Animated.View>
          </View>
        </View>
      </View>
    </View>
  )
})
