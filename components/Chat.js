import React from 'react';
import { View, Text } from 'react-native';

export default class Chat extends React.Component {
  render() {
    let name = this.props.route.params.name; //allows you to access user name entry from 'Start'
    this.props.navigation.setOptions({ title: name }); //sets the user name in the navigation bar

    let chatBackground= this.props.route.params.chatBackground //allows the chatBackground color to be changed
    return (
      <View style={{flex: 1, justifyContent: 'center',
                     alignItems: 'center', backgroundColor: chatBackground}}>
        <Text style={{
          fontSize: 16,
          fontWeight: '600',
          color: '#FFFFFF'
        }}>Hello {name}!</Text>
      </View>
    )
  }
}