import React, { Component } from "react";
import {Form, Input, Segment, TextArea, Grid} from "semantic-ui-react";

class DetailsModalContent extends Component {

  render() {
    return (
      <Segment>
      <h4 class="ui dividing header"> Submitting Agent Information</h4>
        <Grid>
        <Grid.Row>
          <Grid.Column width={2}><strong>Name:  </strong> </Grid.Column>
          <Grid.Column width={4}>{this.props.evidence.submittingAgent} <br /></Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={2}><strong>Phone: </strong></Grid.Column>
          <Grid.Column width={4}> {this.props.evidence.agentPhoneNumber}</Grid.Column>
        </Grid.Row>
        </Grid>

      <h4 class="ui dividing header"> Case Information</h4>
      <Grid>
      <Grid.Row>
        <Grid.Column width={2}><strong>Victim:  </strong></Grid.Column>
        <Grid.Column width={4}> {this.props.evidence.victim} <br /></Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column width={2}> <strong>Suspect: </strong></Grid.Column>
        <Grid.Column width={4}> {this.props.evidence.suspect} <br /></Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column width={2}> <strong>Offense Description:  </strong></Grid.Column>
        <Grid.Column width={4}> {this.props.evidence.offenseDescription}</Grid.Column>
      </Grid.Row>
      </Grid>

      <h4 class="ui dividing header"> Evidence Information</h4>
        <Grid>
        <Grid.Row>
          <Grid.Column width={2}><strong>Description:  </strong> </Grid.Column>
          <Grid.Column width={4}>{this.props.evidence.evidenceDescription} <br /></Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={2}><strong>Condition: </strong> </Grid.Column>
          <Grid.Column width={4}>{this.props.evidence.condition} <br /></Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={2}><strong>Notes:  </strong> </Grid.Column>
          <Grid.Column width={4}>{this.props.evidence.notes}</Grid.Column>
        </Grid.Row>
      </Grid>
      </Segment>

    );
  }
}

export default DetailsModalContent;
