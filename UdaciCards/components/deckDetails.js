import React,{ Component } from 'react';
import { View, Platform, StatusBar,Text,TextInput,StyleSheet,TouchableHighlight,DeviceEventEmitter } from 'react-native'
import { addCardToDeck } from '../utils/api'
import { connect } from 'react-redux'

class deckDetails extends Component{

	state={
		answer:'123',
		question:'456',
	}

	handleQuestionChange=(input)=>{
		
		this.setState(()=>({
			question:input
		}))
	}

	handleAnswerChange=(input)=>{
		this.setState(()=>({
			answer:input
		}))
	}

	componentWillUnmount(){
    	DeviceEventEmitter.emit('ChangeUI');
  	}


	handleQuestionInput=(title,question,answer)=>{
		let card={
			question:question,
			answer:answer
		}
		addCardToDeck({title,card});	
	}

	handleCompletle=()=>{
		DeviceEventEmitter
		this.props.navigation.navigate('currentDecks')
	}

	render(){

		const title = this.props.navigation.state.params.title

		const {answer,question}=this.state
		return(
			<View style={styles.container}>
				<Text>卡片集名称:{title}</Text>
				<Text>问题</Text><TextInput value={question} style={styles.input} onChangeText={this.handleQuestionChange}/>
				<Text>答案</Text><TextInput value={answer} style={styles.input} onChangeText={this.handleAnswerChange}/>
				<TouchableHighlight style={styles.btn} underlayColor='#d4271b' onPress={this.handleQuestionInput.bind(null,title,question,answer)}>
					<Text style={styles.btnText}>提交</Text>
				</TouchableHighlight>
				<TouchableHighlight style={styles.btn} underlayColor='#d4271b' onPress={this.handleCompletle}>
					<Text style={styles.btnText}>完成</Text>
				</TouchableHighlight>
			</View>
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

function mapStateToProps (details) {
  return {
    details
  }
}

export default deckDetails