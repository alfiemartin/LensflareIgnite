import * as React from "react"
import { Image, ImageStyle, StyleProp, TextStyle, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { color, spacing, typography } from "../../theme"
import { Text } from "../text/text"
import { TouchableOpacity } from "react-native-gesture-handler"
import { useNavigation } from "@react-navigation/native"
import { EasyIcon, ProfileIcon } from ".."

const CONTAINER: ViewStyle = {
  flexDirection: "row",
  backgroundColor: color.background,
  marginBottom: spacing[1],
  padding: spacing[1],
}

const NAME: TextStyle = {
  fontFamily: typography.primary,
  fontSize: 22,
  color: color.primary,
  marginBottom: spacing[2],
}

const PREVIEW_TEXT: TextStyle = {
  fontFamily: typography.primary,
  fontSize: 14,
  color: color.primary,
}

const TEXT_CONTAINER: ViewStyle = {
  flex: 1,
  marginLeft: spacing[2],
  paddingVertical: spacing[1],
  borderBottomWidth: 1,
  borderColor: color.palette.lighterGrey,
}

const NEW_MSG_INDICATOR: ViewStyle = {
  position: "absolute",
  top: "50%",
  right: 10,
}

export interface ChatPreviewProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  name: string
  image: string
  borderStyle?: StyleProp<ViewStyle>
}

/**
 * Describe your component here
 */
export const ChatPreview = observer(function ChatPreview(props: ChatPreviewProps) {
  const { style, image, name, borderStyle } = props
  const styles = Object.assign({}, CONTAINER, style)

  const navigation = useNavigation()

  return (
    <TouchableOpacity onPress={() => navigation.navigate("chat" as any)}>
      <View style={styles}>
        <ProfileIcon image={image} />
        <View style={[TEXT_CONTAINER, borderStyle]}>
          <Text style={NAME}>{name}</Text>
          <Text style={PREVIEW_TEXT}>Hey wys g</Text>
        </View>
        <EasyIcon style={NEW_MSG_INDICATOR} name="ellipse" size={10} />
      </View>
    </TouchableOpacity>
  )
})
