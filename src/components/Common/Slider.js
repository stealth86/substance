import React, { Component } from 'react';
import './Slider.css';

class Slider extends Component {
    render() {
        return (
            <>
            <label className={`sliderName text-white-50`}>Example range</label>
            <input type="range" className={`rangeClass`} ></input>
            </>
        );
    }
}

export default Slider;