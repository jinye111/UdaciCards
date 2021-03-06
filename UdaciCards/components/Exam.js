import React,{ Component } from 'react';
import { View, Platform, StatusBar,Text,AsyncStorage,StyleSheet,TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { getDecks } from '../utils/api'
import { showDecks } from '../actions'
import { setLocalNotification,clearLocalNotification } from '../utils/helper'

class Exam extends Component{
	state={
		index:0,
		isOver:false,
		number:0,
		showAnswer:false,
	}

	showAnswer=()=>{
		this.setState({
			showAnswer:true
		})
	}

	restart=()=>{
		this.setState({
			isOver:false,
			number:0
		})
	}

	judge=(answer1,answer2,length,index)=>{
		console.log(answer1===answer2)
		console.log(answer2)
		if (answer1 === 'Correct') {
			this.setState((prevState)=>({
				number:prevState.number+1
			}))
			console.log(this.state.number)
		}
		if (index<length-1) {
			this.setState((prevState)=>({
				index:prevState.index+1,
				showAnswer:false
			}))	
		}
		if (index===length-1) {
			clearLocalNotification().then(setLocalNotification);
			let questions=this.props.navigation.state.params.questions
			questions['isComplete']=true
			AsyncStorage.mergeItem(this.props.navigation.state.params.questions['title'],JSON.stringify(questions))
			this.setState((prevState)=>({
				isOver:true
			}))	
		}
	}
	
	render(){
		const {index}=this.state
		const questions = this.props.navigation.state.params.questions['questions']
		return (
			<View>
				{!this.state.isOver&&<Text>{questions[index].question}</Text>}
				{!this.state.isOver&&<TouchableOpacity onPress={this.judge.bind(this,'Correct',questions[index].answer,questions.length,index)}>
					<Text>Correct</Text>
				</TouchableOpacity>}
				{!this.state.isOver&&<TouchableOpacity onPress={this.judge.bind(this,'Incorrect',questions[index].answer,questions.length,index)}>
					<Text>Incorrect</Text>
				</TouchableOpacity>}
				{this.state.showAnswer&&<Text>{questions[index].answer}</Text>}
				{!this.state.isOver&&<TouchableOpacity onPress={this.showAnswer.bind(this,questions.length,index)}>
					<Text>正确答案</Text>
				</TouchableOpacity>}
				{!this.state.isOver&&<Text>题目剩余数量:{questions.length-this.state.index-1}</Text>}
				{this.state.isOver&&<Text>您的正确率为{this.state.number*100/questions.length+"%"}</Text>}
				{this.state.isOver&&<TouchableOpacity onPress={this.restart}>
					<Text>Restart</Text>
				</TouchableOpacity>}
				{this.state.isOver&&<TouchableOpacity onPress={()=>{this.props.navigation.navigate('currentDecks')}}>
					<Text>return</Text>
				</TouchableOpacity>}
			</View>
		)
	}
}

export default Exam