import React, { Component } from 'react'
import { connect } from 'react-redux'
import TitleBar from '../Common/TitleBar'
import MaterialItem from './MaterialItem'
import {NON_DRAGGABLE} from '../../Constants'
import './MaterialSelector.css'

class MaterialSelector extends Component {


  render() {
    return (
      <>
        <TitleBar name="Material">
        </TitleBar>
        <div className={NON_DRAGGABLE+" materialSelector"}>
          <MaterialItem materialName="xyz"></MaterialItem>
          <MaterialItem materialName="abc"></MaterialItem>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({

})

export default connect(mapStateToProps, {})(MaterialSelector)
