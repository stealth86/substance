import React, { Component } from 'react';
import {SketchPicker} from 'react-color';
import './ColorPalette.css';

class ColorPalette extends Component {
    render() {
        return (
            <div style={{height:'5px', width:'5px',background:'#fff'}}>
            {/*<SketchPicker className="sketcher"/>*/}
            </div>
        );
    }
}

export default ColorPalette;