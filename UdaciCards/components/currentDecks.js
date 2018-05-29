import React,{ Component } from 'react';
import { View, Platform, StatusBar,Text,AsyncStorage,StyleSheet,TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { getDecks } from '../utils/api'
import { showDecks } from '../actions'
import { isObjectValueEqual } from '../utils/helper'
import { setLocalNotification,clearLocalNotification } from '../utils/helper'

class currentDecks extends Component{

	componentDidMount(){
		getDecks().then((data)=>{
			AsyncStorage.multiGet(data).then((results)=>{
				let decks = {}
				for (var i = 0; i < data.length; i++) {
	  				decks[results[i][0]]=JSON.parse(results[i][1])
  				}
  				console.log(decks)
  				Object.keys(decks).forEach((title)=>{
  					console.log(title)
  					if (!decks[title].isComplete) {
  						setLocalNotification()
  					}
  				})

  				if (!isObjectValueEqual(decks,this.props.decks)) {
  					this.props.showDecks(decks)
  				}
				
			})
		})

	}

	componentWillReceiveProps(){
		console.log("123")
		getDecks().then((data)=>{
			AsyncStorage.multiGet(data).then((results)=>{
				let decks = {}
				for (var i = 0; i < data.length; i++) {
	  				decks[results[i][0]]=JSON.parse(results[i][1])
  				}
  				console.log(results)
  				if (!isObjectValueEqual(decks,this.props.decks)) {
  					this.props.showDecks(decks)
  				}
			})
		})
	}


	render(){
		const decks = this.props.decks;
		
		return(
			<View style={{flex: 1,alignItems: 'center'}}>
				{
					JSON.stringify(decks)!=='{}'&&Object.keys(decks).map((deck,index)=>(
						<TouchableOpacity key={index} style={styles.container} onPress={()=>this.props.navigation.navigate('CataLogs',{questions:decks[deck]})}>
							<View>
								<Text>{decks[deck].title}</Text>
								<Text>{decks[deck].questions.length} cards</Text>
							</View>
						</TouchableOpacity>
					))
				}
			</View>
		);
	}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width:400,
    borderWidth: 1,
    marginBottom: 2
  }
})

function mapDispatchToProps (dispatch) {
	console.log("45678")
  return {
    showDecks: (data) => {dispatch(showDecks(data))},
  }
}

function mapStateToProps (state) {
  
  return state
  
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(currentDecks)

