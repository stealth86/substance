import React from 'react'
import {LayerSettings} from './LayerSettings';
import Slider from '../Common/Slider'
import Collapser from '../Common/Collapser'
import { connect } from 'react-redux'

export class FillLayerSettings extends LayerSettings {
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }
    
    handleChange(value){
        console.log("Changed")
    }
    render(){
        return(
            <Collapser name="Layer Settings">
                <Slider name="Roughness" min={0} max={1} step={0.01} value={this.props.layer.roughness}
                onChange={this.handleChange}></Slider>
            </Collapser>
        )
    }
}
const mapStateToProps = (state,props) => ({
    layer: state.LayerReducer.layers[props.match.params.materialName][props.match.params.layerName]
})

export default connect(mapStateToProps, { })(FillLayerSettings)
