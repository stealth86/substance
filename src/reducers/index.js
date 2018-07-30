import { combineReducers} from 'redux';
import { routerReducer } from 'react-router-redux';
import CameraReducer from './CameraReducer';
import SceneReducer from './SceneReducer';
import GeometryReducer from './GeometryReducer';
import MaterialReducer from './MaterialReducer';

export default combineReducers({
    SceneReducer,
    CameraReducer,
    GeometryReducer,
    MaterialReducer,
    routing : routerReducer
});