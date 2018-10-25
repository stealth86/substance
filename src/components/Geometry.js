import { Component } from 'react';
import { connect } from 'react-redux';
import { SPHERE_BUFFER_GEOMETRY, GEOMETRY } from '../Constants';
import * as THREE from 'three-full';
import { addGeometry } from '../actions/GeometryAction';

class Geometry extends Component {
    constructor(props){
        super(props);
        //console.log(this.props)
        this.addGeometry = this.props.addGeometry.bind(this);
    }

    componentDidMount(){
        if (this.props.type === SPHERE_BUFFER_GEOMETRY){
            var Sphere = new THREE.SphereBufferGeometry(5000,32,32)
            Sphere.name = this.props.name+GEOMETRY
            this.addGeometry(this.props.name+GEOMETRY,Sphere)
        }
    }
    shouldComponentUpdate(newProps){
        if(newProps.geometry !== this.props.geometry) this.props.updateMesh(GEOMETRY, newProps.geometry)
        return true;
    }
    render(){
        return null
    }
}

function mapStatetoProps(state,props){
    return{
        geometry : state.GeometryReducer.geometries ? state.GeometryReducer.geometries[props.name+GEOMETRY] : null
    }
}
export default connect(mapStatetoProps,{addGeometry})(Geometry)