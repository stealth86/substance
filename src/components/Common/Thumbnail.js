import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DragSource } from 'react-dnd';
import './Thumbnail.css';
import { ContextMenuTrigger } from "react-contextmenu";
import { ITEM_TYPES } from '../../Constants';

const cardSource = {

    isDragging(props, monitor) {
        return monitor.getItem().id === props.id;
    },

    beginDrag(props, monitor, component) {
        const item = { id: props.id, item:props.item, type:props.type};
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
                            <img className="card-img-top" src={this.props.previewImage} alt={this.props.text}></img>
                        </div>
                    )}
                    <div className="fileName">
                        <div className="fileText">{this.props.text}</div>
                        <span className="tooltiptext">{this.props.text}</span>
                    </div>
                </ContextMenuTrigger>
            </div>)
    }
}
export default connect(mapStatetoProps, {})(DragSource(ITEM_TYPES.RENDERER, cardSource, collect)(Thumbnail))