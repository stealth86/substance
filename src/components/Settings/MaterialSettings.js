import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setActiveMaterial,updateMaterial } from '../../actions/MaterialAction'

export class MaterialSettings extends Component {
  constructor(props) {
    super(props);
    this.setActiveMaterial = this.props.setActiveMaterial.bind(this);
    this.updateMaterial = this.props.updateMaterial.bind(this);
  }

  setRoughness(attr,val){
    //console.log(val)
    this.updateMaterial(this.props.activeMaterial,{[attr]:val})
  }
  componentDidMount(){
      this.setActiveMaterial(this.props.match.params.materialName)
      this.props.updateTitle(this.props.match.params.materialName)
  }

  shouldComponentUpdate(nextProps) {
    if (this.props.match.params.materialName !== nextProps.match.params.materialName)
    {
      this.setActiveMaterial(nextProps.match.params.materialName)
      this.props.updateTitle(nextProps.match.params.materialName)
    }
    return true;
  }

  render() {
    return (
      <div>
        <ul>
          <li>Roughness : <input type="number" min={0} max={1} step={0.1} defaultValue={this.props.activeMaterial && this.props.activeMaterial.roughness} onChange={(e)=>this.setRoughness("roughness",e.target.value)}></input></li>
          <li>Metalness : <input type="number" min={0} max={1} step={0.1} defaultValue={this.props.activeMaterial && this.props.activeMaterial.metalness} onChange={(e)=>this.setRoughness("metalness",e.target.value)}></input></li>
          <li>EnvMap : </li>
        </ul>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
    activeMaterial : state.MaterialReducer.activeMaterial,
})


export default connect(mapStateToProps, { setActiveMaterial,updateMaterial })(MaterialSettings)
