import React, { Component } from 'react';
import { connect } from 'react-redux';
import { MESH_BASIC_MATERIAL, MATERIAL } from '../Constants';
import * as THREE from 'three-full';
import { addMaterial, updateMaterial } from '../actions/MaterialAction';

class Material extends Component {
    constructor(props) {
        super(props);
        //console.log(this.props)
        this.addMaterial = this.props.addMaterial.bind(this);
        this.updateMaterial = this.props.updateMaterial.bind(this);
        this.updateMaterialLocal = this.updateMaterialLocal.bind(this);
    }

    componentDidMount() {
        if (this.props.type === MESH_BASIC_MATERIAL) {
            this.material = new THREE.MeshBasicMaterial()
            this.material.side = THREE.BackSide
            this.material.name = this.props.name
            this.addMaterial(this.material.name, this.material)
        }
    }

    shouldComponentUpdate(newProps) {
        if (this.material)
            this.props.updateMesh(MATERIAL, this.material)
        return true;
    }

    updateMaterialLocal(channel, texture) {
        if (this.material) {
            this.updateMaterial(this.material, {[channel]:texture})
        }
    }

    render() {
        const { children } = this.props;

        const childrenWithProps = React.Children.map(children, child =>
            React.cloneElement(child, { updateMaterial: this.updateMaterialLocal })
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
        material: props.name &&
            state.MaterialReducer.materials &&
            state.MaterialReducer.materials[props.name].material ? state.MaterialReducer.materials[props.name].material : null
    }
}
export default connect(mapStatetoProps, { addMaterial, updateMaterial })(Material)