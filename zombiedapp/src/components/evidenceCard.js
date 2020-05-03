import React, { Component } from "react";
import { Icon, Card, Header, Modal, Button } from "semantic-ui-react";
import ReactTooltip from "react-tooltip";
import ActionButton from "./ActionButton";
import EvidenceCardContent from "./evidenceCardContent";

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

    if (this.props.myHolder) {
      // Owner zombie: render card and tooltip and modal for zombie actions
      console.log("my ev");
      return (
        <Card style={{ backgroundColor: "LightGreen" }} raised>
          <ReactTooltip delayShow={400} />

          <a
            href="javascript:;"
            data-tip="Click on me to view actions for this zombie"
            onClick={e => this.modalOpen(e)}
          >
            <EvidenceCardContent evidence={this.props} />
          </a>

          {/* a modal is like an "alert", it's a popup that greys out the lower screen and displays its content on top of everything */}

          <Modal open={this.state.modalOpen} onClose={this.handleClose}>
            <Header
              icon="browser"
              content="These are the actions you can take with your zombie!"
            />

            <Modal.Actions>
              <Button color="red" onClick={this.handleClose} inverted>
                <Icon name="cancel" /> Close
              </Button>
            </Modal.Actions>
          </Modal>
        </Card>
      ); }
    // someone else's zombie.  just show the card.
    else {
      console.log("ur ev")
      return (
        <Card style={{ backgroundColor: "LavenderBlush" }}>
          <EvidenceCardContent evidence={this.props} />
        </Card>
      );}
  }
}

export default EvidenceCard;
