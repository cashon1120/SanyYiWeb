import React, {PureComponent, Fragment} from 'react'
import {connect} from 'react-redux'

import SwiperComponent from '../../common/swiper/Index'
import {BannerOuter,DefaultBanner, BannerWrapper, Title, PicContainer, SwiperWrapper, IndexBg, IndexContainer} from './style'
import Loading from '../../common/loading/Index'
import {MainWrapper, H1Title} from '../../style'
import {actionCreators} from './store';
import DefaultImg from '../../statics/images/nopic.jpg'
import videoPic from '../../statics/images/video-1.jpg'
import defaultBanner from '../../statics/images/index_banner.jpg'

import {setDefaultImg, setBannerSize} from '../../utils/format'

class Home extends PureComponent {
		state = {
				bannerUrl: '',
				activeId: '',
				id: '',
				loading: false,
				bannerHeight: '',
				bannerWidth: '',
				bannerActive: false,
				showMore: false
		}

		componentDidMount(){
			const {activeId} = this.state
			const {topComponent, getBanner} = this.props
			getBanner()
			if(!activeId && topComponent.toJS().length > 0){
				const activeId = topComponent.toJS()[0].children[0].id
				this.setActiveId(activeId)
			}
		}

		componentWillReceiveProps(nextprops) {
				const {activeId} = this.state
				const {topComponent} = nextprops
				if(!activeId&& topComponent.toJS().length > 0){
					const activeId = topComponent.toJS()[0].children[0].id
					this.setActiveId(activeId)
				}
		}

		// 鼠标移入事件
		handleHover = (bannerUrl, id) => {
				this.setBanner(bannerUrl)
				this.setState({
					bannerActive: true,
					id,
					// activeId: id
				})
		}

		setBanner(url) {
			if(url.indexOf('mp4') < 0){
				this.setState({bannerImgUrl: ''})
				setBannerSize(url, 1142 / 460, (size) => {
						const {bannerWidth, bannerHeight} = size
						this.setState({bannerWidth, bannerHeight, bannerUrl: url})
				})
			}else{
				this.setState({bannerImgUrl: url})
			}
		}

		// 设置当前激活系统id, 并同时加载系统下总成数据
		setActiveId = (activeId) => {
				const {getAssembly} = this.props
				this.setState({activeId, loading: true})
				const callback = response => {
						this.setState({loading: false})
				}
				getAssembly(activeId, callback)
		}

		// 查看详情
		showAssemblyDetail = id => {
				this
						.props
						.history
						.push(`/detail/2/${id}`)
		}

		// 跳转系统详情
		handleClick = () => {
			const {id} = this.state
			if(id){
				this
						.props
						.history
						.push(`/detail/1/${id}`)
					}
		}

		toggleShowMore(){
			const {showMore} = this.state
			this.setState({
				showMore: !showMore
			})
		}

		render() {
				let {topComponent, assemblyList, indexBanner} = this.props
				assemblyList = assemblyList.toJS()
				const {bannerUrl, activeId, loading, bannerWidth, bannerHeight, bannerActive, showMore} = this.state
				topComponent = topComponent.toJS()
				const componentList = topComponent.length > 0
						? topComponent[0].children
						: []
				let pictureList = []
				componentList.map(item => {
						pictureList.push({
								componentId: item.id,
								name: item.componentName,
								url: item.picture.length > 0
										? item.picture[0].url
										: DefaultImg,
								sourceType: item.picture.length > 0
										? item.picture[0].type
										: '',
								id: item.picture.length > 0
										? item.picture[0].id
										: ''
						})
						return null
				})
				return (
						<Fragment>
							<IndexBg>
								
								<DefaultBanner /> 
								<IndexContainer>
								<BannerOuter>
										<MainWrapper>
												<BannerWrapper>
													<div className={bannerActive ? 'active' : null}>
														<img
																style={{
																	width: bannerWidth,
																	height: bannerHeight
															}}
																src={bannerUrl || indexBanner || defaultBanner}
																onError={e => setDefaultImg(e)}
																onClick={this.handleClick}
																alt="banner"/>
																</div>
												</BannerWrapper>
										</MainWrapper>
								</BannerOuter>
		
								<SwiperWrapper>
										<SwiperComponent
												classType="swiperIndex"
												data={pictureList}
												// handleClick={this.handleClick}
												onHover={this.handleHover}
												listNum={6}/>
								</SwiperWrapper>
								<MainWrapper>
										<Title>
												<div>
														<div>
																<H1Title>底盘系统</H1Title>
																<div className="titleImg"></div>
														</div>

														<div className={showMore ? "listWrapper showMore" : "listWrapper"}>
																{componentList.map(item => <a
																		onClick={() => this.setActiveId(item.id)}
																		title={item.componentName}
																		className={activeId === item.id
																		? 'active'
																		: null}
																		key={item.id}>{item.componentName}</a>)}
														</div>
														<a title={!showMore ? '展开' : '收起'} className={showMore ? "downArrow upArrow" : "downArrow"} onClick={() => this.toggleShowMore()}> </a>
												</div>
										</Title>
										<PicContainer>
												{assemblyList.length > 0
														? assemblyList.map(item => <Fragment key={item.id}>
																<li onClick={() => this.showAssemblyDetail(item.id)}>
																	<div>
																		<img
																				src={item.picture.length > 0
																				? item
																						.picture[0]
																						.url
																						.indexOf('mp4') > 0
																						? videoPic
																						: item.picture[0].url
																				: DefaultImg}
																				onError={e => setDefaultImg(e)}
																				alt=""/>
																		</div>		
																				<aside className={!item.partDescription ? 'nodata' : null}>{item.partDescription || '暂无描述'}</aside>
																		<span>{item.componentName}</span>
																</li>
														</Fragment>)
														: <Fragment>
																<div className="ant-empty ant-empty-normal">
																		<div className="ant-empty-image">
																				<img
																						alt="暂无数据"
																						src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNDEiIHZpZXdCb3g9IjAgMCA2NCA0MSIgIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMCAxKSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgIDxlbGxpcHNlIGZpbGw9IiNGNUY1RjUiIGN4PSIzMiIgY3k9IjMzIiByeD0iMzIiIHJ5PSI3Ii8+CiAgICA8ZyBmaWxsLXJ1bGU9Im5vbnplcm8iIHN0cm9rZT0iI0Q5RDlEOSI+CiAgICAgIDxwYXRoIGQ9Ik01NSAxMi43Nkw0NC44NTQgMS4yNThDNDQuMzY3LjQ3NCA0My42NTYgMCA0Mi45MDcgMEgyMS4wOTNjLS43NDkgMC0xLjQ2LjQ3NC0xLjk0NyAxLjI1N0w5IDEyLjc2MVYyMmg0NnYtOS4yNHoiLz4KICAgICAgPHBhdGggZD0iTTQxLjYxMyAxNS45MzFjMC0xLjYwNS45OTQtMi45MyAyLjIyNy0yLjkzMUg1NXYxOC4xMzdDNTUgMzMuMjYgNTMuNjggMzUgNTIuMDUgMzVoLTQwLjFDMTAuMzIgMzUgOSAzMy4yNTkgOSAzMS4xMzdWMTNoMTEuMTZjMS4yMzMgMCAyLjIyNyAxLjMyMyAyLjIyNyAyLjkyOHYuMDIyYzAgMS42MDUgMS4wMDUgMi45MDEgMi4yMzcgMi45MDFoMTQuNzUyYzEuMjMyIDAgMi4yMzctMS4zMDggMi4yMzctMi45MTN2LS4wMDd6IiBmaWxsPSIjRkFGQUZBIi8+CiAgICA8L2c+CiAgPC9nPgo8L3N2Zz4K"/>
																		</div>
																		<p className="ant-empty-description">暂无数据</p>
																</div>
														</Fragment>
}
										</PicContainer>
								</MainWrapper>
								
								<Loading loading={loading}/>
								</IndexContainer>
								</IndexBg>
						</Fragment>
				)
		}
}

const mapState = (state) => {
		return {
				topComponent: state.getIn(['header', 'topComponent']),
				assemblyList: state.getIn(['home', 'assemblyList']),
				indexBanner: state.getIn(['home', 'indexBanner']),
		}
}

const mapDispatch = (dispatch) => {
		return {
				getAssembly(activeId, callback) {
						dispatch(actionCreators.getAssembly(activeId, callback))
				},
				getBanner(){
					dispatch(actionCreators.getBanner())
				}
		}
};

export default connect(mapState, mapDispatch)(Home);
