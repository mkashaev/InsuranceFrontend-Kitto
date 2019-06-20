import React, { Component } from 'react'
import { Grid, Menu, Button, Image } from 'semantic-ui-react'
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
            <Grid.Row centered>
              <Image src={logo} size='small'/>
            </Grid.Row>
            <Grid.Row centered>
            <Link to="/claims">
                <Button onClick={this.handleSidebarClickList} style={{width: "100%"}}>Claims</Button>
              </Link>              
            </Grid.Row>
            <Grid.Row centered>
              <Link to="/requests">
                <Button onClick={this.handleSidebarClickList} style={{width: "100%"}}>List of applications</Button>
              </Link>
            </Grid.Row>
            <Grid.Row centered>
              <Link to="/history">
                <Button onClick={this.handleSidebarClickAdd} style={{width: "100%"}}>History</Button>
              </Link>
            </Grid.Row>
            <Grid.Row centered>
              <Button onClick={this.out} content="Sign Out"/>
            </Grid.Row>
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