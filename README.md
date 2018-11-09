import React, { Component } from 'react';
import './App.css';
import Draggable from 'react-draggable';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {x:50,y:0,x1:100,y1:0}
    this.start = this.start.bind(this);
    this.end = this.end.bind(this);
  }

  start(e,data){
    this.setState({x:data.x,y:data.y})
  }

  end(e,data){
    this.setState({x1:data.x,y1:data.y})
  }

  render() {
    var radius=10
    var widthConst=Math.abs(this.state.x1-this.state.x)+radius*2
    var leftConst=Math.min(this.state.x,this.state.x1)
    var widthAdjust=(widthConst-radius*2)*0.4
    var leftAdjust=widthConst*0.2
    var width=widthConst+(this.state.x<this.state.x1?0:widthAdjust)
    var height=Math.abs(this.state.y1-this.state.y)+radius*2
    var heightAdjust=(height-radius*2)*0.2
    var top=Math.min(this.state.y,this.state.y1)
    var left=leftConst-(this.state.x<this.state.x1?0:leftAdjust)
    return (
      <div style={{position:"relative",top:"50px"}}>
        <svg style={{position:"absolute",top:`${top}px`, left:`${left}px`}} width={width} height={height}>
           <path d={`M ${this.state.x<this.state.x1?radius:widthConst-radius+leftAdjust}
                      ${this.state.y<this.state.y1?radius:height-radius}
                    C ${this.state.x<this.state.x1?widthConst/2:width+(width-radius*2)*0.4}
                      ${this.state.y<this.state.y1?radius+heightAdjust:height-radius-heightAdjust}
                      ${this.state.x<this.state.x1?widthConst/2:radius-(width-radius*2)*0.4}
                      ${this.state.y<this.state.y1?height-heightAdjust-radius:radius+heightAdjust}
                      ${this.state.x<this.state.x1?widthConst-radius:leftAdjust+radius}
                      ${this.state.y<this.state.y1?height-radius:radius}`} fill="none" stroke="blue" stroke-width="2"/>
        </svg>
        <Draggable defaultPosition={{x:50,y:0}} onDrag={this.start}>
          <svg width={radius*2} height={radius*2} style={{position:"absolute"}}>
            <circle cx={radius} cy={radius} r={radius} fill="green" style={{cursor:"pointer"}}></circle>
          </svg>
        </Draggable>
        <Draggable defaultPosition={{x:100,y:0}} onDrag={this.end}>
          <svg width={radius*2} height={radius*2} style={{position:"absolute"}}>
            <circle cx={radius} cy={radius} r={radius} fill="red" style={{cursor:"pointer"}}></circle>
          </svg>
        </Draggable>
      </div>
    );
  }
}

export default App;
