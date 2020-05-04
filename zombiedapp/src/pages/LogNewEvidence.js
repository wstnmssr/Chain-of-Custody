import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Button, Header, Icon, Input, Form, Message, Segment, TextArea } from "semantic-ui-react";
// import EvidenceCard from "../components/zombieCard";

function mapStateToProps(state) {
  return {
    CoC: state.CoC,
    userAddress: state.userAddress
  };
}

class LogNewEvidence extends Component {
  state = {
    agentName: "",
    agentPhoneNumber: "",
    victimName: "",
    suspectName: "",
    offenseDescription: "",
    condition: "",
    evidenceDescription: "",
    notes: "",
    message: "",
    errorMessage: "",
    loading: false,
  };

  // get a random cryptokitty image and the hungry zombie ID when the component mounts

  async componentDidMount() {
    this.setState({
    });
  }

  onSubmit = async event => {
    event.preventDefault();
    this.setState({
      loading: true,
      errorMessage: "",
      message: "Waiting for blockchain transaction to complete..."
    });
    try {
      await this.props.CoC.methods
        .log_evidence(this.state.agentName, this.state.evidenceDescription, this.state.offenseDescription,
                      this.state.victimName, this.state.suspectName, this.state.agentPhoneNumber,
                      this.state.condition, this.state.notes)
        .send({
          from: this.props.userAddress
        });
      this.setState({
        loading: false,
        message: "Transaction completed - thank you!"
      });
    } catch (err) {
      this.setState({
        loading: false,
        errorMessage: err.message,
        message: "User rejected transaction"
      });
    }
  };

  render() {
    return (
      <div>
      <Segment style={{ minHeight:'1em' }} />
      *<Header icon="browser" content="Please provide the required information for your new piece of evidence." />
      <br />
      <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>

        <h4 class="ui dividing header"> Submitting Agent Information</h4>
        <div class="two fields">
          <Form.Field
            label='Name'
            control={Input}
            placeholder="Name"
            onChange={event => this.setState({ agentName: event.target.value })}
          />
          <Form.Field
            label='Phone Number'
            control={Input}
            placeholder="X-XXX-XXX-XXXX"
            onChange={event => this.setState( { agentPhoneNumber: event.target.value })}
          />
        </div>

        <h4 class="ui dividing header"> Case Information</h4>
        <div class="two fields">
          <Form.Field
            label='Victim Name'
            control={Input}
            placeholder="Name"
            onChange={event => this.setState({ victimName: event.target.value })}
          />
          <Form.Field
            label='Suspect Name'
            control={Input}
            placeholder="Name"
            onChange={event => this.setState( { suspectName: event.target.value })}
          />
        </div>
        <Form.Field
          label='Offense Description' id='form-textarea-control-opinion'
          control={TextArea}
          placeholder="Description"
          onChange={event => this.setState( { offenseDescription: event.target.value })}
        />

        <h4 class="ui dividing header"> Evidence Information</h4>
          <Form.Field
            label = 'Condition'
            control = {Input}
            placeholder="Good/Less Than Good"
            onChange={event => this.setState({ condition: event.target.value })}
          />

        <Form.Field
          label='Evidence Description' id='form-textarea-control-opinion'
          control={TextArea}
          placeholder="Description"
          onChange={event => this.setState( { evidenceDescription: event.target.value })}
        />
        <Form.Field
          label='Notes' id='form-textarea-control-opinion'
          control={TextArea}
          placeholder="Notes"
          onChange={event => this.setState( { notes: event.target.value })}
        />

        <Message error header="Oops!" content={this.state.errorMessage} />
        <Button primary type="submit" loading={this.state.loading}>
          <Icon name="check" />
          Submit
        </Button>
        <Link to="/AllEvidence">
          <Button color="red" inverted>
            <Icon name="cancel" />
            Close
          </Button>
        </Link>
        <hr />
        <h2>{this.state.message}</h2>
      </Form>
    </div>
  );
  }
}

export default connect(mapStateToProps)(LogNewEvidence);
