import React, { Component } from 'react';
import './ColorSwatch.css';
import {switchDisplay} from '../../actions/ColorSwatchAction';
import { connect } from 'react-redux';

class ColorSwatch extends Component {

    shouldComponentUpdate(nextProps){
        console.log(this.props);
        console.log(nextProps)
        if(this.props.swatchColor!==nextProps.swatchColor && this.props.color !==this.props.swatchColor){
            this.props.onColorChange(nextProps.swatchColor);
        }
        return true;
    }

    render() {
        return (
            <div className="py-1">
                <label className={`pickerName text-white-50`}>Color</label>
                <div className="colorPicker" style={{backgroundColor:`${this.props.color}`}}
                 onClick={(e)=>{ 
                     console.log(this.props)                   
                     this.props.switchDisplay({display:true,posX:e.clientX,posY:e.clientY,color:this.props.color})
                     }}>                    
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    swatchColor : state.ColorSwatchReducer.displayPalette.color    
})

export default connect(mapStateToProps, {switchDisplay })(ColorSwatch);