import request from '../../../utils/request';
import * as constants from './constants';
import { fromJS } from 'immutable';


const saveReportList = (data) => ({
	type: constants.SAVE_REPORT_LIST,
	data: fromJS(data)
})


export const getReportList = params => {
	return (dispatch) => {
		request.post('/report/reportList', params).then((res) => {
			const result = res.data.data;
			dispatch(saveReportList(result));
		});
	}
}

export const downloadFile = (params, callback) => {
	return () => {
		request.post('/upload/download', params, {responseType: 'blob'}).then((res) => {
			const result = res
			callback(result)
		});
	}
}

