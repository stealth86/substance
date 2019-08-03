import React, { Component } from 'react';
import { SketchPicker } from 'react-color';
import './ColorPalette.css';

class ColorPalette extends Component {
    constructor(props){
        super(props);
        this.state={
            displayPicker :false
        }
    }
    render() {
        return (
            <div className="py-1">
                <label className={`pickerName text-white-50`}>Color</label>
                <div className="colorPicker" style={{backgroundColor:`${this.props.color}`}} onClick={()=>{this.setState({displayPicker:!this.state.displayPicker})}}>                    
                </div>
                {this.state.displayPicker && (
                    <div>
                    <SketchPicker className="sketcher"/>
                    </div>
                )}
            </div>
        );
    }
}

export default ColorPalette;