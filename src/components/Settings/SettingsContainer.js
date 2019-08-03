import React, { Component } from 'react'
import { connect } from 'react-redux'
import TitleBar from '../Common/TitleBar'
import { withRouter, Route, Redirect } from 'react-router-dom'
import MaterialSettings from './MaterialSettings'
import ViewportSettings from './ViewportSettings'
import FillLayerSettings from './FillLayerSettings'
import './SettingsContainer.css'
import { NON_DRAGGABLE, FILL_LAYER } from '../../Constants'

export class SettingsContainer extends Component {

    render() {
        return (
            <>
                <TitleBar name="Settings">
                </TitleBar>
                <div className={NON_DRAGGABLE + " settings"}>
                    <Route path="/materials/:materialName" render={(routeProps) => (
                        this.props.activeMesh ?
                            (<MaterialSettings {...routeProps} />) :
                            (<Redirect to="/" />)
                    )
                    } />
                    <Route path="/materials/:materialName/layers/:layerName" render={(routeProps) => {
                        if (this.props.activeMesh) {
                            var layer = this.props.layers[routeProps.match.params.materialName][routeProps.match.params.layerName];
                            //console.log(this.props.layers[routeProps.match.params.materialName][routeProps.match.params.layerName].roughness)
                            switch (true) {
                                case (layer.layerType === FILL_LAYER):
                                    return (
                                        <FillLayerSettings {...routeProps} />
                                    )
                                default:
                                    return (
                                        <Redirect to="/" />
                                    )
                            }
                        }else{
                            return (
                                <Redirect to="/" />
                            )
                        }
                    }
                    } />
                    {/*component={MaterialSettings}/>*/}
                    <Route path="/viewport" component={ViewportSettings} />
                </div>
            </>
        )
    }
}

const mapStateToProps = (state) => ({
    activeMesh: state.MeshReducer.activeMesh,
    layers: state.LayerReducer.layers
})

export default withRouter(connect(mapStateToProps, {})(SettingsContainer))

