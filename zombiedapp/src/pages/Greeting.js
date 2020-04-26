import React, { Component } from "react";

class Greeting extends Component {
  render() {
    const imgStyle = {
      display: "block",
      marginLeft: "auto",
      marginRight: "auto",
      width: "50%"
    };

    return (
      <div>
        <br />
        <h2 style={{ color: "DarkRed", textAlign: "center" }}>
          {" "}
          Welcome to our <b> Bitchin Blockchain of Custody</b>!
        </h2>
        <br />
        <img src="static/images/net_forensics.jpg" style={imgStyle} width="400px" alt="Neato supremo" />
        <br /> <br />
        <p style={{ textAlign: "center" }}>
          This CS481A3 blockchain project allows you to interact with a digital Chain of Custody on the Ethereum blockchain.
          <br /> Go get some hoes!
          <br /> <br /> To get started, select a button from the menu bar above.
        </p>
      </div>
    );
  }
}

export default Greeting;
