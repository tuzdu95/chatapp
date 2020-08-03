import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

class chatScreen extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//     };
//   }

  render() {
    return (
      <View style={style.container }>
        <Text> chatScreen </Text>
      </View>
    );
  }
}

export default chatScreen;

const style = StyleSheet.create({
    container:{
        flex:1,
        alignItems: 'center',
        justifyContent:'center'
    }
});