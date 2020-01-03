import React, {PureComponent, Fragment} from 'react'
import {connect} from 'react-redux'
import {Table, Icon, Button, LocaleProvider, message} from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import {actionCreators} from './store';
import {SearchWrapper, SystemList} from './style'
import {MainWrapper} from '../../style'

class PointCheck extends PureComponent {
		state = {
				letter: [
						'A',
						'B',
						'C',
						'D',
						'E',
						'F',
						'G',
						'H',
						'I',
						'J',
						'K',
						'L',
						'M',
						'N',
						'O',
						'P',
						'Q',
						'R',
						'S',
						'T',
						'U',
						'V',
						'W',
						'X',
						'Y',
						'Z',
						'0'
				],
				vehicleList: [],
				vehicleNameList: [],
				moreVehicleVisible: false,
				serachCheckInfoList: [],
				activeLetter: '',
				checkSystemName: '',
				vehicleModelName: '',
				vehicleModelId: '',
				checkSystemId: '',
				tableData: [],
				moveSystemVisible: false,
				loading: false,
				minHeight: 0
		}
		columns = [
				{
						title: '系统',
						dataIndex: 'checkSystemName',
						key: 'checkSystemName'
				}, {
						title: '点检项分类',
						dataIndex: 'typeName',
						key: 'typeName'
				}, {
						title: '点检项目',
						dataIndex: 'checkProjectName',
						key: 'checkProjectName'
				}, {
						title: '操作',
						width: 150,
						render: record => <a className="tableA" onClick={() => this.delete(record)}>移除</a>
				}
		]

		componentDidMount() {
				this.getData()
				this.setFooterPosition()
				window.addEventListener('resize', this.setFooterPosition.bind(this))
		}
		setFooterPosition() {
				const windowHeight = document.body.clientHeight
				this.setState({
						minHeight: windowHeight - (120 + 67 + 30)
				})
		}
		// 移除已选中点检表
		delete(record) {
				const {tableData, serachCheckInfoList} = this.state
				for (let i = 0; i < tableData.length; i += 1) {
						if (record.id === tableData[i].id) {
								tableData.splice(i, 1)
								break
						}
				}
				serachCheckInfoList.forEach(item => {
						item
								.children
								.forEach(child => {
										if (child.id === record.id) {
												child.checked = false
										}
								})
				})
				const data = JSON.parse(JSON.stringify(tableData))
				const searchInfo = JSON.parse(JSON.stringify(serachCheckInfoList))
				this.setState({serachCheckInfoList: searchInfo, tableData: data})
		}

		// 获取车型列表和系统列表
		getData() {
				const {getVehicleList, getAssemblyList} = this.props
				const callback = response => {
						this.setState({
								vehicleList: response || []
						})
				}
				getVehicleList(callback)
				getAssemblyList()
		}

		// 显示更多车型
		showMoreVehicle() {
				const {moreVehicleVisible} = this.state
				this.setState({
						moreVehicleVisible: !moreVehicleVisible
				})
		}

		// 显示更多车型
		showMoreSystem() {
				const height = this.refs.systemContainer.offsetHeight
				if (height > 100) {
						const {moveSystemVisible} = this.state
						this.setState({
								moveSystemVisible: !moveSystemVisible
						})
				}
		}

		// 点击字母筛选车型
		selectCarByLetter(e) {
				const py = e.target.innerHTML
				const {vehicleList} = this.state
				const vehicleNameList = vehicleList.filter(item => item.py.toUpperCase() === py)
				this.setState({
						vehicleNameList,
						activeLetter: py.toUpperCase()
				})
		}

		// 选中车型
		getPointTypeByVehicle(vehicleModelId, vehicleModelName) {
				let curentVehicleModelId = this.state.vehicleModelId
				if (vehicleModelId === curentVehicleModelId) 
						return
				this.setState({
						tableData: [],
						vehicleModelName,
						vehicleModelId
				}, () => {
						this.serachCheckInfo()
				})
		}

		// 选中系统
		getPointTypeByAssembly(checkSystemId, checkSystemName) {
				this.setState({
						checkSystemName,
						checkSystemId
				}, () => {
						this.serachCheckInfo()
				})
		}

		// 提交查询
		serachCheckInfo() {
				const {serachCheckInfo} = this.props
				const {vehicleModelId, checkSystemId} = this.state
				const callback = response => {
						this.setState({serachCheckInfoList: response})
				}
				if (vehicleModelId && checkSystemId) {
						serachCheckInfo(vehicleModelId, checkSystemId, callback)
				}
		}

		// 选择单个
		selectData(systemId, id) {
				const {tableData, checkSystemName, serachCheckInfoList} = this.state
				let checked = false
				serachCheckInfoList.forEach(item => {
						item
								.children
								.forEach(child => {
										if (child.id === id) {
												if (child.checked) {
														checked = true
												} else {
														child.checked = true
												}
										}
								})
				})
				if (checked) 
						return
				const parent = serachCheckInfoList.filter(item => item.id === systemId)[0]
				const typeName = parent.name
				const item = parent
						.children
						.filter(item => item.id === id)[0]
				tableData.push({checkSystemName, typeName, checkProjectName: item.checkProjectName, id: item.id, key: item.id})
				const data = JSON.parse(JSON.stringify(tableData))
				const searchInfo = JSON.parse(JSON.stringify(serachCheckInfoList))
				this.setState({serachCheckInfoList: searchInfo, tableData: data})
		}

		// 选择全部
		checkAll(systemId) {
				const {serachCheckInfoList} = this.state
				const parent = serachCheckInfoList.filter(item => item.id === systemId)[0]
				parent
						.children
						.forEach(item => {
								this.selectData(systemId, item.id)
						})
		}

		// 成生点检表
		getExeclTable() {
				const {tableData, vehicleModelName} = this.state
				const {getExeclTable} = this.props
				const checkItemIds = tableData.map(item => item.id)
				if (checkItemIds.length === 0) {
						message.error('还没有选择点检项目, 无法生成点检表')
						return
				}
				this.setState({loading: true})
				const callback = res => {
						this.setState({loading: false})
						const content = res
						const blob = new Blob([content])
						const myDate = new Date()
						const fileName = `${myDate.getFullYear()}${ (myDate.getMonth() + 1)
								.toString()
								.padStart(2, '0')}${ (myDate.getDate())
								.toString()
								.padStart(2, '0')}${myDate
								.getHours()}${myDate
								.getMinutes()}${myDate
								.getSeconds()}.xls`
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
				getExeclTable(vehicleModelName, checkItemIds, callback)
		}

		render() {
				const {
						letter,
						vehicleList,
						moreVehicleVisible,
						vehicleNameList,
						activeLetter,
						vehicleModelId,
						checkSystemId,
						tableData,
						serachCheckInfoList,
						loading,
						moveSystemVisible,
						minHeight
				} = this.state
				let {assemblyList} = this.props
				assemblyList = assemblyList.toJS()
				return (
						<Fragment>
								<MainWrapper style={{
										minHeight
								}}>
										<SearchWrapper>
												<div className="list">
														<div>
																<span>车型</span>
														</div>
														{!moreVehicleVisible
																? <div className="flex-1 defaultVehicle">
																				{vehicleList.map(item => <a
																						key={item.id}
																						className={vehicleModelId === item.id
																						? 'active'
																						: null}
																						onClick={() => this.getPointTypeByVehicle(item.id, item.vehicleName)}>{item.vehicleName}</a>)}
																		</div>
																: <div className="flex-1">
																		<div className="letter" onMouseOver={(e) => this.selectCarByLetter(e)}>
																				{letter.map(item => <a
																						className={activeLetter === item
																						? 'active'
																						: null}
																						key={item}>{item}</a>)}
																		</div>
																		{activeLetter
																				? <Fragment>
																								{vehicleNameList.length > 0
																										? <div className="moreCar">
																														{vehicleNameList.map(item => <a
																																className={vehicleModelId === item.id
																																? 'active'
																																: null}
																																key={item.id}
																																onClick={() => this.getPointTypeByVehicle(item.id, item.vehicleName)}>{item.vehicleName}</a>)}
																												</div>
																										: <div className="noCar">无相关车型</div>
}
																						</Fragment>
																				: null
}

																</div>
}
														<div onClick={() => this.showMoreVehicle()}>{!moreVehicleVisible
																		? <Icon type="caret-down"/>
																		: <Icon type="caret-up"/>}</div>
												</div>
												<div className="list">
														<div>
																<span>系统</span>
														</div>
														<div
																className="flex-1"
																style={{
																height: moveSystemVisible
																		? 'auto'
																		: 70,
																overflow: moveSystemVisible
																		? 'auto'
																		: 'hidden',
																padding: 0
														}}>
																<div
																		ref="systemContainer"
																		style={{
																		paddingTop: 20
																}}>
																		{assemblyList.map(item => <a
																				className={checkSystemId === item.id
																				? 'active'
																				: null}
																				key={item.id}
																				onClick={() => this.getPointTypeByAssembly(item.id, item.systemName)}>{item.systemName}</a>)}
																</div>
														</div>
														<div onClick={() => this.showMoreSystem()}>{!moveSystemVisible
																		? <Icon type="caret-down"/>
																		: <Icon type="caret-up"/>}</div>
												</div>
										</SearchWrapper>
										请选择点检项目
										<SystemList>
												{serachCheckInfoList.length > 0
														? <Fragment>
																		{serachCheckInfoList.map(item => <div key={item.id}>
																				<dl>
																						<dt>{item.name}</dt>
																						{item.children.length > 0
																								? <dd>全部点检项目
																												<Icon onClick={() => this.checkAll(item.id)} type="plus-square"/></dd>
																								: <div className="noData noData-div">暂无数据</div>}

																						{item
																								.children
																								.map(child => <dd
																										className={child.checked
																										? 'selected'
																										: null}
																										key={child.id}>{child.checkProjectName}<Icon onClick={() => this.selectData(item.id, child.id)} type="plus-square"/></dd>)
}
																				</dl>
																		</div>)}
																</Fragment>
														: <div className="noSearchInfo">请选择车型和系统进行筛选</div>
}

										</SystemList>
										已经选择点检项目
										<LocaleProvider locale={zhCN}>
												<Table
														bordered
														size="small"
														pagination={false}
														dataSource={tableData}
														style={{
														marginTop: 20,
														borderRadius: 0
												}}
														columns={this.columns}/>
										</LocaleProvider>
										<div
												style={{
												textAlign: 'center',
												paddingTop: 30,
												paddingBottom: 40
										}}>
												<Button
														loading={loading}
														type="primary"
														size="large"
														onClick={() => this.getExeclTable()}>
														生成点检表
												</Button>
										</div>
								</MainWrapper>
						</Fragment>
				)
		}
}

const mapState = (state) => ({
		assemblyList: state.getIn(['pointCheck', 'assemblyList'])
})
const mapDispatch = (dispatch) => ({
		getVehicleList(callback) {
				dispatch(actionCreators.getVehicleList(callback))
		},
		getAssemblyList() {
				dispatch(actionCreators.getAssemblyList())
		},
		serachCheckInfo(vehicleModelId, checkSystemId, callback) {
				dispatch(actionCreators.serachCheckInfo(vehicleModelId, checkSystemId, callback))
		},
		getExeclTable(vehicleModelName, checkItemIds, callback) {
				dispatch(actionCreators.getExeclTable(vehicleModelName, checkItemIds, callback))
		}
});

export default connect(mapState, mapDispatch)(PointCheck);
