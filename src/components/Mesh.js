import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addMesh, updateGeometry, updateMaterial } from '../actions/MeshAction';
import * as THREE from 'three-full';
import { GEOMETRY } from '../Constants';
import StandardMaterial  from './StandardMaterial';
import Texture from './Texture';

class Mesh extends Component {
    constructor(props) {
        super(props);
        this.addMesh = this.props.addMesh.bind(this);
        this.updateGeometry = this.props.updateGeometry.bind(this);
        this.updateMaterial = this.props.updateMaterial.bind(this);
        this.updateMeshLocal = this.updateMeshLocal.bind(this);
    }

    componentDidMount() {
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
        }
        if (this.mesh)
            this.props.updateScene(this.mesh)
        return true;
    }

    updateMeshLocal(type, item) {
        if (this.mesh) {
            if (type === GEOMETRY) this.updateGeometry(this.mesh, item)
            else this.updateMaterial(this.mesh, item)
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
                [].concat(this.props.mesh.material).map(material=>
                <StandardMaterial key={material.name} name={material.name} updateMesh={this.updateMeshLocal}>
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
export default connect(mapStatetoProps, { addMesh, updateMaterial, updateGeometry })(Mesh)