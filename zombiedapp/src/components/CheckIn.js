import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Button, Header, Icon, Input, Form, Message, Segment, TextArea, Checkbox, Modal } from "semantic-ui-react";
// import EvidenceCard from "../components/zombieCard";

class CheckIn extends Component {
  state = {
    value: true,
    message: "",
    errorMessage: "",
    loading: false,
  };

  onSubmit = async event => {
    event.preventDefault();
    this.setState({
      loading: true,
      errorMessage: "",
      message: "Waiting for blockchain transaction to complete..."
    });
    if (this.state.value) {
      try {
        await this.props.CoC.methods
          .check_in(this.props.evidence.itemNumber)
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
    }
    else {
      this.setState({
        loading: false,
        message: "User did not confirm."
      });
    }
  };

  render() {
    return (
      <div>
        <Segment padded style={{ minHeight:'1em' }} >
        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
          <Form.Field
            control={Checkbox}
            label={{ children: 'I confirm that I want to check in this piece of evidence.' }}
            onChange={event => this.setState( { value: true })}
          />
          <br />

        <Button primary type="submit" loading={this.state.loading}>
          <Icon name="check" />
          Submit
        </Button>

    </Form>
      </Segment>
    </div>
  );
  }
}

export default CheckIn;
