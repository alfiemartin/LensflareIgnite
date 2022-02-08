import * as React from "react"
import { StyleProp, TextStyle, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { color, spacing, typography } from "../../theme"
import { Text } from "../text/text"

const CONTAINER: ViewStyle = {
  justifyContent: "center",
  flex: 6,
}

const PROFILE_CONTAINER: ViewStyle = {
  flex: 1,
  backgroundColor: color.background,
  paddingHorizontal: spacing[3],
  overflow: "hidden",
  borderRadius: 20,
}

export interface CurvedScreenBoxProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  children: React.ReactNode
}

/**
 * Describe your component here
 */
export const CurvedScreenBox = observer(function CurvedScreenBox(props: CurvedScreenBoxProps) {
  const { style, children } = props
  const styles = Object.assign({}, CONTAINER, style)

  return (
    <View style={styles}>
      <View style={PROFILE_CONTAINER}>{children}</View>
    </View>
  )
})
