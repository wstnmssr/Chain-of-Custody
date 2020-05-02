import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Button, Header, Icon, Input, Form, Message, Segment, TextArea } from "semantic-ui-react";
import ZombieCard from "../components/zombieCard";

function mapStateToProps(state) {
  return {
    CZ: state.CZ,
    userAddress: state.userAddress
  };
}

class LogNewEvidence extends Component {
  state = {
    value: "",
    message: "",
    errorMessage: "",
    loading: false,
    zombieId: null
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
      message: "waiting for blockchain transaction to complete..."
    });
    try {
      await this.props.CZ.methods
        .changeName(this.state.zombieId, this.state.value) // contains the zombie ID and the new name
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
      *<Header icon="browser" content="Please Provide the Required Information for a New Piece of Evidence" />
      <br />
      <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>

        <h4 class="ui dividing header"> Submitting Agent Information</h4>
        <div class="two fields">
          <Form.Field
            label='Name'
            control={Input}
            placeholder="Name"
            onChange={event => this.setState({ value: event.target.value })}
          />
          <Form.Field
            label='Phone Number'
            control={Input}
            placeholder="X-XXX-XXX-XXXX"
            onChange={event => this.setState( { value: event.target.value })}
          />
        </div>

        <h4 class="ui dividing header"> Case Information</h4>
        <div class="two fields">
          <Form.Field
            label = 'Case Number'
            control = {Input}
            placeholder="Case #"
            onChange={event => this.setState({ value: event.target.value })}
          />
          <Form.Field
            label='Lab Case Number'
            control={Input}
            placeholder="Lab Case #"
            onChange={event => this.setState( { value: event.target.value })}
          />
        </div>
        <div class="two fields">
          <Form.Field
            label='Victim Name'
            control={Input}
            placeholder="Name"
            onChange={event => this.setState({ value: event.target.value })}
          />
          <Form.Field
            label='Suspect Name'
            control={Input}
            placeholder="Name"
            onChange={event => this.setState( { value: event.target.value })}
          />
        </div>
        <Form.Field
          label='Offense Description' id='form-textarea-control-opinion'
          control={TextArea}
          placeholder="Description"
          onChange={event => this.setState( { value: event.target.value })}
        />

        <h4 class="ui dividing header"> Evidence Information</h4>
          <div class="two fields">
          <Form.Field
            label = 'Item Number'
            control = {Input}
            placeholder="Item #"
            width={6}
            onChange={event => this.setState({ value: event.target.value })}
          />
          <Form.Field
            label='Condition'
            control={Input}
            placeholder="Good/Fucked up"
            width={10}
            onChange={event => this.setState( { value: event.target.value })}
          />
        </div>
        <Form.Field
          label='Evidence Description' id='form-textarea-control-opinion'
          control={TextArea}
          placeholder="Description"
          onChange={event => this.setState( { value: event.target.value })}
        />
        <Form.Field
          label='Notes' id='form-textarea-control-opinion'
          control={TextArea}
          placeholder="Notes"
          onChange={event => this.setState( { value: event.target.value })}
        />

        <Message error header="Oops!" content={this.state.errorMessage} />
        <Button primary type="submit" loading={this.state.loading}>
          <Icon name="check" />
          Submit
        </Button>
        <Link to="/MyZombieInventory">
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
