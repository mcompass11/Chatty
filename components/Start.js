import React from 'react';
import { View, Text, Button, TextInput, ImageBackground, Image, StyleSheet } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import BackgroundImage from '../A5_project_assets/backgroundImage.png';


export default class Start extends React.Component {
  constructor(props) {
    super(props);
    this.state ={ name: ''};
  }

  changeChatBackground = (chatColor) => {
    this.setState({chatBackground: chatColor})
  }; //used to change the chatBackground when user selects

  backgroundColors = {
    black: '#090C08',
    darkPurple: '#474056',
    fadedBlue: '#8A95A5',
    fadedGreen: '#B9C6AE'
  } //color choices for user to choose chatBackground
  render() {
    return (
      <View style={styles.container}>
        <ImageBackground source={BackgroundImage}
          resizeMode='cover'
          style={styles.backgroundImage}>
          
          <View style={styles.titleBox}>
            <Text style={styles.title}>CHATTY</Text>
          </View>

          <View style={styles.box1}>
            <View style={styles.inputBox}>
              <TextInput
              style={styles.input}
              onChangeText={(text) => this.setState({name: text})}
              value= {this.state.name}
              placeholder='Type name here...'
            /> 
            {/* creates the box for user to input name */}
            </View>

            <View style={styles.choose}>
            <Text>Choose Background Color:</Text>
            </View>

            <View style={styles.colorChoice}>
              <TouchableHighlight style={styles.color1}
                onPress={() => this.changeChatBackground(this.backgroundColors.black)}
              ></TouchableHighlight>
              <TouchableHighlight style={styles.color2}
                onPress={() => this.changeChatBackground(this.backgroundColors.darkPurple)}
              ></TouchableHighlight>
              <TouchableHighlight style={styles.color3}
                onPress={() => this.changeChatBackground(this.backgroundColors.fadedBlue)}
              ></TouchableHighlight>
              <TouchableHighlight style={styles.color4}
                onPress={() => this.changeChatBackground(this.backgroundColors.fadedGreen)}
              ></TouchableHighlight>

            </View>



            <Button style={[styles.button, styles.buttonText]}
          title='Go to Chat'
          onPress={() => this.props.navigation.navigate('Chat', {
            name: this.state.name,
            chatBackground: this.state.chatBackground})} 
          /> 
          {/*once the button is pressed, user is taken to Chat screen*/}

          </View>
        </ImageBackground>
      </View>
    )
  }
}

//styling sheet for each designated property
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 45,
    fontWeight: '600',
    color: '#FFFFFF'
  },
  titleBox: {
    height: '50%',
    width: '88%',
    alignItems: 'center',
    paddingTop: 100

  },
  button: {
    width: '88%',
    height: 70,
    backgroundColor: '#757083',
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600'
  },
  box1: {
    backgroundColor: '#FFFFFF',
    height: '44%',
    width: '88%',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  inputBox: {
    borderWidth: 2,
    borderRadius: 1,
    borderColor: 'grey',
    width: '88%',
    height: 60,
    paddingLeft: 20,
    flexDirection: 'row',
    alignItems: 'center'
  },
  input: {
    fontSize: 16,
    fontWeight: '300',
    color: '#757083',
    opacity: 0.5
  },
  colorChoice: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '88%',
    paddingRight: 60,
  },
  color1: {
    backgroundColor: '#090C08',
    width: 50,
    height: 50,
    borderRadius: 25
  },
  color2: {
    backgroundColor: '#474056',
    width: 50,
    height: 50,
    borderRadius: 25
  },
  color3: {
    backgroundColor: '#8A95A5',
    width: 50,
    height: 50,
    borderRadius: 25
  },
  color4: {
    backgroundColor: '#B9C6AE',
    width: 50,
    height: 50,
    borderRadius: 25
  },
  choose: {
    paddingRight: 60
  }
})