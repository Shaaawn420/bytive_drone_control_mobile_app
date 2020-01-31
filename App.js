import React, { useState } from "react";
import {createStackNavigator} from "react-navigation-stack";
import {createAppContainer} from "react-navigation";

import HomeScreen from "./screens/HomeScreen";
import ControlScreen from "./screens/ControlScreen";

/**
 * StackNavigator for Navigation between the Apps.
 * @type {import("react-navigation").NavigationNavigator<any, import("react-navigation").NavigationProp<import("react-navigation").NavigationState>>}
 */
const Navigation = createStackNavigator({
  Home: HomeScreen,
  Control: ControlScreen
});

/**
 * App Container containing the previously created StackNavigation
 * @type {NavigationContainer}
 */
const App = createAppContainer(Navigation);

export default App;