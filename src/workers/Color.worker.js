import hexRgb from 'hex-rgb';
import { NORMAL_BLEND_MODE } from '../Constants';

onmessage = (event) => {
    //console.log(event.data)
    var size = event.data.textureSize * event.data.textureSize;
    var data = new Uint8Array(3 * size);
    var finalColor = null;
    Object.keys(event.data.layers).map(key=>{
        //console.log(key,event.data.layers[key].color,hexRgb(event.data.layers[key].color))
        if(event.data.layers[key].blendMode===NORMAL_BLEND_MODE){
            finalColor = hexRgb(event.data.layers[key].color)  
        }
    })

    //console.log(finalColor);
    for (var i = 0; i < size; i++) {

        var stride = i * 3;

        data[stride] = finalColor.red;
        data[stride + 1] = finalColor.green;
        data[stride + 2] = finalColor.blue;

    }
    //console.log(THREE);
    postMessage({ data:data,width:event.data.textureSize,height:event.data.textureSize })
}