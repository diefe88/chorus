import * as React from 'react';
import { Button } from 'react-bootstrap';

import '../App.css';
import vvlogo from './vvlogo.png';

export class Header extends React.Component<any, any> {
	public render() {
		return (
			<div className="vv-page-header">
				<div className="header-logo">
					<a href="#/LandingPage"><img src={vvlogo} /></a>
				</div>
				<div className="right-buttons">
					<Button type="button" className="vv-button contact-about-button" href="mailto:info@votingvoices.org">Contact</Button>
				</div>
			</div>
		);
	}
}