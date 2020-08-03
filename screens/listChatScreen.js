import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

class listChatScreen extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//     };
//   }

  render() {
    return (
      <View style={style.container }>
        <Text> listChatScreen </Text>
      </View>
    );
  }
}

export default listChatScreen;

const style = StyleSheet.create({
    container:{
        flex:1,
        alignItems: 'center',
        justifyContent:'center'
    }
});