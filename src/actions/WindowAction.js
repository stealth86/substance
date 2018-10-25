import {UPDATE_LAYOUT} from './types';

export const initializeLayout = (layout) =>(dispatch,getState) =>{
    const {columnWidth,marginX,marginY,rowHeight} = getState().WindowReducer
    layout.forEach(element => {
        var units ={
            width : getWidth(columnWidth,element.w,marginX),
            height : getHeight(rowHeight,element.h,marginY)
        }
        //console.log(units.width,units.height)
        dispatch({
            type : UPDATE_LAYOUT,
            payload : units,
            name : element.i
        }) 
    });
}

export const updateLayout = (layout,oldItem,newItem,placeholder) =>(dispatch,getState) =>{
    const {columnWidth,marginX,marginY,rowHeight} = getState().WindowReducer
    var units ={
        width : getWidth(columnWidth,placeholder?placeholder.w: newItem.w,marginX),
        height : getHeight(rowHeight,placeholder?placeholder.h: newItem.h,marginY)
    }
    //console.log(units.width,units.height)
    dispatch({
        type : UPDATE_LAYOUT,
        payload : units,
        name : placeholder?placeholder.i: newItem.i
    })
}

var getWidth = (columnWidth,widthGrids,marginX)=>{
    return Math.round(columnWidth * widthGrids + Math.max(0, widthGrids - 1) * marginX )
}
var getHeight = (rowHeight,heightGrids,marginY)=>{
    return Math.round(rowHeight * heightGrids + Math.max(0, heightGrids - 1) * marginY )
}