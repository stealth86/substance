import React, { Component } from 'react';
import './ColorPalette.css';
import {SketchPicker} from 'react-color';
import {switchDisplay, updateColor} from '../../actions/ColorSwatchAction';
import { connect } from 'react-redux';

class ColorPalette extends Component {

    constructor(props) {
        super(props);
        this.handleClickOutside = this.handleClickOutside.bind(this);
      }
    
      componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
      }
    
      componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
      }
    
      handleClickOutside(event) {
        if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
          //alert('You clicked outside of me!');
          this.props.switchDisplay({display:false,posX:0,posY:0})
        }
      }

    render() {
        return (
            <>
            { this.props.display.display ?
                (<div ref={(element)=>this.wrapperRef=element} 
                style={{top:`${this.props.display.posY}px`,left:`${this.props.display.posX}px`,position:`absolute`}}>
            <SketchPicker className="sketcher" color={ this.props.display.color } onChange={(color)=>{
                //console.log(color.hex);
                this.props.updateColor(color.hex)}}/>
            </div>) : null
            }
            </>
        );
    }
}

const mapStateToProps = (state) => ({
    display:state.ColorSwatchReducer.displayPalette
})

export default connect(mapStateToProps, {switchDisplay,updateColor})(ColorPalette);