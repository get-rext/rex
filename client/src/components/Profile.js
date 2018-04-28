import React, { Component } from 'react';
import './Home.css';
import NavBar from './NavBar';
import NewRexButton from './NewRexButton';
import { Grid, Col, Image, Table, Icon } from 'semantic-ui-react';

class Profile extends Component {
  state = {};

  render() {
    return (
      <div>
        <NavBar loggedIn={true} handleAuth={this.props.handleAuth} />
        <Grid celled="internally">
          <Grid.Row>
            <Grid.Column width={3} />
            <Grid.Column width={10}>
              <Table celled striped>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell colSpan="2">Profile</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  <Table.Row>
                    <Table.Cell collapsing>Username</Table.Cell>
                    <Table.Cell>{this.props.username}</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell collapsing>First name</Table.Cell>
                    <Table.Cell>{this.props.firstName}</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell collapsing>Last name</Table.Cell>
                    <Table.Cell>{this.props.lastName}</Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table>
            </Grid.Column>
            <Grid.Column width={3} />
          </Grid.Row>
        </Grid>
        <div className="newRecBuffer">
          <NewRexButton />
        </div>
      </div>
    );
  }
}

export default Profile;
