import React from 'react'
import axios from 'axios'
import { Button, Modal, Grid } from 'semantic-ui-react'
// import Config from '../../config/Config'
//////////////
import { connect } from 'react-redux'
import { loadRequestsActionCreator } from '../../redux/actions/loadRequests'


const accept_loading = {
  accept_loading: true,
  accept_disabled: true,
  reject_loading: false,
  reject_disabled: true
}

const reject_loading = {
  accept_loading: false,
  accept_disabled: true,
  reject_loading: true,
  reject_disabled: true
}

const active_buttons = {
  reject_loading: false,
  reject_disabled: false,
  accept_loading: false,
  accept_disabled: false 
}


class InsureApplicationModal extends React.Component {
  state = {
    reject_loading: false,
    reject_disabled: false,
    
    accept_loading: false,
    accept_disabled: false
  }


  componentDidMount() {
    let data = this.props.data
    if (data.status === "accepted") {
      this.setState({
        accept_disabled: true,
        reject_disabled: true
      })
    } else if (data.status === "rejected") {
      this.setState({
        reject_disabled: true
      })
    }
  }

  // TO DO
  // !Experemental Async/await version
  // async handleOnChangeStatus(data, status, close) {
  handleOnChangeStatus = async (data, status, close) => {
    if (status === "accepted") {
      this.setState(accept_loading)
    } else {
      this.setState(reject_loading)
    }

    let URL = "http://10.90.137.18:8888/iroha_rest/api/v1.0/items"
    let item_id = "string"
    let req_data = {
      data: {
        "item": {
        "item_id": item_id,
        "insurance_expiration_date": data.policyenddate.split('-').reverse().join('-')
        },
        "company": "oramitsu",
        "account": "Marat",
        "private_key": "9c7574ce40ade726b2fa27ec18174b3cf8368380be891b4099ab64c9f19cf793"
      }
    }

    let acceptedURL = `http://35.226.26.159:8080/api/V1/agents/requests?insuranceId=${data.insurancerequestid}&status=ACCEPTED`

    try {
      let response1 = await axios.post(URL, req_data)
      console.log(response1)
      
      let response2 = await axios.patch(acceptedURL)
      console.log(response2)

      close()
      this.props.loadRequests()

    } catch (error) {
      console.log(error)
    }

  }
  // end
  
  // close - funciton to close modal window
  handleOnChangeStatus = (data, status, close) => {
    if (status === "accepted") {
      this.setState(accept_loading)
    } else {
      this.setState(reject_loading)
    }
    // let URL = `${Config.Config.ServerURL}/update`
    let URL = "http://10.90.137.18:8888/iroha_rest/api/v1.0/items"
    let item_id = ""+data.address.country
                  + data.address.state
                  + data.address.city 
                  + data.address.street 
                  + data.address.house_num
                  + data.address.apartment_num


    
    axios.post(URL, {
      data: {
        "item": {
        "item_id": item_id,
        "insurance_expiration_date": data.policyenddate.split('-').reverse().join('-')
        },
        "company": "oramitsu",
        "account": "Marat",
        "private_key": "9c7574ce40ade726b2fa27ec18174b3cf8368380be891b4099ab64c9f19cf793"
      }
    })
    .then(resp => {
      console.log(resp)

      this.setState(active_buttons)
      let acceptedURL = `http://35.226.26.159:8080/api/V1/agents/requests?insuranceId=${data.insurancerequestid}&status=ACCEPTED`
      axios.patch(acceptedURL)
      .then(resp => {
        console.log(resp)
        close()
        this.props.loadRequests()
      })
      .catch(err => {
        console.log(err)
      })

    })
    .catch(err => {
      console.log(`Error: ${err}`)
      console.log("This item already insured")
      let rejectURL = `http://35.226.26.159:8080/api/V1/agents/requests?insuranceId=${data.insurancerequestid}&status=REJECTED`
      axios.patch(rejectURL)
      .then(resp => {
        console.log(resp)
        close()
        this.props.loadRequests()
      })
      .catch(err => {
        console.log(err)
      })
      this.setState(active_buttons)
    })
  }

  render() {
    const { open, close, data } = this.props
  
    return (
      <Modal open={open} onClose={close}>
        <Modal.Header>Insurance contract number: {data===''? '' : data.insurancerequestid}</Modal.Header>
        <Modal.Content>
          <Grid columns={4}>
            <Grid.Row>
              <Grid.Column>
                <p>Type of property:</p>
                <p>City:</p>
                <p>Street:</p>
                <p>House number:</p>
                <p>Appartment number:</p>
                <p>Cost:</p>
                <p>Date start of agreement:</p>
                <p>Date end of the agreement:</p>
                <p>Date of application:</p>
              </Grid.Column>
              <Grid.Column>
                <p>{data===''? '' : data.propertytype}</p>
                <p>{data===''? '' : data.address.city}</p>
                <p>{data===''? '' : data.address.street}</p>
                <p>{data===''? '' : data.address.house_num}</p>
                <p>{data===''? '' : data.address.apartment_num}</p>
                <p>{data===''? '' : data.amount}</p>
                <p>{data===''? '' : data.policystartdate}</p>
                <p>{data===''? '' : data.policyenddate}</p>
                <p>{data===''? '' : data.policycreatedcate}</p>
              </Grid.Column>

              <Grid.Column>
                <p>Name:</p>
                <p>Surname:</p>
                <p>Last name:</p>
                <p>Passport seria:</p>
                <p>Passport number:</p>
                <p>Passport issue date:</p>
                <p>Passport issued by:</p>
                <p>Phone nubmer:</p>
                <p>Email:</p>
              </Grid.Column>
              <Grid.Column>
                <p>{data===''? '' : data.client.first_name}</p>
                <p>{data===''? '' : data.client.middle_name}</p>
                <p>{data===''? '' : data.client.last_name}</p>
                <p>{data===''? '' : data.client.passport_num}</p>
                <p>{data===''? '' : data.client.passport_num}</p>
                <p>{data===''? '' : data.client.passport_issued_date}</p>
                <p>{data===''? '' : data.client.passport_issued_by}</p>
                <p>{data===''? '' : data.client.mobile_num}</p>
                <p>{data===''? '' : data.client.email}</p>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Modal.Content>

        <Modal.Actions>
        <Button
            negative
            icon="close"
            labelPosition="right"
            content="Reject"
            disabled={this.state.reject_disabled}
            className={this.state.reject_loading? 'loading': ''}
            onClick={()=>{this.handleOnChangeStatus(data, "rejected", close)}}
          />
          <Button
            positive
            icon="checkmark"
            labelPosition="right"
            content="Accept"
            disabled={this.state.accept_disabled}
            className={this.state.accept_loading? 'loading': ''}
            onClick={()=>{this.handleOnChangeStatus(data, "accepted", close)}}
          />
        </Modal.Actions>
      </Modal>
    )
  }
}


const mapStateToProps = (state) => ({
  requests: state.requests,
  loading: state.requestsLoading,
  loadFailed: state.requestsLoadingFailed
})

const mapDispatchToProps = (dispatch) => ({
  loadRequests: () => dispatch(loadRequestsActionCreator()) 
})


export default connect(mapStateToProps, mapDispatchToProps)(InsureApplicationModal)