import axios from 'axios'

// TO DO: Make config file
const serverSelfHostedURL = "http://10.90.137.18:8888"
const testLocalURL = "127.0.0.1:5000"


export const changeRequestStatus = async (data, status, close) => {
  
  if (status === "accepted") {
    this.setState(accept_loading)
  } else {
    this.setState(reject_loading)
  }

  const URL = `${testLocalURL}/iroha_rest/api/v1.0/items`
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
    console.log("First")
    let response1 = await axios.post(URL, req_data)
    console.log(response1)
    
    console.log("Second")
    let JWT = localStorage['user']
    let response2 = await axios.patch(acceptedURL, null, {headers: {"Authorization": JWT}})
    console.log(response2)

    close()
    const status="PENDING" 
    const action="REQUESTS"
    const type="requests"
    this.props.loadRequests(status, 0, 10, action, type)

  } catch (error) {
    console.log(error.code)
    console.log(`Type of error: ${typeof error}`)
    this.setState(active_buttons)
  }
}