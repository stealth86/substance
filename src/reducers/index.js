import { combineReducers} from 'redux';
import { routerReducer } from 'react-router-redux';
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

export default combineReducers({
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
    routing : routerReducer
})