import window from 'global'

export const GEOMETRY = "Geometry"
export const MATERIAL = "Material"
export const TEXTURE = "Texture"
export const MESH = "Mesh"
export const ITEM_TYPES = {RENDERER:"RENDERER",LAYER:"LAYER"}
export const DEFAULT_FOV = 75
export const DEFAULT_ASPECT = 1
export const DEFAULT_NEAR = 0.1
export const DEFAULT_FAR = 10000
export const DEFAULT_CUBE_CAMERA_RESOLUTION = 256
export const WINDOW_MARGIN_X = 2
export const WINDOW_MARGIN_Y = 2
export const ROW_HEIGHT = window.innerHeight/30
export const CONTAINER_WIDTH= window.innerWidth
export const GRID_COLUMNS = 12
export const DRAGGABLE = "draggableHandle"
export const NON_DRAGGABLE = "nonDraggable"
export const SPHERE_BUFFER_GEOMETRY = "Sphere"
export const MESH_BASIC_MATERIAL = "Basic"
export const MAIN_SCENE = "main"
export const JPG= "jpg"
export const JPEG= "jpeg"
export const HDR= "hdr"
export const PNG= "png"
export const RENDERER = "rendererLayoutKey"
export const CONTENT = "contentLayoutKey"
export const CONTENT_MENU = "contentMenu"
export const IMAGE_TYPES = ".jpg,.jpeg,.png,.hdr,"
export const OBJECT_TYPES = ".fbx,"
export const MAIN_RENDERER = "main"
export const AUX_RENDERER = "aux"
export const FILL_LAYER = "fill"
export const MASK_LAYER = "mask"
export const NORMAL_BLEND_MODE = "Normal"
export const COLOR_BLEND_MODES = [NORMAL_BLEND_MODE]
export const LAYER_TYPES = {
    FILL:{
        color: "#ffffff",
        roughness:0.5,
        metalness:0.5,
        normal:null,
        blendMode : NORMAL_BLEND_MODE,
        layerType: FILL_LAYER
    },
    MASK:{
        texture:null,
        layerType: MASK_LAYER
    }
}
export const TEXTURE_BASE = 2