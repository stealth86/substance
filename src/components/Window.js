import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scene from './Scene';
import Camera from './Camera';
import Renderer from './Renderer';
import SplitPane from 'react-split-pane';

class Window extends Component {
    render() {
        return (
            <SplitPane split="vertical">
                <Renderer width={420} height={420} shadowMapEnabled={true} pixelRatio={window.devicePixelRatio}>
                    <Scene name="backgroundScene">
                        <Camera fov={75} aspect={1} near={0.1} far={10000}></Camera>
                    </Scene>
                    <Scene name="mainScene">
                        <Camera></Camera>
                    </Scene>
                </Renderer>
                <div></div>
            </SplitPane>
        )
    }
}

function mapStatetoProps(state) {
    return {

    }
}

export default connect(mapStatetoProps, {})(Window)