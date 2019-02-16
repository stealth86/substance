import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setActiveMaterial } from '../../actions/MaterialAction'
import { Link } from 'react-router-dom'
import './MaterialItem.css'

class MaterialItem extends Component {
  constructor(props){
    super(props);
    this.updateContents=this.updateContents.bind(this);
    this.setActiveMaterial=this.props.setActiveMaterial.bind(this);
  }

  updateContents(name){
    //this.setState({active:name});
    this.setActiveMaterial(name);
  }

  render() {
    return (
      <li className={`list-group-item materialType text-white50 ${this.props.activeMaterial && this.props.materialName===this.props.activeMaterial.name?"activeType":""}`}>
        <div className="form-check">
          <input className="form-check-input" type="checkbox" value=""/>
          <label className="form-check-label" onClick={()=>this.updateContents(this.props.materialName)}>
            {this.props.materialName}
          </label>
          <Link to={"/material/"+this.props.materialName}>{this.props.materialName}</Link>
        </div>
      </li>
    );
  }
}

const mapStateToProps = (state) => ({
    activeMaterial:state.MaterialReducer.activeMaterial
})

export default connect(mapStateToProps, {setActiveMaterial})(MaterialItem)
