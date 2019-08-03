import { Component } from 'react'
import { connect } from 'react-redux'
import './LayerSettings.css'

export class LayerSettings extends Component {
  render() {
    return null;
  }
}

const mapStateToProps = (state,props) => ({
  layer: state.LayerReducer.layers[props.match.params.materialName][props.match.params.layerName]
})


export default connect(mapStateToProps, { })(LayerSettings)
