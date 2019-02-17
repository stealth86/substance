import React, { Component } from 'react'
import { connect } from 'react-redux'
import TitleBar from '../Common/TitleBar'
import { withRouter, Route } from 'react-router-dom'
import MaterialSettings from './MaterialSettings'
import './SettingsContainer.css'
import { NON_DRAGGABLE } from '../../Constants'

export class SettingsContainer extends Component {

    render() {
        return (
            <>
                <TitleBar name="Settings">                    
                </TitleBar>                
                <div className={NON_DRAGGABLE + " settings"}>
                    <Route path="/material/:materialName" component={MaterialSettings}/>
                </div>
            </>
        )
    }
}

const mapStateToProps = (state) => ({

})

export default withRouter(connect(mapStateToProps, {})(SettingsContainer))

