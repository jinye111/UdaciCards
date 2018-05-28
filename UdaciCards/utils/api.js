import { AsyncStorage } from 'react-native'

export function getDeck (id) {
  return AsyncStorage.getItem(id);
   
}

export function getDecks () {
  	return AsyncStorage.getAllKeys().then(data=>data)
}

export function saveDeckTitle (id) {
	let deck={
		title:id,
		questions:[]
	}
	AsyncStorage.mergeItem(id,JSON.stringify(deck))
}

export function addCardToDeck({title,card}){
	console.log(title)
	AsyncStorage.getItem(title).then(json=>{
		let content = JSON.parse(json);
		content['questions'].push(card)
		AsyncStorage.mergeItem(title,JSON.stringify(content))
	});
}