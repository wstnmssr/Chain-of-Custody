import React, { Component } from "react";
import {Card, Image} from "semantic-ui-react";
//import ZombieChar from "./zombieChar";

class EvidenceCardContent extends Component {
  truncate = (text) => {
    if (text.length > 30) {
      var start = text.substring(0, 30);
      return start + "...";
    }
    return text;
  };

  render() {
    return (
      <>
        <Image src='static/images/france.jpg' />
        <Card.Content>
          <Card.Header>Evidence Description: </Card.Header>
          <Card.Description>
            {this.truncate(this.props.evidence.evidenceDescription)}
          </Card.Description>
        </Card.Content>
      </>

    );
  }
}
export default EvidenceCardContent;
