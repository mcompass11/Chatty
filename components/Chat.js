import React from 'react';
import { View, Platform, KeyboardAvoidingView, StyleSheet } from 'react-native';
import { Bubble, GiftedChat } from 'react-native-gifted-chat';


const firebase = require('firebase');
require('firebase/firestore');
//imports firebase
export default class Chat extends React.Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      uid: 0,
      user: {
        _id: '',
        name: '',
        avatar: '',
      }
    };

    if (!firebase.apps.length){
      firebase.initializeApp({
      apiKey: "AIzaSyBgC4COn6SOlJIhMRLc0jxJIqwj0AXyXDc",
      authDomain: "chatty-478ad.firebaseapp.com",
      projectId: "chatty-478ad",
      storageBucket: "chatty-478ad.appspot.com",
      messagingSenderId: "126951501896",
      });
    }

    this.referenceChatMessages = firebase.firestore().collection('messages');
    //this stores and retrieves the chat messages the user sends
  }

  componentDidMount() {
    let name = this.props.route.params.name; //allows you to access user name entry from 'Start'
    this.props.navigation.setOptions({ title: name }); //sets the user name in the navigation bar


    this.authUnsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
         firebase.auth().signInAnonymously();
      }
      this.setState({
        uid: user.uid,
        messages: [],
        user: {
          _id: user.uid,
          name: name,
          avatar: 'https://placeimg.com/140/140/any',
        }
      });//updates the user state with currently active user data
      this.unsubscribe = this.referenceChatMessages
      .orderBy('createdAt', 'desc')
      .onSnapshot(this.onCollectionUpdate);

    }); //updates collection
  }

  onCollectionUpdate = (querySnapshot) => {
    const messages = []; //goes through each document

    querySnapshot.forEach((doc) => {
      //gets the QueryDocumentSnapshot's data
      let data = doc.data();
      messages.push({
        _id: data._id,
        createdAt: data.createdAt.toDate(),
        text: data.text,
        user: {
          _id: data.user._id,
          name: data.user.name,
          avatar: data.user.avatar,
        }
      });
    });
    this.setState({
      messages:messages,
    });
  };

  addMessages() {
    const message = this.state.messages[0];

    this.referenceChatMessages.add({
      _id: message._id,
      createdAt: message.createdAt,
      text: message.text,
      user: this.state.user
    });
  } //adds messages to database

  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }), () => {
      this.addMessages();
    });
  } // function appends messages together to be displayed in the chat

  componentWillUnmount() {
    this.unsubscribe();
    this.authUnsubscribe();
  }

  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: 'blue'
          },
          left: {
            backgroundColor: 'white'
          }
        }}
      />
    )
  }

  render() {

    let chatBackground= this.props.route.params.chatBackground //allows the chatBackground color to be changed
    return (
      <View style={{flex: 1, backgroundColor: chatBackground}}>
        <GiftedChat
          renderBubble={this.renderBubble.bind(this)}
          messages={this.state.messages}
          onSend={(messages) => this.onSend(messages)}
          user={{
                _id: this.state.user._id,
                name: this.state.name,
                avatar: this.state.user.avatar
              }}
        />
        { Platform.OS === 'android' ? <KeyboardAvoidingView behavior='height' /> : null}
        {/* The above conditional helps with the visual if the OS is an android */}
      </View>
    )
  }
}

const styles = StyleSheet.create({

});