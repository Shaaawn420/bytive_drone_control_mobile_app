import React from "react";
import {
  ScrollView,
  StyleSheet,
  StatusBar,
  Text,
  TouchableOpacity,
  View
} from "react-native";

import Layout from "../constants/Layout";
import Colors from "../constants/Colors";

export default class HomeScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <View style={styles.logoContainer}>
            <Text style={styles.logo}>bytive</Text>
          </View>
  
          <View style={styles.connectionButtonContainer}>
            <TouchableOpacity
              onPress={handleConnectButton}
              style={styles.connectionButton}
            >
              <Text style={styles.connectionButtonText}>Connect</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}

function handleConnectButton() {
  // alert("yeet");
  console.log(this.props.navigation.navigate('Settings'));
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: StatusBar.currentHeight
  },
  contentContainer: {},
  logoContainer: {
    alignItems: "center",
    marginHorizontal: 50,
    marginTop: Layout.window.height / 5
  },
  logo: {
    fontSize: 17,
    color: "rgba(96,100,109, 1)",
    lineHeight: 24,
    textAlign: "center"
  },
  connectionButtonContainer: {
    marginTop: Layout.window.height / 6,
    alignItems: "center"
  },
  connectionButton: {
    marginTop: 25,
    marginHorizontal: 50,
    backgroundColor: Colors.tintColor,
    padding: 15,
    alignSelf: "stretch",
    borderRadius: 100
  },
  connectionButtonText: {
    textAlign: "center",
    color: "#fff"
  }
});
