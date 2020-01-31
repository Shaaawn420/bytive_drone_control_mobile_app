import React from 'react';
import {
  ScrollView,
  StyleSheet,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import Layout from '../constants/Layout';
import Colors from '../constants/Colors';
import {ScreenOrientation} from 'expo';
import {CONTROLSCREEN} from '../constants/Navigations';
import {WEBSOCKET_SERVER_ADDRESS} from '../constants/Configuration';
import {WEBSOCKET_NO_CONNECTIONS} from '../constants/Errors';
import isDisabled
  from 'react-native-web/dist/modules/AccessibilityUtil/isDisabled';

/**
 * Home Screen Component
 */
class HomeScreen extends React.Component {
  /**
   * Navigation Options
   * @type {{headerShown: boolean}}
   */
  static navigationOptions = {
    headerShown: false,
  };

  state = {
    test: "hey",
    connectButton: {
      isDisabled: true,
      buttonText: 'Connect',
      text: {
        disabled: 'Retry',
        enabled: 'Connect',
        info: 'Verbindung konnte nicht hergstellt werden.',
      },
    },
  };

  changePrimaryButton = () => {

  };

  changeInfoContainer = () => {

  };

  /**
   * Button event to redirect to the control component and
   * connect to the Websocket Server
   */
  connectToServer = () => {
    console.log("hey");

    console.log(this.state.test);
    // this.state.connectButton.isDisabled = !this.state.connectButton.isDisabled;
    // this.state.connectButton.buttonText = this.state.connectButton.isDisabled ?
    //     this.state.connectButton.text.disabled :
    //     this.state.connectButton.text.enabled;
    // console.log(this.state.connectButton);
    // global.ws = new WebSocket(WEBSOCKET_SERVER_ADDRESS);
    //
    // /**
    //  * On connection event
    //  */
    // global.ws.onopen = async () => {
    //   await global.ws.send('app connected').then(() => {
    //     this.props.navigation.navigate(CONTROLSCREEN);
    //   });
    // };
    //
    // /**
    //  * On message event
    //  * @param e
    //  */
    // global.ws.onmessage = e => {
    //   console.log(e.data);
    // };
    //
    // /**
    //  * On error event
    //  * @param e
    //  */
    // global.ws.onerror = e => {
    //   console.log(e);
    // };
    //
    // /**
    //  * On close event
    //  * @param e
    //  */
    // global.ws.onclose = e => {
    //   console.log(e.message);
    // };
  };

  /**
   * After mounting react hook to set the Orientation to Portrait
   */
  componentDidMount() {
    if (this.props) {
      console.log(this.props);
    }

    this.props.navigation.addListener('willFocus', async () => {
      await ScreenOrientation.lockAsync(
          ScreenOrientation.OrientationLock.PORTRAIT);
    });
  }

  /**
   * Content of the HomeScreen
   * @returns {*}
   */
  render() {
    return (
        <View style={styles.container}>
          <ScrollView contentContainerStyle={styles.contentContainer}>
            <View style={styles.logoContainer}>
              <Text style={styles.logo}>bytive</Text>
            </View>

            <View style={styles.connectionButtonContainer}>
              <TouchableOpacity
                  onPress={this.connectToServer}
                  style={styles.connectionButton}
              >
                <Text
                    style={styles.connectionButtonText}>
                  {this.state.test}
                </Text>
              </TouchableOpacity>
            </View>
            <View>
              <Text
                  style={styles.infoContainerText}>
                {this.state.connectButton.isDisabled ?
                    this.state.connectButton.text.info :
                    ''}</Text>
            </View>
          </ScrollView>
        </View>
    );
  }
}

/**
 * Styling of the HomeScreen
 */
const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: StatusBar.currentHeight,
      },
      contentContainer: {},
      logoContainer: {
        alignItems: 'center',
        marginHorizontal: 50,
        marginTop: Layout.window.height / 5,
      },
      logo: {
        fontSize: 17,
        color: 'rgba(96,100,109, 1)',
        lineHeight: 24,
        textAlign: 'center',
      },
      connectionButtonContainer: {
        marginTop: Layout.window.height / 6,
        alignItems: 'center',
      },
      connectionButton: {
        marginTop: 25,
        marginHorizontal: 50,
        backgroundColor: Colors.tintColor,
        padding: 15,
        alignSelf: 'stretch',
        borderRadius: 100,
      },
      connectionButtonText: {
        textAlign: 'center',
        color: '#fff',
      },
      infoContainerText: {
        marginTop: 25,
        marginHorizontal: 80,
        backgroundColor: 'rgba(0,0,0,0.1)',
        color: 'rgba(0,0,0,0.7)',
        padding: 10,
        alignSelf: 'stretch',
        borderRadius: 25,
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.2)',
        textAlign: 'center',
        fontSize: 9,
      },
    })
;

export default HomeScreen;