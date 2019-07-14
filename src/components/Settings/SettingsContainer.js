import React, { Component } from 'react'
import { connect } from 'react-redux'
import TitleBar from '../Common/TitleBar'
import { withRouter, Route, Redirect } from 'react-router-dom'
import MaterialSettings from './MaterialSettings'
import ViewportSettings from './ViewportSettings'
import './SettingsContainer.css'
import { NON_DRAGGABLE } from '../../Constants'

export class SettingsContainer extends Component {

    render() {
        return (
            <>
                <TitleBar name="Settings">
                </TitleBar>
                <div className={NON_DRAGGABLE + " settings"}>
                    <Route path="/material/:materialName" render={(routeProps)=>(
                        this.props.activeMesh ?
                    (<MaterialSettings {...routeProps}/>) :
                     (   <Redirect to="/"/>)
                    )
                    }/>
                    {/*component={MaterialSettings}/>*/}
                    <Route path="/viewport" component={ViewportSettings} />
                </div>
            </>
        )
    }
}

const mapStateToProps = (state) => ({
    activeMesh : state.MeshReducer.activeMesh
})

export default withRouter(connect(mapStateToProps, {})(SettingsContainer))

