import "babel-polyfill"
import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import store from './store'
import Layout from './layout/layout.js'
import Login from './pages/login'
class App extends Component {
  render() {
    return (
    	<Provider store={store}>
      	<BrowserRouter>
      		<Switch>
            <Route path='/login' exact component={Login}></Route>
      			<Route path='/' component={Layout}></Route>
      		</Switch>
      	</BrowserRouter>
      </Provider>
    );
  }
}

export default App
