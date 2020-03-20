import React, { Component } from "react";
import { connect } from "react-redux";
import SearchListsContainer from "./SearchListsContainer";
import PropTypes from "prop-types";
import { searchLists } from "../redux/actions/searchedLists";

class AllLists extends Component {
  render() {
    return (
      <SearchListsContainer
        apiRequest={query => this.props.searchLists(query)}
        title="All Lists"
        items={this.props.searchedLists}
        searchOnMount={false}
        navigation={this.props.navigation}
      />
    );
  }
}

AllLists.propTypes = {};

AllLists.propTypes = {
  searchedLists: PropTypes.array.isRequired,
  searchLists: PropTypes.func.isRequired,
  navigation: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  searchedLists: state.searchedLists.items
});

const mapDispatchToProps = dispatch => ({
  searchLists: query => dispatch(searchLists(query))
});

export default connect(mapStateToProps, mapDispatchToProps)(AllLists);
