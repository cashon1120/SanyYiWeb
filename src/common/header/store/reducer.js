import * as constants from './constants';
import {
	fromJS
} from 'immutable';

const defaultState = fromJS({
	searchKey: '',
	topComponent: [],
	userInfo: {},
});

export default (state = defaultState, action) => {
	switch (action.type) {
		case constants.CHANGE_SEARCH_KEY:
			return state.set('searchKey', action.value);
		case constants.TOP_COMPONENT:
			return state.set('topComponent', action.value);
		case constants.SAVE_USERINFO:
			return state.set('userInfo', action.value);
		default:
			return state;
	}
}