import * as constants from './constants';

const defaultState = {
	nextPage: 1,
	searchList: [],
	total: ''
}

export default (state = defaultState, action) => {
	switch(action.type) {
		case constants.SAVE_SEARCH_LIST:
			return state.merge({
				'searchList': state.get('searchList').concat(action.data.list),
				'nextPage': state.set('nextPage', action.data.nextPage),
				'total': state.set('total', action.data.total)
			});
		default:
			return state;
	}
}