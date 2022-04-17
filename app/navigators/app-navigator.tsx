/**
 * The app navigator (formerly "AppNavigator" and "MainNavigator") is used for the primary
 * navigation flows of your app.
 * Generally speaking, it will contain an auth flow (registration, login, forgot password)
 * and a "main" flow which the user will use once logged in.
 */
import React from "react"
import { useColorScheme, ViewStyle } from "react-native"
import { NavigationContainer, DefaultTheme, DarkTheme } from "@react-navigation/native"
import {
  CameraScreen,
  ChatScreen,
  ExplorerScreen,
  LoginScreen,
  MatchesScreen,
  ProfileEditorScreen,
  ProfileScreen,
  RegisterScreen,
  SettingsScreen,
  UserListScreen,
} from "../screens"
import { navigationRef, useBackButtonHandler } from "./navigation-utilities"
import {
  createMaterialTopTabNavigator,
  MaterialTopTabNavigationOptions,
} from "@react-navigation/material-top-tabs"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { color } from "../theme"
import { TabIcon } from "../components"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { useStores } from "../models"

/**
 * This type allows TypeScript to know what routes are defined in this navigator
 * as well as what properties (if any) they might take when navigating to them.
 *
 * If no params are allowed, pass through `undefined`. Generally speaking, we
 * recommend using your MobX-State-Tree store(s) to keep application state
 * rather than passing state through navigation params.
 *
 * For more information, see this documentation:
 *   https://reactnavigation.org/docs/params/
 *   https://reactnavigation.org/docs/typescript#type-checking-the-navigator
 */
export type StackNavigatorParamList = {
  tabBar: undefined
  chat: undefined
  profileEditor: undefined
  userList: undefined
  settings: undefined
}

export type TabNavigatorParamList = {
  profile: undefined
  explorer: undefined
  matches: undefined
  test: undefined
  camera: undefined
}

export type OnboardingParamList = {
  login: undefined
  register: undefined
}

// Documentation: https://reactnavigation.org/docs/stack-navigator/
const Stack = createNativeStackNavigator<StackNavigatorParamList>()
const OnboardingStack_ = createNativeStackNavigator<OnboardingParamList>()
const Tab = createMaterialTopTabNavigator<TabNavigatorParamList>()

const AppStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right",
        gestureEnabled: true,
        headerStyle: { backgroundColor: color.background },
        headerTintColor: color.primary,
      }}
      initialRouteName="tabBar"
    >
      <Stack.Screen name="tabBar" component={AppTabBar} />
      <Stack.Screen name="chat" options={{ headerShown: true }} component={ChatScreen} />
      <Stack.Screen name="profileEditor" component={ProfileEditorScreen} />
      <Stack.Screen name="userList" component={UserListScreen} />
      <Stack.Screen name="settings" component={SettingsScreen} />
    </Stack.Navigator>
  )
}

const OnboardingStack = () => {
  return (
    <OnboardingStack_.Navigator
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right",
        gestureEnabled: true,
        headerStyle: { backgroundColor: color.background },
        headerTintColor: color.primary,
      }}
      initialRouteName="login"
    >
      <OnboardingStack_.Screen name="login" component={LoginScreen} />
      <OnboardingStack_.Screen name="register" component={RegisterScreen} />
    </OnboardingStack_.Navigator>
  )
}

const AppTabBar = () => {
  const inset = useSafeAreaInsets()

  const screenOptions: MaterialTopTabNavigationOptions = {
    tabBarItemStyle: { marginBottom: inset.bottom },
    tabBarIndicator: () => null,
    tabBarContentContainerStyle: {
      backgroundColor: color.palette.fullBlack, //tab bar background
    },
    tabBarLabel: () => null,
    tabBarInactiveTintColor: color.palette.offWhite,
    tabBarActiveTintColor: color.palette.deepPurple,
  }

  const parentStyles: ViewStyle = {
    backgroundColor: color.palette.fullBlack,
  }

  return (
    <Tab.Navigator tabBarPosition="bottom" style={parentStyles} screenOptions={screenOptions}>
      <Tab.Screen
        name="explorer"
        component={ExplorerScreen}
        options={{ tabBarIcon: ({ color }) => <TabIcon color={color} icon="ios-disc-outline" /> }}
      />
      <Tab.Screen
        name="camera"
        component={CameraScreen}
        options={{ tabBarIcon: ({ color }) => <TabIcon color={color} icon="camera-outline" /> }}
      />
      <Tab.Screen
        name="matches"
        component={MatchesScreen}
        options={{
          tabBarIcon: ({ color }) => <TabIcon color={color} icon="chatbox-ellipses-outline" />,
        }}
      />
      <Tab.Screen
        name="profile"
        component={ProfileScreen}
        options={{ tabBarIcon: ({ color }) => <TabIcon color={color} icon="person-outline" /> }}
      />
    </Tab.Navigator>
  )
}

interface NavigationProps extends Partial<React.ComponentProps<typeof NavigationContainer>> {}

export const AppNavigator = (props: NavigationProps) => {
  const colorScheme = useColorScheme()
  useBackButtonHandler(canExit)

  const { usersStore } = useStores()

  return (
    <NavigationContainer
      ref={navigationRef}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
      {...props}
    >
      {usersStore.currentUser.sessionId ? <AppStack /> : <OnboardingStack />}
    </NavigationContainer>
  )
}

AppNavigator.displayName = "AppNavigator"

/**
 * A list of routes from which we're allowed to leave the app when
 * the user presses the back button on Android.
 *
 * Anything not on this list will be a standard `back` action in
 * react-navigation.
 *
 * `canExit` is used in ./app/app.tsx in the `useBackButtonHandler` hook.
 */
const exitRoutes = ["matches", "explorer", "profile"]
export const canExit = (routeName: string) => exitRoutes.includes(routeName)
