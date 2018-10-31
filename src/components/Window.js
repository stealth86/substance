import React, { Component } from 'react';
import { connect } from 'react-redux';
import RendererContainer from './RendererContainer';
import ContentBrowser from './ContentBrowser';
import './Window.css';
import { Responsive as ResponsiveGridLayout } from 'react-grid-layout';
import { updateLayout, initializeLayout } from '../actions/WindowAction';
import { NON_DRAGGABLE, RENDERER, CONTENT } from '../Constants';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { ContextMenuContainer } from './ContextMenuContainer';

class Window extends Component {
    constructor(props) {
        super(props);
        this.state = {
            layout: [
                { i: RENDERER, x: 0, y: 0, w: 4, h: 14 },
                { i: CONTENT, x: 0, y: 14, w: 8, h: 13.5 },
            ]
        }
        this.updateLayout = this.props.updateLayout.bind(this);
        this.initializeLayout = this.props.initializeLayout.bind(this);
        this.initializeLayout(this.state.layout);
    }

    render() {
        return (
            <>
                <ResponsiveGridLayout className="layout"
                    compactType="horizontal"
                    mounted={false}
                    layouts={{ lg: this.state.layout }}
                    breakpoints={{ lg: 1200 }}
                    onResize={(layout, oldItem, newIem, placeholder) => this.updateLayout(layout, oldItem, newIem, placeholder)}
                    onResizeStop={(layout, oldItem, newItem) => this.updateLayout(layout, oldItem, newItem)}
                    margin={[this.props.marginX, this.props.marginY]}
                    cols={{ lg: this.props.gridColumns }}
                    rowHeight={this.props.rowHeight}
                    width={this.props.containerWidth}
                    draggableCancel={"." + NON_DRAGGABLE}>
                    <div key={RENDERER}>
                        <RendererContainer envTexture={this.state.envTexture}></RendererContainer>
                    </div>
                    <div key={CONTENT} className="bb">
                        <ContentBrowser></ContentBrowser>
                    </div>
                </ResponsiveGridLayout>
                <ContextMenuContainer></ContextMenuContainer>
            </>
        )
    }
}

function mapStatetoProps(state) {
    return {
        meshes: state.MeshReducer.meshes,
        cameras: state.CameraReducer.cameras,
        materials: state.MaterialReducer.materials,
        objects: state.LoaderReducer.objects,
        scenes: state.SceneReducer.scenes,
        units: state.WindowReducer.units,
        marginX: state.WindowReducer.marginX,
        marginY: state.WindowReducer.marginY,
        gridColumns: state.WindowReducer.gridColumns,
        rowHeight: state.WindowReducer.rowHeight,
        containerWidth: state.WindowReducer.containerWidth
    }
}

export default connect(mapStatetoProps, {
    initializeLayout,
    updateLayout
})(DragDropContext(HTML5Backend)(Window))