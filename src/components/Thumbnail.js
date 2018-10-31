import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DragSource } from 'react-dnd';
import './Thumbnail.css';
import eric from '../Eric_256.png';
import { ContextMenuTrigger } from "react-contextmenu";

const cardSource = {

    isDragging(props, monitor) {
        return monitor.getItem().id === props.id;
    },

    beginDrag(props, monitor, component) {
        const item = { id: props.id };
        return item;
    },

};

function collect(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    };
}

function mapStatetoProps(state, props) {
    return {

    }
}
class Thumbnail extends Component {
    render() {
        const { connectDragSource } = this.props;

        return (
            <div className="thumbnail">
                <ContextMenuTrigger id="abc">
                    {connectDragSource(
                        <div className="thumbnailImage border">
                            <img className="card-img-top" src={eric} alt="xyz"></img>
                        </div>
                    )}
                    <div className="fileName">
                        <div className="fileText">asdasda_sdasdasdas_dasdasdasd</div>
                        <span className="tooltiptext">asdasda sdasdasdas dasdasdasd</span>
                    </div>
                </ContextMenuTrigger>
            </div>)
    }
}
export default connect(mapStatetoProps, {})(DragSource('CARD', cardSource, collect)(Thumbnail))