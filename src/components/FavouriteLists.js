import React, { Component } from "react";
import { connect } from "react-redux";
import SearchListsContainer from "./SearchListsContainer";
import PropTypes from "prop-types";
import { getFavouriteLists } from "../redux/actions/favouriteLists";

class FavouriteLists extends Component {
  render() {
    return (
      <SearchListsContainer
        apiRequest={() => this.props.getFavouriteLists()}
        title="Favourite Lists"
        items={this.props.favouriteLists}
        searchOnMount={true}
        navigation={this.props.navigation}
      />
    );
  }
}

FavouriteLists.propTypes = {
  favouriteLists: PropTypes.array.isRequired,
  getFavouriteLists: PropTypes.func.isRequired,
  navigation: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  favouriteLists: state.favouriteLists.items
});

const mapDispatchToProps = dispatch => ({
  getFavouriteLists: () => dispatch(getFavouriteLists())
});

export default connect(mapStateToProps, mapDispatchToProps)(FavouriteLists);
