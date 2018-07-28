import { combineReducers} from 'redux';
import { routerReducer } from 'react-router-redux';
import CameraReducer from './CameraReducer';
import SceneReducer from './SceneReducer';

export default combineReducers({
    SceneReducer,
    CameraReducer,
    routing : routerReducer
});