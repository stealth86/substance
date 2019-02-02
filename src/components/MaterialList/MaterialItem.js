import React, { Component } from 'react'
import { connect } from 'react-redux'

class MaterialItem extends Component {


  render() {
    return (
          <div className="form-check">
            <input className="form-check-input" type="checkbox" value="" id="materialCheckBox"/>
            <label className="form-check-label" htmlFor="materialCheckBox">
              {this.props.materialName}
            </label>
          </div>
    );
  }
}

const mapStateToProps = (state) => ({

})

export default connect(mapStateToProps, {})(MaterialItem)
