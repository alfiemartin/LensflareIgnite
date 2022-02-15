import React, { useCallback, useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { Button, Screen, Text } from "../../components"
import { color } from "../../theme"
import { GiftedChat, IMessage, User } from "react-native-gifted-chat"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { useStores } from "../../models"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.fullBlack,
  flex: 1,
}

export const ChatScreen = observer(function ChatScreen() {
  const [messages, setMessages] = useState<IMessage[]>([])
  const inset = useSafeAreaInsets()

  const { messagesStore } = useStores()
  const { messages: lMessages } = messagesStore

  useEffect(() => {
    ;(async () => {
      await messagesStore.getMessages()
      setMessages(lMessages.filter((_, i) => i < lMessages.length))
    })()

    return () => {
      setMessages([])
    }
  }, [])

  const onSend = useCallback((messages: IMessage[] = []) => {
    setMessages((previousMessages) => GiftedChat.append(previousMessages, messages))
  }, [])

  return (
    <Screen style={ROOT} noKeyboardAvoid={true}>
      <GiftedChat
        bottomOffset={inset.bottom}
        messages={messages}
        user={messages[0]?.user}
        onSend={onSend}
      />
    </Screen>
  )
})
