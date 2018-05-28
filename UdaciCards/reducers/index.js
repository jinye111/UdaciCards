import { SHOW_DECKS } from '../actions'
import { combineReducers } from 'redux'

function decks(state={},action) {
	const {data}=action;
  	switch(action.type){
    	case SHOW_DECKS :
    	  	return data;

    	default :
      		return state
  	}
}

export default combineReducers({
  decks
})