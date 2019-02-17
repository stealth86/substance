import React, { Component } from 'react'
import { connect } from 'react-redux'

export class MaterialSettings extends Component {
  render() {
    return (
      <div>
        Material {this.props.match.params.materialName}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  
})


export default connect(mapStateToProps, {})(MaterialSettings)
