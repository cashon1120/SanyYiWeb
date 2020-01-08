import request from '../../../utils/request';
import * as constants from './constants';
import { fromJS } from 'immutable';

const addAssemblyList = (list) => ({
	type: constants.GET_ASEMBLY_COMPONENT,
	list: fromJS(list),
})

const saveBanner = (list) => ({
	type: constants.GET_INDEX_BANNER,
	list
})

export const getAssembly = (id, callback) => {
	return (dispatch) => {
		request.post('loadAssemblyComponent', {id}).then((res) => {
			if(res){
				const result = res.data.data;
				dispatch(addAssemblyList(result));
				callback()
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
