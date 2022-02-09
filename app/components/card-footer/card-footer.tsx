import * as React from "react"
import { StyleProp, TextInput, TextStyle, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { color, spacing } from "../../theme"
import { EasyIcon } from "../easy-icon/easy-icon"

const CONTAINER: ViewStyle = {
  justifyContent: "center",
}

const CHOICES_CONTAINER: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
  backgroundColor: "#fce7f3",
  paddingHorizontal: spacing[1],
  paddingVertical: spacing[1],
  borderBottomLeftRadius: 20,
  borderBottomRightRadius: 20,
}

const INPUT_BACKGROUND: ViewStyle = {
  flex: 1,
  padding: spacing[1],
  paddingLeft: spacing[2],
  backgroundColor: color.palette.fullBlack,
  borderRadius: 20,
  marginRight: spacing[3],
  position: "absolute",
  bottom: 0,
  left: 0,
  right: 0,
  paddingBottom: 15,
}

const INPUT: TextStyle = {
  fontSize: 16,
  color: color.palette.almostWhite,
}

const INPUT_WRAPPER: ViewStyle = {
  flex: 1,
  position: "relative",
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

  return (
    <View style={[styles, { opacity: hidden ? 0 : 1 }]}>
      <View style={CHOICES_CONTAINER}>
        <View style={INPUT_WRAPPER}>
          <View style={[INPUT_BACKGROUND, ,]}>
            <TextInput style={[INPUT]} multiline />
          </View>
        </View>
        <EasyIcon size={43} name="ellipse" onPress={() => null} />
      </View>
    </View>
  )
})
