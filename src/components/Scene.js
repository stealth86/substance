import { Component } from 'react';
import { connect } from 'react-redux';
<<<<<<< HEAD
import * as THREE from "three-full";
import { addMesh,createMesh,addScene} from '../actions/SceneAction';
=======
import { addMesh,createMesh} from '../actions/SceneAction';
import { EquirectangularToCubemap } from '../utils/EquitoCube'
import * as THREE from 'three-full';
>>>>>>> 4040f9459e5380ec25be0f2c8fe7cd058869235e

class Scene extends Component {
    constructor(props){
        super(props);
        this.addScene=this.props.addScene.bind(this);
    }
    componentDidMount(){
        console.log("mounted ")
        console.log(this.props)
    }

<<<<<<< HEAD
    componentWillUpdate(){
        console.log("will update")
        console.log(this.props)
    }
    componentDidUpdate(){
        console.log("component updated")
        console.log(this.props)
    }
    componentWillReceiveProps(nextProps){
        console.log(this.props)
        console.log(nextProps)
    }
    componentWillMount(){
        var scene = new THREE.Scene()
        this.addScene(this.props.name,scene)
        console.log("will mount "+this.props.name)
    }
=======
    uploadFBX(){
        //console.warn("xyz")
        this.props.camera.position.set( 100, 100, 0 );
        //this.props.scene.background = new THREE.Color( 0xffffff );
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
                                roughness: 0,
                                envMap : this.state.hdrcube
                                //roughnessMap : text
                            });
                            var Mesh=new THREE.Mesh(child.geometry,this.state.material);
                            Mesh.castShadow = true;
                            Mesh.receiveShadow = true;
                            Mesh.applyMatrix(new THREE.Matrix4().makeScale(100,100,100))
                            Mesh.applyMatrix(new THREE.Matrix4().makeRotationX(THREE._Math.degToRad(-90)))
                            group.add(Mesh)
                            console.log(Mesh.geometry)
                            console.log(Mesh.geometry.getAttribute('position').itemSize)
                            console.log(Mesh.geometry.getAttribute('position').getX(0))
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
        var filenames= ["px","nx","py","ny","pz","nz"]
        for(var j=0;j<this.selectfile1.files.length;j++){
        for(var i=0;i<this.selectfile1.files.length;i++){
            if(this.selectfile1.files[i].name.includes(filenames[j])){
                console.log(this.selectfile1.files[i].name)
              Urls.push(URL.createObjectURL(this.selectfile1.files[i]))
            }
        }}
        console.log(Urls)
        //var scene=new THREE.Scene();
        //var textu = new THREE.TextureLoader();
        //var texturex=textu.load(URL.createObjectURL(this.selectfile1.files[0]));
        new THREE.RGBELoader().load(URL.createObjectURL(this.selectfile1.files[0]),(texturex)=>{
            texturex.magFilter = THREE.NearestFilter;
            texturex.minFilter = THREE.NearestFilter;
            texturex.format = THREE.RGBAFormat;
            texturex.encoding = THREE.RGBEEncoding;
            texturex.flipY=true;
            
            var mesh2 = new THREE.Mesh( new THREE.SphereBufferGeometry( 8000, 32, 16 ), new THREE.MeshBasicMaterial( { map: texturex } ) );
        mesh2.geometry.scale( - 1, 1, 1 );
        this.props.scene.add( mesh2 );
        //var equitocube= new THREE.EquirectangularToCubeGenerator(texturex,{options:{resolution:512}})
        //this.state.hdrcube=equitocube.update(this.props.renderer)
        /*var mcamera= new THREE.PerspectiveCamera(90,1,1,1000);
        mcamera.up.set( 0, - 1, 0 );
        mcamera.lookAt(new THREE.Vector3( 1, 0, 0 ));
        var options = { format: THREE.RGBFormat, magFilter: THREE.LinearFilter, minFilter: THREE.LinearFilter };*/

	    /*this.renderTarget = new THREE.WebGLRenderTarget( 512, 512, options );
        this.renderTarget.texture.name = "CubeCamera";
        this.props.renderer.render(this.props.scene,mcamera,this.renderTarget);
        var plane = new THREE.Mesh( new THREE.PlaneBufferGeometry(25,25), new THREE.MeshBasicMaterial( {map: this.renderTarget.texture } ) );
        this.props.scene.add( plane );
        var light=new THREE.AmbientLight( 0x404040 )
        this.props.scene.add(light);*/
        var cubeCamera1 = new THREE.CubeCamera( 1, 10000, 512 );
				cubeCamera1.renderTarget.texture.minFilter = THREE.LinearMipMapLinearFilter;
                this.props.scene.add( cubeCamera1 );
        
                //console.log(cubeCamera1.renderTarget.texture)
                cubeCamera1.update(this.props.renderer,this.props.scene);
                this.state.hdrcube=cubeCamera1.renderTarget.texture;
                //mesh.visible=false;
                this.props.scene.add(mesh2);
                //this.props.scene.background=cubeCamera1.renderTarget.texture
                //console.log(this.state.hdrcube)
                //console.log(new THREE.CubeTexture())
                //console.log(cubeCamera1.renderTarget.texture)*/
        } )
        
        

        
        
        //        this.state.hdrcube=cubeCamera1.renderTarget.texture
        //var plane = new THREE.Mesh( new THREE.BoxBufferGeometry(25,25,25), new THREE.MeshBasicMaterial( {map: cubeCamera1.renderTarget.texture } ) );
        //this.props.scene.add( plane );
        
        //var textureLoader = new THREE.RGBELoader().load(this.selectfile1.files[0]);
                //var textureEquirec = new THREE.RGBELoader().load(URL.createObjectURL(this.selectfile1.files[0]) );
                /*var textu = new THREE.TextureLoader();
                textu.load(URL.createObjectURL(this.selectfile1.files[0]),(map)=>{
                    console.log(map)
                    var rtarg= this.props.renderer.getRenderTarget()
                    console.log(rtarg)
                var equitoCuve = new THREE.EquirectangularToCubeGenerator(map,{options:{resolution:512}});
                var mapx = equitoCuve.update(this.props.renderer)
                console.log(mapx)
                rtarg= this.props.renderer.getRenderTarget()
                console.log(rtarg)
                this.props.renderer.setRenderTarget(rtarg)
                this.state.hdrcube=map;
                });*/
                
				/*textureEquirec.mapping = THREE.EquirectangularReflectionMapping;
				textureEquirec.magFilter = THREE.NearestFilter;
                textureEquirec.minFilter = THREE.NearestFilter;
                textureEquirec.format = THREE.RGBAFormat;
                textureEquirec.encoding = THREE.RGBEEncoding;
                textureEquirec.flipY = true;*/
                //new THREE.CubeTextureLoader()*/
                //.load(Urls )*/
                //this.props.scene.background=map
                /*var textu = new THREE.TextureLoader();
                var texturex=textu.load(URL.createObjectURL(this.selectfile1.files[0]));
                var pmremGenerator = new THREE.PMREMGenerator( texturex );
          pmremGenerator.update( this.props.renderer );
          var pmremCubeUVPacker = new THREE.PMREMCubeUVPacker( pmremGenerator.cubeLods );
              pmremCubeUVPacker.update( this.props.renderer );
          this.props.scene.background=texturex;*///pmremCubeUVPacker.CubeUVRenderTarget.texture
       // var cubegen=new THREE.EquirectangularToCubeGenerator(texturex,{options:{resolution:1024}})
        //cubegen.update(this.props.renderer)
        //var renderer = new THREE.WebGLRenderer()
       // this.state.hdrcube=cubegen.update(this.props.renderer)
       // this.props.scene.background=this.state.hdrcube

        /*new THREE.HDRCubeTextureLoader().load( THREE.UnsignedByteType, Urls,  ( hdrCubeMap )=> {
            //new THREE.RGBELoader().load( URL.createObjectURL(this.selectfile1.files[0]),  ( hdrCubeMap )=> {
          var pmremGenerator = new THREE.PMREMGenerator( hdrCubeMap );
          pmremGenerator.update( this.props.renderer );
          
          var pmremCubeUVPacker = new THREE.PMREMCubeUVPacker( pmremGenerator.cubeLods );
              pmremCubeUVPacker.update( this.props.renderer );
              
              this.state.hdrcube = pmremCubeUVPacker.CubeUVRenderTarget.texture
              //this.state.hdrcube=hdrCubeMap
              this.props.scene.background=hdrCubeMap
          hdrCubeMap.dispose();
          pmremGenerator.dispose();
          pmremCubeUVPacker.dispose();
          console.log("packed")
         
        },null,function(error){
          console.log(error)
        } );*/
      }
>>>>>>> 4040f9459e5380ec25be0f2c8fe7cd058869235e
    render(){
        return null
    }
}

function mapStatetoProps(state){
    return{
        scenes:state.SceneReducer.scenes
    }
}
export default connect(mapStatetoProps,{addMesh,createMesh,addScene})(Scene)