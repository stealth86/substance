import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as THREE from "three-full";
import { addScene,updateScene} from '../actions/SceneAction';

class Scene extends Component {
    constructor(props){
        super(props);
        this.addScene=this.props.addScene.bind(this);
        this.updateScene=this.props.updateScene.bind(this);
        this.updateSceneLocal=this.updateSceneLocal.bind(this);
    }
    componentDidMount(){
        this.scene = new THREE.Scene()
        this.scene.name=this.props.name
        //scene.background = new THREE.Color(0x004400)
        this.addScene(this.scene.name,this.scene)
        //console.log("did mount "+this.props.name)
        //console.log(this.props)
        //console.log(scene)
    }

    shouldComponentUpdate(nextProps){
        //console.log("should update")
        //console.log(this.props)
        //console.log(nextProps)
        return true;
    }
    componentDidUpdate(){
        //console.log("component updated")
        //console.log(this.props)
    }

    updateSceneLocal(object){
        if(this.scene){
            this.updateScene(this.scene, object)
        }
    }

    render(){
        const { children } = this.props;

        const childrenWithProps = React.Children.map(children, child =>
          React.cloneElement(child,{ updateScene:this.updateSceneLocal})
        );
        return (
            <>
            {childrenWithProps}
            </>
        )
    }
}

function mapStatetoProps(state,props){
    return{
        scene: props.name && 
               state.SceneReducer.scenes &&
               state.SceneReducer.scenes[props.name] ? state.SceneReducer.scenes[props.name] : null
    }
}
export default connect(mapStatetoProps,{addScene,updateScene})(Scene)