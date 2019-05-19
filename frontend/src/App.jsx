import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';

import Landing from './components/Landing';
import LoginForm from './components/auth/Login';
import RegistrationForm from './components/auth/Registration';

import 'antd/dist/antd.css';
import './App.css';

class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<Router>
					<div className="App">
						<Route exact path="/" component={Landing} />
						<div className="container">
							<Route exact path="/register" component={RegistrationForm} />
							<Route exact path="/login" component={LoginForm} />
						</div>
					</div>
				</Router>
			</Provider>
		);
	}
}

ReactDOM.render(<App />, document.getElementById('app'));
