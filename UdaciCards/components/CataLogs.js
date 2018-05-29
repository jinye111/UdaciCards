import React,{ Component } from 'react';
import { View, Platform, StatusBar,Text,AsyncStorage,StyleSheet,TouchableHighlight } from 'react-native'
import { connect } from 'react-redux'
import { getDecks } from '../utils/api'
import { showDecks } from '../actions'

class CataLogs extends Component{

	render(){
		const questions=this.props.navigation.state.params.questions
		return (
			<View>
				<Text>卡片集名称:{questions.title}</Text>
				<Text>题目数量:{questions.questions.length}</Text>
				<TouchableHighlight underlayColor='#d4271b' onPress={()=>this.props.navigation.navigate('deckDetails',{title:questions.title})}>
					<Text >Add card</Text>
				</TouchableHighlight>
				<TouchableHighlight onPress={()=>this.props.navigation.navigate('Exam',{questions:questions})}>
					<Text>Start quize</Text>
				</TouchableHighlight>
			</View>
		);
	}

}

export default CataLogs;