import { Component } from 'react';
import { connect } from 'react-redux';
import * as THREE from "three-full";
import { addCamera } from '../../actions/CameraAction';
import { addCallback } from '../../actions/RendererAction';
import { DEFAULT_FOV, DEFAULT_ASPECT, DEFAULT_NEAR, DEFAULT_FAR } from '../../Constants';

export class Camera extends Component {
    constructor(props) {
        super(props);
        this.addCamera = this.props.addCamera.bind(this);
        this.addCallback = this.props.addCallback.bind(this);
        this.copyRotation = this.copyRotation.bind(this);
        this.lookAt = this.lookAt.bind(this);
    }

    componentWillMount() {
        this.camera = new THREE.PerspectiveCamera(this.props.fov ? this.props.fov : DEFAULT_FOV , 
                                                 this.props.aspect ? this.props.aspect : DEFAULT_ASPECT, 
                                                 this.props.near ? this.props.near : DEFAULT_NEAR, 
                                                 this.props.far ? this.props.far : DEFAULT_FAR)
        this.camera.name = this.props.name
        this.props.position && this.camera.position.set(this.props.position.x,this.props.position.y,this.props.position.z)
        this.addCamera(this.camera.name, this.camera)
    }

    copyRotation(){
        this.props.camera.rotation.copy(this.props.copyRotation.rotation)
    }

    lookAt(){
        this.props.camera.lookAt(this.props.lookAt.position)
    }

    shouldComponentUpdate(nextProps) {
        if(this.props.camera !==nextProps.camera){
            this.camera = nextProps.camera
            this.props.updateScene(this.camera)
        }
        if(this.props.aspect!==nextProps.aspect){
            this.camera.aspect=nextProps.aspect
            this.camera.updateProjectionMatrix();
        }
        if(this.props.copyRotation !== nextProps.copyRotation){
            this.addCallback(this.props.rendererName,1,this.copyRotation)
        }
        if(nextProps.lookAt && this.props.lookAt !== nextProps.lookAt){
            this.addCallback(this.props.rendererName,0,this.lookAt)
        }
        return true;
    }

    render() {
        return null
    }
}

function mapStatetoProps(state, props) {
    return {
        camera : props.name && 
                 state.CameraReducer.cameras &&
                 state.CameraReducer.cameras[props.name] ? state.CameraReducer.cameras[props.name] : null,
    }
}
export default connect(mapStatetoProps, { addCamera,addCallback })(Camera)