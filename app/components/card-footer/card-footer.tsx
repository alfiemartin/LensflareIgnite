import * as React from "react"
import {
  NativeSyntheticEvent,
  StyleProp,
  TextInput,
  TextInputContentSizeChangeEventData,
  TextStyle,
  View,
  ViewStyle,
} from "react-native"
import { observer } from "mobx-react-lite"
import { color, spacing, typography } from "../../theme"
import { Text } from "../text/text"
import { EasyIcon } from "../easy-icon/easy-icon"
import { useState } from "react"
import { debounce } from "ts-debounce"

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

const INPUT_WRAPPER: ViewStyle = {
  flex: 1,
  padding: spacing[1],
  paddingLeft: spacing[5],
  backgroundColor: color.palette.fullBlack,
  borderRadius: 20,
  marginRight: spacing[3],
}

const INPUT: TextStyle = {
  fontSize: 16,
  color: color.palette.almostWhite,
}

const TEXT: TextStyle = {
  fontFamily: typography.primary,
  fontSize: 14,
  color: color.primary,
}

export interface CardFooterProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
}

/**
 * Describe your component here
 */
export const CardFooter = observer(function CardFooter(props: CardFooterProps) {
  const { style } = props
  const styles = Object.assign({}, CONTAINER, style)
  const [originalInputSize, setOriginalInputSize] = useState(0)
  const [inputHeight, setInputHeight] = useState(30)

  const handleInputSizeChange = (e: NativeSyntheticEvent<TextInputContentSizeChangeEventData>) => {
    const inputHeight = e.nativeEvent.contentSize.height

    if (originalInputSize === 0) {
      setOriginalInputSize(inputHeight)
      return
    }

    if (inputHeight > originalInputSize * 2) {
      setInputHeight((prevHeight) => prevHeight + 30)
    }
  }

  return (
    <View style={styles}>
      <View style={CHOICES_CONTAINER}>
        <View style={INPUT_WRAPPER}>
          <TextInput
            style={[INPUT, { height: inputHeight }]}
            multiline
            onContentSizeChange={handleInputSizeChange}
          />
        </View>
        <EasyIcon size={40} name="ellipse" onPress={() => null} />
      </View>
    </View>
  )
})
