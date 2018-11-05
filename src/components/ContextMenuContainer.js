import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ContextMenu, MenuItem } from "react-contextmenu"
import {CONTENT_MENU} from '../Constants'
import './ContextMenuContainer.css'

export class ContextMenuContainer extends Component {
    render() {
        return (
            <>
                <ContextMenu id={CONTENT_MENU}>
                    <MenuItem data={{ foo: 'bar' }} >
                        <div>
                            Menu Item 1
                        </div>
                    </MenuItem>
                    <MenuItem data={{ foo: 'bar' }} >
                        ContextMenu Item 2
                                    </MenuItem>
                    <MenuItem divider />
                    <MenuItem data={{ foo: 'bar' }} >
                        ContextMenu Item 3
                                    </MenuItem>
                </ContextMenu>
            </>
        )
    }
}

const mapStateToProps = (state) => ({

})

export default connect(mapStateToProps, {})(ContextMenuContainer)
