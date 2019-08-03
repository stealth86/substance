import React, { Component } from 'react';
import './ColorSwatch.css';
import {switchDisplay} from '../../actions/ColorSwatchAction';
import { connect } from 'react-redux';

class ColorSwatch extends Component {
    render() {
        return (
            <div className="py-1">
                <label className={`pickerName text-white-50`}>Color</label>
                <div className="colorPicker" style={{backgroundColor:`${this.props.color}`}}
                 onClick={(e)=>{
                     this.props.switchDisplay({display:true,posX:e.clientX,posY:e.clientY})
                     }}>                    
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, props) => ({
})

export default connect(mapStateToProps, {switchDisplay })(ColorSwatch);