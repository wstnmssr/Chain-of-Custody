import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { Button } from "semantic-ui-react";

import CreateZombie from "./LogNewEvidence";

import { Menu, Header } from "semantic-ui-react";

function mapStateToProps(state) {
  return {
    userAddress: state.userAddress,
    userZombieCount: state.userZombieCount,
    totalZombieCount: state.totalZombieCount
  };
}

// This renders the topbar on the webpage as well as the lines listing address and zombie count.

class TopBar extends Component {
  render() {
    return (
      <div>
        <Menu style={{ marginTop: "10px", backgroundColor: "#ebe5d9" }}>
          <Menu.Item>
            <CreateZombie />
          </Menu.Item>

          <Menu.Item>
            <Link to={{ pathname: "/myZombieInventory" }}>
              <Button style={{"background-color":"#8cab4d"}}>Show Evidence I Hold</Button>
            </Link>
          </Menu.Item>

          <Menu.Item>
            <Link to={{ pathname: "/ZombieInventory" }}>
              <Button style={{"background-color":"#8cab4d"}}>Show All Evidence</Button>
            </Link>
          </Menu.Item>

          <Menu.Item position="right">
            <Link to={{ pathname: "/" }}>
              <Header size="large"> 🕵️ </Header>
            </Link>
          </Menu.Item>
        </Menu>
        <div className="center">
          <h2>Don't lose anything! </h2>
        </div>
        Your account address: {this.props.userAddress}
        <br />
        You hold {this.props.userZombieCount} piece(s) of evidence out of a total of approximately {this.props.totalZombieCount}.
        <hr />
      </div>
    );
  }
}

export default connect(mapStateToProps)(TopBar);
