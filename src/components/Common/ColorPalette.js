import React, { Component } from 'react';
import {SketchPicker} from 'react-color';
import './ColorPalette.css';

class ColorPalette extends Component {
    render() {
        return (
            <SketchPicker className="sketcher"/>
        );
    }
}

export default ColorPalette;