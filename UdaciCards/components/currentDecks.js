import React,{ Component } from 'react';
import { View, Platform, StatusBar,Text,AsyncStorage,StyleSheet,TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { getDecks } from '../utils/api'
import { showDecks } from '../actions'

class currentDecks extends Component{

	componentDidMount(){
		getDecks().then((data)=>{
			AsyncStorage.multiGet(data).then((results)=>{this.props.dispatch(showDecks(results))})
		})
	}


	render(){
		const decks = this.props.decks;
		if (JSON.stringify(decks)!=='{}') {
			console.log(Object.keys(this.props.decks))
		}
		
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

function mapStateToProps (state) {
  let decks = {}
  const data = state.decks
  if (JSON.stringify(state)!=='{}') {
  	for (var i = 0; i < data.length; i++) {
	  	decks[data[i][0]]=JSON.parse(data[i][1])
  	}	
  }
  
  return {decks}
  
}

export default connect(
  mapStateToProps
)(currentDecks)