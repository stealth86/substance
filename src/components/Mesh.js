import React, { Component } from 'react';
import { connect } from 'react-redux';
import { MESH, GEOMETRY } from '../Constants';
import {addMesh, updateGeometry, updateMaterial} from '../actions/MeshAction';
import * as THREE from 'three-full';

class Mesh extends Component {
    constructor(props){
        super(props);
        this.addMesh = this.props.addMesh.bind(this);
        this.updateGeometry = this.props.updateGeometry.bind(this);
        this.updateMaterial = this.props.updateMaterial.bind(this);
        this.updateMeshLocal = this.updateMeshLocal.bind(this);
    }
    componentDidMount(){
        var Mesh = new THREE.Mesh()
        Mesh.name=this.props.name+MESH
        this.addMesh(this.props.name+MESH,Mesh)
    }

    shouldComponentUpdate(newProps){
        if(newProps.mesh !== this.props.mesh) this.props.updateScene(newProps.mesh)
        return true;
    }

    componentDidUpdate(oldProps){
        //console.log(this.props)
    }

    updateMeshLocal(type,item){
        if(type === GEOMETRY) this.updateGeometry(this.props.mesh,item)
        else this.updateMaterial(this.props.mesh,item)
    }

    render(){
        const { children } = this.props;

        const childrenWithProps = React.Children.map(children, child =>
          React.cloneElement(child,{ updateMesh:this.updateMeshLocal, name:this.props.name+MESH})
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
        mesh : state.MeshReducer.meshes ? state.MeshReducer.meshes[props.name+MESH] : null        
    }
}
export default connect(mapStatetoProps,{addMesh,updateMaterial,updateGeometry})(Mesh)