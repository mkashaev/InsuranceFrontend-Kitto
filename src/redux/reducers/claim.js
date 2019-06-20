
import * as actionTypes from '../actions/actionTypes'

const initialState = {
  claimingList: [],
  currentPage: 0,
  totalPages: 0,
  requestsLoading: true,
  requestsLoadingFailed: false
}


export default (state=initialState, action) => {

  switch (action.type) {
    case actionTypes.CLAIMING_LIST_LOADING:
        return state

    case actionTypes.CLAIMING_LIST_LOADED:
      return {
        claimingList: action.requests,
        currentPage: action.currentPage,
        totalPages: action.totalPages,
        requestsLoading: false,
        requestsLoadingFailed: false
      }

    case actionTypes.CLAIMING_LIST_LOAD_FAILED:
      return {
        claimingList: [], 
        requestsLoading: true,
        requestsLoadingFailed: true
      }

    default:
      return state
  }
}