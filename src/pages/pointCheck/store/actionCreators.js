import request from '../../../utils/request';
import * as constants from './constants';
import { fromJS } from 'immutable';

const saveAssemblyList = list => ({
	type: constants.SAVE_ASSEMBLYLIST,
	list: fromJS(list)
});

export const getVehicleList = callback => {
	return () => {
		request.post('/vehicleModel/vehicleList').then((res) => {
			const result = res.data.data;
			callback(result)
		});
	}
}

export const getAssemblyList = (page) => {
	return (dispatch) => {
		request.post('/checkSystem/checkSystemList').then((res) => {
			const result = res.data.data;
			dispatch(saveAssemblyList(result));
		});
	}
}

export const getExeclTable = (vehicleModelName, checkItemIds, callback) => {
	return () => {
		request.post('/checkInfo/createCheckInfoTable',{vehicleModelName, checkItemIds}, {responseType: 'blob'}).then((res) => {
			callback(res)
		});
	}
}

export const serachCheckInfo = (vehicleModelId, checkSystemId, callback) => {
	return () => {
		request.post('/checkInfo/serachCheckInfo', {vehicleModelId, checkSystemId}).then((res) => {
			const result = res.data.data.checkItems.map(item => {
				return {...item, children: []}
			})
			res.data.data.checkInfos.forEach(item => {
				result.forEach(parent => {
					if(item.checkItemId === parent.id){
						parent.children.push(item)
					}
				})
			})
			callback(result)
		});
	}
}


