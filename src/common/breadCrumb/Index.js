import React, {Component, Fragment} from 'react';
import {BreadWrapper} from './style'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'

let componentId = ''
// 递归查询上一级 id
const getId = (component, id) => {
		component.forEach(item => {
				if (parseInt(item.key, 10) !== parseInt(id, 10)) {
						if (item.children) {
								getId(item.children, id)
						}
				} else {
					componentId = item.parentId
					return
				}
		})
		return componentId
}

// 获取当前id
const getComponentId = (component, id) => {
		return getId(component, id)
}

class BreadCrumb extends Component {
		render() {
				const {type, id, list} = this.props
				const component = list.toJS()
				let breadList = null
				let componentId = ''
				switch (type) {
						case '1':
								breadList = '系统详情'
								break;
						case '2':
									componentId = getComponentId(component, id)
								breadList = <Fragment> <Link to={`/detail/1/${componentId}`}> 系统详情 </Link> > 总成详情</Fragment > 
								break;
								case '3':
									componentId = getComponentId(component, id)
									let parentId = getComponentId(component, componentId)
									breadList = <Fragment> 
										<Link to={`/detail/1/${parentId}`}> 系统详情 </Link> >
										<Link to={`/detail/2/${componentId}`}> 总成详情 </Link> > 核心零部件详情</Fragment > 
									break;
						default:
								breadList = '故障模式'
								break;
				}
				return ( <BreadWrapper> <Link to='/'> 首页 </Link>  > {
						breadList
				} </BreadWrapper>
		)

	}
}

const mapStateToProps = (state) => {
	return {
		list: state.getIn(['componentTree', 'list'])
	}
}

export default withRouter(connect(mapStateToProps, null)(BreadCrumb));