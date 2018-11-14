import React from 'react';

export default class NodeOutputListItem extends React.Component {
	
	onMouseDown(e) {
		e.stopPropagation();
  		e.preventDefault();

		//this.props.onMouseDown(this.props.index);
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
				<svg height="12" width="12" style={{transform:"translate(16px,0px)"}}>
					<circle cx="6" cy="6" r="6" style={{cursor:"pointer"}}></circle>
				</svg>
			</li>
		);
	}
}
