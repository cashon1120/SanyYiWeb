import * as constants from './constants';
import { fromJS } from 'immutable';

const defaultState = fromJS({
	list: []
});

export default (state = defaultState, action) => {
	switch(action.type) {
		case constants.SAVE_COMPONENT_LIST:
			return state.set('list', action.value);	
		default:
			return state;
	}
}