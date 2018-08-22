import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addMesh,createMesh} from '../actions/SceneAction';
import * as THREE from 'three-full';

class Scene extends Component {
    constructor(props){
        super(props);
        this.state ={
            material: "",
            hdrcube : ""
        }
        this.addMesh = this.props.addMesh.bind(this);
        this.createMesh = this.props.createMesh.bind(this);
        this.uploadFBX = this.uploadFBX.bind(this);
        this.uploadHDR = this.uploadHDR.bind(this);
    }
    componentDidMount(){
        console.log("mounted")

        //this.createMesh();
        //this.addMesh();
    }

    uploadFBX(){
        //console.warn("xyz")
        this.props.camera.position.set( 100, 200, 300 );
        this.props.scene.background = new THREE.Color( 0xffffff );
                //this.props.scene.fog = new THREE.Fog( 0xa0a0a0, 200, 1000 );
                //console.error("xyz")
        console.log("upload")
        var light = new THREE.HemisphereLight( 0xffffff, 0x444444 );
				light.position.set( 0, 200, 0 );
                //this.props.scene.add( light );
				light = new THREE.DirectionalLight( 0xffffff ,0.05);
				light.position.set( 0, 200, 100 );
				light.castShadow = true;
				light.shadow.camera.top = 180;
				light.shadow.camera.bottom = -100;
				light.shadow.camera.left = -120;
                light.shadow.camera.right = 120;
				//this.props.scene.add( light );
				// this.props.scene.add( new THREE.CameraHelper( light.shadow.camera ) );
                // ground
                light=new THREE.AmbientLight( 0x404040 )
               // this.props.scene.add(light);
				var mesh = new THREE.Mesh( new THREE.PlaneBufferGeometry( 2000, 2000 ), new THREE.MeshPhongMaterial( { color: 0x999999, depthWrite: false } ) );
				mesh.rotation.x = - Math.PI / 2;
				mesh.receiveShadow = true;
				//this.props.scene.add( mesh );
				var grid = new THREE.GridHelper( 2000, 20, 0x000000, 0x000000 );
				grid.material.opacity = 0.2;
				grid.material.transparent = true;
				//this.props.scene.add( grid );
				// model
                var loader = new THREE.FBXLoader();
                //var mixers = [];
                //console.log(URL.createObjectURL(this.selectfile.files[0]))
				loader.load( URL.createObjectURL(this.selectfile.files[0]), ( object )=> {
					/*object.mixer = new THREE.AnimationMixer( object );
					mixers.push( object.mixer );
					var action = object.mixer.clipAction( object.animations[ 0 ] );
					action.play();*/
                    var group = new THREE.Group();
                    //console.log(object)
                    object.traverse(  ( child ) =>{
						if ( child.isMesh ) {
							child.castShadow = true;
                            child.receiveShadow = true;
                            var text= new THREE.TextureLoader().load(URL.createObjectURL(this.selectfile2.files[0]))
                            //console.log(text)
                            this.state.material = new THREE.MeshStandardMaterial({
                                color: 0xffffff,
					            metalness: 1,
                                roughness: 1,
                                envMap : this.state.hdrcube,
                                roughnessMap : text
                            });
                            var Mesh=new THREE.Mesh(child.geometry,this.state.material);
                            Mesh.castShadow = true;
                            Mesh.receiveShadow = true;
                            Mesh.applyMatrix(new THREE.Matrix4().makeScale(100,100,100))
                            Mesh.applyMatrix(new THREE.Matrix4().makeRotationX(THREE._Math.degToRad(-90)))
                            group.add(Mesh)
                            //Mesh.geometry.position
						}
                    } );

                    //console.log(group)
                    this.props.scene.add( group );

                },null,function(error){
                    console.log(error)
                } );
                //this.createMesh();
                //this.addMesh();
    }

    uploadHDR(){
        var Urls = [];
        for(var i=0;i<this.selectfile1.files.length;i++){
          Urls.push(URL.createObjectURL(this.selectfile1.files[i]))
        }
        console.log(Urls)
        new THREE.HDRCubeTextureLoader().load( THREE.UnsignedByteType, Urls,  ( hdrCubeMap )=> {
          var pmremGenerator = new THREE.PMREMGenerator( hdrCubeMap );
          pmremGenerator.update( this.props.renderer );
          
          var pmremCubeUVPacker = new THREE.PMREMCubeUVPacker( pmremGenerator.cubeLods );
              pmremCubeUVPacker.update( this.props.renderer );
              
              this.state.hdrcube = pmremCubeUVPacker.CubeUVRenderTarget.texture
          hdrCubeMap.dispose();
          pmremGenerator.dispose();
          pmremCubeUVPacker.dispose();
          console.log("packed")
         
        },null,function(error){
          console.log(error)
        } );
      }
    render(){
        return (<div>
            <input ref={el=>this.selectfile=el} type="file" onChange={this.uploadFBX}/>
            <div>
        <input type="file" ref={el =>this.selectfile1 = el} multiple={true} onChange={this.uploadHDR}/>
        <input type="file" ref={el =>this.selectfile2 = el}/>
        </div>
            </div>)
    }
}

function mapStatetoProps(state){
    return{
        scene:state.SceneReducer.scene,
        camera:state.CameraReducer.camera,
        renderer:state.RendererReducer.renderer
    }
}
export default connect(mapStatetoProps,{addMesh,createMesh})(Scene)