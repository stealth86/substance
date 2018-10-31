import React, { Component } from 'react'
import { connect } from 'react-redux'
import TitleBar from './TitleBar'
import Thumbnail from './Thumbnail'
import SplitPane from 'react-split-pane'
import { NON_DRAGGABLE, CONTENT_MENU, IMAGE_TYPES, OBJECT_TYPES } from '../Constants'
import { loadObject, loadTexture } from '../actions/LoaderAction';
import { ContextMenuTrigger } from "react-contextmenu";
import DropZone from 'react-dropzone';
import './ContentBrowser.css';


class ContentBrowser extends Component {
    constructor(props) {
        super(props);
        this.loadObject = this.props.loadObject.bind(this);
        this.loadTexture = this.props.loadTexture.bind(this);
        this.load= this.load.bind(this);
        this.onDrop=this.onDrop.bind(this);
    }

    load(){
        this.dropZone.open()
    }

    onDrop(accepted,rejected){
        accepted.forEach(file => {
            var fileType= (/[.]/.exec(file.name)) ? /[^.]+$/.exec(file.name) : undefined;
            switch (true){
                case IMAGE_TYPES.includes(fileType):
                this.loadTexture(file)
                break;
                case OBJECT_TYPES.includes(fileType):
                this.loadObject(file)
                break;
                default:
                break;
            }
        });
    }

    render() {
        return (
            <>
                <TitleBar name="Content">
                    <button type="button" onClick={this.load}>Load</button>
                </TitleBar>
                <SplitPane className={NON_DRAGGABLE} split="vertical" defaultSize={300}>
                    <div className="testDiv"></div>
                    <DropZone ref={el => this.dropZone=el}
                              accept={IMAGE_TYPES+OBJECT_TYPES}
                              className="dropzone" 
                              disableClick={true}
                              onDrop={this.onDrop}>
                        <ContextMenuTrigger id={CONTENT_MENU}>
                            <div className="fileList">
                                <Thumbnail id="tnail">
                                </Thumbnail>
                                <Thumbnail id="tnail">
                                </Thumbnail>
                                <Thumbnail id="tnail">
                                </Thumbnail>
                            </div>
                        </ContextMenuTrigger>
                    </DropZone>
                </SplitPane>
            </>
        )
    }
}

const mapStateToProps = (state) => ({
})

export default connect(mapStateToProps, { loadObject, loadTexture })(ContentBrowser)
