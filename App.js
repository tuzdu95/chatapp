import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import loginScreen from "./screens/loginScreen";
import loadingScreen from "./screens/loadingScreen";
import listChatScreen from "./screens/listChatScreen";
import firebase from "firebase";
import {FirebaseConfig} from "./config";

if (!firebase.apps.length) {
  firebase.initializeApp(FirebaseConfig);
}
else{
  firebase.app();
}

export default class App extends React.Component{
  render(){return <AppNavigator />;}
}

const switchNavigator = createSwitchNavigator({
  loginScreen: {screen: loginScreen},
  loadingScreen: {screen: loadingScreen},
  
  listChatScreen: {screen: listChatScreen},
});

const AppNavigator = createAppContainer(switchNavigator);


