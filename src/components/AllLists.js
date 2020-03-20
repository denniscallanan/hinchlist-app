import React, { Component } from "react";
import { connect } from "react-redux";
import SearchListsContainer from "./SearchListsContainer";
import { mockLists } from "../../src/constants";

class AllLists extends Component {
  render() {
    return (
      <SearchListsContainer
        apiRequest={() => Promise.resolve({})}
        title="All Lists"
        items={mockLists}
      />
    );
  }
}

AllLists.propTypes = {};

const mapStateToProps = () => ({});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(AllLists);
