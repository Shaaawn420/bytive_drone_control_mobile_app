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
import {CONTROLSCREEN, HOMESCREEN} from '../constants/Navigations';
import {WEBSOCKET_SERVER_ADDRESS} from '../constants/Configuration';
import {WEBSOCKET_NO_CONNECTIONS} from '../constants/Errors';
import {HOME_SCREEN_BUTTON_CONNECT, HOME_SCREEN_BUTTON_TRY_AGAIN} from '../constants/Buttons';

/**
 * Home Screen Component
 */
class HomeScreen extends React.Component {

    /**
     *
     * @param props
     */
    constructor(props) {
        super(props);
        this.state = {
            companyName: "bytive",
            connectButtonIsEnabled: true,
            connectButtonTextEnabled: HOME_SCREEN_BUTTON_CONNECT.displayText,
            connectButtonTextDisabled: HOME_SCREEN_BUTTON_TRY_AGAIN.displayText,
            infoContainerText: WEBSOCKET_NO_CONNECTIONS.displayText
        }
    }

    /**
     * Navigation Options
     * @type {{headerShown: boolean}}
     */
    static navigationOptions = {
        headerShown: false,
    };

    /**
     * Button event to redirect to the control component and
     * connect to the Websocket Server
     */
    connectToServer = () => {
        if (!global.ws || global.ws.readyState === 0) {
            global.ws = new WebSocket(WEBSOCKET_SERVER_ADDRESS);

            /**
             * On connection event
             */
            global.ws.onopen = () => {
                global.ws.send('app connected');
                this.setState({
                    connectButtonIsEnabled: true
                });
                this.props.navigation.navigate(CONTROLSCREEN);
            };

            /**
             * On message event
             * @param e
             */
            global.ws.onmessage = e => {
                console.log(e.data);
            };

            /**
             * On error event
             * @param e
             */
            global.ws.onerror = e => {
                delete global.ws;
                this.setState({
                    connectButtonIsEnabled: false
                });
                console.log(e);
                this.props.navigation.navigate(HOMESCREEN);
            };

            /**
             * On close event
             * @param e
             */
            global.ws.onclose = e => {
                delete global.ws;
                this.setState({
                    connectButtonIsEnabled: false
                });
                console.log(e.message);
                this.props.navigation.navigate(HOMESCREEN);
            };
        } else if (global.ws && global.ws.readyState === 1) {
            this.props.navigation.navigate(CONTROLSCREEN)
        }

    };

    /**
     * After mounting react hook to set the Orientation to Portrait
     */
    componentDidMount() {
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
        const {companyName, connectButtonIsEnabled, connectButtonTextEnabled, connectButtonTextDisabled, infoContainerText} = this.state;

        const InfoContainer = props => {
            const {isActive, infoContainerText} = props;

            if (!isActive) {
                return (
                    <View style={styles.notificationContainer}>
                        <Text
                            style={styles.notificationContainerText}>
                            {infoContainerText}
                        </Text>
                    </View>
                )
            }

            return null
        };

        return (
            <View style={styles.container}>
                <ScrollView contentContainerStyle={styles.contentContainer}>
                    <View style={styles.logoContainer}>
                        <Text style={styles.logo}>
                            {companyName}
                        </Text>
                    </View>

                    <View style={styles.connectionButtonContainer}>
                        <TouchableOpacity
                            onPress={this.connectToServer}
                            style={connectButtonIsEnabled ? styles.connectionButton : styles.connectButtonDisabled}
                        >
                            <Text
                                style={styles.connectionButtonText}>
                                {connectButtonIsEnabled ? connectButtonTextEnabled : connectButtonTextDisabled}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>

                <InfoContainer isActive={connectButtonIsEnabled} infoContainerText={infoContainerText}/>
            </View>
        );
    }
}

/**
 * Styling of the HomeScreen
 */
const styles = StyleSheet.create({
        connectButtonDisabled: {
            marginTop: 25,
            marginHorizontal: 50,
            backgroundColor: "rgba(36,36,36,0.5)",
            padding: 15,
            alignSelf: 'stretch',
            borderRadius: 100,
        },
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
        notificationContainer: {
            position: "absolute",
            bottom: 0,
            width: "100%",
            alignItems: 'center',
            backgroundColor: "red",
        },
        notificationContainerText: {
            paddingVertical: 20,
            width: "75%",
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