import hexRgb from 'hex-rgb';
import { NORMAL_BLEND_MODE } from '../Constants';

onmessage = (event) => {
    //console.log(event.data)
    var size = event.data.textureSize * event.data.textureSize;
    var data = new Uint8Array(3 * size);
    var data2 = new Uint8Array(3 * size);
    var finalColor = null;
    Object.keys(event.data.layers).map(key => {
        //console.log(key,event.data.layers[key].color,hexRgb(event.data.layers[key].color))
        if (event.data.layers[key].blendMode === NORMAL_BLEND_MODE) {
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
    //console.log(event.data.uvData)
    //var totalpixels = 0;
    /*for(var j=0;j<event.data.uvData.count/3;j++)
    {
        var arr= event.data.uvData.array;
        var pair = event.data.uvData.itemSize*3;
        var v1 = [arr[j*pair],arr[j*pair+1]];
        var v2 = [arr[j*pair+2],arr[j*pair+3]];
        var v3 = [arr[j*pair+4],arr[j*pair+5]];
    var uMax = Math.max(v1[0],v2[0],v3[0])
    var vMax = Math.max(v1[1],v2[1],v3[1])
    var uMin = Math.min(v1[0],v2[0],v3[0])
    var vMin = Math.min(v1[1],v2[1],v3[1])
    var txMin = Math.min(uMin * event.data.textureSize | 0, event.data.textureSize - 1);
    var txMax = Math.min(uMax * event.data.textureSize | 0, event.data.textureSize - 1);
    var tyMin = Math.min(vMin * event.data.textureSize | 0, event.data.textureSize - 1);
    var tyMax = Math.min(vMax * event.data.textureSize | 0, event.data.textureSize - 1);
    //console.log(txMin,tyMin,txMax,tyMax)
    var denom=(v2[1]-v3[1])*(v1[0]-v3[0])+(v3[0]-v2[0])*(v1[1]-v3[1])
    for(var x=txMin;x<txMax;x++){
        for(var y=tyMin;y<tyMax;y++){
            var w1=((v2[1]-v3[1])*(x/event.data.textureSize-v3[0])+(v3[0]-v2[0])*(y/event.data.textureSize-v3[1]))/denom;
            var w2=((v3[1]-v1[1])*(x/event.data.textureSize-v3[0])+(v1[0]-v3[0])*(y/event.data.textureSize-v3[1]))/denom;
            var w3=1-w1-w2;
            //console.log(w1,w2,w3)
            if(w1>=0 && w1 <=1 && w2 >=0 && w2<=1 && w3>=0 && w3<=1){
                //totalpixels++;
                var offset = (y * event.data.textureSize + x) * 3;
                data2[offset] = data[offset];
                data2[offset+1] = data[offset + 1];
                data2[offset+2] = data[offset + 2];
                //console.log("inside")
            }
        }
    }
    //var offset = (ty * event.data.textureSize + tx) * 3;
    //data2[offset] = data[offset + 0];
    //data2[offset+1] = data[offset + 1];
    //data2[offset+2] = data[offset + 2];
    }*/
    //console.log(totalpixels)
    //console.log(THREE);
    postMessage({ data: data, width: event.data.textureSize, height: event.data.textureSize })
}