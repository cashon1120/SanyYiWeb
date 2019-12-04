import React, {Component, Fragment} from 'react';
import {BreadWrapper} from './style'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'

let componentId = ''
let componentName = ''
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

const getName = (component, id) => {
	component.forEach(item => {
			if (parseInt(item.key, 10) !== parseInt(id, 10)) {
					if (item.children) {
						getName(item.children, id)
					}
			} else {
				componentName = item.title
				return
			}
	})
	return componentName
}

// 获取当前id
const getComponentId = (component, id) => {
		return getId(component, id)
}

const getComponentName = (component, id) => {
	return getName(component, id)
}

class BreadCrumb extends Component {

		render() {
				const {type, id, list, failureLevel} = this.props
				const component = list.toJS()
				let breadList = null
				let componentId = ''
				let componentName = ''
				switch (type) {
						case '1':
								breadList = <span>系统详情</span>
								break;
						case '2':
									componentId = getComponentId(component, id)
									componentName = getComponentName(component, componentId)
								breadList = <Fragment><Link to={`/detail/1/${componentId}`} > {componentName} </Link> > <span>总成详情</span></Fragment > 
								break;
								case '3':
									componentId = getComponentId(component, id)
									componentName = getComponentName(component, componentId)
									let parentId = getComponentId(component, componentId)
									let parentName = getComponentName(component, parentId)
									breadList = <Fragment> 
										<Link to={`/detail/1/${parentId}`}><span>{parentName}</span></Link> >
										<Link to={`/detail/2/${componentId}`}><span>{componentName}</span></Link> > <span>核心零部件详情</span></Fragment > 
									break;
							case '5':
								breadList = <Fragment> {
									failureLevel.systemId ? <Fragment><Link to={`/detail/1/${failureLevel.systemId}`}> {failureLevel.systemName} </Link> > </Fragment> : null
								}
								{
									failureLevel.assemblyComponentId ? <Fragment><Link to={`/detail/2/${failureLevel.assemblyComponentId}`}> {failureLevel.assemblyComponentName} </Link> ></Fragment> : null	
								}
										 <span>故障模式</span></Fragment > 
								break;
								default: 
								breadList =  <Fragment><span>系统详情</span></Fragment > 
				}
				return ( <BreadWrapper> <Link to='/'> 首页 </Link> > {
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