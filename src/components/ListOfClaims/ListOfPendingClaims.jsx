
import { connect } from 'react-redux'
import ListOfClaims from './ListOfClaims'
import { loadRequestsActionCreator } from '../../redux/actions/loadRequests'

// StopGap TO DO: make sorting on API side
const sortFunction = (arr) => {
  return arr.sort((a, b) => b.claimid - a.claimid)
}


const mapStateToProps = (state) => ({
  requests: sortFunction(state.claim.claimingList),
  currentPage: state.claim.currentPage,
  totalPages: state.claim.totalPages,
  loading: state.claim.requestsLoading,
  loadFailed: state.claim.requestsLoadingFailed
})

const mapDispatchToProps = (dispatch) => ({
  loadRequests: (status, page, size, action, type) => dispatch(loadRequestsActionCreator(status, page, size, action, type)) 
})

export default connect(mapStateToProps, mapDispatchToProps)(ListOfClaims)