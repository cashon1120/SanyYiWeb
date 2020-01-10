import request from '../../../utils/request';
import * as constants from './constants';
import { fromJS } from 'immutable';

const addAssemblyList = (list) => ({
	type: constants.GET_ASEMBLY_COMPONENT,
	list: fromJS(list),
})

const addSystemList = (list) => ({
	type: constants.GET_SYSTEM_COMPONENT,
	list: fromJS(list),
})

const saveBanner = (list) => ({
	type: constants.GET_INDEX_BANNER,
	list
})

export const getAssembly = (pageInfo, callback) => {
	return (dispatch) => {
		request.post('/index/loadAllAssemblyComponentForIndex', pageInfo).then((res) => {
			if(res){
				const result = res.data.data.list;
				callback(result)
			}
		});
	}
}

export const getSystem = (pageInfo, callback) => {
	return (dispatch) => {
		request.post('/index/loadAllSystemComponent', pageInfo).then((res) => {
			if(res){
				const result = res.data.data.list;
				callback(result)
			}
		});
	}
}

export const getBanner = () => {
	return (dispatch) => {
		request.post('indexVehicle').then((res) => {
			if(res){
				const result = res.data.data.value;
				dispatch(saveBanner(result));
			}
		});
	}
}
