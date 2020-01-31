import React from 'react';
import {View, StyleSheet, StatusBar} from 'react-native';
import {TouchEventDemuxer, JoystickDemuxed} from 'joystick-component-lib';
import {ScreenOrientation} from 'expo';
import {WEBSOCKET_SERVER_ADDRESS} from '../constants/Configuration';
import {HOMESCREEN} from '../constants/Navigations';
import {WEBSOCKET_NO_CONNECTIONS} from '../constants/Errors';

import ws from '../components/ws';

const Demuxer = TouchEventDemuxer([JoystickDemuxed, JoystickDemuxed]);

/**
 * Control Screen Component
 */
class ControlScreen extends React.Component {
  /**
   * Navigation Options
   * @type {{headerShown: boolean}}
   */
  static navigationOptions = {
    headerShown: false,
  };

  /**
   * Sending the Data to the Websocket
   * @param controllerSide
   * @param x
   * @param y
   */
  sendToWs = (controllerSide, x, y) => {
    console.log(`${controllerSide[0]}${x > 0 ? '+' : '-'}${y > 0 ?
        '+' :
        '-'}${(x.toFixed(3).split('.')[1] * 1024) +
    +y.toFixed(3).split('.')[1]}`);
  };

  /**
   * Right Joystick Handler
   * @param x
   * @param y
   */
  rightJoyStickHandler = (x, y) => {
    this.sendToWs('right', x, y);
  };

  /**
   * Left Joystick Handler
   * @param x
   * @param y
   */
  leftJoyStickHandler = (x, y) => {
    this.sendToWs('left', x, y);
  };

  /**
   * After mounting react hook to set the Orientation async to Landscape and
   * instantiate the ws wrapper class
   * @returns {Promise<void>}
   */
  async componentDidMount() {
    await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.LANDSCAPE_LEFT);
  }

  redirectToHomeScreen = async (reason, error = null) => {
    this.props.navigation.navigate(HOMESCREEN, {reason, error});
  };

  /**
   * Content of the ControlScreen
   * @returns {*}
   */
  render() {
    return (
        <View>
          <Demuxer
              childrenProps={[
                {
                  neutralPointX: 100,
                  neutralPointY: 300,
                  length: 75,
                  shape: 'circular',
                  isSticky: true,
                  onJoystickMove: this.leftJoyStickHandler,
                  draggableStyle: styles.draggableStyle,
                  backgroundStyle: styles.circularBackgroundStyle,
                },
                {
                  neutralPointX: 720,
                  neutralPointY: 300,
                  length: 75,
                  shape: 'circular',
                  isSticky: true,
                  onJoystickMove: this.rightJoyStickHandler,
                  draggableStyle: styles.draggableStyle,
                  backgroundStyle: styles.circularBackgroundStyle,
                },
              ]}
          />
        </View>
    );
  }
}

/**
 * Styling of the Control Screen
 */
const styles = StyleSheet.create({
  container: {
    paddingTop: StatusBar.currentHeight,
    paddingHorizontal: 20,
    height: 50,
    width: 50,
    backgroundColor: 'green',
  },
  draggableStyle: {
    height: 100,
    width: 100,
    backgroundColor: 'rgba(0,0,0, 0.8)',
  },
  backgroundStyle: {
    backgroundColor: '#FFFFFF',
    borderColor: '#D12668',
    borderWidth: 3,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
  },
  circularBackgroundStyle: {
    backgroundColor: 'rgba(0,0,0, 0.1)',
    borderColor: 'rgba(0,0,0, 0.5)',
    borderWidth: 2,
  },
});

export default ControlScreen;