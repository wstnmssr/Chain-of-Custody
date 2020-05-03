import React, { Component } from "react";
import {Card, Grid, Input, Segment, Pagination, Image} from "semantic-ui-react";
import { connect } from "react-redux";

import EvidenceCard from "../components/evidenceCard";

function mapStateToProps(state) {
  return {
    CoC: state.CoC,
    totalEvidenceCount: state.totalEvidenceCount,
    userAddress: state.userAddress
  };
}

class AllEvidence extends Component {
  state = {
    evidenceTable: [],
    activePage: 1,
    totalPages: Math.ceil(this.props.totalEvidenceCount / 9)
  };

  componentDidMount = async () => {
    await this.makeEvidenceCards();
  };

  onChange = async (e, pageInfo) => {
    await this.setState({ activePage: pageInfo.activePage });
    this.makeEvidenceCards();
  };

  handleInputChange = async (e, { value }) => {
      await this.setState({ activePage: value });
      this.makeEvidenceCards();
  }

  makeEvidenceCards = async () => {

    let eList = [];
    let eHolder = [];
    await this.setState({ evidenceTable: [] }); // clear screen while waiting for data

    for (
      let i = this.state.activePage * 9 - 9;
      i < this.state.activePage * 9;
      i++
    ) {
      try {
        let metaData = await this.props.CoC.methods.get_evidence(i).call();
        eList.push(metaData);
        let myHolder = await this.props.CoC.evidence_holder.call(i, function(err,res){
          console.log("oopsie i hate myself")
        });
        eHolder.push(myHolder);
      } catch (err) {
        break;
      }
    }

    // create a set of zombie cards in the state table

    let evidenceTable = [];
    for (let i = 0; i < eList.length; i++) {
      evidenceTable.push(
        <EvidenceCard
          key={i}
          itemNumber={eList[i].item_number}
          submittingAgent={eList[i].submitting_agent}
          evidenceDescription={eList[i].description_of_evidence}
          offenseDescription={eList[i].description_of_offense}
          victim={eList[i].victim_name}
          suspect={eList[i].suspect_name}
          agentPhoneNumber={eList[i].phone_number}
          condition={eList[i].condition}
          notes={eList[i].notes}
          status={eList[i].status}
          myHolder={this.props.userAddress === eHolder[eList[i].item_number]}
        />
      );
    }
    this.setState({ evidenceTable });
  };

  render() {
    return (
      <div>
        <Segment style={{ minHeight:'1em' }} />
        <hr />
        <h2> Complete Evidence Locker </h2>
        The evidence you hold has a blue background; evidence available to be checked out has a white background; evidence checked out by someone else has a red background.
        <br />To view more information about a piece of evidence and view related actions, click on the card.
        <hr />
        <Grid columns={2} verticalAlign="middle">
          <Grid.Column>
            <Segment secondary>
              <div>activePage: {this.state.activePage}</div>
              <Input
                min={1}
                max={this.state.totalPages}
                onChange={this.handleInputChange}
                type="range"
                value={this.state.activePage}
              />
            </Segment>
          </Grid.Column>
          <Grid.Column>
            <Pagination
              activePage={this.state.activePage}
              onPageChange={this.onChange}
              totalPages={this.state.totalPages}
            />
          </Grid.Column>
        </Grid>
        <br /> <br />
        <div>
          <Card.Group>{this.state.evidenceTable}</Card.Group>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(AllEvidence);
