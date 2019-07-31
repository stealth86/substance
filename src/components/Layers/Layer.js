import React, { Component } from 'react'
import { connect } from 'react-redux'
import img from '../../images/Eric_256.png'
import { NavLink, withRouter } from 'react-router-dom'
import './Layer.css'

export class Layer extends Component {
    render() {
        return (
            <NavLink className="materialLink w-100 d-inline-block" to={`/materials/${this.props.material}/layers/${this.props.order}`}>
                <li className="layerType">
                    <div className="layerPreviewImage">
                        <img className="card-img-top" src={img} alt={`some text`}></img>
                    </div>
                </li>
            </NavLink>
        )
    }
}

const mapStateToProps = (state, props) => ({
    layer: state.LayerReducer.layers[props.material][props.order]
})

export default withRouter(connect(mapStateToProps, {})(Layer))