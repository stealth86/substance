import React, { Component } from 'react'
import { connect } from 'react-redux'
import img from '../../images/Eric_256.png'
import { NavLink, withRouter } from 'react-router-dom'
import { DragSource, DropTarget } from 'react-dnd'
import './Layer.css'
import { ITEM_TYPES } from '../../Constants';

const cardSource = {

    isDragging(props, monitor) {
        return monitor.getItem().id === props.id;
    },

    beginDrag(props, monitor, component) {
        const item = { id: props.order };
        return item;
    },

};

const collectSource = (connect, monitor) => {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    };
}

const collectTarget = (connect) => {
    return {
        connectDropTarget: connect.dropTarget()
    }
}

const cardTarget = {
    hover(props, monitor, component) {
        console.log(props.order)
        console.log(monitor.getItem().id)
    }
};

export class Layer extends Component {
    render() {
        const { connectDragSource, connectDropTarget } = this.props;
        return (
            connectDropTarget(connectDragSource(
                <li ref={el=>this.layerRef=el} className="layerType py-1">
                    <div className="layerContent w-100">
                        <div className="closeSelectLayer">
                            <button className={`fas fa-times`}></button>
                            <input type="checkbox" value="" />
                        </div>
                        <NavLink className="layerLink d-inline-block" to={`/materials/${this.props.material}/layers/${this.props.order}`}>
                            <div className="layerPreviewImage">
                                <img className="card-img-top" src={img} alt={`some text`}></img>                                
                            </div>
                            <div>{this.props.order}</div>
                        </NavLink>
                    </div>
                </li>
            )
            )
        )
    }
}

const mapStateToProps = (state, props) => ({
})

export default withRouter(connect(mapStateToProps, {})(DropTarget(ITEM_TYPES.LAYER, cardTarget, collectTarget)(DragSource(ITEM_TYPES.LAYER, cardSource, collectSource)(Layer))))