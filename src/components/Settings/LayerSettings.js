import React, { Component } from 'react'
import { connect } from 'react-redux'
import './LayerSettings.css'
import ColorPalette from '../Common/ColorPalette';

export class LayerSettings extends Component {
  render() {
    return (
      <div>
          <ColorPalette/>
      </div>
    )
  }
}

const mapStateToProps = (state,props) => ({
  layer: state.LayerReducer.layers[props.match.params.materialName][props.match.params.layerName]
})


export default connect(mapStateToProps, { })(LayerSettings)
