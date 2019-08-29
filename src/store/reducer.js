import { combineReducers } from 'redux-immutable'
import { reducer as componentTreeReducer } from '../common/componentTree/store'
import { reducer as headerReducer } from '../common/header/store'
import { reducer as homeReducer } from '../pages/home/store'
import { reducer as detailReducer } from '../pages/detail/store'
import { reducer as downReducer } from '../pages/download/store'
import { reducer as pointCheckReducer } from '../pages/pointCheck/store'
import { reducer as searchReducer } from '../pages/search/store'


const reducer = combineReducers({
	home: homeReducer,
	header: headerReducer,
	detail: detailReducer,
	download: downReducer,
	pointCheck: pointCheckReducer,
	search: searchReducer,
	componentTree: componentTreeReducer
})

export default reducer
