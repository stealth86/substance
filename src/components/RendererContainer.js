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
import { setEnvTexture } from '../actions/TextureAction';
import { DropTarget } from 'react-dnd';
import { NON_DRAGGABLE, RENDERER } from '../Constants';

class RendererContainer extends Component {
    constructor(props) {
        super(props);
        this.setEnvTexture = this.props.setEnvTexture.bind(this);
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
                            pixelRatio={window.devicePixelRatio}>
                            <Scene name="main">
                                <Camera name="mainCamera"
                                    position={{ x: 500, y: 500, z: 200 }}
                                    aspect={this.props.units ? (this.props.units[RENDERER].width / this.props.units[RENDERER].height) : 1} >
                                </Camera>
                            </Scene>
                            <Scene name="background">
                                <Camera name="backgroundCamera"
                                    fov={45}
                                    copyRotation={this.props.cameras && this.props.cameras["mainCamera"]}
                                    aspect={this.props.units ? (this.props.units[RENDERER].width / this.props.units[RENDERER].height) : 1}
                                    near={0.1}
                                    far={100000}>
                                </Camera>
                                <Mesh name="Sphere">
                                    <Geometry name="001" type="Sphere"></Geometry>
                                    <Material name="001" type="Basic">
                                        <Texture channel="map" name={this.props.envTexture.textureName}>
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
        console.log(monitor.getItem())
        component.setEnvTexture(monitor.getItem().id)
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