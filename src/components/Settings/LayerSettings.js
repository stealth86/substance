import React, { Component } from 'react'
import { connect } from 'react-redux'
import './LayerSettings.css'

export class LayerSettings extends Component {
  render() {
    return (
      <div>
          LayerSettings
      </div>
    )
  }
}

const mapStateToProps = (state,props) => ({
})


export default connect(mapStateToProps, { })(LayerSettings)
