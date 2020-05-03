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
      <Card.Content>
        <div>
          <Image src='static/images/france.jpg' wrapped ui={false} />
        </div>
        <Card.Header>
          Evidence Description:
        </Card.Header>
        <Card.Description>
          <b>{this.truncate(this.props.evidence.evidenceDescription, 8, 8)}</b>
        </Card.Description>
      </Card.Content>
    );
  }
}
export default EvidenceCardContent;
