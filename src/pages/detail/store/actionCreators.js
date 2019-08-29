import request from '../../../utils/request';
import * as constants from './constants';
import {
	fromJS
} from 'immutable';

const setComponentInfo = data => ({
	type: constants.GET_COMPONENT_INFO,
	data: fromJS(data)
})

const saveAllAssembly = data => ({
	type: constants.SAVE_ALL_ASSEMBLY,
	data: fromJS(data)
})

export const getComponentInfo = (id, callback) => {
	return (dispatch) => {
		request.post('/loadAssemblyComponentInfo', {
			id
		}).then(res => {
			const result = res.data.data;
			dispatch(setComponentInfo(result))
			callback(result)
		})
	}
}

export const getFailure = (id, callback) => {
	return (dispatch) => {
		request.post('/failureModel/failureModelDetail', {
			id
		}).then(res => {
			const result = res.data.data;
			dispatch(setComponentInfo(result))
			callback(result)
		})
	}
}

export const getHistoryFailure = (id, callback) => {
	return () => {
		request.post('/failureModel/historyRecord', {
			id
		}).then(res => {
			const result = res.data.data;
			callback(result)
		})
	}
}

export const downloadFile = (params, callback) => {
	return () => {
		request.post('/upload/download', params, {
			responseType: 'blob'
		}).then((res) => {
			const result = res
			callback(result)
		});
	}
}

export const requestAllAssembly = (params, callback) => {
	return (dispatch) => {
		request.post('/loadAllAssemblyComponent').then(res => {
			const result = res.data.data
			dispatch(saveAllAssembly(result))
		});
	}
}

export const getWordTable = (id, callback) => {
	return () => {
		request.post('/failureModel/downloadFailureModel?id=' + id,{id}, {responseType: 'blob'}).then((res) => {
			callback(res)
		});
	}
}
