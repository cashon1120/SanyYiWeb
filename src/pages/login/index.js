import React, {PureComponent} from 'react'
import {Form, Icon, Input, Button, message} from 'antd'
import {connect} from 'react-redux'
import {LoginWrapper, LoginContainer} from './style'
import {actionCreators} from './store'

const FormItem = Form.Item
const inputIcon = {
  color: 'rgba(0,0,0,.25)'
}

class Login extends PureComponent {
  state = {
    loading: false,
    userName: '',
    password: ''
  }

  componentDidMount(){
    const isLogin = localStorage.getItem('isLogin')
    if(isLogin === 'true'){
      this.props.history.push('/')
    }
  }

  inputChange(e, key) {
    const value = e.target.value
    this.setState({[key]: value})
  }

  setLoading = () => {
    const {loading} = this.state
    this.setState({
      loading: !loading
    })
  }

  getUserInfo(){
    const { getUserInfo } = this.props
    const callback = response => {
      //console.log(response)
    }
    getUserInfo(callback)
  }

  handleSubmit = e => {
    e.preventDefault()
    const {userName, password} = this.state
    const {login} = this.props
    const callback = res => {
      this.setLoading()
      if(res.data.code === 1){
        this.props.history.push('/')
      }else{
        message.error(res.data.msg)
      }
    }
    if (userName === '') {
      message.error('请输入账号')
      return
    }
    if (password === '') {
      message.error('请输入密码')
      return
    }
    this.setLoading()
    login(userName, password, callback)

  }

  render() {
    const {loading} = this.state
    return (
      <LoginWrapper>
      <LoginContainer>
        <h1>三一车辆设计经验数据平台</h1>
        <Form className="login-form" onSubmit={this.handleSubmit}>
          <FormItem>
            <Input
              onChange={e => this.inputChange(e, 'userName')}
              placeholder="请输入账号"
              name="userName"
              prefix={< Icon style = {
              inputIcon
            }
            type = "user" />}
              style={{
              height: '40px'
            }}/>
          </FormItem>
          <FormItem>
            <Input
              onChange={e => this.inputChange(e, 'password')}
              placeholder="请输入密码"
              name="password"
              prefix={< Icon style = {
              inputIcon
            }
            type = "lock" />}
              style={{
              height: '40px'
            }}
              type="password"/>
          </FormItem>
          <FormItem>
            <Button block htmlType="submit" loading={loading} size="large" type="primary">
              登录
            </Button>
          </FormItem>
        </Form>
      </LoginContainer>
    </LoginWrapper>
    )
  }
}

const mapDispatch = (dispatch) => ({
  login(userName, password, callback) {
    dispatch(actionCreators.login(userName, password, callback))
  },
  getUserInfo(callback){
    dispatch(actionCreators.getUserInfo(callback))
  }
})

export default connect(null, mapDispatch)(Login)
