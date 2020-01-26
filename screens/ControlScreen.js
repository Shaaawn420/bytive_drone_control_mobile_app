import React from "react";
import {ScrollView, Text, TouchableOpacity, View, StyleSheet, StatusBar, NavigationEvents} from "react-native";
import {TouchEventDemuxer, JoystickDemuxed} from 'joystick-component-lib';
import {ScreenOrientation} from 'expo';
import { WEBSOCKET_SERVER_ADDRESS } from "../constants/Configuration";

import ws from "../components/ws";

const Demuxer = TouchEventDemuxer([JoystickDemuxed, JoystickDemuxed]);

class ControlScreen extends React.Component {
    static navigationOptions = {
        headerShown: false
    };

    rightJoyStickHandler = (x, y) => {
        this.ws.send({type: "right", x: x, y: y})
    };

    leftJoyStickHandler = (x, y) => {
        this.ws.send({type: "left", x: x, y: y})
    };


    async componentDidMount() {
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_LEFT);

        this.ws = new ws(WEBSOCKET_SERVER_ADDRESS);
    }

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
    }
});

export default ControlScreen;