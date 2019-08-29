import { fromJS } from 'immutable';
import * as constants from './constants';

const defaultState = fromJS({
	reportList: []
});

export default (state = defaultState, action) => {
	switch(action.type) {
		case constants.SAVE_REPORT_LIST:
			return state.set('reportList', action.data);
		default:
			return state;
	}
}