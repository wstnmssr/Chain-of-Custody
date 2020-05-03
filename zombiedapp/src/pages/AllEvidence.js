import React, { Component } from "react";
import { Card, Grid, Input, Segment, Pagination} from "semantic-ui-react";
import { connect } from "react-redux";

import EvidenceCard from "../components/evidenceCard";

function mapStateToProps(state) {
  return {
    CZ: state.CZ,
    totalZombieCount: state.totalZombieCount,
    userAddress: state.userAddress
  };
}

class AllEvidence extends Component {
  state = {
    ZombieTable: [],
    activePage: 1,
    totalPages: Math.ceil(this.props.totalZombieCount / 9)
  };

  componentDidMount = async () => {
    await this.makeZombieCards();
  };

  onChange = async (e, pageInfo) => {
    await this.setState({ activePage: pageInfo.activePage });
    this.makeZombieCards();
  };

  handleInputChange = async (e, { value }) => {
      await this.setState({ activePage: value });
      this.makeZombieCards();
  }

  makeZombieCards = async () => {
    let zList = [];
    let zOwner = [];
    await this.setState({ zombieTable: [] }); // clear screen while waiting for data

    for (
      let i = this.state.activePage * 9 - 9;
      i < this.state.activePage * 9;
      i++
    ) {
      try {
        let metaData = await this.props.CZ.methods.zombies(i).call();
        zList.push(metaData);
        let myOwner = await this.props.CZ.methods.zombieToOwner(i).call();
        zOwner.push(myOwner);
      } catch (err) {
        break;
      }
    }

    // create a set of zombie cards in the state table

    let zombieTable = [];
    for (let i = 0; i < zList.length; i++) {
      let myDate = new Date(zList[i].readyTime * 1000).toLocaleString();
      zombieTable.push(
        <EvidenceCard
          key={i}
          zombieId={this.state.activePage * 9 - 9 + i}
          zombieName={zList[i].name}
          zombieDNA={zList[i].dna}
          zombieLevel={zList[i].level}
          zombieReadyTime={myDate}
          zombieWinCount={zList[i].winCount}
          zombieLossCount={zList[i].lossCount}
          zombieOwner={zOwner[i]}
          myOwner={this.props.userAddress === zOwner[i]}
        />
      );
    }
    this.setState({ zombieTable });
  };

  render() {
    return (
      <div>
        <Segment style={{ minHeight:'1em' }} />
        <hr />
        <h2> Complete Evidence Locker </h2>
        The evidence you hold has a yellow background; clicking anywhere on a
        yellow card will bring up a list of actions you can perform.
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
          <Card.Group>{this.state.zombieTable}</Card.Group>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(AllEvidence);
