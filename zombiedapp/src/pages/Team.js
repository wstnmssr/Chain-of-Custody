import React, { Component } from "react";

import { Card, Grid, Header, Image, Segment } from "semantic-ui-react";

class Team extends Component {
  render() {
    const imgStyle = {
      display: "block",
      marginLeft: "auto",
      marginRight: "auto",
      width: "50%"
    };

    return (
      <div>
        <Segment style={{ minHeight:'1em' }} />
        <br />
        <Header align='center' style={{fontSize:'3em', fontWeight: 'normal'}}>Meet the Team!</Header>

      <Segment style={{ padding: '3em 0em' }} vertical>
        <Grid container stackable verticalAlign='middle'>
          <Grid.Row>
            <Grid.Column width={4}>
              <Card>
                <Image src='static/images/sarah.jpg' wrapped ui={false} />
                <Card.Content>
                  <Card.Header>Sarah Hultin</Card.Header>
                  <Card.Description>
                    Sarah studies computer science & math. She cries all the time.
                  </Card.Description>
                </Card.Content>
              </Card>
            </Grid.Column>

            <Grid.Column width={4}>
              <Card>
                <Image src='static/images/westin.jpg' wrapped ui={false} />
                <Card.Content>
                  <Card.Header>Westin Musser</Card.Header>
                  <Card.Description>
                    Westin studies computer science & math. He is a very important man.
                  </Card.Description>
                </Card.Content>
              </Card>
            </Grid.Column>

            <Grid.Column width={4}>
              <Card>
                <Image src='static/images/gus.jpg' wrapped ui={false} />
                <Card.Content>
                  <Card.Header>Gus Nard</Card.Header>
                  <Card.Description>
                    Gus studies computer science.
                  </Card.Description>
                </Card.Content>
              </Card>
            </Grid.Column>

            <Grid.Column width={4}>
              <Card>
                <Image src='static/images/aaron.jpg' wrapped ui={false} />
                <Card.Content>
                  <Card.Header>Aaron Whitehouse</Card.Header>
                  <Card.Description>
                    Aaron studies computer science.
                  </Card.Description>
                </Card.Content>
              </Card>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column align='center' width={16}>
              <Card >
                <Image src='static/images/france.jpg' wrapped ui={false} />
                <Card.Content>
                  <Card.Header>Notre Chef Intrépide</Card.Header>
                </Card.Content>
              </Card>
            </Grid.Column>
          </Grid.Row>

        </Grid>
      </Segment>

      </div>
    );
  }
}

export default Team;
