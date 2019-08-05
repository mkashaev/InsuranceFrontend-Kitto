import React from 'react'
import axios from 'axios'
import { Button, Modal, Grid, Container, Divider } from 'semantic-ui-react'
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

  // TO DO: Handle errors
  handleOnChangeStatus = async (data, status, close) => {
    if (status === "accepted") {
      this.setState(accept_loading)
    } else {
      this.setState(reject_loading)
    }

    //let URL = "http://10.90.137.18:8888/iroha_rest/api/v1.0/items"
    const URL = "http://127.0.0.1:5000/iroha_rest/api/v1.0/items"
  
    const { country, state, city, street, house_num, apartment_num } = data.insurance.address
    const item_id = `${country}${state}${city}${street}${house_num}${house_num}${apartment_num}`.split(" ").join("_")
    
    const req_data = {
      data: {
        "item": {
          "item_id": item_id,
          "insurance_expiration_date": data.insurance.policyenddate.split('-').reverse().join('-')
        },
        "request_id": data.claimid,
        "company": "oramitsu",
        "account": "Marat",
        "private_key": "9c7574ce40ade726b2fa27ec18174b3cf8368380be891b4099ab64c9f19cf793"
      }
    }

    //let acceptedURL = `http://35.226.26.159:8080/api/V1/agents/requests?insuranceId=${data.insurancerequestid}&status=ACCEPTED`

    try {
      const jwt = localStorage['user']
      const response = await axios.patch(URL, req_data, {headers: {"Authorization": jwt}})
      console.log(response)

      close()
      // const status="PENDING%2CACCEPTED" 
      const status="ALL"
      const action="CLAIMING"
      const type="claims"
      this.props.loadRequests(status, 0, 10, action, type)

    } catch (error) {
      console.log(error)
      this.setState(active_buttons)
    }
  }

  render() {
    const { open, close, data } = this.props
  
    return (
      <Modal open={open} onClose={close}>
        <Modal.Header>Insurance contract number: {data===''? '' : data.claimid}</Modal.Header>
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
                <p>{data===''? '' : data.insurance.propertytype}</p>
                <p>{data===''? '' : data.insurance.address.city}</p>
                <p>{data===''? '' : data.insurance.address.street}</p>
                <p>{data===''? '' : data.insurance.address.house_num}</p>
                <p>{data===''? '' : data.insurance.address.apartment_num}</p>
                <p>{data===''? '' : data.insurance.amount}</p>
                <p>{data===''? '' : data.insurance.policystartdate}</p>
                <p>{data===''? '' : data.insurance.policyenddate}</p>
                <p>{data===''? '' : data.insurance.policycreatedcate}</p>
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
                <p>{data===''? '' : data.insurance.client.first_name}</p>
                <p>{data===''? '' : data.insurance.client.middle_name}</p>
                <p>{data===''? '' : data.insurance.client.last_name}</p>
                <p>{data===''? '' : data.insurance.client.passport_num}</p>
                <p>{data===''? '' : data.insurance.client.passport_num}</p>
                <p>{data===''? '' : data.insurance.client.passport_issued_date}</p>
                <p>{data===''? '' : data.insurance.client.passport_issued_by}</p>
                <p>{data===''? '' : data.insurance.client.mobile_num}</p>
                <p>{data===''? '' : data.insurance.client.email}</p>
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <Grid columns={1}>
            <Container textAlign='justified'>
              Description:
              <Divider/>
              <p>{data.description}</p>
            </Container>

          </Grid>
        </Modal.Content>

        <Modal.Actions>
        <Button
            negative
            icon="close"
            labelPosition="right"
            content="Reject"
            disabled={this.state.reject_disabled}
            //disabled
            className={this.state.reject_loading? 'loading': ''}
            onClick={()=>{this.handleOnChangeStatus(data, "rejected", close)}}
          />
          <Button
            positive
            icon="checkmark"
            labelPosition="right"
            content="Accept"
            disabled={this.state.accept_disabled}
            //disabled
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
  loadRequests: (status, page, size, action, type) => dispatch(loadRequestsActionCreator(status, page, size, action, type))
})


export default connect(mapStateToProps, mapDispatchToProps)(InsureApplicationModal)