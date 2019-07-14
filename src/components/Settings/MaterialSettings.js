import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setActiveMaterial } from '../../actions/MaterialAction'

export class MaterialSettings extends Component {
  constructor(props) {
    super(props);
    this.setActiveMaterial = this.props.setActiveMaterial.bind(this);
  }

  componentDidMount(){
      this.setActiveMaterial(this.props.match.params.materialName)
  }

  shouldComponentUpdate(nextProps) {
    if(this.props.activeMaterial !==nextProps.activeMaterial)
      console.log(nextProps.activeMaterial)
    if (this.props.match.params.materialName !== nextProps.match.params.materialName)
      this.setActiveMaterial(nextProps.match.params.materialName)
    return true;
  }

  render() {
    return (
      <div>
        Material {this.props.match.params.materialName}
        <ul>
          <li>Roughness : {this.props.activeMaterial && this.props.activeMaterial.roughness}</li>
          <li>Metalness : </li>
          <li>EnvMap : </li>
        </ul>
      </div>
    )
  }
}

const mapStateToProps = (state,props) => ({
    activeMaterial : state.MaterialReducer.activeMaterial,
})


export default connect(mapStateToProps, { setActiveMaterial })(MaterialSettings)
