import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Button, Header, Icon, Input, Form, Message, Segment, TextArea, Checkbox, Modal } from "semantic-ui-react";
// import EvidenceCard from "../components/zombieCard";

class CheckOut extends Component {
  state = {
    value: true,
    reason: "",
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
          .check_out(this.props.evidence.itemNumber, this.state.reason)
          .send({
            from: this.props.userAddress
          });
        this.setState({
          loading: false,
          message: "Transaction completed - thank you!"
        });
      } catch (err) {
        console.log(err);
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
          control={TextArea}
          label="Purpose for checking out this piece of evidence."
          onChange={event => this.setState( { purpose: event.target.value})}
        />
        <Form.Field
          control={Checkbox}
          label={{ children: 'I confirm that I want to check out this piece of evidence.' }}
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

export default CheckOut;
