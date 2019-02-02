import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scene from './Scene';
import Camera from './Camera';
import CubeCamera from './CubeCamera';
import Mesh from './Mesh';
import Geometry from './Geometry';
import Material from './Material';
import Texture from './Texture';
import Renderer from './Renderer';
import TitleBar from './Common/TitleBar';
import * as THREE from 'three-full';
import { setEnvTexture } from '../actions/TextureAction';
import { DropTarget } from 'react-dnd';
import { NON_DRAGGABLE, RENDERER, TEXTURE, MESH } from '../Constants';
import StandardMaterial from './StandardMaterial';

class RendererContainer extends Component {
    constructor(props) {
        super(props);
        this.setEnvTexture = this.props.setEnvTexture.bind(this);
        this.state ={
            activeMesh : null
        }
    }

    render() {
        const { connectDropTarget } = this.props;
        return (
            <>
                <TitleBar name="Viewport" className="fixed-top" width={this.props.units && this.props.units[RENDERER].width}>
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
                                {this.state.activeMesh &&
                                <Mesh name={this.state.activeMesh}>
                                    <StandardMaterial name="standard">
                                        <Texture channel="envMap" name="envTexture"></Texture>
                                    </StandardMaterial>
                                </Mesh>
                                }
                            </Scene>
                            <Scene name="background">
                                <Camera name="backgroundCamera"
                                    fov={45}
                                    copyRotation={this.props.cameras && this.props.cameras["mainCamera"]}
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
                component.setState({activeMesh:item.id})
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
        cameras: state.CameraReducer.cameras,
        units: state.WindowReducer.units,
        envTexture: state.TextureReducer.envTexture
    }
}
export default connect(mapStatetoProps, { setEnvTexture })(DropTarget((props) => props.type, rendererTarget, collect)(RendererContainer))