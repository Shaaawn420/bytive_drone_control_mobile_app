import React from 'react';
import {View, StyleSheet, StatusBar, TouchableOpacity, Text} from 'react-native';
import {TouchEventDemuxer, JoystickDemuxed} from 'joystick-component-lib';
import {ScreenOrientation} from 'expo';

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
    sendToWs = (controllerSide, x = null, y = null) => {
        global.ws.send(JSON.stringify({type: controllerSide, x: x, y: y}));
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
     * Start Button Handler
     */
    startHandler = () => {
        this.sendToWs('start');
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

    /**
     * Content of the ControlScreen
     * @returns {*}
     */
    render() {
        return (
            <View>
                <TouchableOpacity
                    onPress={this.startHandler}
                    style={styles.startButtonContainer}
                >
                    <Text style={styles.startButton}>
                        Start
                    </Text>
                </TouchableOpacity>
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
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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
    startButtonContainer: {
        position: "absolute",
        top: StatusBar.currentHeight - 10,
        width: "100%",
        flex: 1,
        alignItems: "center"
    },
    startButton: {
        width: "30%",
        backgroundColor: "rgba(40,167,69,1)",
        padding: 15,
        borderRadius: 10,
        textAlign: "center",
        color: "white"
    }
});

export default ControlScreen;