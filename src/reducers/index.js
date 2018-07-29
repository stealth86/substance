import { combineReducers} from 'redux';
import { routerReducer } from 'react-router-redux';
import CameraReducer from './CameraReducer';
import SceneReducer from './SceneReducer';
import GeometryReducer from './GeometryReducer';
import MaterialReducer from './MaterialReducer';
import MeshReducer from './MeshReducer';

export default combineReducers({
    SceneReducer,
    CameraReducer,
    GeometryReducer,
    MaterialReducer,
    MeshReducer,
    routing : routerReducer
});