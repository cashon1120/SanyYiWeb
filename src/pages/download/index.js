import React, {PureComponent, Fragment} from 'react'
import {connect} from 'react-redux'
import {Input, Table, Icon, LocaleProvider} from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import Header from '../../common/header/Index'
import {SearchWrapper, TypeList, List} from './style'
import {actionCreators} from './store';
import {MainWrapper, SubHeader} from '../../style'

class Download extends PureComponent {
		state = {
				pageSize: 10,
				pageNum: 1,
				oldFileName: '',
				businessType: '',
				minHeight: 0
		}
		columns = [
				{
						title: '报告名称',
						dataIndex: 'oldFileName',
						key: 'oldFileName'
				}, {
						title: '报告归属',
						render: record => record.coreComponentsName || record.assemblyName || record.secondarySystemName
				}, {
						title: '报告类型',
						dataIndex: 'businessType',
						key: 'businessType',
						render: businessType => {
								let type
								switch (businessType) {
										case 1:
												type = 'DFMEA'
												break;
										case 2:
												type = '设计规范'
												break;
										case 3:
												type = '行业趋势报告'
												break;
										case 4:
												type = '法规标准'
												break;
										case 101:
												type = '故障分析报告'
												break;
										default:
												type = '行业趋势报告'
												break;

								}
								return type
						}
				}, {
						title: '更新时间',
						dataIndex: 'crtAt',
						key: 'crtAt'
				}, {
						title: '操作',
						width: 100,
						render: record => <a onClick={() => this.downloadFile(record)} target="_blank" className="tableA">下载</a>
				}
		]

		businessTypeList = [
				{
						businessType: '',
						name: '全部'
				}, {
						businessType: 1,
						name: 'DFMEA'
				}, {
						businessType: 2,
						name: '设计规范'
				}, {
						businessType: 3,
						name: '行业趋势报告'
				}, {
						businessType: 4,
						name: '法规标准'
				}, {
						businessType: 101,
						name: '故障分析报告'
				}, {
						businessType: 6,
						name: '型谱'
				}
		]

		componentDidMount() {
				this.getReportList()
				this.setFooterPosition()
				window.addEventListener('resize', this.setFooterPosition.bind(this))
		}

		setFooterPosition() {
				const windowHeight = document.body.clientHeight
				this.setState({
						minHeight: windowHeight - (120 + 67)
				})
		}

		handleTableChange = pagination => {
				const pageNum = pagination.current
				this.setState({
						pageNum,
						pageSize: pagination.pageSize
				}, () => {
						this.getReportList()
				})
		};

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

		setBusinessType(businessType) {
				this.setState({
						businessType,
						pageNum: 1
				}, () => {
						this.getReportList()
				})
		}

		getReportList() {
				const {pageNum, pageSize, businessType, oldFileName} = this.state
				const {getReportList} = this.props
				getReportList({pageNum, pageSize, businessType, oldFileName})
		}

		searchFileByName() {
				this.setState({
						pageNum: 1
				}, () => {
						this.getReportList()
				})
		}

		changeSearchName(e) {
				const oldFileName = e.target.value
				this.setState({oldFileName})
		}

		render() {
				const {reportList} = this.props
				const {businessType, oldFileName, minHeight} = this.state
				const list = reportList && reportList
						.toJS()
						.list
				if (list && list.length > 0) {
						list.forEach(item => {
								item.key = item.url
						})
				}
				const total = reportList && reportList
						.toJS()
						.total
				const paginationProps = {
						showTotal: total => `总共 ${total} 条数据`,
						showSizeChanger: true,
						showQuickJumper: true,
						pageSizeOptions: [
								'10',
								'15',
								'20',
								'30',
								'40',
								'50'
						],
						defaultCurrent: 1,
						total
				}

				return (
						<Fragment>
							<SubHeader>
								<Header prop={this.props} />
							</SubHeader>
								
								<MainWrapper style={{
										minHeight
								}}>
										<SearchWrapper>
												<Input
														size="large"
														onChange={(e) => this.changeSearchName(e)}
														placeholder="请输入报告名称查询"
														value={oldFileName}
														addonAfter={< Icon onClick = {
														() => this.searchFileByName()
												}
												type = "search" />}/>
										</SearchWrapper>
										<TypeList>
												<List>报告分类:</List>
												{this
														.businessTypeList
														.map(item => <List key={item.name}>
																<a
																		onClick={() => this.setBusinessType(item.businessType)}
																		className={businessType === item.businessType
																		? 'active'
																		: null}>{item.name}</a>
														</List>)}
										</TypeList>
										<LocaleProvider locale={zhCN}>
												<Table
														columns={this.columns}
														bordered
														dataSource={list}
														pagination={paginationProps}
														onChange={this.handleTableChange}
														size="small"/>
										</LocaleProvider>
								</MainWrapper>
						</Fragment>
				)
		}
}

const mapState = (state) => ({
		reportList: state.getIn(['download', 'reportList'])
})

const mapDispatch = (dispatch) => {
		return {
				getReportList(params) {
						dispatch(actionCreators.getReportList(params))
				},
				downloadFile(params, callback) {
						dispatch(actionCreators.downloadFile(params, callback))
				}
		}
}

export default connect(mapState, mapDispatch)(Download);
