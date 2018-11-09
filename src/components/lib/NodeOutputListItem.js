import React from 'react';

export default class NodeOutputListItem extends React.Component {
	
	onMouseDown(e) {
		e.stopPropagation();
  		e.preventDefault();

		this.props.onMouseDown(this.props.index);
	}

	noop(e) {
		e.stopPropagation();
  		e.preventDefault();
	}

	render() {
		return (
			<li onMouseDown={(e)=>this.onMouseDown(e)}>
				<span href="google.com" onClick={(e)=>this.noop(e)}>{this.props.item.name} 
				</span>
				<svg height="8" width="8">
					<circle cx="4" cy="4" r="4"></circle>
				</svg>
			</li>
		);
	}
}
