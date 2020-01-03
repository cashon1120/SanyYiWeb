import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import {Input} from 'antd'
import {Redirect, Link} from 'react-router-dom'
import {actionCreators} from './store'
import {HeaderWrapper, Logo, SearchWrapper, NavWrapper} from './style'
import Loading from '../loading/Index'
import {MainWrapper} from '../../style'

class Header extends Component {

		state = {
				isLogin: true,
				loading: false,
				focused: false,
				loginOutVisible: false
		}

		componentDidMount() {
				const {getTopComponent, topComponent, getUserInfo, userInfo} = this.props
				if (!userInfo.toJS().realName) {
						getUserInfo()
				}
				const list = topComponent.toJS()
				if (list.length === 0) 
						getTopComponent()
		}

		submitSearch(e) {
				e.preventDefault();
				const {searchKey, prop} = this.props
				prop
						.history
						.push(`/search/${searchKey}`)
		}

		showLoginOut(tag) {
				this.setState({loginOutVisible: tag})
		}

		// 退出登录
		loginOut() {
				localStorage.removeItem('token')
				localStorage.removeItem('isLogin')
				this.setState({isLogin: false})
		}

		showTree() {
				const {focused} = this.state
				this.setState({
						focused: !focused
				})
		}

		setFocus(type) {
				this.setState({focused: type})
		}

		gotoHome() {
				const {prop} = this.props
				const pathname = prop.location.pathname
				if (pathname.length === 1) {
						window.location = '/'
				} else {
						prop
								.history
								.push(`/`);
				}
		}

		render() {

				const {isLogin, loading, loginOutVisible} = this.state
				const {searchKey, changeSearchKey, userInfo} = this.props
				const info = userInfo.toJS()
				if (isLogin) {
						return (
								<Fragment>
										<HeaderWrapper>
												<MainWrapper>
														<Logo/>
														<NavWrapper
																onMouseEnter={() => this.setFocus(true)}
																onMouseLeave={() => this.setFocus(false)}>
																<a onClick={() => this.gotoHome()}>首页</a>
														</NavWrapper>
														<NavWrapper>
																<Link to="/pointCheck">点检表</Link>
														</NavWrapper>
														<NavWrapper>
																<Link to="/download">附件报告</Link>
														</NavWrapper>
														<SearchWrapper>
																<div>
																		<form onSubmit={(e) => this.submitSearch(e)}>
																				<Input
																						placeholder="请输入故障模式查询"
																						className="navSearch"
																						value={searchKey}
																						onChange={(e) => changeSearchKey(e)}/>
																				<button type="submit"></button>
																		</form>
																</div>

														</SearchWrapper>

												</MainWrapper>
												<Loading loading={loading}/>
												<div className="userName">
														<Link
																to="/userCenter"
																onMouseEnter={() => this.showLoginOut(true)}
																onMouseLeave={() => this.showLoginOut(false)}>{info.realName}{loginOutVisible
																		? <span className="loginOut" onClick={() => this.loginOut()}>退出登录</span>
																		: null}</Link>
																<a target="blank" href="http://10.13.136.28:8124/">进入后台</a>
												</div>
										</HeaderWrapper>
								</Fragment>
						)
				}
				return <Redirect to='/login'/>
		}
}

const mapStateToProps = (state) => {
		return {
				pageNum: state.getIn(['header', 'pageNum']),
				searchKey: state.getIn(['header', 'searchKey']),
				topComponent: state.getIn(['header', 'topComponent']),
				userInfo: state.getIn(['header', 'userInfo'])
		}
}

const mapDispathToProps = (dispatch) => {
		return {
				changeSearchKey(e) {
						dispatch(actionCreators.changeSearchKey(e.target.value));
				},
				getTopComponent() {
						dispatch(actionCreators.getTopComponent());
				},
				getUserInfo() {
						dispatch(actionCreators.getUserInfo());
				}
		}
}

export default connect(mapStateToProps, mapDispathToProps)(Header);
