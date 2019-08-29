import request from '../../../utils/request';

export const getSearchList = (params, callback) => {
	return () => {
		request.post('/failureModel/serachFailureModel', params).then((res) => {
			const result = res.data;
			callback(result)
		});
	}
}

