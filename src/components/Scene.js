import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as THREE from "three-full";
import { addMesh,createMesh,addScene} from '../actions/SceneAction';
import { CAMERA } from '../Constants';

class Scene extends Component {
    constructor(props){
        super(props);
        this.addScene=this.props.addScene.bind(this);       
    }
    componentDidMount(){
        var scene = new THREE.Scene()
        scene.name=this.props.name
        scene.background = new THREE.Color(0x004400)
        this.addScene(this.props.name,scene)
        console.log("did mount "+this.props.name)
        console.log(this.props)
    }

    shouldComponentUpdate(nextProps){
        console.log("should update")
        console.log(this.props)
        console.log(nextProps)
        if(nextProps.camera) nextProps.scene.add(nextProps.camera) 
        return true;
    }
    componentDidUpdate(){
        console.log("component updated")
        console.log(this.props)
    }
    render(){
        const { children } = this.props;

        const childrenWithProps = React.Children.map(children, child =>
          React.cloneElement(child,{ name:this.props.name+CAMERA})
        );
        return (
            <div>
            {childrenWithProps}
            </div>
        )
    }
}

function mapStatetoProps(state,props){
    return{
        scene:state.SceneReducer.scenes ? state.SceneReducer.scenes[props.name] : null,
        camera:state.CameraReducer.cameras ? state.CameraReducer.cameras[props.name+CAMERA] : null
    }
}
export default connect(mapStatetoProps,{addMesh,createMesh,addScene})(Scene)