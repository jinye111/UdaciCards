export const SHOW_DECKS='SHOW_DECKS'

export function showDecks(data){
	return {
    	type: SHOW_DECKS,
    	data,
  	}
}