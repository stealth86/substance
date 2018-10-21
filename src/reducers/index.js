import { combineReducers} from 'redux';
import { routerReducer } from 'react-router-redux';
import CameraReducer from './CameraReducer';
import SceneReducer from './SceneReducer';
import GeometryReducer from './GeometryReducer';
import MaterialReducer from './MaterialReducer';
import MeshReducer from './MeshReducer';
import LoaderReducer from './LoaderReducer';
import RendererReducer from './RendererReducer';
import WindowReducer from './WindowReducer';

export default combineReducers({
    SceneReducer,
    CameraReducer,
    GeometryReducer,
    MaterialReducer,
    MeshReducer,
    LoaderReducer,
    RendererReducer,
    WindowReducer,
    routing : routerReducer
});