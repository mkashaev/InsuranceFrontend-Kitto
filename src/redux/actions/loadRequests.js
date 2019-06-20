import axios from 'axios'
import * as actionCreators from './index'
//import Config from '../../config/Config'

const requestsActions = {
	listLoading: () => actionCreators.requestsListLoading(),
	listLoaded: (coupons, currentPage, totalPages) => actionCreators.requestsListLoaded(coupons, currentPage, totalPages),
	listLoadFailed: () => actionCreators.requestsListLoadFailed()
}

const historyActions = {
	listLoading:() => actionCreators.historyRequestsListLoading(),
	listLoaded: (coupons, currentPage, totalPages) => actionCreators.historyRequestsListLoaded(coupons, currentPage, totalPages),
	listLoadFailed: () => actionCreators.historyRequestsListLoadFailed()
}

const claimingActions = {
	listLoading:() => actionCreators.claimingListLoading(),
	listLoaded: (coupons, currentPage, totalPages) => actionCreators.claimingListLoaded(coupons, currentPage, totalPages),
	listLoadFailed: () => actionCreators.claimingListLoadFailed()	
}

const actions = (typeOfAction) => {
	switch (typeOfAction) {
		case "REQUESTS": return requestsActions
		case "HISTORY": return historyActions
		case "CLAIMING": return claimingActions
		default: throw new Error("Unexpected arguments")
	}
}


/**
 * 
 * @param {String} status ALL, ACCEPTED, REJECTED
 * @param {Number} page Load number page for pagination
 * @param {Number} size Amount of records per page
 * @param {String} action REQUESTS, HISTORY
 * @param {String} type requests, claims
 */
export const loadRequestsActionCreator = (status, page, size, action="REQUESTS", type="requests") => (dispatch, getState) => {
	const newActionCreators = actions(action)
	
	dispatch(newActionCreators.listLoading())
	//let URL = `${Config.Config.ServerURL}/requests`
	let URL = `http://35.226.26.159:8080/api/V1/agents/${type}?companyId=1&status=${status}&page=${page}&size=${size}`
  const authJWT = localStorage.getItem('user')
  console.log(authJWT)
  axios.get(URL, {
		headers: {
			"Authorization": authJWT
		}
	})
	.then(response => {
		if (action === "CLAIMING") {
			console.log(response)
		}
		
    const coupons = response.data.data
    const currentPage = response.data.meta.currentPage
    const totalPages = response.data.meta.totalPages 

		dispatch(newActionCreators.listLoaded(coupons, currentPage, totalPages))
	})
	.catch(err => {
		console.log(err)
		dispatch(newActionCreators.listLoadFailed())
	})
}