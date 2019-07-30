import React, { Component } from 'react'
import { connect } from 'react-redux'
import TitleBar from '../Common/TitleBar'
import { NON_DRAGGABLE } from '../../Constants'
import {addLayer} from '../../actions/LayerAction'
import Layer from './Layer'
import './LayersContainer.css'

export class LayersContainer extends Component {
    constructor(props){
        super(props);
        this.addLayer=this.addLayer.bind(this);
    }

    addLayer(){
        var layer={material:this.props.activeMaterial.name,layer:"layer"}
        this.props.addLayer(layer)
    }

    render() {
        return (
            <>
                <TitleBar name="Layers">
                    <button className={`fas fa-plus ${this.props.activeMaterial?"visible":"invisible"}`} onClick={this.addLayer}></button>
                </TitleBar>
                <div className={NON_DRAGGABLE + " layers"}>
                    {Object.keys(this.props.activeMaterial && this.props.layers[this.props.activeMaterial.name] ? this.props.layers[this.props.activeMaterial.name]:{}).map(key=>{
                        return (<Layer key={key} order={key} material={this.props.activeMaterial.name}></Layer>)
                    })}
                </div>
            </>
        )
    }
}

const mapStateToProps = (state) => ({
    activeMesh : state.MeshReducer.activeMesh,
    activeMaterial : state.MaterialReducer.activeMaterial,
    layers : state.LayerReducer.layers
})

export default connect(mapStateToProps, {addLayer})(LayersContainer)