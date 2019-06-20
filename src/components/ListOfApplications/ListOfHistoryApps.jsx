
import { connect } from 'react-redux'
import ListOfApplications from './ListOfApplications'
import { loadRequestsActionCreator } from '../../redux/actions/loadRequests'

// StopGap TO DO: make sorting on API side
const sortFunction = (arr) => {
  return arr.sort((a, b) => b.insurancerequestid - a.insurancerequestid)
}


const mapStateToProps = (state) => ({
  requests: sortFunction(state.history.historyRequests),
  currentPage: state.history.currentPage,
  totalPages: state.history.totalPages,
  loading: state.history.requestsLoading,
  loadFailed: state.history.requestsLoadingFailed
})

const mapDispatchToProps = (dispatch) => ({
  loadRequests: (status, page, size, action, type) => dispatch(loadRequestsActionCreator(status, page, size, action, type)) 
})

export default connect(mapStateToProps, mapDispatchToProps)(ListOfApplications)

