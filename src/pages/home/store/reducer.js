import { fromJS } from 'immutable'
import * as constants from './constants'

const defaultState = fromJS({
	assemblyList: []
})

export default (state = defaultState, action) => {
	switch(action.type) {
		case constants.GET_ASEMBLY_COMPONENT:
			return state.set('assemblyList', action.list);
		default:
			return state;
	}
}