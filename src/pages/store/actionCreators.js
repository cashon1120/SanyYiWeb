import * as constants from './constants'
import { fromJS } from 'immutable';
import request from '../../utils/request';

const saveSearchList = value => ({
	type: constants.SAVE_SEARCH_LIST,
	data: fromJS(value)
})

export const getSearchList = (params,callback) => {
	return (dispatch) => {
		request.post('/failureModel/serachFailureModel', params).then(res => {
			if(callback) callback()
			const result = res.data.data
			dispatch(saveSearchList(result))
		}).catch(() => {
		})
	}
}