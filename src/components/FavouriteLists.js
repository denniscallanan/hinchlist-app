import React, { Component } from "react";
import { connect } from "react-redux";
import SearchListsContainer from "./SearchListsContainer";
import PropTypes from "prop-types";
import { getFavouriteLists } from "../redux/actions/favouriteLists";

class FavouriteLists extends Component {
  render() {
    return (
      <SearchListsContainer
        apiRequest={() =>
          this.props.getFavouriteLists(this.props.currentUser.id)
        }
        title="All Lists"
        items={this.props.favouriteLists}
      />
    );
  }
}

FavouriteLists.propTypes = {
  currentUser: PropTypes.object.isRequired,
  favouriteLists: PropTypes.array.isRequired,
  getFavouriteLists: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  favouriteLists: state.favouriteLists.items,
  currentUser: state.users.currentUser
});

const mapDispatchToProps = dispatch => ({
  getFavouriteLists: () => dispatch(getFavouriteLists())
});

export default connect(mapStateToProps, mapDispatchToProps)(FavouriteLists);
