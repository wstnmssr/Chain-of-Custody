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
                  'background-image': 'url(\'static/images/wow_soCool.jpg\')',
                  'background-size': 'cover' }}>
          <Header as='h1' content='Welcome to the BlockChain of Custody!' inverted
            style={{ align: 'center',
                     fontSize: '3.5em',
                     fontWeight: 'normal',
                     marginTop: '4em'}}/>
        </Segment>

        <Segment style={{ padding: '3em 0em' }} vertical>
          <Grid container stackable verticalAlign='middle'>
            <Grid.Row>
              <Grid.Column width={8}>
                <Header as='h3' style={{ fontSize: '2em' }}>
                  A Very Cool Project
                </Header>
                <p style={{ fontSize: '1.33em' }}>
                  This CS481a3 blockchain project allows you to interact with a digital Chain of Custody on the Ethereum blockchain.
                  <br /><br /> To get started, select an option from the menu bar above.
                </p>
              </Grid.Column>

              <Grid.Column floated='right' width={8}>
                <Header as='h3' style={{ fontSize: '2em' }}>
                  We Make Bananas That Can Dance
                </Header>
                <p style={{ fontSize: '1.33em' }}>
                  Yes that's right, you thought it was the stuff of dreams, but even bananas can be
                  bioengineered.
                </p>
              </Grid.Column>
            </Grid.Row>
        </Grid>
      </Segment>

      </div>
    );
  }
}

export default Greeting;
