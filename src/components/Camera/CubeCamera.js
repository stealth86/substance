import { Camera } from './Camera';
import { connect } from 'react-redux';
import { addCamera } from '../../actions/CameraAction';
import { addCallback } from '../../actions/RendererAction';
import { addTexture } from '../../actions/TextureAction';
import * as THREE from "three-full";
import { DEFAULT_NEAR, DEFAULT_FAR, DEFAULT_CUBE_CAMERA_RESOLUTION } from '../../Constants';

export class CubeCamera extends Camera {
    constructor(props) {
        super(props);
        this.updateRenderTarget = this.updateRenderTarget.bind(this);
        this.addTexture = this.props.addTexture.bind(this);
    }

    componentDidMount() {
        this.camera = new THREE.CubeCamera(this.props.near ? this.props.near : DEFAULT_NEAR,
            this.props.far ? this.props.far : DEFAULT_FAR,
            this.props.resolution ? this.props.resolution : DEFAULT_CUBE_CAMERA_RESOLUTION)
        this.camera.name = this.props.name
        this.props.position && this.camera.position.set(this.props.position.x, this.props.position.y, this.props.position.z)
        this.camera.renderTarget.texture.minFilter = THREE.LinearFilter;
        this.camera.renderTarget.texture.magFilter = THREE.LinearFilter;
        this.addCamera(this.camera.name, this.camera)
    }

    updateRenderTarget() {
        if (this.props.renderer && this.props.scene) {
            if (!this.props.static || !this.updated) {
                this.props.camera.update(this.props.renderer, this.props.scene)
                //console.log(this.props.renderer,this.props.scene)
                this.props.camera.renderTarget.texture.name = "envTexture"
                //this.addTexture("envTexture", this.props.camera.renderTarget.texture)
                this.pmremGenerator = new THREE.PMREMGenerator(this.props.camera.renderTarget.texture);
                this.pmremGenerator.update(this.props.renderer);
                this.pmremCubeUVPacker = new THREE.PMREMCubeUVPacker(this.pmremGenerator.cubeLods);
                this.pmremCubeUVPacker.update(this.props.renderer);
                this.rgbmCubeRenderTarget = this.pmremCubeUVPacker.CubeUVRenderTarget;
                this.addTexture("envTexture", this.rgbmCubeRenderTarget.texture)
                this.pmremGenerator.dispose();
                this.pmremCubeUVPacker.dispose();
                //material.envMap = rgbmCubeRenderTarget.texture;
                //console.log(this.props.camera.renderTarget.texture)
                this.updated = true
            }
        }
    }

    shouldComponentUpdate(newProps) {
        //super.shouldComponentUpdate(newProps)
        if (newProps.envTexture && newProps.scene && newProps.renderer && newProps.camera && !this.callbackAdded) {
            this.addCallback(this.props.rendererName, 0, this.updateRenderTarget)
            this.callbackAdded=true
        }
        if (newProps.envTexture !== this.props.envTexture)
        this.updated = false;
        return true;
    }
}

function mapStatetoProps(state, props) {
    return {
        envTexture: state.TextureReducer.envTexture,
        renderer: props.rendererName &&
            state.RendererReducer.renderers &&
            state.RendererReducer.renderers[props.rendererName] ? state.RendererReducer.renderers[props.rendererName] : null,
        scene: props.sceneName &&
            state.SceneReducer.scenes &&
            state.SceneReducer.scenes[props.sceneName] ? state.SceneReducer.scenes[props.sceneName] : null,
        camera: props.name &&
            state.CameraReducer.cameras &&
            state.CameraReducer.cameras[props.name] ? state.CameraReducer.cameras[props.name] : null,
    }
}

export default connect(mapStatetoProps, { addCamera, addCallback, addTexture })(CubeCamera)
