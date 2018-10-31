import React, { Component } from 'react'
import { connect } from 'react-redux'
import TitleBar from './TitleBar'
import Thumbnail from './Thumbnail'
import SplitPane from 'react-split-pane'
import {NON_DRAGGABLE} from '../Constants'
import { loadObject, loadTexture } from '../actions/LoaderAction';
import { ContextMenuTrigger } from "react-contextmenu";


class ContentBrowser extends Component {
    constructor(props){
        super(props);
        this.loadObject = this.props.loadObject.bind(this);
        this.loadTexture = this.props.loadTexture.bind(this);
    }
    uploadTexture() {
        this.setState({ envTexture: this.selectfile1.files[0].name.replace(/\..+$/, '') })
        this.loadTexture(this.selectfile1.files[0])
    }
    uploadFBX() {
        this.loadObject(this.selectfile.files[0])
    }
    render() {
        return (
            <>
                <TitleBar name="Content">
                    <input type="file" ref={el => this.selectfile = el} onChange={() => this.uploadFBX()}></input>
                    <input type="file" ref={el => this.selectfile1 = el} onChange={() => this.uploadTexture()}></input>
                </TitleBar>
                <SplitPane className={NON_DRAGGABLE} split="vertical" defaultSize={300}>
                    <div className="testDiv"></div>
                        <ContextMenuTrigger id="xyz">
                            <div className="fileList">
                                <Thumbnail id="tnail">
                                </Thumbnail>
                                <Thumbnail id="tnail">
                                </Thumbnail>
                                <Thumbnail id="tnail">
                                </Thumbnail>
                                <Thumbnail id="tnail">
                                </Thumbnail>
                            </div>
                        </ContextMenuTrigger>
                </SplitPane>
            </>
        )
    }
}

const mapStateToProps = (state) => ({
})

export default connect(mapStateToProps, {loadObject,loadTexture})(ContentBrowser)
