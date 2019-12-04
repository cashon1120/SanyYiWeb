import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Icon} from 'antd'
import {CSSTransition} from 'react-transition-group';
import {withRouter} from 'react-router-dom'
import {actionCreators} from './store'
import {TreeData, TreeWrapper} from './style'

class ComponentTree extends Component {
		state = {
				autoExpandParent: true,
				focused: false,
				url: '',
				isLoginPage: false,
				data: [],
				activeId: '',
				fixed: false
		}

		componentDidMount() {
				const {getComponentList} = this.props
				const callback = data => {
						this.setState({data})
				}
				const that = this
				window.addEventListener('scroll', function(){
					const { fixed } = that.state
					const height = document.documentElement.scrollTop
					if(height >= 67 && !fixed){
						that.setState({
							fixed: true
						})
					}
					if(height < 67 && fixed){
						that.setState({
								fixed: false
							})
					}
				})
				getComponentList(callback)
		}

		shouldComponentUpdate(nextProps) {
				if (nextProps.focused !== this.state.focused) {
						return true
				}
				return false
		}

		jumpto = (level, id) => {
			if(parseInt(id, 10) === 1 || parseInt(id, 10) === 150) {
				return
			}
			this.setState({
				activeId: id
			})
				this
						.props
						.history
						.push(`/detail/${level - 1}/${id}`)
		};

		onSelect = (id) => {
				const {data} = this.state
				let isFind = false
				for (let i = 0; i < data.length; i += 1) {
						if (data[i].key === id) {
								data[i].show = !data[i].show
								isFind = true
						}

						if (!isFind && data[i].children) {
								for (let j = 0; j < data[i].children.length; j += 1) {
										if (data[i].children[j].key === id) {
												data[i].children[j].show = !data[i].children[j].show
												isFind = true
										}

										if (!isFind && data[i].children[j].children) {
												for (let k = 0; k < data[i].children[j].children.length; k += 1) {
														if (data[i].children[j].children[k].key === id) {
																data[i].children[j].children[k].show = !data[i].children[j].children[k].show
																isFind = true
														}
												}
										}
								}

						}
				}
				this.setState({data})
		};

		// renderTreeNodes = data => data.map(item => {   if (item.children) { return (
		//   <TreeNode title={item.title} key={item.key} dataRef={item}>
		// {this.renderTreeNodes(item.children)}       </TreeNode>     );   } return
		// <TreeNode {...item}/>; });
		renderTreeNodes = data => data.map(item => {

				if (item.children) {
						return (
								<div
										key={item.key}
										data-level={item.componentLevel}
										className={item.show
										? 'showChildren'
										: 'hideChildren'}>

										{item.show
												? <Icon onClick={() => this.onSelect(item.key, data)} type="minus-square"/>
												: <Icon onClick={() => this.onSelect(item.key, data)} type="plus-square"/>
}
										<span title={item.title} onClick={() => this.jumpto(item.componentLevel, item.key)}>{item.title}</span>
										{this.renderTreeNodes(item.children)}
								</div>
						)
				}
				return <div key={item.key} data-level={item.componentLevel}><Icon
						onClick={() => this.onSelect(item.key, data)}
						style={{
						opacity: 0.2
				}}
						type="minus-square"/>
						<span title={item.title} className={this.state.activeId === item.key ? 'active' : null} onClick={() => this.jumpto(item.componentLevel, item.key)}>{item.title}</span>
				</div>
		})

		showTree() {
				const {focused} = this.state
				this.setState({
						// focused: !focused
				})
		}

		render() {
				const {focused, data, fixed} = this.state
				return <TreeData className={fixed ? 'fixedTree' : null}>
						<Icon
								className="treeIcon"
								type="unordered-list"
								onMouseEnter={() => this.showTree()}/>
						<CSSTransition in={focused} timeout={200} classNames="slide">
								{/* <TreeWrapper onMouseLeave={() => this.showTree()}>
         <Tree
           expandedKeys={['1']}
           showIcon={true}
           onSelect={this.onSelect}>
           {this.renderTreeNodes(list)}
         </Tree>
       </TreeWrapper> */}
								<TreeWrapper onMouseLeave={() => this.showTree()}>
										{this.renderTreeNodes(data)}
								</TreeWrapper>
						</CSSTransition>
				</TreeData>

		}
}

const mapDispathToProps = (dispatch) => {
		return {
				getComponentList(callback) {
						dispatch(actionCreators.getComponentList(callback));
				}
		}
}

export default withRouter(connect(null, mapDispathToProps)(ComponentTree));