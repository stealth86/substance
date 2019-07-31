import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink, withRouter } from 'react-router-dom'
import './MaterialItem.css'

class MaterialItem extends Component {

  render() {
    return (
      <li className={`list-group-item materialType ${this.props.activeMaterial && this.props.materialName===this.props.activeMaterial.name?"materialActiveType":""}`}>
        <div className="form-check">
          <input className="materialCheck" type="checkbox" value=""/>
          <NavLink className="materialLink w-100 d-inline-block" to={"/materials/"+this.props.materialName}>{this.props.materialName}</NavLink>
        </div>
      </li>
    );
  }
}

const mapStateToProps = (state) => ({
    activeMaterial:state.MaterialReducer.activeMaterial
})

export default withRouter(connect(mapStateToProps, {})(MaterialItem))
