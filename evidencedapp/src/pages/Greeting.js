import React, { Component } from "react";

import { Header, Grid, Segment } from "semantic-ui-react";

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
        <Segment inverted textAlign='center'
          style={{ minHeight:500,
                  'backgroundImage': 'url(\'static/images/wow_soCool.jpg\')',
                  'backgroundSize': 'cover' }}>
          <Header as='h1' content='Welcome to the Block-Chain of Custody!' inverted
            style={{ align: 'center',
                     fontSize: '3.5em',
                     fontWeight: 'normal',
                     marginTop: '4em'}}/>
        </Segment>

        <Segment style={{ padding: '3em 0em' }} vertical>
          <Header align='center' as='h3' style={{ fontSize: '2em' }}>
            Digitalizing Digital Forensics
          </Header>
          <p align='center' style={{ fontSize: '1.33em' }}>
            Electronically, securely, and reliabely track your evidence.
            <br /> To get started, select an option from the menu bar above.
          </p>
      </Segment>

      </div>
    );
  }
}

export default Greeting;
