import React from 'react'
import { LayerSettings } from './LayerSettings'
import Slider from '../Common/Slider'
import Collapser from '../Common/Collapser'
import ColorSwatch from '../Common/ColorSwatch'
import { updateLayer } from '../../actions/LayerAction'
import { connect } from 'react-redux'

export class FillLayerSettings extends LayerSettings {
    constructor(props) {
        super(props);
        this.updateLayer = this.props.updateLayer.bind(this);
        this.handleRoughnessChange = this.handleRoughnessChange.bind(this);
        this.handleMetalnessChange = this.handleMetalnessChange.bind(this);
    }

    handleRoughnessChange(e) {
        var layer = this.props.layer;
        layer.roughness = e.target.value;
        this.updateLayer(this.props.match.params.layerName, { material: this.props.match.params.materialName, layer:layer})
    }

    handleMetalnessChange(e) {
        var layer = this.props.layer;
        layer.metalness = e.target.value;
        this.updateLayer(this.props.match.params.layerName, { material: this.props.match.params.materialName, layer:layer})
    }

    handleColorChange(color){
        var layer = this.props.layer;
        layer.color = color;
        this.updateLayer(this.props.match.params.layerName, { material: this.props.match.params.materialName, layer:layer})
    }

    render() {
        return (
            <Collapser name="Layer Settings">
                <ul className="list-group list-group-flush">
                    <li className={`list-group-item settingsType px-2 py-0`}>
                        <ColorSwatch color={this.props.layer.color} onColorChange={(color)=>{this.handleColorChange(color)}}/>
                    </li>
                    <li className={`list-group-item settingsType px-2 py-0`}>
                        <Slider name="Roughness" min={0} max={1} step={0.01} value={this.props.layer.roughness}
                            onChange={this.handleRoughnessChange}></Slider>
                    </li>
                    <li className={`list-group-item settingsType px-2 py-0`}>
                        <Slider name="Metalness" min={0} max={1} step={0.01} value={this.props.layer.metalness}
                            onChange={this.handleMetalnessChange}></Slider>

                    </li>
                </ul>
            </Collapser>
        )
    }
}
const mapStateToProps = (state, props) => ({
    layer: state.LayerReducer.layers[props.match.params.materialName].matLayers[props.match.params.layerName]
})

export default connect(mapStateToProps, { updateLayer })(FillLayerSettings)
