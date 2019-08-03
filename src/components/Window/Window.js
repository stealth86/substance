import React, { Component } from 'react';
import { connect } from 'react-redux';
import RendererContainer from '../RendererContainer';
import ContentBrowser from '../Content/ContentBrowser';
import './Window.css';
import { Responsive as ResponsiveGridLayout } from 'react-grid-layout';
import { updateLayout, initializeLayout } from '../../actions/WindowAction';
import { NON_DRAGGABLE, RENDERER, CONTENT } from '../../Constants';
import MaterialSelector from '../MaterialList/MaterialSelector';
import { ContextMenuContainer } from './ContextMenuContainer';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import SettingsContainer from '../Settings/SettingsContainer';
import LayersContainer from '../Layers/LayersContainer';
import ColorPalette from '../Common/ColorPalette';

class Window extends Component {
    constructor(props) {
        super(props);
        this.state = {
            layout: [
                { i: RENDERER, x: 0, y: 0, w: 4, h: 14 },
                { i: "material", x: 4, y: 0, w: 2, h: 14 },
                { i: "settings", x: 8, y: 0, w: 2, h: 14 },
                { i: "layers", x: 6, y: 0, w: 2, h: 14 },
                { i: CONTENT, x: 0, y: 14, w: 10, h: 14 },
            ]
        }
        this.updateLayout = this.props.updateLayout.bind(this);
        this.initializeLayout = this.props.initializeLayout.bind(this);
        this.initializeLayout(this.state.layout);
    }

    render() {
        return (
            <DndProvider backend={HTML5Backend}>
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
                        <RendererContainer type="CARD"></RendererContainer>
                    </div>
                    <div key={CONTENT} className="contentWindow">
                        <ContentBrowser></ContentBrowser>
                    </div>
                    <div key="material" className="contentWindow">
                        <MaterialSelector></MaterialSelector>
                    </div>
                    <div key="settings" className="contentWindow">
                        <SettingsContainer></SettingsContainer>
                    </div>
                    <div key="layers" className="contentWindow">
                        <LayersContainer></LayersContainer>
                    </div>
                 </ResponsiveGridLayout>
                <ContextMenuContainer></ContextMenuContainer>
                <ColorPalette></ColorPalette>
            </DndProvider>
        )
    }
}

function mapStatetoProps(state) {
    return {
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
})(Window)