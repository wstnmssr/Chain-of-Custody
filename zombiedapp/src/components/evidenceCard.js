import React, { Component } from "react";
import { Icon, Card, Header, Modal, Button } from "semantic-ui-react";
import ReactTooltip from "react-tooltip";
import ActionButton from "./ActionButton";
import EvidenceCardContent from "./evidenceCardContent";
import DetailsModalContent from "./DetailsModalContent";

class EvidenceCard extends Component {
  state = {
    modalOpen: false
  };

  modalOpen() {
    this.setState({ modalOpen: true });
  }

  handleClose = () => this.setState({ modalOpen: false });

  truncate = (text, startChars, endChars) => {
    if (text.length > 12) {
      var start = text.substring(0, startChars);
      var end = text.substring(text.length - endChars, text.length);
      return start + "..." + end;
    }
    return text;
  };

  render() {
    // define the button labels used in <ActionButton> further on down in the code

    // const attackButton = (
    //   <div>
    //     {" "}
    //     Attack Zombie <br /> (70% chance of winning){" "}
    //   </div>
    // );
    // const kittyButton = (
    //   <div>
    //     Eat CryptoKitty <br /> (burp!){" "}
    //   </div>
    // );
    // const changeNameButton = (
    //   <div>
    //     Change Name <br /> (level > 2){" "}
    //   </div>
    // );
    // const levelUpButton = (
    //   <div>
    //     Level Up
    //     <br /> (cost = .001 eth){" "}
    //   </div>
    // );

    // create the JSX depending on whether you own the zombie or not

    if (this.props.myHolder === 'user') {
      return (
        <Card style={{ backgroundColor: "LightBlue" }} raised>
          <ReactTooltip delayShow={400} />
          <EvidenceCardContent evidence={this.props} />
          <Card.Content extra>
            <Button color="Blue" onClick={e => this.modalOpen(e)}>
              View Details
            </Button>
            <Button color="Blue" onClick={e => this.modalOpen(e)}>
              Check In
            </Button>
          </Card.Content>

          <Modal open={this.state.modalOpen} onClose={this.handleClose}>
            <Header
              icon="browser"
              content="Evidence Details"
            />
            <DetailsModalContent evidence={this.props} />
            <Modal.Actions>
              <Button color="red" onClick={this.handleClose} inverted>
                <Icon name="cancel" /> Close
              </Button>
            </Modal.Actions>
          </Modal>
        </Card>
      ); }

      else if (this.props.myHolder === 'in') {
        return (
          <Card style={{ backgroundColor: "White" }} raised>
            <ReactTooltip delayShow={400} />
            <EvidenceCardContent evidence={this.props} />
            <Card.Content extra>
              <Button color="LightGrey" onClick={e => this.modalOpen(e)}>
                View Details
              </Button>
              <Button color="LightGrey" onClick={e => this.modalOpen(e)}>
                Check Out
              </Button>
            </Card.Content>
          <Modal open={this.state.modalOpen} onClose={this.handleClose}>
          <Header
            icon="browser"
            content="Evidence Details"
          />
          <DetailsModalContent evidence={this.props} />
          <Modal.Actions>
            <Button color="red" onClick={this.handleClose} inverted>
              <Icon name="cancel" /> Close
            </Button>
          </Modal.Actions>
        </Modal>
       </Card>
      ); }

    else {
      return (
        <Card style={{ backgroundColor: "LightRed" }} raised>
          <ReactTooltip delayShow={400} />
          <EvidenceCardContent evidence={this.props} />
          <Card.Content extra>
            <Button color="DarkRed" onClick={e => this.modalOpen(e)}>
              View Details
            </Button>
          </Card.Content>

          <Modal open={this.state.modalOpen} onClose={this.handleClose}>
          <Header
            icon="browser"
            content="Evidence Details"
          />
          <DetailsModalContent evidence={this.props} />
          <Modal.Actions>
            <Button color="red" onClick={this.handleClose} inverted>
              <Icon name="cancel" /> Close
            </Button>
          </Modal.Actions>
        </Modal>
      </Card>
    );}
  }
}

export default EvidenceCard;
