import * as constants from './constants';
import { fromJS } from 'immutable';

const defaultState = fromJS({
	searchData: []
});

export default (state = defaultState, action) => {
	switch(action.type) {
			case constants.SAVE_SEARCH_LIST:
				return state.set('searchData', action.data);	
		default:
			return state;
	}
}