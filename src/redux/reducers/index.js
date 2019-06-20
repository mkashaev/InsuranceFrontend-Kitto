import { combineReducers } from 'redux'
import user from './user'
import requests from './requests'
import history from './history'
import claim from './claim'


export default combineReducers({
  user, requests, history, claim
})
