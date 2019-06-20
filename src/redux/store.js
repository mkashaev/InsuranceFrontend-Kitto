import { applyMiddleware, createStore } from 'redux'
import rootReducer from './reducers'
import thunk from 'redux-thunk'

import { compose } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'


export default createStore(
  rootReducer,
  // applyMiddleware(thunk),
  compose(
    applyMiddleware(thunk),
    composeWithDevTools()
  )
)