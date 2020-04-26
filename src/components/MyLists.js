import React, { Component } from "react";
import { connect } from "react-redux";
import SearchListsContainer from "./SearchListsContainer";
import PropTypes from "prop-types";
import { getMyLists } from "../redux/actions/myLists";

class MyLists extends Component {
  render() {
    return (
      <SearchListsContainer
        apiRequest={() => this.props.getMyLists()}
        title="My Lists"
        itemStore={this.props.myLists}
        searchOnMount={true}
        navigation={this.props.navigation}
      />
    );
  }
}

MyLists.propTypes = {
  myLists: PropTypes.object.isRequired,
  getMyLists: PropTypes.func.isRequired,
  navigation: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  myLists: state.myLists
});

const mapDispatchToProps = dispatch => ({
  getMyLists: () => dispatch(getMyLists())
});

export default connect(mapStateToProps, mapDispatchToProps)(MyLists);
