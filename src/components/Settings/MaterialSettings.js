import React, { Component } from 'react'
import { connect } from 'react-redux'
import Collapser from '../Common/Collapser'
import { setActiveMaterial,updateMaterial } from '../../actions/MaterialAction'
import './MaterialSettings.css'

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
  }

  shouldComponentUpdate(nextProps) {
   // if(this.props.activeMaterial !==nextProps.activeMaterial)
     // console.log(nextProps.activeMaterial)
    if (this.props.match.params.materialName !== nextProps.match.params.materialName)
      this.setActiveMaterial(nextProps.match.params.materialName)
    return true;
  }

  render() {
    return (
      <Collapser name="Material Settings">
        <ul className="list-group list-group-flush">
          <li className={`list-group-item settingsType px-2 py-0`}>
            Material Settings
            Material Settings
            Material Settings
            Material Settings
            Material Settings
          </li>
           {/*<li>Metalness : <input type="number" min={0} max={1} step={0.1} defaultValue={this.props.activeMaterial && this.props.activeMaterial.metalness} onChange={(e)=>this.setRoughness("metalness",e.target.value)}></input></li>
          <li>EnvMap : </li>*/}
        </ul>
      </Collapser>
    )
  }
}

const mapStateToProps = (state,props) => ({
    activeMaterial : state.MaterialReducer.activeMaterial,
})


export default connect(mapStateToProps, { setActiveMaterial,updateMaterial })(MaterialSettings)
