import React, { Component } from 'react';
import {connect} from 'react-redux';
import Scene from './Scene';
import Renderer from './Renderer';

class Window extends Component{
    render(){
        return(
            <Renderer width={420} height={420} pixelRatio={window.devicePixelRatio}>
            <Scene>
                </Scene>
              </Renderer>
        )
    }
}

function mapStatetoProps(state){
    return{

    }
}

export default connect(mapStatetoProps,{})(Window)