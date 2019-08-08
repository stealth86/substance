import React, { Component } from 'react'
import { connect } from 'react-redux'
import img from '../../images/Eric_256.png'
import { NavLink, withRouter } from 'react-router-dom'
import './Layer.css'

export class Layer extends Component {
    render() {
        return (
            <NavLink className="layerLink w-100 d-inline-block" to={`/materials/${this.props.material}/layers/${this.props.order}`}>
                <li className="layerType py-1">
                    <div className="layerContent">
                        <div className="closeSelectLayer">
                            <button className={`fas fa-times`}></button>
                            <input type="checkbox" value="" />
                        </div>
                        <div className="layerPreviewImage">
                            <img className="card-img-top" src={img} alt={`some text`}></img>
                        </div>
                    </div>
                </li>
            </NavLink>
        )
    }
}

const mapStateToProps = (state, props) => ({
})

export default withRouter(connect(mapStateToProps, {})(Layer))