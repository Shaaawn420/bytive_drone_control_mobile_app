import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";

import HomeScreen from "../screens/HomeScreen";
import SettingsScreen from "../screens/SettingsScreen";
import { createStackNavigator } from "react-navigation-stack";

const RootStack = createStackNavigator(
  {
    Home: {
        screen: HomeScreen
    },
    Settings: {
        screen: SettingsScreen
    }
  }
);

export default createAppContainer(RootStack);
