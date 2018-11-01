import React, { Component } from 'react'
import { connect } from 'react-redux'
import TitleBar from './TitleBar'
import ContentList from './ContentList'
import Thumbnail from './Thumbnail'
import SplitPane from 'react-split-pane'
import { NON_DRAGGABLE, CONTENT_MENU, IMAGE_TYPES, OBJECT_TYPES } from '../Constants'
import { loadObject, loadTexture } from '../actions/LoaderAction';
import { ContextMenuTrigger } from "react-contextmenu";
import { NativeTypes } from 'react-dnd-html5-backend'
import { DropTarget } from 'react-dnd';
import './ContentBrowser.css';


class ContentBrowser extends Component {
    constructor(props) {
        super(props);
        this.loadObject = this.props.loadObject.bind(this);
        this.loadTexture = this.props.loadTexture.bind(this);
        this.load = this.load.bind(this);
        this.loadContentWithTags = this.loadContentWithTags.bind(this);
        this.onDrop = this.onDrop.bind(this);
        this.onFileSelect = this.onFileSelect.bind(this);
        this.state = {
            tagString: ""
        }
    }

    load() {
        this.dropZone.click()
    }

    loadContentWithTags(tags) {
        var tagString = ""
        tags.forEach(tag => tagString = tagString + tag + ",")
        this.setState({ tagString: tagString })
    }

    onFileSelect() {
        //console.log(this.dropZone.files)
        this.onDrop(this.dropZone.files)
    }

    onDrop(accepted) {
        accepted = Array.from(accepted)
        accepted.forEach(file => {
            var fileType = (/[.]/.exec(file.name)) ? /[^.]+$/.exec(file.name) : undefined;
            switch (true) {
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
        const { connectDropTarget } = this.props;
        //console.log(connectDropTarget)
        return (
            <>
                <TitleBar name="Content">
                    <button type="button" onClick={this.load}>Load</button>
                </TitleBar>
                <SplitPane className={NON_DRAGGABLE} split="vertical" defaultSize={300}>
                    <ContentList updateContents={this.loadContentWithTags}></ContentList>
                    {connectDropTarget(
                        <div className="dropzone">
                            <ContextMenuTrigger id={CONTENT_MENU}>
                                <div className="fileList">
                                    {Object.keys(this.props.textures ? this.props.textures : {}).map(texture => (
                                        this.state.tagString.includes(this.props.textures[texture].tags) &&
                                        <Thumbnail key={texture} id={texture} previewImage={this.props.textures[texture].preview} text={texture} >
                                        </Thumbnail>
                                    ))}
                                    {Object.keys(this.props.meshes ? this.props.meshes : {}).map(mesh => (
                                        this.state.tagString.includes(this.props.meshes[mesh].tags) &&
                                        <Thumbnail key={mesh} id={texture} previewImage={this.props.textures[texture].preview} text={texture} >
                                        </Thumbnail>
                                    ))}
                                    {Object.keys(this.props.textures ? this.props.textures : {}).map(texture => (
                                        this.state.tagString.includes(this.props.textures[texture].tags) &&
                                        <Thumbnail key={texture} id={texture} previewImage={this.props.textures[texture].preview} text={texture} >
                                        </Thumbnail>
                                    ))}
                                </div>
                                <input ref={el => this.dropZone = el} className="fileInput" type="file" onChange={this.onFileSelect} multiple></input>
                            </ContextMenuTrigger>
                        </div>)
                    }
                </SplitPane>
            </>
        )
    }
}

const squareTarget = {
    drop(props, monitor, component) {
        console.log(monitor.getItem().files)
        component.onDrop(monitor.getItem().files)
    }
};

function collect(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget()
    };
}

const mapStateToProps = (state) => ({
    textures: state.TextureReducer.textures,
    meshes: state.MeshReducer.meshes,
    materials: state.MaterialReducer.materials
})

export default connect(mapStateToProps, { loadObject, loadTexture })(DropTarget(NativeTypes.FILE, squareTarget, collect)(ContentBrowser))
