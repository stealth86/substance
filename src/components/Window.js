import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scene from './Scene';
import Camera from './Camera';
import Mesh from './Mesh';
import Geometry from './Geometry';
import Material from './Material';
import Texture from './Texture';
import Renderer from './Renderer';
import TitleBar from './TitleBar';
import './Window.css';
import { Responsive as ResponsiveGridLayout } from 'react-grid-layout';
import { updateLayout, initializeLayout } from '../actions/WindowAction';
import { loadObject, loadTexture } from '../actions/LoaderAction';
import * as THREE from 'three-full';
import { NON_DRAGGABLE } from '../Constants';
import Thumbnail from './Thumbnail';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import SplitPane from 'react-split-pane';
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";

class Window extends Component {
    constructor(props) {
        super(props);
        this.state = {
            layout: [
                { i: 'a', x: 0, y: 0, w: 4, h: 14 },
                { i: 'b', x: 0, y: 14, w: 8, h: 13.5, static: false },
            ]
        }
        this.updateLayout = this.props.updateLayout.bind(this);
        this.initializeLayout = this.props.initializeLayout.bind(this);
        this.loadObject = this.props.loadObject.bind(this);
        this.loadTexture = this.props.loadTexture.bind(this);
        this.initializeLayout(this.state.layout);
    }

    uploadTexture() {
        this.setState({ textureName: this.selectfile1.files[0].name.replace(/\..+$/, '') })
        this.loadTexture(this.selectfile1.files[0])
    }
    uploadFBX() {
        this.loadObject(this.selectfile.files[0])
        /*if (this.props.scenes && this.props.scenes["backgroundScene"]) {
            console.log(this.props.scenes["backgroundScene"])
            var textu = new THREE.TextureLoader().load(URL.createObjectURL(this.selectfile.files[0]))
            this.props.materials["backgroundSceneSphereMeshMaterial"].map = textu
            var gridhelper = new THREE.GridHelper(100, 10)
            var light = new THREE.AmbientLight(new THREE.Color(0xffffff), 0.5)
            this.props.scenes["backgroundScene"].add(gridhelper)
            this.props.scenes["backgroundScene"].add(light)
            this.props.scenes["backgroundScene"].background = new THREE.Color(0x000044)
        }*/
        //console.log(this.selectfile.files[0])
    }

    shouldComponentUpdate(nextProps) {
        //console.log(nextProps)
        if (nextProps.scenes && nextProps.scenes["main"] && nextProps.objects && this.props.objects !== nextProps.objects) {
            //console.log(nextProps.objects)
            var light = new THREE.DirectionalLight(0xffffff);
            light.position.set(0, 200, 100);
            light.castShadow = true;
            light.shadow.camera.top = 180;
            light.shadow.camera.bottom = -100;
            light.shadow.camera.left = -120;
            light.shadow.camera.right = 120;
            nextProps.scenes["main"].add(light)
            //var texture = new THREE.TextureLoader().load(URL.createObjectURL(this.selectfile1.files[0]))
            //nextProps.materials["001"].map = texture
            //nextProps.materials["001"].needsUpdate = true
            //nextProps.objects[0].children[0].material.normalMap = texture
            //console.log(nextProps.objects)
            Object.keys(nextProps.objects).forEach((key) => nextProps.scenes["main"].add(nextProps.objects[key]))
            var gridhelper = new THREE.GridHelper(100, 10)
            light = new THREE.AmbientLight(new THREE.Color(0xffffff), 0.5)
            nextProps.scenes["main"].add(gridhelper)
            nextProps.scenes["main"].add(light)
            console.log(this.props.meshes)
            //nextProps.cameras["mainCamera"].lookAt(nextProps.meshes["Sphere"].position)
            //nextProps.scenes["mainScene"].background = new THREE.Color(0x000044)
        }
        return true;
    }
    render() {
        return (
            <>
            <ResponsiveGridLayout className="layout"
                compactType="horizontal"
                mounted={false}
                layouts={{ lg: this.state.layout }}
                breakpoints={{ lg: 1200 }}
                onResize={(layout, oldItem, newIem, placeholder) => this.updateLayout(layout, oldItem, newIem, placeholder)}
                onResizeStop={(layout, oldItem, newItem) => this.updateLayout(layout, oldItem, newItem)}
                margin={[this.props.marginX, this.props.marginY]}
                cols={{ lg: this.props.gridColumns }}
                rowHeight={this.props.rowHeight}
                width={this.props.containerWidth}
                draggableCancel={"." + NON_DRAGGABLE}>
                <div key="a">
                    <TitleBar name="Viewport" className="fixed-top" width={this.props.units && this.props.units["a"].width}>
                        <button className="float-right">Button</button>
                        <button>Button</button>
                    </TitleBar>
                    <Renderer className={NON_DRAGGABLE}
                        width={this.props.units && this.props.units["a"].width}
                        height={this.props.units && this.props.units["a"].height}
                        shadowMapEnabled={true}
                        pixelRatio={window.devicePixelRatio}>
                        <Scene name="main">
                            <Camera name="mainCamera"
                                //lookAt={this.props.meshes && this.props.meshes["Cube"]}
                                position={{ x: 500, y: 500, z: 200 }}
                                aspect={this.props.units ? (this.props.units["a"].width / this.props.units["a"].height) : 1} >
                            </Camera>
                        </Scene>
                        <Scene name="background">
                            <Camera name="backgroundCamera"
                                fov={45}
                                copyRotation={this.props.cameras && this.props.cameras["mainCamera"]}
                                aspect={this.props.units ? (this.props.units["a"].width / this.props.units["a"].height) : 1}
                                near={0.1}
                                far={100000}>
                            </Camera>
                            <Mesh name="Sphere">
                                <Geometry name="001" type="Sphere"></Geometry>
                                <Material name="001" type="Basic">
                                    <Texture channel="map" name={this.state.textureName}>
                                    </Texture>
                                </Material>
                            </Mesh>
                        </Scene>
                    </Renderer>
                </div>
                <div key="b" className="nonDraggable bb">
                    <TitleBar name="Content" width={this.props.units && this.props.units["b"].width}>
                        <input type="file" ref={el => this.selectfile = el} onChange={() => this.uploadFBX()}></input>
                        <input type="file" ref={el => this.selectfile1 = el} onChange={() => this.uploadTexture()}></input>
                    </TitleBar>
                    {/*<div className="bar">
                    <div>
                        <Thumbnail id="tnail">
                        </Thumbnail>
                        </div>
                        <div>
                        <Thumbnail id="tnail">
                        </Thumbnail>
                        </div>
                    </div>*/}
                    <SplitPane split="vertical" defaultSize={200}>
                        <div className="testDiv"></div>
                        <div>
                        <ContextMenuTrigger id="xyz">
                            <div className="fileList">
                                <Thumbnail id="tnail">
                                </Thumbnail>
                                <Thumbnail id="tnail">
                                </Thumbnail>
                                <Thumbnail id="tnail">
                                </Thumbnail>
                                <Thumbnail id="tnail">
                                </Thumbnail>
                                <Thumbnail id="tnail">
                                </Thumbnail>
                                <Thumbnail id="tnail">
                                </Thumbnail>
                                <Thumbnail id="tnail">
                                </Thumbnail>
                                <Thumbnail id="tnail">
                                </Thumbnail>
                                <Thumbnail id="tnail">
                                </Thumbnail>
                                <Thumbnail id="tnail">
                                </Thumbnail>
                                <Thumbnail id="tnail">
                                </Thumbnail>
                                <Thumbnail id="tnail">
                                </Thumbnail>
                                <Thumbnail id="tnail">
                                </Thumbnail>
                                <Thumbnail id="tnail">
                                </Thumbnail>
                                <Thumbnail id="tnail">
                                </Thumbnail>
                                <Thumbnail id="tnail">
                                </Thumbnail>
                                <Thumbnail id="tnail">
                                </Thumbnail>
                                <Thumbnail id="tnail">
                                </Thumbnail>
                                <Thumbnail id="tnail">
                                </Thumbnail>
                                <Thumbnail id="tnail">
                                </Thumbnail>
                                <Thumbnail id="tnail">
                                </Thumbnail>
                                <Thumbnail id="tnail">
                                </Thumbnail>
                                <Thumbnail id="tnail">
                                </Thumbnail>
                                <Thumbnail id="tnail">
                                </Thumbnail>
                                <Thumbnail id="tnail">
                                </Thumbnail>
                                <Thumbnail id="tnail">
                                </Thumbnail>
                                <Thumbnail id="tnail">
                                </Thumbnail>
                                <Thumbnail id="tnail">
                                </Thumbnail>
                                <Thumbnail id="tnail">
                                </Thumbnail>
                                <Thumbnail id="tnail">
                                </Thumbnail>
                                <Thumbnail id="tnail">
                                </Thumbnail>
                                <Thumbnail id="tnail">
                                </Thumbnail>
                                <Thumbnail id="tnail">
                                </Thumbnail>
                                <Thumbnail id="tnail">
                                </Thumbnail>
                                <Thumbnail id="tnail">
                                </Thumbnail>
                                <Thumbnail id="tnail">
                                </Thumbnail>
                                <Thumbnail id="tnail">
                                </Thumbnail>
                                <Thumbnail id="tnail">
                                </Thumbnail>
                                <Thumbnail id="tnail">
                                </Thumbnail>
                                <Thumbnail id="tnail">
                                </Thumbnail>
                                <Thumbnail id="tnail">
                                </Thumbnail>
                                <Thumbnail id="tnail">
                                </Thumbnail>
                            </div>
                        </ContextMenuTrigger>
                        </div>
                    </SplitPane>
                </div>
            </ResponsiveGridLayout>
                                    <ContextMenu id="xyz">
                                    <MenuItem data={{ foo: 'bar' }} >
                                        <div>
                                            Menu Item 1
                                        </div>
                                    </MenuItem>
                                    <MenuItem data={{ foo: 'bar' }} >
                                        ContextMenu Item 2
                                    </MenuItem>
                                    <MenuItem divider />
                                    <MenuItem data={{ foo: 'bar' }} >
                                        ContextMenu Item 3
                                    </MenuItem>
                                </ContextMenu>
                                </>
        )
    }
}

function mapStatetoProps(state) {
    return {
        meshes: state.MeshReducer.meshes,
        cameras: state.CameraReducer.cameras,
        materials: state.MaterialReducer.materials,
        objects: state.LoaderReducer.objects,
        scenes: state.SceneReducer.scenes,
        units: state.WindowReducer.units,
        marginX: state.WindowReducer.marginX,
        marginY: state.WindowReducer.marginY,
        gridColumns: state.WindowReducer.gridColumns,
        rowHeight: state.WindowReducer.rowHeight,
        containerWidth: state.WindowReducer.containerWidth
    }
}

export default connect(mapStatetoProps, {
    initializeLayout,
    updateLayout,
    loadObject,
    loadTexture
})(DragDropContext(HTML5Backend)(Window))