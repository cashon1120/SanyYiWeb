import "babel-polyfill"
import React, {Component, Fragment} from 'react'
import 'antd/dist/antd.css'
import {Route, Switch} from 'react-router-dom'
import Header from '../common/header/Index'
import Footer from '../common/footer/Index'

// 异步按需加载component
function asyncComponent(getComponent) {
  return class AsyncComponent extends React.Component {
    static Component = null;
    state = {
      Component: AsyncComponent.Component
    };
    componentWillMount() {
      if (!this.state.Component) {
        getComponent().then(({default: Component}) => {
          AsyncComponent.Component = Component
          this.setState({Component})
        })
      }
    }
    render() {
      const {Component} = this.state
      if (Component) {
        return <Component {...this.props}/>
      }
      return null
    }
  }
}

function load(component) {
  return import (`../pages/${component}`)
}

const Home = asyncComponent(() => load('home'))
const Detail = asyncComponent(() => load('detail'))
const Download = asyncComponent(() => load('download'))
const PointCheck = asyncComponent(() => load('pointCheck'))
const Search = asyncComponent(() => load('search'))
const UserCenter = asyncComponent(() => load('userCenter'))
const NotFound = asyncComponent(() => load('404'))
class Layout extends Component {
  render() {
    return (
      <Fragment>
        <Header prop={this.props}/>
        <Switch>
          <Route path='/' exact component={Home}></Route>
          <Route path='/detail/:type/:id' exact component={Detail}></Route>
          <Route path='/download' exact component={Download}></Route>
          <Route path='/pointCheck' exact component={PointCheck}></Route>
          <Route path='/search/:key?' exact component={Search}></Route>
          <Route path='/userCenter' exact component={UserCenter}></Route>
          <Route component={NotFound}></Route>
        </Switch>
        <Footer/>
      </Fragment>
    );
  }
}

export default Layout
