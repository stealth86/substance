import * as THREE from 'three-full';

onmessage = (event) => {
    //console.log(event.data)
    console.log(THREE);
    postMessage({colorTexture:"#AACC00"})
}