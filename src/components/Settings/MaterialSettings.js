import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setActiveMaterial } from '../../actions/MaterialAction'

export class MaterialSettings extends Component {
  constructor(props) {
    super(props);
    this.setActiveMaterial = this.props.setActiveMaterial.bind(this);
  }

  componentDidMount(){
      this.setActiveMaterial(this.props.match.params.materialName)
  }

  shouldComponentUpdate(nextProps) {
    if (this.props.match.params.materialName !== nextProps.match.params.materialName)
      this.setActiveMaterial(nextProps.match.params.materialName)
    return true;
  }

  render() {
    return (
      <div>
        Material {this.props.match.params.materialName}
      </div>
    )
  }
}

const mapStateToProps = (state,props) => ({

})


export default connect(mapStateToProps, { setActiveMaterial })(MaterialSettings)
