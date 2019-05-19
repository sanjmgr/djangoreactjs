import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { logout } from '../../actions/authActions';
import { Button } from 'antd';

class Dashboard extends Component {
	render() {
		return (
			<div className="landing">
				<div className="dark-overlay landing-inner text-light">
					<div className="container">
						<div className="row">
							<div className="col-md-12 text-center">
								<h1 className="display-3 mb-4">Covert</h1>
								<p className="lead">
									Covert: Secret Messaging through Image Steganography and Face Recognition
								</p>
								<button type="button" className="btn btn-danger" onClick={this.props.logout}>
									Logout
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
const mapDispatchToProps = dispatch => {
	return {
		logout: () => dispatch(logout()),
	};
};

export default withRouter(
	connect(
		null,
		mapDispatchToProps
	)(Dashboard)
);
