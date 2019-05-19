import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { authRegistration } from '../../actions/authActions';

import { Form, Input, Icon, Button } from 'antd';

class Registration extends React.Component {
	state = {
		confirmDirty: false,
	};

	handleSubmit = e => {
		e.preventDefault();
		this.props.form.validateFieldsAndScroll((err, values) => {
			if (!err) {
				console.log('Received values of form: ', values);
				this.props.auth(values.userName, values.email, values.password, values.confirm);
				if (this.props.isAuthenticated) {
					this.props.history.push('/');
				}
			}
		});
	};

	handleConfirmBlur = e => {
		const value = e.target.value;
		this.setState({ confirmDirty: this.state.confirmDirty || !!value });
	};

	compareToFirstPassword = (rule, value, callback) => {
		const form = this.props.form;
		if (value && value !== form.getFieldValue('password')) {
			callback('Two passwords that you enter is inconsistent!');
		} else {
			callback();
		}
	};

	validateToNextPassword = (rule, value, callback) => {
		const form = this.props.form;
		if (value && this.state.confirmDirty) {
			form.validateFields(['confirm'], { force: true });
		}
		callback();
	};

	render() {
		const { getFieldDecorator } = this.props.form;

		return (
			<Form onSubmit={this.handleSubmit} className="login-form">
				<h1 className="display-6 text-center">Registration</h1>
				<Form.Item>
					{getFieldDecorator('email', {
						rules: [
							{
								type: 'email',
								message: 'E-mail is invalid.',
							},
							{
								required: true,
								message: 'E-mail field is required.',
							},
						],
					})(
						<Input
							prefix={
								<Icon
									type="mail"
									style={{
										color: 'rgba(0,0,0,.25)',
									}}
								/>
							}
							placeholder="Email"
						/>
					)}
				</Form.Item>
				<Form.Item>
					{' '}
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
					)}{' '}
				</Form.Item>{' '}
				<Form.Item hasFeedback>
					{getFieldDecorator('password', {
						rules: [
							{
								required: true,
								message: 'Password field is required',
							},
							{
								validator: this.validateToNextPassword,
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
				<Form.Item hasFeedback>
					{getFieldDecorator('confirm', {
						rules: [
							{
								required: true,
								message: `Password doesn't match`,
							},
							{
								validator: this.compareToFirstPassword,
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
							placeholder="Confirm Password"
							onBlur={this.handleConfirmBlur}
						/>
					)}
				</Form.Item>
				<Form.Item>
					<Button type="primary" htmlType="submit" className="login-form-button">
						Register
					</Button>
					Or
					<Link to="/login"> already has an account!</Link>
				</Form.Item>
			</Form>
		);
	}
}

const RegistrationForm = Form.create({ name: 'register' })(Registration);
const mapStateToProps = state => {
	return {
		isLoading: state.isLoading,
		error: state.error,
		isAuthenticated: state.isAuthenticated,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		auth: (email, username, password1, password2) =>
			dispatch(authRegistration(email, username, password1, password2)),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(RegistrationForm);
