import React, {PureComponent, Fragment} from 'react'
import {connect} from 'react-redux'
import {Modal, LocaleProvider, Form, Input, message} from 'antd';
import Header from '../../common/header/Index'
import zhCN from 'antd/lib/locale-provider/zh_CN';
import {Title, List} from './style'
import {actionCreators} from './store';
import {MainWrapper, SubHeader} from '../../style'

class Download extends PureComponent {
		state = {
				minHeight: 0,
				visible: false
		}

		componentDidMount() {
				this.setFooterPosition()
				window.addEventListener('resize', this.setFooterPosition.bind(this))
		}

		setFooterPosition() {
				const windowHeight = document.body.clientHeight
				this.setState({
						minHeight: windowHeight - (120 + 67)
				})
		}

		editPassword() {
				this.setState({visible: true})
		}

		handleCancel() {
				this.setState({visible: false})
		}

		handleSubmit(){
			const { form, editPassword } = this.props
			form.validateFields((err, fieldsValue) => {
				if (err) return
				const params = fieldsValue
				if(params.reConfirmPassword !== params.confirmPassword){
					message.error('两次密码不一致')
					return
				}
				const callback = (res) => {
					if(res.code === 1){
					message.success('操作成功')
					this.handleCancel()
					}else{
						message.error(res.msg)
					}
				}
				delete params.reConfirmPassword
				editPassword(params, callback)
			})
		}

		render() {
				const {form: {getFieldDecorator}, userInfo} = this.props
				const info = userInfo.toJS()
				const {minHeight, visible} = this.state
				const formItemLayout = {
						labelCol: {
								xs: {
										span:24
								},
								sm: {
										span: 4
								}
						},
						wrapperCol: {
								xs: {
										span: 24
								},
								sm: {
										span: 16
								}
						}
				};
				return (
						<Fragment>
								<SubHeader>
									<Header prop={this.props} />
								</SubHeader>
								<MainWrapper style={{
										minHeight
								}}>
										<Title>
												<h1>个人中心</h1>
										</Title>
										<List>
												<li>
														<span>登录域名:</span>
														{info.userName}</li>
												<li>
														<span>用户名:</span>
														{info.realName}</li>
												<li>
														<span>账户密码:</span>
														******
														<a onClick={() => this.editPassword()}>修改</a>
												</li>
										</List>
								</MainWrapper>
								<LocaleProvider locale={zhCN}>
										<Modal
												title="修改密码"
												visible={visible}
												onOk={() => this.handleSubmit()}
												onCancel={() => this.handleCancel()}>
												<Form {...formItemLayout} onSubmit={this.handleSubmit}>
														<Form.Item label="旧密码">
																{getFieldDecorator('password', {
																		rules: [{
																						required: true,
																						message: '请输入旧密码!'
																				}
																		]
																})(<Input type="password" />)}
														</Form.Item>
														<Form.Item label="新密码">
																{getFieldDecorator('confirmPassword', {
																		rules: [ {
																						required: true,
																						message: '请输入新密码!'
																				}
																		]
																})(<Input type="password" />)}
														</Form.Item>
														<Form.Item label="再次输入">
																{getFieldDecorator('reConfirmPassword', {
																		rules: [{
																						required: true,
																						message: '请再次输入新密码!'
																				}
																		]
																})(<Input type="password" />)}
														</Form.Item>
												</Form>
										</Modal>
								</LocaleProvider>
						</Fragment>
				)
		}
}

const mapStateToProps = (state) => {
	return {
			userInfo: state.getIn(['header', 'userInfo'])
	}
}

const mapDispatch = (dispatch) => {
		return {
			editPassword(params, callback) {
						dispatch(actionCreators.editPassword(params, callback))
				}
		}
}


export default Form.create()(connect(mapStateToProps, mapDispatch)(Download))
