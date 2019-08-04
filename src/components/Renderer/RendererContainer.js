import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scene from '../Scene/Scene';
import Camera from '../Camera/Camera';
import CubeCamera from '../Camera/CubeCamera';
import Mesh from '../Mesh/Mesh';
import Geometry from '../Mesh/Geometry';
import Material from '../Material/Material';
import Texture from '../Texture/Texture';
import Renderer from './Renderer';
import TitleBar from '../Common/TitleBar';
import { NavLink } from 'react-router-dom';
import * as THREE from 'three-full';
import { setEnvTexture } from '../../actions/TextureAction';
import { setActiveMesh } from '../../actions/MeshAction';
import { DropTarget } from 'react-dnd';
import { NON_DRAGGABLE, RENDERER, TEXTURE, MESH } from '../../Constants';
import './RendererContainer.css';
import window from 'global';

class RendererContainer extends Component {
    constructor(props) {
        super(props);
        this.setEnvTexture = this.props.setEnvTexture.bind(this);
        this.setActiveMesh = this.props.setActiveMesh.bind(this);
        this.state ={
            activeMesh : null
        }
    }

    render() {
        const { connectDropTarget } = this.props;
        return (
            <>
                <TitleBar name="Viewport" className="fixed-top" width={this.props.units && this.props.units[RENDERER].width}>
                    {/*<button><span className="fas fa-sliders-h"></span></button>*/}
                    <NavLink className="viewportSettings px-1" to="/viewport"><span className="fas fa-sliders-h"></span></NavLink>
                </TitleBar>
                {connectDropTarget(
                    <div className="renderer">
                        <Renderer name="main" className={NON_DRAGGABLE}
                            width={this.props.units && this.props.units[RENDERER].width}
                            height={this.props.units && this.props.units[RENDERER].height}
                            shadowMapEnabled={true}
                            ui={true}
                            pixelRatio={window.devicePixelRatio}>
                            <Scene name="main">
                                <Camera name="mainCamera"
                                    position={{ x: 500, y: 500, z: 200 }}
                                    aspect={this.props.units ? (this.props.units[RENDERER].width / this.props.units[RENDERER].height) : 1} >
                                </Camera>
                                {this.props.activeMesh &&
                                <Mesh name={this.props.activeMesh.name} generateMaterial={true}>
                                </Mesh>
                                }
                            </Scene>
                            <Scene name="background">
                                <Camera name="backgroundCamera"
                                    fov={45}
                                    copyRotation={(this.props.cameras && ("mainCamera" in this.props.cameras)) && this.props.cameras["mainCamera"]}
                                    aspect={this.props.units ? (this.props.units[RENDERER].width / this.props.units[RENDERER].height) : 1}
                                    near={0.1}
                                    far={100000}>
                                </Camera>
                                <CubeCamera name="cubeCamera" near={0.1} static={true}
                                    far={100000} resolution={512}>
                                </CubeCamera>
                                <Mesh name="Sphere">
                                    <Geometry name="001" type="Sphere"></Geometry>
                                    <Material name="001" side={THREE.BackSide}>
                                        <Texture channel="map" name={this.props.envTexture}>
                                        </Texture>
                                    </Material>
                                </Mesh>
                            </Scene>
                        </Renderer>
                    </div>
                )}
            </>)
    }
}

const rendererTarget = {
    drop(props, monitor, component) {
        var item=monitor.getItem()
        switch(item.type){
            case TEXTURE:
                component.setEnvTexture(item.id)
                break;
            case MESH:
                component.setActiveMesh(item.id)
                break;
            default:
                break;
        }
    }
};

function collect(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget()
    };
}

function mapStatetoProps(state, props) {
    return {
        activeMesh : state.MeshReducer.activeMesh,
        cameras: state.CameraReducer.cameras,
        units: state.WindowReducer.units,
        envTexture: state.TextureReducer.envTexture
    }
}
export default connect(mapStatetoProps, { setEnvTexture,setActiveMesh })(DropTarget((props) => props.type, rendererTarget, collect)(RendererContainer))