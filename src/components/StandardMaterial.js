import { Material } from './Material'
import { connect } from 'react-redux'
import * as THREE from 'three-full'
import { addMaterial, updateMaterial } from '../actions/MaterialAction';

export class StandardMaterial extends Material {
    componentDidMount() {
        if (this.props.material)
            this.material = this.props.material
        else {
            this.material = new THREE.MeshStandardMaterial()
            if(this.props.side) this.material.side=this.props.side
            this.material.name = this.props.name
            this.addMaterial(this.material.name, this.material)
        }
        this.updateMaterial(this.material,{[this.channel]:this.texture})
    }
}

function mapStatetoProps(state, props) {
    return {
        material: props.name &&
            state.MaterialReducer.materials &&
            state.MaterialReducer.materials[props.name] ? state.MaterialReducer.materials[props.name].material : null
    }
}
export default connect(mapStatetoProps, { addMaterial, updateMaterial })(StandardMaterial)
