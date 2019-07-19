import React, { Component } from 'react'
import { connect } from 'react-redux'
import TitleBar from '../Common/TitleBar'
import { withRouter, Route, Redirect } from 'react-router-dom'
import MaterialSettings from './MaterialSettings'
import ViewportSettings from './ViewportSettings'
import './SettingsContainer.css'
import { NON_DRAGGABLE } from '../../Constants'

export class SettingsContainer extends Component {
    constructor(props){
        super(props);
        this.updateTitle=this.updateTitle.bind(this);
        this.state={
            title:"Settings - "
        }
    }

    updateTitle(name){
        this.setState({title:"Settings - "+name})
    }

    render() {
        return (
            <>
                <TitleBar name={this.state.title}>
                </TitleBar>
                <div className={NON_DRAGGABLE + " settings"}>
                    <Route path="/materials/:materialName" render={(routeProps)=>(
                        this.props.activeMesh ?
                    (<MaterialSettings {...routeProps} updateTitle={this.updateTitle}/>) :
                     (   <Redirect to="/"/>)
                    )
                    }/>
                    <Route path="/viewport" render={(routeProps)=>(
                    <ViewportSettings {...routeProps} updateTitle={this.updateTitle}/>
                    ) }/>
                </div>
            </>
        )
    }
}

const mapStateToProps = (state) => ({
    activeMesh : state.MeshReducer.activeMesh
})

export default withRouter(connect(mapStateToProps, {})(SettingsContainer))

