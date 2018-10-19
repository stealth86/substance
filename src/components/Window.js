import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scene from './Scene';
import Camera from './Camera';
import Renderer from './Renderer';
import './Window.css';
import ReactGridLayout from 'react-grid-layout';

class Window extends Component {
    render() {
        var layout = [
            { i: 'a', x: 0, y: 0, w: 400, h: 2 },
            { i: 'b', x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4 },
            { i: 'c', x: 4, y: 0, w: 1, h: 2 }
        ];
        return (
            <ReactGridLayout className="layout" layout={layout} cols={window.innerWidth} rowHeight={window.innerHeight / 4} width={window.innerWidth}>
                <div key="a">
                    <Renderer width={400} height={window.innerHeight / 2} shadowMapEnabled={true} pixelRatio={window.devicePixelRatio}>
                        <Scene name="backgroundScene">
                            <Camera fov={75} aspect={1} near={0.1} far={10000}></Camera>
                        </Scene>
                        <Scene name="mainScene">
                            <Camera></Camera>
                        </Scene>
                    </Renderer>
                </div>
                <div key="b">b</div>
                <div key="c">c</div>
            </ReactGridLayout>
        )
    }
}

function mapStatetoProps(state) {
    return {

    }
}

export default connect(mapStatetoProps, {})(Window)