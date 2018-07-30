import { Component } from 'react';
import { connect } from 'react-redux';
import { addMesh,createMesh} from '../actions/SceneAction';
import {FBXLoader} from '../utils/Loaders/FBXLoader';
import rock from './rock1.fbx';

class Scene extends Component {
    constructor(props){
        super(props);
        this.addMesh = this.props.addMesh.bind(this);
        this.createMesh = this.props.createMesh.bind(this);
    }
    componentDidMount(){
        console.log("mounted")
        var loader=new FBXLoader();
        loader.load(rock, function ( object ) {
            console.log(object)
            this.props.scene.add( object );
        } );
        //this.createMesh();
        //this.addMesh();
    }
    render(){
        return null
    }
}

function mapStatetoProps(state){
    return{
        scene:state.SceneReducer.scene
    }
}
export default connect(mapStatetoProps,{addMesh,createMesh})(Scene)