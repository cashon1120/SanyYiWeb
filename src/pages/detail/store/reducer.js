import {
	fromJS
} from 'immutable';
import * as constants from './constants';

const defaultState = fromJS({
	componentInfo: {},
	allAssembly: []
});

export default (state = defaultState, action) => {
	switch (action.type) {
		case constants.GET_COMPONENT_INFO:
			return state.set('componentInfo', action.data);
		case constants.SAVE_ALL_ASSEMBLY:
			return state.set('allAssembly', action.data);
		default:
			return state;
	}
}