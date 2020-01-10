import {
	fromJS
} from 'immutable'
import * as constants from './constants'

const defaultState = fromJS({
	indexBanner: ''
})

export default (state = defaultState, action) => {
	switch (action.type) {
		case constants.GET_INDEX_BANNER:
			return state.set('indexBanner', action.list);
		default:
			return state;
	}
}