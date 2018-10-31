import React, { Component } from 'react';
import { connect } from 'react-redux';
import RendererContainer from './RendererContainer';
import ContentBrowser from './ContentBrowser';
import './Window.css';
import { Responsive as ResponsiveGridLayout } from 'react-grid-layout';
import { updateLayout, initializeLayout } from '../actions/WindowAction';
import * as THREE from 'three-full';
import { NON_DRAGGABLE, RENDERER, CONTENT } from '../Constants';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { ContextMenu, MenuItem } from "react-contextmenu";

class Window extends Component {
    constructor(props) {
        super(props);
        this.state = {
            layout: [
                { i: RENDERER, x: 0, y: 0, w: 4, h: 14 },
                { i: CONTENT, x: 0, y: 14, w: 8, h: 13.5 },
            ]
        }
        this.updateLayout = this.props.updateLayout.bind(this);
        this.initializeLayout = this.props.initializeLayout.bind(this);
        this.initializeLayout(this.state.layout);
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
                    <div key={RENDERER}>
                        <RendererContainer envTexture={this.state.envTexture}></RendererContainer>
                    </div>
                    <div key={CONTENT} className="bb">
                        <ContentBrowser></ContentBrowser>
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
    updateLayout
})(DragDropContext(HTML5Backend)(Window))