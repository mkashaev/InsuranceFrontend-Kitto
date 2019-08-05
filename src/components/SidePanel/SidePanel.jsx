import React, { Component } from 'react'
import { Grid, Menu, Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router-dom'

import logo from '../logo.svg'


class SidePanel extends Component {

  out = () => {
    localStorage.removeItem('user')
    console.log(this.props)
    //this.props.history.push('/login')
    window.location.href = "./login"
  }

  render() {
    const { children } = this.props
    return (
      <Grid className="app" columns="equal">
        {/* <SidePanel/> */}
        <Menu
          size="large"
          inverted
          fixed="left"
          vertical
          style={{ background: "#444341", fontSize: "1.2rem"}}
        >
          <Grid>
            <Grid.Row centered style={{marginTop: 25, marginBottom: 25}}>
              <Image src={logo} size='small'/>
            </Grid.Row>

            <Menu.Item as={Link} to="/requests">
              List of applications
            </Menu.Item>
            
            <Menu.Item as={Link} to="/claims">
              Claims
            </Menu.Item>

            <Menu.Item as={Link} to="/history">
              History
            </Menu.Item>

            <Menu.Item onClick={this.out}>
              Sign Out
            </Menu.Item>
          </Grid>
        </Menu>
        <Grid.Column style={{marginLeft: 270, marginRight: 18}}>
          {/* Routing */}
          { children }
        </Grid.Column>
      </Grid>
    )
  }
}

export default withRouter(SidePanel)