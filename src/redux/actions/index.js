import * as actionTypes from './actionTypes'

// User action creators
export const setUser = (user) => ({
  type: actionTypes.SET_USER,
  payload: {
    currentUser: user
  }
})
  
export const clearUser = () => ({
  type: actionTypes.CLEAR_USER
})


// Requests action creators
export const requestsListLoading = () => ({
  type: actionTypes.REQUESTS_LIST_LOADING
})

export const requestsListLoaded = (requests, currentPage, totalPages) => ({
  type: actionTypes.REQUESTS_LIST_LOADED,
  requests,
  currentPage,
  totalPages
})

export const requestsListLoadFailed = () => ({
  type: actionTypes.REQUESTS_LIST_LOAD_FAILED
})

// History requests action creators
export const historyRequestsListLoading = () => ({
  type: actionTypes.HISTORY_REQUESTS_LIST_LOADING
})

export const historyRequestsListLoaded = (requests, currentPage, totalPages) => ({
  type: actionTypes.HISTORY_REQUESTS_LIST_LOADED,
  requests,
  currentPage,
  totalPages
})

export const historyRequestsListLoadFailed = () => ({
  type: actionTypes.HISTORY_REQUESTS_LIST_LOAD_FAILED
})

// Claiming action creators
export const claimingListLoading = () => ({
  type: actionTypes.CLAIMING_LIST_LOADING
})

export const claimingListLoaded = (requests, currentPage, totalPages) => ({
  type: actionTypes.CLAIMING_LIST_LOADED,
  requests,
  currentPage,
  totalPages
})

export const claimingListLoadFailed = () => ({
  type: actionTypes.CLAIMING_LIST_LOAD_FAILED
})