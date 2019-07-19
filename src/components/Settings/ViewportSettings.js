import React, { Component } from 'react'
import { connect } from 'react-redux'

export class ViewportSettings extends Component {
    constructor(props){
        super(props);
        console.log(this.props)
    }

    componentDidMount(){
        this.props.updateTitle("Viewport")
    }

    render() {
        //console.log(this.props.envTexture && this.props.textures[this.props.envTexture].texture.image)
        return (
            <div>
                Viewport
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    envTexture: state.TextureReducer.envTexture,
    textures: state.TextureReducer.textures
})

export default connect(mapStateToProps, {})(ViewportSettings)
