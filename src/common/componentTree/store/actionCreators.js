import * as constants from './constants'
import {
  fromJS
} from 'immutable';
import request from '../../../utils/request';

let result = []

function formatData(data) {
  data.forEach(item => {
    item.key = (item.id).toString()
    item.title = item.componentName
    if(item.sort === null ) {
      item.sort = 1000000
    }
    if (item.componentLevel <= 1) {
      item.show = true
    } else {
      item.show = false
    }
    delete item.componentName
    delete item.id
    delete item.state
  })

  data.sort((a, b) => a.sort - b.sort)

  for (let i = 0; i <= 3; i++) {
    result[i] = data.filter(item => {
      return item.componentLevel === i + 1
    })
  }

  for (let i = 3; i >= 1; i -= 1) {
    result[i].forEach(child => {
      result[i - 1].forEach(parent => {
        if (child.parentId === parent.key * 1) {
          if (!parent.children) {
            parent.children = []
          }
          parent.children.push(child)
        }
      })
    })
  }

  return result[0]
}


export const saveComponentList = value => ({
  type: constants.SAVE_COMPONENT_LIST,
  value: fromJS(value)
});


export const getComponentList = (callback) => {
  return (dispatch) => {
    request.post('/componentList', ).then(res => {
      const result = formatData(res.data.data)
      callback(result)
      dispatch(saveComponentList(result))
    }).catch((error) => {})
  }
}