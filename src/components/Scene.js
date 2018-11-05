import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as THREE from "three-full";
import { addScene, updateScene } from '../actions/SceneAction';

class Scene extends Component {
    constructor(props) {
        super(props);
        this.addScene = this.props.addScene.bind(this);
        this.updateScene = this.props.updateScene.bind(this);
        this.updateSceneLocal = this.updateSceneLocal.bind(this);
    }
    componentDidMount() {
        if (this.props.scene) {
            this.scene = this.props.scene
        } else {
            this.scene = new THREE.Scene()
            this.scene.name = this.props.name
            this.addScene(this.scene.name, this.scene)
        }
    }

    shouldComponentUpdate(newProps){
        if(this.props.scene !==newProps.scene)
            this.scene=newProps.scene
        if(newProps.scene.name==="main"){
            var light = new THREE.AmbientLight(0x222222);
            newProps.scene.add(light);
        }
        return true;
    }

    updateSceneLocal(object) {
        if (this.scene) {
            this.updateScene(this.scene, object)
        }
    }

    render() {
        const { children } = this.props;

        const childrenWithProps = React.Children.map(children, child =>
            child ? React.cloneElement(child, { rendererName: this.props.rendererName, sceneName:this.scene?this.scene.name:null, updateScene: this.updateSceneLocal }) : null
        );
        return (
            <>
                {childrenWithProps}
            </>
        )
    }
}

function mapStatetoProps(state, props) {
    return {
        scene: props.name &&
            state.SceneReducer.scenes &&
            state.SceneReducer.scenes[props.name] ? state.SceneReducer.scenes[props.name] : null
    }
}
export default connect(mapStatetoProps, { addScene, updateScene })(Scene)