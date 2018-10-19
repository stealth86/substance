import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scene from './Scene';
import Renderer from './Renderer';

<<<<<<< HEAD
class Window extends Component {
    render() {
        return (
            <Renderer width={420} height={420} shadowMapEnabled={true} pixelRatio={window.devicePixelRatio}>
                <Scene name="mainScene">
=======
class Window extends Component{
    render(){
        return(
            <Renderer width={400} height={400} shadowMapEnabled={true} pixelRatio={window.devicePixelRatio}>
            <Scene>
>>>>>>> 4040f9459e5380ec25be0f2c8fe7cd058869235e
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