import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scene from './Scene';
import Camera from './Camera';
import Renderer from './Renderer';
import GridLayout from 'react-grid-layout';

class Window extends Component {
    render() {
        var layout = [
            { i: 'a', x: 0, y: 0, w: 1, h: 2 },
            { i: 'b', x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4 },
            { i: 'c', x: 4, y: 0, w: 1, h: 2 }
        ];
        return (
            <div>
                <GridLayout className="layout" layout={layout} margin={[5,5]} containerPadding={[5,5]} cols={12} rowHeight={window.innerHeight/2} width={window.innerWidth}>
                    <div key="a">
                        <Renderer width={400} height={400} shadowMapEnabled={true} pixelRatio={window.devicePixelRatio}>
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
                </GridLayout>
            </div>
        )
    }
}

function mapStatetoProps(state) {
    return {

    }
}

export default connect(mapStatetoProps, {})(Window)