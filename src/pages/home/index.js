import React, {PureComponent, Fragment} from 'react'
import {connect} from 'react-redux'
import Header from '../../common/header/Index'
import {DefaultBanner, More, Title, PicContainer, ClassList} from './style'
import Loading from '../../common/loading/Index'
import {MainWrapper, FlexContainer} from '../../style'
import {actionCreators} from './store';
import Icon1 from '../../statics/images/icon_1.gif'
import Icon2 from '../../statics/images/icon_2.gif'
import Icon3 from '../../statics/images/icon_3.gif'
import Icon4 from '../../statics/images/icon_4.gif'
import noPic from '../../statics/images/nopic.jpg'
import defaultBanner from '../../statics/images/big_banner.jpg'

class Home extends PureComponent {
		state = {
				bannerUrl: '',
				loading: false,
				pageSize: 8,
				systemList: [],
				assemblyList: [],
				showMore_1: true,
				showMore_2: true,
				pageNumb_1: 1,
				pageNumb_2: 1
		}

		componentDidMount(){
			const {getBanner} = this.props
			getBanner()
			this.getAssembly()
			this.getSystem()
		}



		getAssembly = () => {
			const {getAssembly} = this.props
			const { pageSize, pageNumb_2, assemblyList } = this.state
			this.setState({
				loading: true
			})
			const callback = list => {
				this.setState({
					pageNumb_2: pageNumb_2 + 1,
					assemblyList: assemblyList.concat(list),
					loading: false,
					showMore_2: list.length >=8 ? true : false
				})
			}
			getAssembly({pageSize, pageNum: pageNumb_2}, callback)
		}

		getSystem = () => {
			const {getSystem} = this.props
			const { pageSize, pageNumb_1, systemList } = this.state
			this.setState({
				loading: true
			})
			const callback = list => {
				this.setState({
					pageNumb_1: pageNumb_1 + 1,
					systemList: systemList.concat(list),
					loading: false,
					showMore_1: list.length >=8 ? true : false
				})
			}
			getSystem({pageSize, pageNum: pageNumb_1}, callback)
		}

		// 查看详情
		showAssemblyDetail = id => {
				this
						.props
						.history
						.push(`/detail/2/${id}`)
		}

		// 跳转系统详情
		handleClick = (type, id) => {
			if(id){
				this
						.props
						.history
						.push(`/detail/${type}/${id}`)
					}
		}

		showMore = type => {
			const {showMore_1, showMore_2} = this.state
			if(type === 1){
				if(showMore_1) {
					this.getSystem() 
				}
				return
			}
			if(showMore_2){
				this.getAssembly()
			}
		}

		render() {
				const {loading, assemblyList, systemList, showMore_1, showMore_2} = this.state
				const { indexBanner } = this.props
				return (
						<Fragment>
								
								<DefaultBanner>
										<Header prop={this.props} />
										<img src={indexBanner || defaultBanner} alt="" />
								</DefaultBanner>
								<FlexContainer>
										<ClassList>
											<section>
												<div><img src={Icon1} alt="" /></div>
												<div className="text">系统详情<span>系统信息描述，标准原理及设计雷区。</span></div>
											</section>
										</ClassList>
										<ClassList>
										<section>
												<div><img src={Icon2} alt="" /></div>
												<div className="text">总成详情<span>总成信息描述（包括关联部件），标准原理
及设计雷区。</span></div>
</section>
										</ClassList>
										<ClassList>
										<section>
												<div><img src={Icon3} alt="" /></div>
												<div className="text">故障模式<span>故障模式描述及原因分析，故障对策等信息。</span></div>
												</section>
										</ClassList>
										<ClassList>
										<section>
												<div><img src={Icon4} alt="" /></div>
												<div className="text">附件报告<span>DFMEA,设计规范,行业趋势报告,法规标准
质量分析报告,型谱等资料下载</span></div>
</section>
										</ClassList>
								</FlexContainer>
								<MainWrapper>
									<div>
										<Title>系统</Title>
										<PicContainer>
											{
												systemList.map(item => 
												<li onClick={() => this.handleClick(1, item.id)}>
													<div>
														<img src={item.picture.length > 0 ? item.picture[0].url ? item.picture[0].url: noPic : noPic} alt="" />
													</div>
													<aside>
														<h1>{item.componentName}</h1>
														{item.parentName || '底盘系统'}  > 
														</aside>
												</li>)
											}
											
											
										</PicContainer>
		<More onClick={() => this.showMore(1)}><a> {showMore_1 ? '查看更多' : '没有了'} ></a></More>
									</div>
									<div>
										<Title>总成</Title>
										<PicContainer>
										{
												assemblyList.map(item => 
												<li onClick={() => this.handleClick(2, item.id)}>
													<div>
														<img src={item.picture.length > 0 ? item.picture[0].url ? item.picture[0].url: noPic : noPic} alt="" />
													</div>
													<aside>
														<h1>{item.componentName}</h1>
														底盘系统 > {item.parentName}
														</aside>
												</li>)
											}
										</PicContainer>
										<More onClick={() => this.showMore(2)}><a> {showMore_2 ? '查看更多' : '没有了'} ></a></More>
									</div>
								
								</MainWrapper>
								
								<Loading loading={loading}/>
						</Fragment>
				)
		}
}

const mapState = (state) => {
		return {
				indexBanner: state.getIn(['home', 'indexBanner']),
		}
}

const mapDispatch = (dispatch) => {
		return {
				getAssembly(pageInfo, callback) {
						dispatch(actionCreators.getAssembly(pageInfo, callback))
				},
				getSystem(pageInfo, callback) {
					dispatch(actionCreators.getSystem(pageInfo, callback))
			},
				getBanner(){
					dispatch(actionCreators.getBanner())
				}
		}
};

export default connect(mapState, mapDispatch)(Home);
