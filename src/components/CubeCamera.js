import { Camera } from './Camera';
import { connect } from 'react-redux';
import { addCamera } from '../actions/CameraAction';
import { addCallback } from '../actions/RendererAction';
import * as THREE from "three-full";
import { DEFAULT_NEAR, DEFAULT_FAR, DEFAULT_CUBE_CAMERA_RESOLUTION } from '../Constants';

export class CubeCamera extends Camera {
    constructor(props) {
        super(props);
        this.updateRenderTarget = this.updateRenderTarget.bind(this);
    }

    componentDidMount() {
        this.camera = new THREE.CubeCamera(this.props.near ? this.props.near : DEFAULT_NEAR,
            this.props.far ? this.props.far : DEFAULT_FAR,
            this.props.resolution ? this.props.resolution : DEFAULT_CUBE_CAMERA_RESOLUTION)
        this.camera.name = this.props.name
        this.props.position && this.camera.position.set(this.props.position.x, this.props.position.y, this.props.position.z)
        this.addCamera(this.camera.name, this.camera)
    }

    updateRenderTarget() {
        //console.log(this.props.renderer,this.props.scene)
        if (this.props.renderer && this.props.scene) {
            if (this.props.static && !this.updated) {                
                this.props.camera.update(this.props.renderer, this.props.scene)
                this.updated = true
            } else if(!this.props.static){
                this.props.camera.update(this.props.renderer, this.props.scene)
            }
        }
    }

    shouldComponentUpdate(newProps) {
        super.shouldComponentUpdate(newProps)
        if (newProps.scene && newProps.renderer && newProps.camera)
            this.addCallback(this.props.rendererName, 0, this.updateRenderTarget)
        return true;
    }
}

function mapStatetoProps(state, props) {
    return {
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

export default connect(mapStatetoProps, { addCamera, addCallback })(CubeCamera)
