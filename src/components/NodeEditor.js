import React, { Component } from 'react'
import { connect } from 'react-redux'
import TitleBar from './TitleBar'
import ReactNodeGraph from './lib/ReactNodeGraph';
import './lib/node.css';
import NumericInput from 'react-numeric-input';
import { NON_DRAGGABLE } from '../Constants';

var exampleGraph = {
  
}

class NodeEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {"nodes":[
      {"nid":1,"type":"WebGLRenderer","x":1479,"y":351,"fields":{"in":[{"name":"width"},{"name":"height"},{"name":"scene"},{"name":"camera"},{"name":"bg_color"},{"name":"postfx"},{"name":"shadowCameraNear"},{"name":"shadowCameraFar"},{"name":"shadowMapWidth"},{"name":"shadowMapHeight"},{"name":"shadowMapEnabled"},{"name":"shadowMapSoft"}],"out":[]}},
      {"nid":14,"type":"Camera","x":549,"y":478,"fields":{"in":[{"name":"fov"},{"name":"aspect"},{"name":"near"},{"name":"far"},{"name":"position"},{"name":"target"},{"name":"useTarget"}],"out":[{"name":"out"}]}},
      {"nid":23,"type":"Scene","x":1216,"y":217,"fields":{"in":[{"name":"children"},{"name":"position"},{"name":"rotation"},{"name":"scale"},{"name":"doubleSided"},{"name":"visible"},{"name":"castShadow"},{"name":"receiveShadow"}],"out":[{"name":"out"}]}},
      {"nid":35,"type":"Merge","x":948,"y":217,"fields":{"in":[{"name":"in0"},{"name":"in1"},{"name":"in2"},{"name":"in3"},{"name":"in4"},{"name":"in5"}],"out":[{"name":"out"}]}},
      {"nid":45,"type":"Color","x":950,"y":484,"fields":{"in":[{"name":"rgb"},{"name":"r"},{"name":"g"},{"name":"b"}],"out":[{"name":"rgb"},{"name":"r"},{"name":"g"},{"name":"b"}]}},
      {"nid":55,"type":"Vector3","x":279,"y":503,"fields":{"in":[{"name":"xyz"},{"name":"x"},{"name":"y"},{"name":"z"}],"out":[{"name":"xyz"},{"name":"x"},{"name":"y"},{"name":"z"}]}},
      {"nid":65,"type":"ThreeMesh","x":707,"y":192,"fields":{"in":[{"name":"children"},{"name":"position"},{"name":"rotation"},{"name":"scale"},{"name":"doubleSided"},{"name":"visible"},{"name":"castShadow"},{"name":"receiveShadow"},{"name":"geometry"},{"name":"material"},{"name":"overdraw"}],"out":[{"name":"out"}]}},
      {"nid":79,"type":"Timer","x":89,"y":82,"fields":{"in":[{"name":"reset"},{"name":"pause"},{"name":"max"}],"out":[{"name":"out"}]}},
      {"nid":84,"type":"MathMult","x":284,"y":82,"fields":{"in":[{"name":"in"},{"name":"factor"}],"out":[{"name":"out"}]}},
      {"nid":89,"type":"Vector3","x":486,"y":188,"fields":{"in":[{"name":"xyz"},{"name":"x"},{"name":"y"},{"name":"z"}],"out":[{"name":"xyz"},{"name":"x"},{"name":"y"},{"name":"z"}]}}
    ],
    "connections": [
    ],
    scale:1}
  }

  onNewConnector(fromNode, fromPin, toNode, toPin) {
    let connections = [...this.state.connections, {
      from_node: fromNode,
      from: fromPin,
      to_node: toNode,
      to: toPin
    }]

    this.setState({ connections: connections })
  }

  onRemoveConnector(connector) {
    let connections = [...this.state.connections]
    connections = connections.filter((connection) => {
      return connection !== connector
    })

    this.setState({ connections: connections })
  }

  onNodeMove(nid, pos) {
    //console.log('end move : ' + nid, pos)
  }

  onNodeStartMove(nid) {
    //console.log('start move : ' + nid)
  }

  handleNodeSelect(nid) {
    //console.log('node selected : ' + nid)
  }

  handleNodeDeselect(nid) {
    //console.log('node deselected : ' + nid)
  }

  setScale(value){
    this.setState({scale:value})
  }

  moveDiv(e){
    if(this.down){
    this.scroller(this.startx-e.clientX,this.starty-e.clientY)
    this.startx=e.clientX
    this.starty=e.clientY
    console.log(this.scrollDiv.offsetTop)
    }
  }

  scroller(x,y){
    this.scrollDiv.scrollBy(x,y)
  }

  render() {
    return (
      <>
        <TitleBar name="Node">
        <NumericInput step={0.1} precision={2} value={this.state.scale} onChange={(value)=>this.setScale(value)}/>
        </TitleBar>
        <div ref={el=>this.scrollDiv=el} onMouseLeave={()=>this.down=false} onMouseDown={(e)=>{this.down=true;this.startx=e.clientX;this.starty=e.clientY}} onMouseUp={()=>this.down=false} onMouseMove={(e)=>this.moveDiv(e)} className={"nodeGraph "+NON_DRAGGABLE}>
          <ReactNodeGraph
            scale={this.state.scale}
            data={this.state}
            scrollDiv={(x,y)=>this.scroller(x,y)}
            onNodeMove={(nid, pos) => this.onNodeMove(nid, pos)}
            onNodeStartMove={(nid) => this.onNodeStartMove(nid)}
            onNewConnector={(n1, o, n2, i) => this.onNewConnector(n1, o, n2, i)}
            onRemoveConnector={(connector) => this.onRemoveConnector(connector)}
            onNodeSelect={(nid) => { this.handleNodeSelect(nid) }}
            onNodeDeselect={(nid) => { this.handleNodeDeselect(nid) }}
          />
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({

})

export default connect(mapStateToProps, {})(NodeEditor)
