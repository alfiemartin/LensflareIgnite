import * as React from "react"
import { ImageStyle, StyleProp, TextStyle, View, ViewStyle, Image } from "react-native"
import { observer } from "mobx-react-lite"
import { color, typography } from "../../theme"
import { Text } from "../text/text"

const CONTAINER: ViewStyle = {
  justifyContent: "center",
}

const TEXT: TextStyle = {
  fontFamily: typography.primary,
  fontSize: 14,
  color: color.primary,
}

const PROFILE_IMAGE: ImageStyle = {
  borderRadius: 5000,
}

export interface ProfileIconProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  image: string
  size?: number
  imageStyles?: StyleProp<ImageStyle>
}

/**
 * Describe your component here
 */
export const ProfileIcon = observer(function ProfileIcon(props: ProfileIconProps) {
  const { style, image, size = 70, imageStyles } = props
  const styles = Object.assign({}, CONTAINER, style)
  const imageStyle = Object.assign({}, PROFILE_IMAGE, imageStyles)

  return (
    <View style={styles}>
      <Image source={{ uri: image }} style={[imageStyle, { width: size, height: size }]} />
    </View>
  )
})
