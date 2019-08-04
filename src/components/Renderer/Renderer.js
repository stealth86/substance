import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as PropTypes from 'prop-types';
import * as THREE from 'three-full';
import { setRenderer } from '../../actions/RendererAction';

class Renderer extends Component {

  constructor(props) {
    super(props);
    this.setRenderer = this.props.setRenderer.bind(this);
  }

  componentDidMount() {
    const props = this.props;
    this.renderElement = this.props.canvas || this.renderCanvas;
    this.canvas = ('OffscreenCanvas' in window) ? this.renderElement.transferControlToOffscreen() : this.renderElement;
    this.canvas.style = { width: 0, height: 0 }

    if (props.ui) {
      this._THREErenderer = new THREE.WebGLRenderer({
        alpha: this.props.transparent,
        canvas: this.canvas,
        antialias: props.antialias === undefined ? true : props.antialias,
        ...this.props.rendererProps
      })
      this._THREErenderer.setPixelRatio(props.pixelRatio);
      this._THREErenderer.setSize(+props.width*0.8, +props.height*0.8);
      this._THREErenderer.toneMapping = THREE.LinearToneMapping;
      this._THREErenderer.shadowMap.enabled = props.shadowMapEnabled !== undefined ? props.shadowMapEnabled : false;
      if (props.shadowMapType !== undefined) {
        this._THREErenderer.shadowMap.type = props.shadowMapType;
      }
      this._THREErenderer.gammaInput = true;
      this._THREErenderer.gammaOutput = true;  
    } else {
      this._THREErenderer = new THREE.WebGLRenderer({
        alpha: this.props.transparent,
        antialias: props.antialias === undefined ? true : props.antialias,
        ...this.props.rendererProps
      })
      this.renderTarget = new THREE.WebGLRenderTarget(+props.width, +props.height)
    }
    this._THREErenderer.autoClear = false;
    this.setRenderer(props.name, this._THREErenderer);
    const backgroundtype = typeof props.background;
    if (backgroundtype !== 'undefined') {
      this._THREErenderer.setClearColor(props.background, this.props.transparent ? 0 : 1);
    }

    this.renderScene(this.props.rendererCallbacks);
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
        this.renderScene(this.props.rendererCallbacks);
      }

      this._rAFID = window.requestAnimationFrame(rapidrender);
    }

    // warn users of the old listenToClick prop
    //warning(typeof props.listenToClick === 'undefined', "the `listenToClick` prop has been replaced with `pointerEvents`");
    if (this.props.ui)
      this.renderCanvas.onselectstart = () => false;
  }

  shouldComponentUpdate(newProps) {
    this._THREErenderer.setSize(+newProps.width*0.8, +newProps.height*0.8)
    //this.canvas.style = { width: +newProps.width, height: +newProps.height }
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
      if (props.ui){
        this._THREErenderer.setSize(+props.width*0.8, +props.height*0.8);
        //this.canvas.style = { width: +props.width, height: +props.height }
      }
      else
        this.renderTarget.setSize(+props.width, +props.height)
    }

    const backgroundtype = typeof props.background;
    if (backgroundtype !== 'undefined') {
      this._THREErenderer.setClearColor(props.background, this.props.transparent ? 0 : 1);
    }
    if (this.props.ui) {
      var currCamera = props.scenes["main"].getObjectByName("mainCamera")
      if (oldProps.scenes)
        var oldCamera = oldProps.scenes["main"].getObjectByName("mainCamera")
      if (oldCamera !== currCamera) {
        var controls = new THREE.OrbitControls(props.scenes["main"].getObjectByName("mainCamera"), this.renderElement)
        controls.screenSpacePanning = true
      }
    }
    this.childScenes=[]
    React.Children.forEach(this.props.children, element => {
      if (!React.isValidElement(element)) return
    
      this.childScenes = this.childScenes.concat(element.props.name)
    
      //do something with source..
    })
    //console.log(this.childScenes)
    this.renderScene(this.props.rendererCallbacks);
  }

  componentWillUnmount() {
    // hack for react-hot-loader
    if (typeof this._rAFID !== 'undefined') {
      window.cancelAnimationFrame(this._rAFID);
      delete this._rAFID;
    }
  }

  renderScene(rendererCallback) {
    rendererCallback.forEach(callbackItem => {
      callbackItem.callback();
    })
    //this._THREErenderer.clear();
    Object.keys(this.props.scenes ? this.props.scenes : {}).forEach(key => {
      if (this.childScenes.includes(key)) {
        var scene = this.props.scenes[key]
        var camera = scene.getObjectByProperty("type", "PerspectiveCamera")
        if (camera) {
          this._THREErenderer.render(
            scene,
            camera
          )
        }
      }
    })
  }

  render() {
    if (this.props.canvas) return null;

    const { children } = this.props;

    const childrenWithProps = React.Children.map(children, child =>
      React.cloneElement(child, { rendererName: this.props.name })
    );
    return (
      <div className={this.props.className}>
        {this.props.ui &&
          <canvas ref={el => this.renderCanvas = el} style={this.props.style}></canvas>
        }
        {childrenWithProps}
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
function mapStatetoProps(state, props) {
  return {
    scenes: state.SceneReducer.scenes,
    rendererCallbacks: props.name && state.RendererReducer.rendererCallbacks
      && state.RendererReducer.rendererCallbacks[props.name] ?
      state.RendererReducer.rendererCallbacks[props.name] : []
  }
}
export default connect(mapStatetoProps, {
  setRenderer
})(Renderer);