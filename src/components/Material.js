import { Component } from 'react';
import { connect } from 'react-redux';
import { MESH_BASIC_MATERIAL, MATERIAL } from '../Constants';
import * as THREE from 'three-full';
import { addMaterial } from '../actions/MaterialAction';

class Material extends Component {
    constructor(props){
        super(props);
        //console.log(this.props)
        this.addMaterial = this.props.addMaterial.bind(this);
    }

    componentDidMount(){
        if (this.props.type === MESH_BASIC_MATERIAL){
            var BasicMaterial = new THREE.MeshBasicMaterial()
            BasicMaterial.side = THREE.BackSide
            BasicMaterial.name = this.props.name+MATERIAL
            this.addMaterial(BasicMaterial.name,BasicMaterial)
        }
    }
    shouldComponentUpdate(newProps){
        if(newProps.material!==this.props.material) this.props.updateMesh(MATERIAL,newProps.material)
        return true;
    }
    render(){
        return null
    }
}

function mapStatetoProps(state,props){
    return{
        material : state.MaterialReducer.materials ? state.MaterialReducer.materials[props.name+MATERIAL] : null
    }
}
export default connect(mapStatetoProps,{addMaterial})(Material)