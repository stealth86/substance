import React, { Component } from 'react'
import { connect } from 'react-redux'
import TitleBar from '../Common/TitleBar'
import MaterialItem from './MaterialItem'
import { NON_DRAGGABLE } from '../../Constants'
import './MaterialSelector.css'

class MaterialSelector extends Component {


  render() {
    return (
      <>
        <TitleBar name="Material">
        </TitleBar>
        <div className={NON_DRAGGABLE + " materialSelector"}>
          <ul className="list-group list-group-flush p-2">
            {this.props.activeMesh &&
              [].concat(this.props.activeMesh.material).map(material =>
                <MaterialItem key={material.name} materialName={material.name}></MaterialItem>
              )}
          </ul>
        </div>
      </>
    );
  }
}

function mapStatetoProps(state, props) {
  return {
    activeMesh: state.MeshReducer.activeMesh
  }
}

export default connect(mapStatetoProps, {})(MaterialSelector)
