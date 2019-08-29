import request from '../../../utils/request';

export const editPassword = (params, callback) => {
	return () => {
		request.post('/user/editPassword', params).then((res) => {
			const result = res.data;
			callback(result)
		});
	}
}

