
import { connect } from 'react-redux'
import ListOfApplications from './ListOfApplications'
import { loadRequestsActionCreator } from '../../redux/actions/loadRequests'


import './ListOfApplications.css'


// StopGap TO DO: make sorting on API side
const sortFunction = (arr) => {
  return arr.sort((a, b) => b.insurancerequestid - a.insurancerequestid)
}

const mapStateToProps = (state) => ({
    requests: sortFunction(state.requests.requests),
    currentPage: state.requests.currentPage,
    totalPages: state.requests.totalPages,
    loading: state.requests.requestsLoading,
    loadFailed: state.requests.requestsLoadingFailed
})

const mapDispatchToProps = (dispatch) => ({
  loadRequests: (status, page, size, action, type) => dispatch(loadRequestsActionCreator(status, page, size, action, type)) 
})


export default connect(mapStateToProps, mapDispatchToProps)(ListOfApplications)