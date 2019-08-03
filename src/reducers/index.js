import { combineReducers} from 'redux';
import CameraReducer from './CameraReducer';
import SceneReducer from './SceneReducer';
import GeometryReducer from './GeometryReducer';
import MaterialReducer from './MaterialReducer';
import TextureReducer from './TextureReducer';
import MeshReducer from './MeshReducer';
import LoaderReducer from './LoaderReducer';
import RendererReducer from './RendererReducer';
import ContentListReducer from './ContentListReducer';
import WindowReducer from './WindowReducer';
import LayerReducer from './LayerReducer';
import ColorSwatchReducer from './ColorSwatchReducer';
import { connectRouter } from 'connected-react-router'

export default (history) => combineReducers({
    SceneReducer,
    CameraReducer,
    TextureReducer,
    GeometryReducer,
    MaterialReducer,
    MeshReducer,
    LoaderReducer,
    RendererReducer,
    ContentListReducer,
    WindowReducer,
    LayerReducer,
    ColorSwatchReducer,
    router: connectRouter(history)
})