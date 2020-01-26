import React, { useState } from "react";
import {createStackNavigator} from "react-navigation-stack";
import {createAppContainer} from "react-navigation";

import HomeScreen from "./screens/HomeScreen";
import ControlScreen from "./screens/ControlScreen";

const Navigation = createStackNavigator({
  Home: HomeScreen,
  Control: ControlScreen
});

const App = createAppContainer(Navigation);

export default App;