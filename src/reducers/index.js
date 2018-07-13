import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './reducer_auth';
import locationsReducer from './reducer_locations';
import radioButtonReducer from './reducer_radio_button'

export default combineReducers({
  auth: authReducer,
  mapData: locationsReducer,
  radioButton: radioButtonReducer,
  form: formReducer
});
