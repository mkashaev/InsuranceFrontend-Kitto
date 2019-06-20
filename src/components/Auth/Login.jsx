import React from 'react'
import { Button, Form, Grid, Header, Message, Segment, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
// import firebase from '../../config/firebase'
import * as axios from 'axios'


class Login extends React.Component {
  state = {
    'email': '',
    'password': '',
    'errors': [],
    'loading': false
  }

  displayErrors = errors => errors.map((error, i) => <p key={i}>
    {error.message}
  </p>)


  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    if (this.isFormValid(this.state)) {
      this.setState({errors: [], loading: true}) 
      const URL = 'http://35.226.26.159:8080/login'
      axios.post(URL, {
        'username': this.state.email,
        'password': this.state.password
      })
      .then(res => {
        localStorage.setItem('user', res.headers.authorization)
        this.setState({
          loading: false
        })
        this.props.history.push('/requests')
      })
      .catch(err => {
        console.log(err)
        this.setState({
          errors: this.state.errors.concat(err),
          loading: false
        })
      })
    }
  }

  isFormValid = ({email, password}) => email && password

  handleInputErrors = (errors, inputName) => {
    return errors.some(error => error.message.toLowerCase().includes(inputName)) ? 'error' : ''
  }

  render() {
    const { email, password, errors, loading} = this.state
    return(
      <Grid 
        textAlign='center'
        verticalAlign='middle' 
        className="app"
      > 
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h2' color='black' textAlign='center'>
            <Icon name="id card" color="black" />
            Login
          </Header>
          <Form onSubmit={this.handleSubmit} size='large'>
            <Segment stacked>
                  
            <Form.Input 
              fluid 
              name="email" 
              icon="mail" 
              iconPosition="left"
              placeholder="Email Address"
              onChange={this.handleChange} 
              value={email}
              className={this.handleInputErrors(errors, 'email')}
              type="email" />

            <Form.Input fluid 
              name="password"
              icon="lock" 
              iconPosition="left"
              placeholder="Password"
              onChange={this.handleChange} 
              value={password}
              className={this.handleInputErrors(errors, 'password')}
              type="password" />

            <Button disabled={loading} className={loading ? 'loading': ''} fluid size="large">Submit</Button>
            </Segment>
          </Form>
          {errors.length > 0 && (
            <Message error>
              <h3>Error</h3>
              {this.displayErrors(errors)}
            </Message>
          )}
          <Message>
            Don't have an account? <Link to="/register">Register</Link>
          </Message>
        </Grid.Column>
      </Grid>
    )  
  }
}

export default Login