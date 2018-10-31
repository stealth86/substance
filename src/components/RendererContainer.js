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
import { NON_DRAGGABLE, RENDERER } from '../Constants';

class RendererContainer extends Component {

    shouldComponentUpdate(newProps) {
        console.log(newProps.envTexture)
        return true;
    }

    render() {
        return (
            <>
                <TitleBar name="Viewport" className="fixed-top" width={this.props.units && this.props.units[RENDERER].width}>
                </TitleBar>
                <Renderer className={NON_DRAGGABLE}
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
                                <Texture channel="map" name={this.props.envTexture}>
                                </Texture>
                            </Material>
                        </Mesh>
                    </Scene>
                </Renderer>
            </>)
    }
}

function mapStatetoProps(state, props) {
    return {
        cameras: state.CameraReducer.cameras,
        units: state.WindowReducer.units,
    }
}
export default connect(mapStatetoProps, {})(RendererContainer)