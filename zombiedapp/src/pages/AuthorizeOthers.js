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

class AuthorizeOthers extends Component {
  state = {
    authorizedAgent: "",
    deauthorizedAgent: "",
    message: "",
    errorMessage: "",
    loading: false,
  };

  async componentDidMount() {
    this.setState({
    });
  }

  authorize = async event => {
    event.preventDefault();
    this.setState({
      loading: true,
      errorMessage: "",
      message: "Waiting for blockchain transaction to complete..."
    });
    try {
      await this.props.CoC.methods
        .authorize_agent(this.state.authorizedAgent)
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

  deauthorize = async event => {
    event.preventDefault();
    this.setState({
      loading: true,
      errorMessage: "",
      message: "Waiting for blockchain transaction to complete..."
    });
    try {
      await this.props.CoC.methods
          .deauthorize_agent(this.state.deauthorizedAgent)
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
      *<Header icon="browser" content="Allow others authorization to manage evidence. Ensure you have the correct permissions before proceeding." />
      <br />
      <Form onSubmit={this.authorize} error={!!this.state.errorMessage}>

        <h4 class="ui dividing header"> Authorize Someone Else</h4>
        <div class="two fields">
          <Form.Field
            control={Input}
            placeholder="Address on Ethereum"
            onChange={event => this.setState({ agentName: event.target.value })}
          />
        </div>

        <Message error header="Oops!" content={this.state.errorMessage} />
        <Link to="/">
        <Button primary type="submit" loading={this.state.loading}>
          <Icon name="check" />
          Submit
        </Button>
        </Link>

        <hr />
        <h2>{this.state.message}</h2>
      </Form>


      <Form onSubmit={this.deauthorize} error={!!this.state.errorMessage}>
        <h4 class="ui dividing header"> Remove Someone Else's Authorization</h4>
        <div class="two fields">
        <Form.Field
            control={Input}
            placeholder="Address on Ethereum"
            onChange={event => this.setState({ victimName: event.target.value })}
        />
        </div>


        <Message error header="Oops!" content={this.state.errorMessage} />
        <Link to="/">
            <Button primary type="submit" loading={this.state.loading}>
            <Icon name="check" /> Submit
            </Button>
        </Link>

        <hr />
        <h2>{this.state.message}</h2>
      </Form>
        <Link to="/AllEvidence">
            <Button color="red" inverted>
            <Icon name="cancel"/> Back to Evidence Locker
            </Button>
        </Link>
    </div>
  );
  }
}

export default connect(mapStateToProps)(AuthorizeOthers);
