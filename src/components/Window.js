import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scene from './Scene';
import Renderer from './Renderer';

class Window extends Component {
    render() {
        return (
            <Renderer width={420} height={420} shadowMapEnabled={true} pixelRatio={window.devicePixelRatio}>
                <Scene name="mainScene">
                </Scene>
            </Renderer>
        )
    }
}

function mapStatetoProps(state) {
    return {

    }
}

export default connect(mapStatetoProps, {})(Window)