import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addMesh,createMesh} from '../actions/SceneAction';
import * as THREE from 'three-full';

class Scene extends Component {
    constructor(props){
        super(props);
        this.addMesh = this.props.addMesh.bind(this);
        this.createMesh = this.props.createMesh.bind(this);
        this.uploadFBX = this.uploadFBX.bind(this);
    }
    componentDidMount(){
        console.log("mounted")

        //this.createMesh();
        //this.addMesh();
    }

    uploadFBX(){
        //console.warn("xyz")
        this.props.camera.position.set( 100, 200, 300 );
        this.props.scene.background = new THREE.Color( 0xa0a0a0 );
                this.props.scene.fog = new THREE.Fog( 0xa0a0a0, 200, 1000 );
                //console.error("xyz")
        console.log("upload")
        var light = new THREE.HemisphereLight( 0xffffff, 0x444444 );
				light.position.set( 0, 200, 0 );
				this.props.scene.add( light );
				light = new THREE.DirectionalLight( 0xffffff );
				light.position.set( 0, 200, 100 );
				light.castShadow = true;
				light.shadow.camera.top = 180;
				light.shadow.camera.bottom = -100;
				light.shadow.camera.left = -120;
				light.shadow.camera.right = 120;
				this.props.scene.add( light );
				// this.props.scene.add( new THREE.CameraHelper( light.shadow.camera ) );
				// ground
				var mesh = new THREE.Mesh( new THREE.PlaneBufferGeometry( 2000, 2000 ), new THREE.MeshPhongMaterial( { color: 0x999999, depthWrite: false } ) );
				mesh.rotation.x = - Math.PI / 2;
				mesh.receiveShadow = true;
				this.props.scene.add( mesh );
				var grid = new THREE.GridHelper( 2000, 20, 0x000000, 0x000000 );
				grid.material.opacity = 0.2;
				grid.material.transparent = true;
				this.props.scene.add( grid );
				// model
                var loader = new THREE.FBXLoader();
                var mixers = [];
                console.log(URL.createObjectURL(this.selectfile.files[0]))
				loader.load( URL.createObjectURL(this.selectfile.files[0]), ( object )=> {
					object.mixer = new THREE.AnimationMixer( object );
					mixers.push( object.mixer );
					var action = object.mixer.clipAction( object.animations[ 0 ] );
					action.play();
					object.traverse( function ( child ) {
						if ( child.isMesh ) {
							child.castShadow = true;
							child.receiveShadow = true;
						}
                    } );
                    console.log(object)
                    this.props.scene.add( object );
                },null,function(error){
                    console.log(error)
                } );
                //this.createMesh();
                //this.addMesh();
    }

    render(){
        return (<div>
            <input ref={el=>this.selectfile=el} type="file" onChange={this.uploadFBX}/>
            </div>)
    }
}

function mapStatetoProps(state){
    return{
        scene:state.SceneReducer.scene,
        camera:state.CameraReducer.camera
    }
}
export default connect(mapStatetoProps,{addMesh,createMesh})(Scene)