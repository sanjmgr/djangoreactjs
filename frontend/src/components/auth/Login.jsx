import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { authLogin } from '../../actions/authActions';

import { Form, Icon, Input, Button, Checkbox, Spin } from 'antd';
const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

class Login extends React.Component {
	componentDidMount() {
		if (this.props.isAuthenticated) {
			this.props.history.push('/dashboard');
		}
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.isAuthenticated) {
			this.props.history.push('/dashboard');
		}

		if (nextProps.errors) {
			console.log(error);
		}
	}

	handleSubmit = e => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				console.log('Received values of form: ', values);
				this.props.onAuth(values.username, values.password);
			}
		});
	};

	render() {
		let errorMessage = null;
		if (this.props.error) {
			errorMessage = <p>{this.props.error.message}</p>;
		}

		const { getFieldDecorator } = this.props.form;
		return (
			<div>
				{errorMessage}
				{this.props.isLoading ? (
					<Spin indicator={antIcon} />
				) : (
					<Form onSubmit={this.handleSubmit} className="login-form">
						<h1 className="display-6 text-center">Log In</h1>
						<Form.Item>
							{getFieldDecorator('username', {
								rules: [
									{
										required: true,
										message: 'Username is required.',
									},
								],
							})(
								<Input
									prefix={
										<Icon
											type="user"
											style={{
												color: 'rgba(0,0,0,.25)',
											}}
										/>
									}
									placeholder="Username"
								/>
							)}
						</Form.Item>
						<Form.Item hasFeedback>
							{getFieldDecorator('password', {
								rules: [
									{
										required: true,
										message: 'Password is required.',
									},
								],
							})(
								<Input
									prefix={
										<Icon
											type="lock"
											style={{
												color: 'rgba(0,0,0,.25)',
											}}
										/>
									}
									type="password"
									placeholder="Password"
								/>
							)}
						</Form.Item>
						<Form.Item>
							{getFieldDecorator('remember', {
								valuePropName: 'checked',
								initialValue: true,
							})(<Checkbox> Remember me </Checkbox>)}
							<a className="login-form-forgot" href="">
								Forgot password
							</a>
							<Button type="primary" htmlType="submit" className="login-form-button">
								Log in
							</Button>
							Or
							<Link to="/register"> register now!</Link>
						</Form.Item>
					</Form>
				)}
			</div>
		);
	}
}

const LoginForm = Form.create({
	name: 'normal_login',
})(Login);

const mapStateToProps = state => {
	return {
		isLoading: state.auth.isLoading,
		isAuthenticated: state.auth.isAuthenticated,
		error: state.auth.error,
	};
};
const mapDispatchToProps = dispatch => {
	return {
		onAuth: (username, password) => dispatch(authLogin(username, password)),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(LoginForm);
