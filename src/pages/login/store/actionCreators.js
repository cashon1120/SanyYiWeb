import request from '../../../utils/request';

export const login = (userName, password, callback) => {
	return () => {
		request.post('login', {
			userName,
			password
		}).then(res => {
			callback(res)
		}).catch(error => {
		})
	}
}
