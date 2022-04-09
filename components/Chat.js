import React from 'react';
import { View, Platform, KeyboardAvoidingView } from 'react-native';
import { Bubble, GiftedChat } from 'react-native-gifted-chat';

export default class Chat extends React.Component {
  constructor() {
    super();
    this.state = {
      messages: [],
    };
  }

  componentDidMount() {
    this.setState({
      messages: [
        {
          _id: 1,
          text: 'Hello developer',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any'
          },
        },
        {
          _id: 2,
          text: 'You have entered the chat',
          createdAt: new Date(),
          system: true,
        }
      ],
    });
  } //static message details will be updated each time state is updated

  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));
  } // function appends messages together to be displayed in the chat

  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#000'
          }
        }}
      />
    )
  }

  render() {
    let name = this.props.route.params.name; //allows you to access user name entry from 'Start'
    this.props.navigation.setOptions({ title: name }); //sets the user name in the navigation bar

    let chatBackground= this.props.route.params.chatBackground //allows the chatBackground color to be changed
    return (
      <View style={{flex: 1, backgroundColor: chatBackground}}>
        <GiftedChat
          renderBubble={this.renderBubble.bind(this)}
          messages={this.state.messages}
          onSend={(messages) => this.onSend(messages)}
          user={{_id: 1,}}
        />
        { Platform.OS === 'android' ? <KeyboardAvoidingView behavior='height' /> : null}
        {/* The above conditional helps with the visual if the OS is an android */}
      </View>
    )
  }
}