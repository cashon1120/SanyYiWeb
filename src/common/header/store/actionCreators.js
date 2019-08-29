import * as constants from './constants'
import { fromJS } from 'immutable';
import request from '../../../utils/request';

let result = []
function formatData(data) {
	data.forEach(item => {
		if (!item.parentId) {
			result.push({
				...item,
				children: []
			})
		}
	})
	data.forEach(item => {
		if (item.parentId) {
			result.forEach((parent, index) => {
				if(parent.id === item.parentId){
					result[index].children.push(item)
				}
			})
		}
	})
	return result
}

export const changeSearchKey = value => ({
	type: constants.CHANGE_SEARCH_KEY,
	value: fromJS(value)
});

const changeTopComponent = value => ({
	type: constants.TOP_COMPONENT,
	value: fromJS(value)
})

const saveUserInfo = value => ({
	type: constants.SAVE_USERINFO,
	value: fromJS(value)
})

export const getTopComponent = () => {
	return (dispatch) => {
		request.post('/topComponent', ).then(res => {
			const result = formatData(res.data.data)
			dispatch(changeTopComponent(result))
		}).catch(() => {
		})
	}
}

export const getUserInfo = callback => {
	return (dispatch) => {
		request.post('/user/userInfo').then(res => {
			dispatch(saveUserInfo(res.user))
		})
	}
}
