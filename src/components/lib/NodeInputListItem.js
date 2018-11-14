import React from 'react';

export default class NodeInputListItem extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			hover: false
		}
	}

	onMouseUp(e) {
		e.stopPropagation();
		e.preventDefault();

		this.props.onMouseUp(this.props.index);
	}

	onMouseOver() {
		this.setState({ hover: true });
	}

	onMouseOut() {
		this.setState({ hover: false });
	}

	noop(e) {
		e.stopPropagation();
		e.preventDefault();
	}

	render() {
		let { name } = this.props.item;
		let { hover } = this.state;

		return (
			<li>
				<svg height="12" width="12" style={{transform:"translate(-16px,0px)"}}>
					<circle cx="6" cy="6" r="6" fill="green"></circle>
				</svg>
				<span onClick={(e) => this.noop(e)} onMouseUp={(e) => this.onMouseUp(e)} href="google.com">
					{name}
				</span>
			</li>
		);
	}
}
