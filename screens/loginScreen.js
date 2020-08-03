import React, { Component } from "react";
import { View, Text, StyleSheet, Button, Alert } from "react-native";
import * as Google from "expo-google-app-auth";
import firebase from "firebase";

class loginScreen extends Component {
  isUserEqual = (googleUser, firebaseUser) => {
    if (firebaseUser) {
      var providerData = firebaseUser.providerData;
      for (var i = 0; i < providerData.length; i++) {
        if (
          providerData[i].providerId ===
            firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
          providerData[i].uid === googleUser.getBasicProfile().getId()
        ) {
          // We don't need to reauth the Firebase connection.
          return true;
        }
      }
    }
    return false;
  };

  onSignIn = (googleUser) => {
    console.log("Google Auth Response", googleUser);
    // We need to register an Observer on Firebase Auth to make sure auth is initialized.
    var unsubscribe = firebase.auth().onAuthStateChanged(
      function (firebaseUser) {
        unsubscribe();
        // Check if we are already signed-in Firebase with the correct user.
        if (!this.isUserEqual(googleUser, firebaseUser)) {
          // Build Firebase credential with the Google ID token.
          var credential = firebase.auth.GoogleAuthProvider.credential(
            googleUser.idToken,
            googleUser.accessToken
          );
          // Sign in with credential from the Google user.
          firebase
            .auth()
            .signInWithCredential(credential)
            .then((result) => {
              console.log("User signed in!");
              firebase
                .database()
                .ref("/user/" + result.user.uid)
                .set({
                  gmail: result.user.email,
                  profile_picture: result.additionalUserInfo.profile.picture,
                  locale: result.additionalUserInfo.profile.locale,
                  firt_name: result.additionalUserInfo.profile.given_name,
                  last_name: result.additionalUserInfo.profile.family_name,
                });
            })
            .catch(function (error) {
              // Handle Errors here.
              var errorCode = error.code;
              var errorMessage = error.message;
              // The email of the user's account used.
              var email = error.email;
              // The firebase.auth.AuthCredential type that was used.
              var credential = error.credential;
              // ...
            });
        } else {
          console.log("User already signed-in Firebase.");
        }
      }.bind(this)
    );
  };

  signInWithGoogleAsync = async () => {
    try {
      const result = await Google.logInAsync({
        // behavior:'web',
        androidClientId:
          "521700278648-be1mhhkug0uk7bspt54copogvbeovc21.apps.googleusercontent.com",
        //iosClientId: YOUR_CLIENT_ID_HERE,
        scopes: ["profile", "email"],
      });

      if (result.type === "success") {
        this.onSignIn(result);
        console.log("Success!", result.user.email);
        this.props.navigation.navigate("chatScreen", {
          email: result.user.email,
        });
        return result.accessToken;
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      return { error: true };
    }
  };

  render() {
    return (
      <View style={style.container}>
        <Button title="Login" onPress={this.signInWithGoogleAsync} />
      </View>
    );
  }
}

export default loginScreen;

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
