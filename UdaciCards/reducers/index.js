import { SHOW_DECKS } from '../actions'
import { combineReducers } from 'redux'

function decks(state={},action) {
	const {decks}=action;
  	switch(action.type){
    	case SHOW_DECKS :
    	  	return decks;

    	default :
      		return state
  	}
}

export default combineReducers({
  decks
})