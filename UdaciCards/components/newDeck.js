import React,{ Component } from 'react';
import { View, Platform, StatusBar,TextInput,Text,KeyboardAvoidingView,StyleSheet,TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import { saveDeckTitle } from '../utils/api'

class newDeck extends Component{


	state={
		title:''
	}

	handleTextChange=(input)=>{
		console.log(input)
		this.setState(()=>({
			title:input
		}))
	}

	handleTitleInput(title){
		console.log(title)
		saveDeckTitle(title)
		this.props.navigation.navigate(
              'deckDetails',
              { title }
            )

	}

	render(){
		const {title} = this.state
		return(
			<KeyboardAvoidingView behavior='padding' style={styles.container}>
				<Text>What is the title of your new deck?</Text>
				<TextInput value={title} style={styles.input} onChangeText={this.handleTextChange}/>	
				<TouchableHighlight style={styles.btn} underlayColor='#d4271b' onPress={this.handleTitleInput.bind(this,title)}>
					<Text style={styles.btnText}>提交</Text>
				</TouchableHighlight>
			</KeyboardAvoidingView>
		);
	}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input:{
    width:200,
    height:44,
    padding:8,
    borderWidth:1,
    borderColor: '#757575',
    margin: 50,
  },
  btn:{
  	backgroundColor:'#E53224',
	padding:10,
	paddingLeft:50,
	paddingRight:50,
  	alignItems: 'center',
    justifyContent: 'center',
    borderRadius:5
  },
  btnText:{
  	color:'#fff'
  }
});

export default newDeck;