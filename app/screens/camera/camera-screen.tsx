import React, { useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { TouchableOpacity, View, ViewStyle, StyleSheet } from "react-native"
import { Screen, Text } from "../../components"
import { color } from "../../theme"
import { Camera } from "expo-camera"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.fullBlack,
  flex: 1,
}

const CAMERA_CONTAINER: ViewStyle = {
  flex: 1,
  borderBottomLeftRadius: 20,
  borderBottomRightRadius: 20,
  overflow: "hidden",
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
}

export const CameraScreen = observer(function CameraScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  const [hasPermission, setHasPermission] = useState<boolean | null>(null)
  const [type, setType] = useState(Camera.Constants.Type.front)

  useEffect(() => {
    ;(async () => {
      const { status } = await Camera.requestCameraPermissionsAsync()
      setHasPermission(status === "granted")
    })()
  }, [])

  if (hasPermission === null) {
    return <Text>No access to camera</Text>
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>
  }

  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <Screen style={ROOT}>
      <View style={CAMERA_CONTAINER}>
        <Camera style={styles.camera} type={type}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                setType(
                  type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back,
                )
              }}
            >
              <Text style={styles.text}> Flip </Text>
            </TouchableOpacity>
          </View>
        </Camera>
      </View>
    </Screen>
  )
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: "transparent",
    flexDirection: "row",
    margin: 20,
  },
  button: {
    flex: 0.1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    color: "white",
  },
})

export default Camera
