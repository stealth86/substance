import { Component } from 'react';
import { connect } from 'react-redux';
import * as THREE from "three-full";
import { addCamera } from '../actions/CameraAction';
import { DEFAULT_FOV, DEFAULT_ASPECT, DEFAULT_NEAR, DEFAULT_FAR } from '../Constants';

class Camera extends Component {
    constructor(props) {
        super(props);
        this.addCamera = this.props.addCamera.bind(this);
    }
    componentDidMount() {
        var camera = new THREE.PerspectiveCamera(this.props.fov ? this.props.fov : DEFAULT_FOV , 
                                                 this.props.aspect ? this.props.aspect : DEFAULT_ASPECT, 
                                                 this.props.near ? this.props.near : DEFAULT_NEAR, 
                                                 this.props.far ? this.props.far : DEFAULT_FAR)
        camera.name = this.props.name
        this.addCamera(this.props.name, camera)
        console.log("did mount " + this.props.name)
        console.log(this.props)
    }

    shouldComponentUpdate(nextProps) {
        console.log("should update")
        console.log(this.props)
        console.log(nextProps)
        return true;
    }
    componentDidUpdate() {
        console.log("component updated")
        console.log(this.props)
    }
    render() {
        return null
    }
}

function mapStatetoProps(state, props) {
    return {
        camera: state.CameraReducer.cameras ? state.CameraReducer.cameras[props.name] : null
    }
}
export default connect(mapStatetoProps, { addCamera })(Camera)