import React from "react";
import { 
  List, Segment, Header, Container, Label, 
  Placeholder, Pagination, Icon, Button 
} from "semantic-ui-react";
import ClaimModal from './ClaimModal'


import './ListOfClaims.css'


export default class extends React.Component {
  // !!!
  state = {
    open: false,
    currentApp: ''
  }

  componentDidMount() {
    let { status, action, type } = this.props
    if (this.props.requests.length < 1) {
      this.props.loadRequests(status, 0, 10, action, type)
    }
  }

  handleRefresh = () => {
    const { status, action, type, loadRequests } = this.props
    loadRequests(status, 0, 10, action, type)
  }

  handleOnOpen = (app) => {
    this.setState({
      open: true,
      currentApp: app 
    })
  }

  handleOnClose = () => {
    this.setState({
      open: false, 
      currentApp: ''
    })
  }

  placeholder = () => (
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
      <List.Item key={i}>
        <Placeholder fluid>
          <Placeholder.Header image >
            <Placeholder.Line length="short" />
            <Placeholder.Line length="very short" />
          </Placeholder.Header>
        </Placeholder>
      </List.Item>
    ))
  )

  closeModal = () => {
    this.setState({
      open: false
    })
  }

  handlePaginationChange = (e, {activePage}) => {
    let { status, action, type } = this.props
    // Test
    status = "ALL"
    this.props.loadRequests(status, activePage-1, 10, action, type)
  }

  render() {
    return (
      <div>
        <Container>
          <Header as='h1'>List of claims</Header>
          <Button labelPosition='left' icon='refresh' content='Refresh' onClick={this.handleRefresh} />
          <Segment className="container">
          <List divided relaxed>
            {this.props.loading? this.placeholder() : this.props.requests.map((app, index) => (
              <List.Item key={index}>
              <List.Icon name="home" size="large" verticalAlign="middle" />
              <List.Content className="listItems">
                <div style={{
                  display: "flex", 
                  justifyContent: "space-between", 
                  alignItems: "center"}}>
                  <List.Header as="a" onClick={()=>this.handleOnOpen(app)}>
                    Claimed number: {app.claimid}
                  </List.Header>
                  {/** Set color to label */}
                  <Label color={app.status==="pending"? "yellow": app.status==="accepted"? "green": "red"} 
                  key={`${index}_lbl`} 
                  style={{minWidth: 70, textAlign: "center"}}>
                    {app.status}
                  </Label>
                </div>
                <List.Description as="a">Claimed date: {app.claimedDate}</List.Description>
              </List.Content>
            </List.Item>
            ))}
          </List>
          </Segment>
          <Pagination
            defaultActivePage={this.props.currentPage+1}
            siblingRange={2}
            ellipsisItem={{ content: <Icon name='ellipsis horizontal' />, icon: true }}
            firstItem={{ content: <Icon name='angle double left' />, icon: true }}
            lastItem={{ content: <Icon name='angle double right' />, icon: true }}
            prevItem={{ content: <Icon name='angle left' />, icon: true }}
            nextItem={{ content: <Icon name='angle right' />, icon: true }}
            totalPages={this.props.totalPages}
            onPageChange={this.handlePaginationChange}
          />
        </Container>
        {
          this.state.open === false ? "" : 
          <ClaimModal
            data={this.state.currentApp} 
            open={this.state.open} 
            close={this.handleOnClose} />
        }
      </div>
    )
  }
}