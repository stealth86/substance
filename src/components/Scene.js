import { Component } from 'react';
import { connect } from 'react-redux';
import * as THREE from "three-full";
import { addMesh,createMesh,addScene} from '../actions/SceneAction';

class Scene extends Component {
    constructor(props){
        super(props);
        this.addScene=this.props.addScene.bind(this);
    }
    componentDidMount(){
        console.log("mounted ")
        console.log(this.props)
    }

    componentWillUpdate(){
        console.log("will update")
        console.log(this.props)
    }
    componentDidUpdate(){
        console.log("component updated")
        console.log(this.props)
    }
    componentWillReceiveProps(nextProps){
        console.log(this.props)
        console.log(nextProps)
    }
    componentWillMount(){
        var scene = new THREE.Scene()
        this.addScene(this.props.name,scene)
        console.log("will mount "+this.props.name)
    }
    render(){
        return null
    }
}

function mapStatetoProps(state){
    return{
        scenes:state.SceneReducer.scenes
    }
}
export default connect(mapStatetoProps,{addMesh,createMesh,addScene})(Scene)