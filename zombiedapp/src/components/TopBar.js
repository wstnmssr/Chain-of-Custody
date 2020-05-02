import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { Menu, Header } from "semantic-ui-react";
import { Dropdown } from "semantic-ui-react";

import CreateZombie from "./LogNewEvidence";

function mapStateToProps(state) {
  return {
    userAddress: state.userAddress,
    userZombieCount: state.userZombieCount,
    totalZombieCount: state.totalZombieCount
  };
}

// This renders the topbar on the webpage as well as the lines listing address and zombie count.

class TopBar extends Component {

  state = {}

  render() {
    const { children } = this.props
    const { fixed } = this.state

    return (
      <div>
        <Menu inverted fixed='top' style={{ backgroundColor: '#263c4a' }}>
          <Menu.Item as='a'>
            <Link to={{ pathname: '/' }}>
              <Header inverted size='small'>🕵️ BlockChain of Custody</Header>
            </Link>
          </Menu.Item>

          <Dropdown item simple text='Evidence Locker'>
            <Dropdown.Menu>
              <Dropdown.Item>
                <Link to={{ pathname: "/LogNewEvidence" }} >
                  <Header  style={{fontSize:'1em', fontWeight: 'normal'}}> Log New Evidence </Header>
                </Link>
              </Dropdown.Item>

              <Dropdown.Item>
                <Link to={{ pathname: "/myZombieInventory" }} >
                  <Header  style={{fontSize:'1em', fontWeight: 'normal'}}> Evidence I Hold </Header>
                </Link>
              </Dropdown.Item>

              <Dropdown.Item>
                <Link to={{ pathname: "/ZombieInventory" }}>
                  <Header style={{fontSize:'1em', fontWeight: 'normal'}}> All Evidence </Header>
                </Link>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <Menu.Item>
            <Link to={{ pathname: "/Team" }}>
              <Header inverted style={{fontSize:'1em', fontWeight: 'normal'}}> Team </Header>
            </Link>
          </Menu.Item>

          <Menu.Item position="right" >
            Your account address: {this.props.userAddress}
            <br />
            You hold {this.props.userZombieCount} piece(s) of evidence out of a total of approximately {this.props.totalZombieCount}.
          </Menu.Item>
        </Menu>
      </div>
    );
  }
}

export default connect(mapStateToProps)(TopBar);
