import React, { Component } from 'react'
import { connect } from 'react-redux'
import './Layer.css'

export class Layer extends Component {
    render() {
        return (
            <div>
                {this.props.layer}
            </div>
        )
    }
}

const mapStateToProps = (state,props) => ({
    layer : state.LayerReducer.layers[props.material][props.order]
})

export default connect(mapStateToProps, {})(Layer)