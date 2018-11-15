import React from 'react';
import onClickOutside from 'react-onclickoutside';
import NodeInputList from './NodeInputList';
import NodeOuputList from './NodeOutputList';
import Draggable from 'react-draggable';
import NumericInput from 'react-numeric-input';

class Node extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scaled:false,
      scale:1,
      selected: false,
      x:props.pos.x,
      y:props.pos.y
    }
  }

  handleDragStart(event, ui) {
    this.props.onNodeStart(this.props.nid, ui);
  }

  handleDragStop(event, ui) {
    this.props.onNodeStop(this.props.nid, ui);
  }

  handleDrag(event, ui) {
    this.props.onNodeMove(this.props.index, ui);
    //var scale=this.state.scale
    this.setState({x:ui.x,y:ui.y})
    event.stopPropagation();
    //console.log(ui.x,ui.y)
    //console.log(this.state.x,this.state.y)
  }

  onStartConnector(index) {
    this.props.onStartConnector(this.props.nid, index);
  }

  onCompleteConnector(index) {
    this.props.onCompleteConnector(this.props.nid, index);
  }

  handleClick(e) {
    this.setState({selected: true});
    if (this.props.onNodeSelect) {
      this.props.onNodeSelect(this.props.nid);
    }
  }

  setScale(value){
    this.setState({scale:value})
    //console.log(this.state.scale)
  }

  shouldComponentUpdate(newProps){
    if(this.props.scale!==newProps.scale){
      //console.log(newProps.scale)
      this.setState({scaled:true,x:(this.state.x/this.props.scale)*newProps.scale,y:(this.state.y/this.props.scale)*newProps.scale})
    }
    return true;
  }

  handleClickOutside() {
    let {selected} = this.state;
    if (this.props.onNodeDeselect && selected) {
      this.props.onNodeDeselect(this.props.nid);
    }
    this.setState({selected: false});
  }

  componentDidUpdate(){
    //console.log(this.state.x,this.state.y)
    if(this.state.scaled)
      this.setState({scaled:false})
  }

	render() {
    let {selected} = this.state;

    let nodeClass = 'node' + (selected ? ' selected' : '');

		return (
		  <div onDoubleClick={(e) => {this.handleClick(e)}}>
        <Draggable
          defaultPosition={{x: this.props.pos.x, y:this.props.pos.y}}
          position={this.state.scaled?{x:this.state.x,y:this.state.y}:null}
          handle=".node-header"
          onDrag={(event, ui)=>this.handleDrag(event, ui)}>
          {/*onStart={(event, ui)=>this.handleDragStart(event, ui)}
          onStop={(event, ui)=>this.handleDragStop(event, ui)}
    onDrag={(event, ui)=>this.handleDrag(event, ui)}>*/}
        <section className={nodeClass} style={{zIndex:10000}}>
            <div style={{transform:`scale(${this.props.scale})`}}>
            <header className="node-header">
              <span className="node-title">{this.props.title}</span>
            </header>
            <div className="node-content">
              <NodeInputList items={this.props.inputs} onCompleteConnector={(index)=>this.onCompleteConnector(index)} />
              <NodeOuputList items={this.props.outputs} onStartConnector={(index)=>this.onStartConnector(index)} />
            </div>
            </div>
    </section>
        </Draggable>
      </div>
    );
	}
}

export default onClickOutside(Node);