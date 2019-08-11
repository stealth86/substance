import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addMesh, updateMeshGeometry, updateMeshMaterial } from '../../actions/MeshAction';
import * as THREE from 'three-full';
import { GEOMETRY } from '../../Constants';
import StandardMaterial  from '../Material/StandardMaterial';
import Texture from '../Texture/Texture';

class Mesh extends Component {
    constructor(props) {
        super(props);
        this.addMesh = this.props.addMesh.bind(this);
        this.updateMeshGeometry = this.props.updateMeshGeometry.bind(this);
        this.updateMeshMaterial = this.props.updateMeshMaterial.bind(this);
        this.updateMeshLocal = this.updateMeshLocal.bind(this);
    }

    componentWillMount() {
        if (this.props.mesh) {
            this.mesh = this.props.mesh
            this.props.updateScene(this.mesh)
        } else {
            this.mesh = new THREE.Mesh()
            this.mesh.name = this.props.name
            this.addMesh(this.props.name, this.mesh)
        }
    }

    shouldComponentUpdate(newProps) {
        if(this.props.mesh!==newProps.mesh){
            this.mesh=newProps.mesh
//        }
  //      if (this.mesh)
            this.props.updateScene(this.mesh)
        }
            return true;
    }

    updateMeshLocal(type, item, index) {
        if (this.mesh) {
            if (type === GEOMETRY) this.updateMeshGeometry(this.mesh, item)
            else this.updateMeshMaterial(this.mesh, item, index)
        }
    }

    render() {
        const { children } = this.props;

        const childrenWithProps = React.Children.map(children, child =>
            React.cloneElement(child, { updateMesh: this.updateMeshLocal })
        );
        return (
            <>
                {childrenWithProps}
                {this.props.mesh && this.props.generateMaterial &&
                [].concat(this.props.mesh.material).map((material,index)=>
                <StandardMaterial key={material.name} name={material.name} id={this.props.mesh.material.length >1 ?index:undefined} updateMesh={this.updateMeshLocal}>
                    <Texture channel="envMap" name="envTexture"></Texture>
                </StandardMaterial>)}
            </>
        )
    }
}

function mapStatetoProps(state, props) {
    return {
        mesh: props.name &&
            state.MeshReducer.meshes &&
            state.MeshReducer.meshes[props.name].mesh ? state.MeshReducer.meshes[props.name].mesh : null
    }
}
export default connect(mapStatetoProps, { addMesh, updateMeshMaterial, updateMeshGeometry })(Mesh)