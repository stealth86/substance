import { Component } from 'react';
import { connect } from 'react-redux';
import { addTexture } from '../../actions/TextureAction';

class Texture extends Component {
    constructor(props) {
        super(props);
        this.addTexture = this.props.addTexture.bind(this);
    }

    componentDidMount(){
        if(this.props.texture){
            //console.log(this.props.texture)
            this.texture=this.props.texture
            this.props.updateMaterial(this.props.channel, this.texture)
        }
    }
    shouldComponentUpdate(newProps) {
        //console.log(newProps.texture)
        if (newProps.texture !== this.props.texture){
            this.texture = newProps.texture
            this.props.updateMaterial(this.props.channel, this.texture)
        }
        return true;
    }

    render() {
        return null
    }
}

function mapStatetoProps(state, props) {
    return {
        texture: props.name &&
            state.TextureReducer.textures &&
            state.TextureReducer.textures[props.name] ? state.TextureReducer.textures[props.name].texture : null
    }
}
export default connect(mapStatetoProps, { addTexture })(Texture)