import React, {PureComponent, Fragment} from 'react'
import {connect} from 'react-redux'
import Loading from '../../common/loading/Index'
import {Link} from 'react-router-dom'
import {SearchPage} from './style'
import {actionCreators} from './store';
import {MainWrapper} from '../../style'
import {message} from 'antd';

class Download extends PureComponent {
		state = {
				key: this.props.match.params.key,
				pageSize: 10,
				nextPage: 1,
				pageNum: 0,
				loading: false,
				list: [],
				total: [],
				minHeight: 0
		}

		componentDidMount() {
				this.getSearchList()
				this.setFooterPosition()
		}

		componentWillReceiveProps(nextProps) {
				const {key} = nextProps.match.params
				if (key !== this.state.key) {
						this.setState({
								pageNum: 0,
								nextPage: 1,
								list: [],
								key
						}, () => {
								this.getSearchList()
						});
				}
		}
		setFooterPosition(){
			const windowHeight = document.body.clientHeight
			this.setState({
				minHeight: windowHeight - (120 + 67)
			})
		}
		getSearchList() {
				const {pageSize, key, list, nextPage, pageNum} = this.state
				const {getSearchList} = this.props
				const callback = res => {
						this.setState({
								nextPage: res.data.nextPage,
								list: list.concat(res.data.list),
								total: res.data.total
						})
				}
				if (nextPage > pageNum) {
						this.setState({
								pageNum: pageNum + 1
						}, () => {
								getSearchList({
										pageNum: pageNum + 1,
										pageSize,
										componentName: key
								}, callback)
						})
				} else {
						message.info('没有更多数据了')
				}
		}

		render() {
				const {loading, list, total, minHeight} = this.state
				return (
						<Fragment>
								<MainWrapper style={{minHeight}}>

										<SearchPage>

												<h2>为您找到 {total}
														条相关记录</h2>
												{total === 0
														? <Fragment>
																		<div className="ant-empty ant-empty-normal">
																				<div className="ant-empty-image">
																						<img
																								alt="暂无数据"
																								src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNDEiIHZpZXdCb3g9IjAgMCA2NCA0MSIgIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMCAxKSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgIDxlbGxpcHNlIGZpbGw9IiNGNUY1RjUiIGN4PSIzMiIgY3k9IjMzIiByeD0iMzIiIHJ5PSI3Ii8+CiAgICA8ZyBmaWxsLXJ1bGU9Im5vbnplcm8iIHN0cm9rZT0iI0Q5RDlEOSI+CiAgICAgIDxwYXRoIGQ9Ik01NSAxMi43Nkw0NC44NTQgMS4yNThDNDQuMzY3LjQ3NCA0My42NTYgMCA0Mi45MDcgMEgyMS4wOTNjLS43NDkgMC0xLjQ2LjQ3NC0xLjk0NyAxLjI1N0w5IDEyLjc2MVYyMmg0NnYtOS4yNHoiLz4KICAgICAgPHBhdGggZD0iTTQxLjYxMyAxNS45MzFjMC0xLjYwNS45OTQtMi45MyAyLjIyNy0yLjkzMUg1NXYxOC4xMzdDNTUgMzMuMjYgNTMuNjggMzUgNTIuMDUgMzVoLTQwLjFDMTAuMzIgMzUgOSAzMy4yNTkgOSAzMS4xMzdWMTNoMTEuMTZjMS4yMzMgMCAyLjIyNyAxLjMyMyAyLjIyNyAyLjkyOHYuMDIyYzAgMS42MDUgMS4wMDUgMi45MDEgMi4yMzcgMi45MDFoMTQuNzUyYzEuMjMyIDAgMi4yMzctMS4zMDggMi4yMzctMi45MTN2LS4wMDd6IiBmaWxsPSIjRkFGQUZBIi8+CiAgICA8L2c+CiAgPC9nPgo8L3N2Zz4K"/>
																				</div>
																				<p className="ant-empty-description">暂无数据</p>
																		</div>
																</Fragment>
														: <Fragment>
																{list.map(item => <div key={item.id} className="searchList">
																		{item.coreComponentPicture && item.coreComponentPicture.length > 0
																				? <div><img src={item.coreComponentPicture[0].url} alt=""/></div>
																				: null}

																		<div className="flex-1">
																				<Link to={`/detail/5/${item.id}`}>{item.failureMode || item.componentName}
																				</Link>
																				{item.assemblyComponentName}
																				{item.coreComponentName}
																				<div>
																						原因分析: {item.causeAnalysis}
																				</div>
																		</div>
																		<div>
																				浏览量: {item.views}
																		</div>
																</div>)}
																<a className="loadMore" onClick={() => this.getSearchList()}>加载更多</a>
														</Fragment>
}

										</SearchPage>
								</MainWrapper>
								<Loading loading={loading}/>
						</Fragment>
				)
		}
}

const mapDispatch = (dispatch) => {
		return {
				getSearchList(params, callback) {
						dispatch(actionCreators.getSearchList(params, callback))
				}
		}
}

export default connect(null, mapDispatch)(Download);
