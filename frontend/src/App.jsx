import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import PrivateRoute from './components/common/PrivateRoute';

import Landing from './components/Landing';
import LoginForm from './components/auth/Login';
import RegistrationForm from './components/auth/Registration';
import Dashboard from './components/Layouts/Dashboard';
import { authCheckState } from './actions/authActions';

import 'antd/dist/antd.css';
import './App.css';

class App extends Component {
	componentDidMount() {
		this.props.onTryAutoSignup();
	}
	render() {
		return (
			<div>
				<Router>
					<div className="App">
						<Route exact path="/" component={Landing} />
						<div className="container">
							<Route exact path="/register" component={RegistrationForm} />
							<Route exact path="/login" component={LoginForm} />
						</div>
						<Switch>
							<PrivateRoute exact path="/dashboard" component={Dashboard} />
						</Switch>
					</div>
				</Router>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		isAuthenticated: state.auth.isAuthenticated,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onTryAutoSignup: () => dispatch(authCheckState()),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App);
