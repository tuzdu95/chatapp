import React, { Component } from "react";
import { View, Text, StyleSheet, ActivityIndicator, Button } from "react-native";
import auth from "expo-app-auth";
import firebase from "firebase";

class loadingScreen extends Component {
     componentDidMount() {
        this.userLoggedin();
     }
     userLoggedin = () => {
         firebase.auth().onAuthStateChanged(user => {
            if (user) {
               this.props.navigation.navigate('listScreen')
            } else {
               this.props.navigation.navigate('loginScreen')
            }
       })
     }

    render() {
        return (
            <View style={style.container}>
                <Text> loadingScreen </Text>
                <Text> Welcome {this.props.navigation.getParam("email")} </Text>
                <Button title='Log out' 
                onPress={()=>this.props.navigation.navigate("loginScreen")}/>
            </View>
            
        );
    }
}

export default loadingScreen;

const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});