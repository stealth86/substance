import React, { Component } from 'react';
import './Slider.css';

class Slider extends Component {
    render() {
        return (
            <>
            <label className={`sliderName text-white-50`}>{this.props.name}</label>
            <label className="float-right">{this.props.value}</label>
            <input type="range" className={`rangeClass`} 
            min={this.props.min} 
            max={this.props.max} 
            value={this.props.value} 
            step={this.props.step}
            onChange={this.props.onChange}></input>
            </>
        );
    }
}

export default Slider;