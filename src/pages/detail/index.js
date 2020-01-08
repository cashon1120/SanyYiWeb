import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import Imglist from '../../common/imgList/Index'
import BreadCrumb from '../../common/breadCrumb/Index'
import SwiperComponent from '../../common/swiper/Index'
import DefaultImg from '../../statics/images/nopic.jpg'
import {setDefaultImg, formartPicture, setBannerSize} from '../../utils/format'
import ComponentTree from '../../common/componentTree/Index'
import {Button} from 'antd';
import {
		Banner,
		BannerMain,
		BannerList,
		Title,
		ContentWrapper,
		ContentLeft,
		ContentRight,
		Content,
		FileUl,
		IconDoc,
		IconPpt,
		IconExcel,
		TextArea,
		IconPdf,
		ModelUl,
		SwiperWrapper,
		ImgContainer,
		TitleContainer
} from './style'
import {actionCreators} from './store';
import {MainWrapper, H1Title} from '../../style'

class Detail extends Component {
		state = {
				type: this.props.match.params.type, // 1: 系统详情 2: 总成详情
				id: this.props.match.params.id,
				bannerImgUrl: '',
				historyFailure: [],
				loading: false,
				failureMode: '',
				bannerWidth: null,
				bannerHeight: null,
				failureLevel: {},
		}
		componentDidMount() {
				// 获取所有总成列表
				const {allAssembly, requestAllAssembly} = this.props
				if (allAssembly.toJS().length === 0) {
						requestAllAssembly()
				}

				const {type, id} = this.state
				if (type === '5') {
						this.getFailure(id)
						this.getHistoryFailure(id)
				} else {
						this.getInfo(id)
				}
		}

		// 获取详情
		getInfo(id) {
				const {getComponentInfo} = this.props
				const { type } = this.state
				if(type === 1 || type === 2){
					localStorage.removeItem('failureModes')
				}
				const callback = response => {
						const picList = response.picture || response.faultPicture
						const url = picList && picList.length > 0
								? picList[0].url
								: DefaultImg
						
						this.setBanner(url)
				}
				getComponentInfo(id, callback)
		}

		setBanner(url) {
				if(url && url.indexOf('mp4') < 0){
					setBannerSize(url, 750 / 400, (size) => {
						
						const {bannerWidth, bannerHeight} = size
						this.setState({bannerWidth, bannerHeight, bannerImgUrl: url})
				})
					
				}else{
					this.setState({bannerImgUrl: url})
					setTimeout(() => {
						if(this.refs.video && this.refs.video.play){
							this.refs.video.play()
						}
					}, 200);
				}
		}

		getFailure(id) {
				const {getFailure} = this.props
				const callback = response => {
						if (response.faultPicture.length > 0 && response.faultPicture[0].url) {
								const bannerImgUrl = (response.faultPicture && response.faultPicture[0].url) || response.faultPicture[0].url
								this.setBanner(bannerImgUrl)
						}
						this.setState({
							failureLevel:{
								systemName: response.secondaryComponentName,
								systemId: response.secondaryComponentId,
								assemblyComponentId: response.assemblyComponentId,
								assemblyComponentName: response.assemblyComponentName
							}
						})
					
				}
				getFailure(id, callback)
		}

		getHistoryFailure(id) {
				const {getHistoryFailure} = this.props
				const callback = response => {
						this.setState({historyFailure: response})
				}
				getHistoryFailure(id, callback)
		}

		componentWillReceiveProps(nextProps) {
				const {type, id} = nextProps.match.params
				if (id !== this.state.id || type !== this.state.type) {
						document.body.scrollTop = document.documentElement.scrollTop = 0
						this.setState({
								type,
								id
						}, () => {
								if (type === '5') {
										this.getFailure(id)
										this.getHistoryFailure(id)
								} else {
										this.getInfo(id)
								}
						});
				}
		}

		// 获取附件内容
		getFileList(files, type) {
				let file = []
				if (files) {
						file = files.filter(item => {
								return item.businessType === type
						})
				}
				return file
		}

		// 判断附件文件内型
		checkFileType(name) {
				let icon = ''
				const temp = name.split('.')
				const type = temp[temp.length - 1]
				if (type.indexOf('doc') >= 0) {
						icon = <IconDoc/>
				}
				if (type.indexOf('ppt') >= 0) {
						icon = <IconPpt/>
				}
				if (type.indexOf('xls') >= 0) {
						icon = <IconExcel/>
				}
				if (type.indexOf('pdf') >= 0) {
						icon = <IconPdf/>
				}
				return icon
		}

		// baner 小图鼠标移入
		handleHoverBanner = url => {
				this.setBanner(url)
		}

		// 核心零部件点
		handleClick = id => {
				let {type} = this.state
				type = Number.parseInt(type, 10)
				this
						.props
						.history
						.push(`/detail/${type + 1}/${id}`)
		}

		// 下载文件
		downloadFile(record) {
				const fileName = record.oldFileName
				const {downloadFile} = this.props
				const callback = response => {
						if (response) {
								const content = response
								const blob = new Blob([content])
								if ('msSaveBlob' in navigator) {
										navigator.msSaveBlob(blob, fileName)
								} else {
										const elink = document.createElement('a')
										elink.download = fileName
										elink.style.display = 'none'
										elink.href = URL.createObjectURL(blob)
										document
												.body
												.appendChild(elink)
										elink.click()
										URL.revokeObjectURL(elink.href)
										document
												.body
												.removeChild(elink)
								}
						}
				}
				downloadFile({
						fileName: fileName,
						path: record.url
				}, callback)
		}

		// 替换总成关键字为链接
		replaceKey = html => {
				if (html && html.length > 0) {
						const {type} = this.state
						if (type === '2') {
								let {allAssembly} = this.props
								let allComponent = allAssembly.toJS()
								allComponent.forEach(item => {
										const reg = new RegExp(item.componentName, 'g');
										html = html.replace(reg, `<a style="color: #2e84d5;" data-id="${item.id}">${item.componentName}</a>`)
								})
						}
						html = html.replace(/\n|\r\n/g, '<br/>')
						return html
				}
		}

		showDetail = e => {
				const id = e
						.target
						.getAttribute('data-id')
				if (id) {
						this
								.props
								.history
								.push(`/detail/2/${id}`)
				}
		}

		// 生成报告
		getWordTable() {
				const {id} = this.state
				const {getWordTable, componentInfo} = this.props
				const info = componentInfo.toJS()
				this.setState({loading: true})
				const callback = res => {
						this.setState({loading: false})
						const content = res
						const blob = new Blob([content])
						const fileName = `${info.failureMode}.doc`
						if ('msSaveOrOpenBlob' in navigator) {
								navigator.msSaveBlob(blob, fileName)
						} else {
								const elink = document.createElement('a')
								elink.download = fileName
								elink.style.display = 'none'
								elink.href = URL.createObjectURL(blob)
								document
										.body
										.appendChild(elink)
								elink.click()
								URL.revokeObjectURL(elink.href)
								document
										.body
										.removeChild(elink)
						}
				}
				getWordTable(id, callback)
		}

		render() {
				const {componentInfo} = this.props
				const {
						bannerImgUrl,
						type,
						historyFailure,
						id,
						loading,
						bannerWidth,
						failureLevel,
						bannerHeight
				} = this.state
				const replaceKey = this.replaceKey
				const info = componentInfo.toJS()
				if(type === '1' || type === '2'){
					localStorage.setItem('failureModes', JSON.stringify(info.failureModes))
				}
				let brotherFailureModes = []
				if(type === '5' && localStorage.getItem('failureModes')){
					brotherFailureModes = JSON.parse(localStorage.getItem('failureModes'))
				}

				let influenceFactorArr = []
				if (info.influenceFactorPicture) {
						influenceFactorArr = formartPicture(info.influenceFactorPicture, 2)
				}
				let pictureList = []
				if (Array.isArray(info.picture)) {
						info
								.picture
								.forEach(item => {
										pictureList.push({componentId: '', name: '', url: item.url, sourceType: item.sourceType, id: item.id})
								})
				} else if (Array.isArray(info.faultPicture)) {
						info
								.faultPicture
								.forEach(item => {
										pictureList.push({componentId: '', name: '', url: item.url, sourceType: item.type, id: item.id})
								})
				}
				let coreComponentList = []
				if (Array.isArray(info.coreComponents)) {
						info
								.coreComponents
								.forEach(item => {
										if (item.picture.length > 0) {
												coreComponentList.push({componentId: item.id, name: item.componentName, url: item.picture[0].url, id: item.id})
										}
								})
				}
				const temp = bannerImgUrl ? bannerImgUrl.split('.') : ''
				const urlType = temp[temp.length - 1]
				return (
						<Fragment>
							<ComponentTree />
							<div style={{ position: 'relative', left: 150}}>
								<MainWrapper>
										<BreadCrumb type={type} id={id} failureLevel={failureLevel}/>
										<Banner>
												<ImgContainer>
														<BannerMain>
																{urlType === 'mp4'
																		? <video autoPlay ref="video" controls src={bannerImgUrl}/>
																		: <img
																				alt=""
																				style={{
																				width: bannerWidth,
																				height: bannerHeight
																		}}
																				src={bannerImgUrl}
																				onError={e => setDefaultImg(e)}/>
}
														</BannerMain>
														<BannerList>
																<SwiperComponent
																		classType="swiperDetail"
																		data={pictureList}
																		onHover={this.handleHoverBanner}
																		listNum={4}/>
														</BannerList>
												</ImgContainer>
												<TitleContainer>
														<Title>
																<div className="flex-container">
																		<div className="flex-1">
																				<H1Title>{type === '5'
																								? info.failureMode
																								: info.componentName}</H1Title>
																		</div>
																		{type === '5'
																				? <div style={{
																								paddingLeft: 20
																						}}>

																								<Button
																										loading={loading}
																										type="primary"
																										size="large"
																										onClick={() => this.getWordTable()}>
																										生成报告
																								</Button>
																						</div>
																				: null}

																</div>

																<div
																		onClick={this.showDetail}
																		dangerouslySetInnerHTML={{
																		__html: replaceKey(info.partDescription)
																}}></div>
														</Title>
												</TitleContainer>
										</Banner>

										{(type === '3' || type === '4' || type === '5')
												? null
												: coreComponentList.length > 0
														? <H1Title>{type === '1'
																				? '系统总成'
																				: '核心零部件'}</H1Title>
														: null}
								</MainWrapper>
								{(type === '3' || type === '4' || type === '5')
										? null
										: coreComponentList.length > 0
												? <SwiperWrapper>
																<SwiperComponent
																		classType="swiperIndex"
																		data={coreComponentList}
																		handleClick={this.handleClick}
																		noFocus={true}
																		listNum={6}/>
														</SwiperWrapper>
												: null
}
								<MainWrapper>
										<ContentWrapper>
												<ContentLeft>
														<H1Title>{type === '5'
																		? '故障详情'
																		: '设计要点'}</H1Title>
														<Content>
																{type === '5'
																		? <Fragment>
																						<div>
																								<h2>原因分析</h2>
																								<TextArea>
																										{info.causeAnalysis
																												? <div
																																dangerouslySetInnerHTML={{
																																__html: replaceKey(info.causeAnalysis)
																														}}></div>
																												: <span className="noData">暂无数据</span>
}
																								</TextArea>
																						</div>
																						<div>
																								<h2>故障对策</h2>
																								<TextArea>
																										{info.troubleshooting
																												? <div
																																dangerouslySetInnerHTML={{
																																__html: replaceKey(info.troubleshooting)
																														}}></div>
																												: <span className="noData">暂无数据</span>
}
																										<div className="imglist">
																												<Imglist data={info.reasonsCountermeasuresPhotos || []}/>
																										</div>
																								</TextArea>

																						</div>
																				</Fragment>
																		: null
}
																<div>
																		<h2>标准、原理、基于标准的具体化数据参数</h2>
																		<TextArea>
																				{info.preciseData || (info.standardPrinciplesPhotos && info.standardPrinciplesPhotos.length > 0)
																						? <Fragment>

																										<div
																												dangerouslySetInnerHTML={{
																												__html: info.preciseData
																														? replaceKey(info.preciseData)
																														: null
																										}}></div>

																										<div className="imglist">
																												<Imglist data={info.standardPrinciplesPhotos || []}/>
																										</div>
																								</Fragment>
																						: <span className="noData">暂无数据</span>
}
																		</TextArea>
																</div>
																{type === '5'
																		? <div>
																						<h2>设计雷区及要点</h2>
																						<TextArea>
																								{influenceFactorArr.length > 0
																										? <Fragment>
																														{influenceFactorArr.map(item => <div
																																key={item.remark}
																																style={{
																																paddingBottom: 15
																														}}>

																																<div
																																		dangerouslySetInnerHTML={{
																																		__html: replaceKey(item.remark)
																																}}></div>

																																<div>
																																		<Fragment>
																																				<div className="imglist">
																																						<Imglist data={item.pictures || []}/>
																																				</div>
																																		</Fragment>
																																</div>
																														</div>)}
																												</Fragment>
																										: <span className="noData">暂无数据</span>}
																						</TextArea>
																				</div>
																		: <div>
																				<h2>设计雷区及要点、影响因素</h2>
																				<TextArea>
																					{influenceFactorArr.length > 0 ? <Fragment>

																						{influenceFactorArr.map(item => <div
																								key={item.remark}
																								className="desginWrapper"
																								style={{
																								paddingBottom: 15
																						}}>

																								<h4>设计雷区及要点</h4>
																								<div
																										dangerouslySetInnerHTML={{
																										__html: replaceKey(item.remark)
																								}}></div>

																								{item.remark2
																										? <Fragment>
																														<h4>设计雷区及要点影响因素</h4>
																														<div
																																dangerouslySetInnerHTML={{
																																__html: replaceKey(item.remark2)
																														}}></div>
																												</Fragment>
																										: null}

																								<div>
																										<Fragment>
																												<div className="imglist">
																														<Imglist data={item.pictures || []}/>
																												</div>
																										</Fragment>
																								</div>
																						</div>)}
																					</Fragment> : <span className="noData">暂无数据</span>}
																						
																				</TextArea>
																		</div>
																}

																{type !== '5'
																		? <Fragment>
																						{this
																								.getFileList(info.failureModeAttachment, 1)
																								.length > 0
																								? <div>
																												<h2>DFMEA报告</h2>
																												<FileUl>
																														{this
																																.getFileList(info.failureModeAttachment, 1)
																																.map(item => {
																																		return <a
																																				title={item.oldFileName}
																																				onClick={() => this.downloadFile(item)}
																																				key={item.id}>{this.checkFileType(item.oldFileName)}{item.oldFileName}</a>
																																})}
																												</FileUl>
																										</div>
																								: null
}
																						{this
																								.getFileList(info.failureModeAttachment, 2)
																								.length > 0
																								? <div>
																												<h2>设计规范报告</h2>
																												<FileUl>
																														{this
																																.getFileList(info.failureModeAttachment, 2)
																																.map(item => {
																																		return <a
																																				title={item.oldFileName}
																																				onClick={() => this.downloadFile(item)}
																																				key={item.id}>{this.checkFileType(item.oldFileName)}{item.oldFileName}</a>
																																})}
																												</FileUl>
																										</div>
																								: null
}
																						{this
																								.getFileList(info.failureModeAttachment, 3)
																								.length > 0
																								? <div>
		<h2>{parseInt(type, 10) === 1 ? '行业趋势报告' : '型谱'}</h2>
																												<FileUl>
																														{this
																																.getFileList(info.failureModeAttachment, 3)
																																.map(item => {
																																		return <a
																																				title={item.oldFileName}
																																				onClick={() => this.downloadFile(item)}
																																				key={item.id}>{this.checkFileType(item.oldFileName)}{item.oldFileName}</a>
																																})}
																												</FileUl>
																										</div>
																								: null
}
																						{this
																								.getFileList(info.failureModeAttachment, 4)
																								.length > 0
																								? <div>
																												<h2>法规标准报告</h2>
																												<FileUl>
																														{this
																																.getFileList(info.failureModeAttachment, 4)
																																.map(item => {
																																		return <a
																																				title={item.oldFileName}
																																				onClick={() => this.downloadFile(item)}
																																				key={item.id}>{this.checkFileType(item.oldFileName)}{item.oldFileName}</a>
																																})}
																												</FileUl>
																										</div>
																								: null
}
																						{this
																								.getFileList(info.failureModeAttachment, 5)
																								.length > 0
																								? <div>
																												<h2>质量分析报告</h2>
																												<FileUl>
																														{this
																																.getFileList(info.failureModeAttachment, 5)
																																.map(item => {
																																		return <a
																																				title={item.oldFileName}
																																				onClick={() => this.downloadFile(item)}
																																				key={item.id}>{this.checkFileType(item.oldFileName)}{item.oldFileName}</a>
																																})}
																												</FileUl>
																										</div>
																								: null
}
																				</Fragment>
																		: <Fragment>
																				<div>
																						<h2>故障参考信息（类型、平均里程、地域等）</h2>
																						<TextArea>
																								{info.faultReference
																										? <div
																														dangerouslySetInnerHTML={{
																														__html: replaceKey(info.faultReference)
																												}}></div>
																										: <span className="noData">暂无数据</span>
}</TextArea>
																				</div>
																		</Fragment>}
														</Content>
												</ContentLeft>
												<ContentRight>
														<H1Title>{type === '5'
																		? '故障模式版本'
																		: '故障模式'}</H1Title>
														<Content style={{
																padding: 10
														}}>
																{type === '5'
																		? <Fragment>
																						<ModelUl>
																								{historyFailure.length > 0
																										? historyFailure.map(item => {
																												return <li
																														key={item.id}
																														className={item.id === info.id
																														? 'active'
																														: null}>
																														<Link title={item.failureMode} to={`/detail/5/${item.id}`}>
																																<span className="link-title">{item.failureMode}</span>
																																<span>{item.version}</span>
																														</Link>
																												</li>
																										})
																										: <span
																												style={{
																												paddingLeft: 10
																										}}
																												className="noData">暂无数据</span>
}
																						</ModelUl>
																				</Fragment>
																		: <ModelUl>
																				{info.failureModes && info.failureModes.length > 0
																						? info
																								.failureModes
																								.map(item => {
																										return <li key={item.id}>
																												<Link  title={item.failureMode} to={`/detail/5/${item.id}`}>{item.failureMode}</Link>
																										</li>
																								})
																						: <span
																								style={{
																								paddingLeft: 10
																						}}
																								className="noData">暂无数据</span>
}
																		</ModelUl>}
														</Content>
												
														{type === '5' ? 
														<Fragment>
																<H1Title style={{marginTop: 30}}>其它故障模式</H1Title>
																<Content style={{
																padding: 10
														}}>
<ModelUl>
																				{brotherFailureModes && brotherFailureModes.length > 0
																						? brotherFailureModes
																								.map(item => {
																										return <li key={item.id} className={item.id == id ? 'current' : null}>
																												<Link title={item.failureMode} to={`/detail/5/${item.id}`}>{item.failureMode}</Link>
																										</li>
																								})
																						: <span
																								style={{
																								paddingLeft: 10
																						}}
																								className="noData">暂无数据</span>
}
																		</ModelUl>

														</Content>
														</Fragment> : null}
														
												</ContentRight>
										</ContentWrapper>
								</MainWrapper>
								</div>
						</Fragment>
				)
		}
}

const mapState = (state) => ({
		componentInfo: state.getIn(['detail', 'componentInfo']),
		allAssembly: state.getIn(['detail', 'allAssembly'])
})

const mapDispatch = (dispatch) => {
		return {
				getComponentInfo(id, callback) {
						dispatch(actionCreators.getComponentInfo(id, callback))
				},
				getFailure(id, callback) {
						dispatch(actionCreators.getFailure(id, callback))
				},
				getHistoryFailure(id, callback) {
						dispatch(actionCreators.getHistoryFailure(id, callback))
				},
				downloadFile(params, callback) {
						dispatch(actionCreators.downloadFile(params, callback))
				},
				requestAllAssembly() {
						dispatch(actionCreators.requestAllAssembly())
				},
				getWordTable(id, callback) {
						dispatch(actionCreators.getWordTable(id, callback))
				}
		}
}

export default connect(mapState, mapDispatch)(Detail);
