import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as PropTypes from 'prop-types';
import * as THREE from 'three-full';
import { setRenderer } from '../actions/RendererAction';
import { CAMERA } from '../Constants';

class Renderer extends Component {

  constructor(props) {
    super(props);
    this.setRenderer = this.props.setRenderer.bind(this);
  }

  componentDidMount() {
    this.renderElement = this.props.canvas || this.renderCanvas;
    const props = this.props;

    this._THREErenderer = new THREE.WebGLRenderer({
      alpha: this.props.transparent,
      canvas: this.renderElement,
      antialias: props.antialias === undefined ? true : props.antialias,
      ...this.props.rendererProps
    });
    this.setRenderer(this._THREErenderer);
    this._THREErenderer.toneMapping = THREE.LinearToneMapping;
    this._THREErenderer.shadowMap.enabled = props.shadowMapEnabled !== undefined ? props.shadowMapEnabled : false;
    if (props.shadowMapType !== undefined) {
      this._THREErenderer.shadowMap.type = props.shadowMapType;
    }
    this._THREErenderer.setPixelRatio(props.pixelRatio);
    this._THREErenderer.setSize(+props.width, +props.height);
    this._THREErenderer.gammaInput = true;
    this._THREErenderer.gammaOutput = true;

    const backgroundtype = typeof props.background;
    if (backgroundtype !== 'undefined') {
      this._THREErenderer.setClearColor(props.background, this.props.transparent ? 0 : 1);
    }

    this.renderScene();
    // The canvas gets re-rendered every frame even if no props/state changed.
    // This is because some three.js items like skinned meshes need redrawing
    // every frame even if nothing changed in React props/state.
    //
    // See https://github.com/Izzimach/react-three/issues/28

    if (this.props.enableRapidRender) {
      const rapidrender = (timestamp) => {

        this._timestamp = timestamp;
        if (typeof this._rAFID !== 'undefined') {
          this._rAFID = window.requestAnimationFrame(rapidrender);
        }

        // render the stage
        this.renderScene();
      }

      this._rAFID = window.requestAnimationFrame(rapidrender);
    }

    // warn users of the old listenToClick prop
    //warning(typeof props.listenToClick === 'undefined', "the `listenToClick` prop has been replaced with `pointerEvents`");

    this.renderCanvas.onselectstart = () => false;
  }

  shouldComponentUpdate(newProps){
    this._THREErenderer.setSize(+newProps.width,+newProps.height)
    return true;
  }
  
  componentDidUpdate(oldProps) {
    const props = this.props;

    if (props.pixelRatio !== oldProps.pixelRatio) {
      this._THREErenderer.setPixelRatio(props.pixelRatio);
    }

    if (props.width !== oldProps.width ||
      props.height !== oldProps.height ||
      props.pixelRatio !== oldProps.pixelRatio) {
      this._THREErenderer.setSize(+props.width, +props.height);
    }

    const backgroundtype = typeof props.background;
    if (backgroundtype !== 'undefined') {
      this._THREErenderer.setClearColor(props.background, this.props.transparent ? 0 : 1);
    }
    var currCamera= props.scenes["mainScene"].getObjectByName("mainSceneCamera")
    if(oldProps.scenes)
    var oldCamera = oldProps.scenes["mainScene"].getObjectByName("mainSceneCamera")
    if(oldCamera !==currCamera){
    var controls = new THREE.OrbitControls(props.scenes["mainScene"].getObjectByName("mainSceneCamera"), this.renderElement)
    controls.screenSpacePanning = true
    }
    this.renderScene();
  }

  componentWillUnmount() {
    // hack for react-hot-loader
    if (typeof this._rAFID !== 'undefined') {
      window.cancelAnimationFrame(this._rAFID);
      delete this._rAFID;
    }
  }

  renderScene() {
    this._THREErenderer.autoClear = false;
    //this._THREErenderer.clear();

    Object.keys(this.props.scenes ? this.props.scenes : {}).forEach(key => {
      var scene = this.props.scenes[key]
      var camera = scene.getObjectByName(scene.name + CAMERA)
      if (camera) {
        this._THREErenderer.render(
          scene,
          camera
        )
      }
    })
  }




  render() {
    if (this.props.canvas) return null;

    // the three.js renderer will get applied to this canvas element
    //return React.createElement("canvas", { style: this.props.style });
    return (
      <div className={this.props.className}>
        <canvas ref={el => this.renderCanvas = el} style={this.props.style}></canvas>
        {this.props.children}
      </div>
    )
  }
}
Renderer.propTypes = {
  enableRapidRender: PropTypes.bool,
  pixelRatio: PropTypes.number,
  pointerEvents: PropTypes.arrayOf(PropTypes.string),
  transparent: PropTypes.bool,
  disableHotLoader: PropTypes.bool,
  customRender: PropTypes.func,
  style: PropTypes.object
}

Renderer.defaultProps = {
  enableRapidRender: true,
  pixelRatio: 1,
  transparent: false,
  disableHotLoader: false,
  style: {},
  rendererProps: {}
}
function mapStatetoProps(state) {
  return {
    scenes: state.SceneReducer.scenes
  }
}
export default connect(mapStatetoProps, {
  setRenderer
})(Renderer);