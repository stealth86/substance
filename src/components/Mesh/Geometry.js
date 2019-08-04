import { Component } from 'react';
import { connect } from 'react-redux';
import { SPHERE_BUFFER_GEOMETRY ,GEOMETRY} from '../../Constants';
import * as THREE from 'three-full';
import { addGeometry } from '../../actions/GeometryAction';

class Geometry extends Component {
    constructor(props){
        super(props);
        //console.log(this.props)
        this.addGeometry = this.props.addGeometry.bind(this);
    }

    componentDidMount(){
        if (this.props.type === SPHERE_BUFFER_GEOMETRY){
            this.geometry = new THREE.SphereBufferGeometry(5000,32,32)
            this.geometry.name = this.props.name
            this.addGeometry(this.geometry.name,this.geometry)
            //this.props.updateMesh(GEOMETRY, this.geometry)
        }
    }
    shouldComponentUpdate(newProps){        
        if(newProps.geometry !== this.props.geometry)
        {
            this.geometry=newProps.geometry 
        this.props.updateMesh(GEOMETRY, newProps.geometry)
        }
        return true;
    }
    render(){
        return null
    }
}

function mapStatetoProps(state,props){
    return{
        geometry : props.name && 
                   state.GeometryReducer.geometries &&
                   state.GeometryReducer.geometries[props.name] ? state.GeometryReducer.geometries[props.name] : null
    }
}
export default connect(mapStatetoProps,{addGeometry})(Geometry)