import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scene from './Scene';
import Camera from './Camera';
import Mesh from './Mesh';
import Renderer from './Renderer';
import './Window.css';
import { Responsive as ResponsiveGridLayout } from 'react-grid-layout';
import { updateLayout, initializeLayout } from '../actions/WindowAction';
import { loadObject } from '../actions/LoaderAction';
import * as THREE from 'three-full';

class Window extends Component {
    constructor(props) {
        super(props);
        this.state = {
            layout: [
                { i: 'a', x: 0, y: 0, w: 4, h: 12 },
                { i: 'b', x: 0, y: 12, w: 8, h: 11.5 },
                { i: 'c', x: 0, y: 23.5, w: 12, h: 1 }
            ]
        }
        this.updateLayout = this.props.updateLayout.bind(this);
        this.initializeLayout = this.props.initializeLayout.bind(this);
        this.loadObject = this.props.loadObject.bind(this);
        this.initializeLayout(this.state.layout);
    }

    uploadFBX(){
        this.loadObject(this.selectfile.files[0])
        console.log(this.selectfile.files[0])
    }

    shouldComponentUpdate(nextProps){
        //console.log(nextProps)
        if(nextProps.scenes && nextProps.scenes["mainScene"] && nextProps.objects && this.props.objects !==nextProps.objects){
            console.log(nextProps.objects)
           var light = new THREE.DirectionalLight( 0xffffff );
				light.position.set( 0, 200, 100 );
				light.castShadow = true;
				light.shadow.camera.top = 180;
				light.shadow.camera.bottom = -100;
				light.shadow.camera.left = -120;
                light.shadow.camera.right = 120;
                nextProps.scenes["mainScene"].add(light)
           // var texture = new THREE.TextureLoader().load(URL.createObjectURL(this.selectfile1.files[0]))
            //nextProps.objects[0].children[0].material.normalMap = texture
            nextProps.scenes["mainScene"].add(...nextProps.objects)
            var gridhelper = new THREE.GridHelper(100,10)
            light = new THREE.AmbientLight(new THREE.Color(0xffffff),0.5)
            nextProps.scenes["mainScene"].add(gridhelper)
            nextProps.scenes["mainScene"].add(light)
            nextProps.scenes["mainScene"].background = new THREE.Color(0x000044)
        }
        return true;
    }
    render() {
        return (
            <ResponsiveGridLayout className="layout"
                                    compactType="horizontal"
                                    mounted={false}
                                    layouts={{ lg: this.state.layout }}
                                    breakpoints={{ lg: 1200 }}
                                    onResize={(layout,oldItem,newIem,placeholder)=>this.updateLayout(layout,oldItem,newIem,placeholder)}
                                    onResizeStop={(layout, oldItem, newItem) => this.updateLayout(layout, oldItem, newItem)}
                                    margin={[this.props.marginX, this.props.marginY]}
                                    cols={{ lg: this.props.gridColumns }}
                                    rowHeight={this.props.rowHeight}
                                    width={this.props.containerWidth}
                                    draggableCancel=".nonDraggable">
                <div key="a">
                    <div className="fixed-top bar" style={{width:this.props.units && this.props.units["a"].width+"px"}}>
                        Viewport
                    </div>
                    <Renderer className="nonDraggable" 
                                width={this.props.units && this.props.units["a"].width} 
                                height={this.props.units && this.props.units["a"].height} 
                                shadowMapEnabled={true} 
                                pixelRatio={window.devicePixelRatio}>
                        <Scene name="backgroundScene">
                            <Camera fov={75} 
                                    aspect={this.props.units ? (this.props.units["a"].width/this.props.units["a"].height) : 1} 
                                    near={0.1} 
                                    far={10000}>
                            </Camera>
                            <Mesh>
                                
                            </Mesh>
                        </Scene>
                        <Scene name="mainScene">
                            <Camera aspect={this.props.units ? (this.props.units["a"].width/this.props.units["a"].height) : 1} >
                            </Camera>
                        </Scene>
                    </Renderer>
                </div>
                <div key="b" className="nonDraggable testDiv">
                    <div className="fixed-top bar">
                        Viewport
                    </div>
                </div>
                <div key="c" className="nonDraggable testDiv">
                <input type="file" ref={el=>this.selectfile=el} onChange={()=>this.uploadFBX()}></input>
                <input type="file" ref={el=>this.selectfile1=el}></input>
                </div>
            </ResponsiveGridLayout>
        )
    }
}

function mapStatetoProps(state) {
    return {
        objects : state.LoaderReducer.objects,
        scenes : state.SceneReducer.scenes,
        units: state.WindowReducer.units,
        marginX: state.WindowReducer.marginX,
        marginY: state.WindowReducer.marginY,
        gridColumns: state.WindowReducer.gridColumns,
        rowHeight: state.WindowReducer.rowHeight,
        containerWidth: state.WindowReducer.containerWidth
    }
}

export default connect(mapStatetoProps, { initializeLayout, updateLayout, loadObject })(Window)