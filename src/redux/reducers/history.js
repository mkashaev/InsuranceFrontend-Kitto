
import * as actionTypes from '../actions/actionTypes'

const initialState = {
  historyRequests: [],
  currentPage: 0,
  totalPages: 0,
  requestsLoading: true,
  requestsLoadingFailed: false
}


export default (state=initialState, action) => {

  switch (action.type) {
    case actionTypes.HISTORY_REQUESTS_LIST_LOADING:
        return state

    case actionTypes.HISTORY_REQUESTS_LIST_LOADED:
      return {
        historyRequests: action.requests,
        currentPage: action.currentPage,
        totalPages: action.totalPages,
        requestsLoading: false,
        requestsLoadingFailed: false
      }

    case actionTypes.HISTORY_REQUESTS_LIST_LOAD_FAILED:
      return {
        historyRequests: [], 
        requestsLoading: true,
        requestsLoadingFailed: true
      }

    default:
      return state
  }
}