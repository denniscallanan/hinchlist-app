import React, { Component } from "react";
import { BottomNavigation } from "react-native-paper";
import SearchListsContainer from "./SearchListsContainer";
import { Text } from "react-native";
import Header from "./Header";
import _ from "lodash";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getFavouriteLists } from "../redux/actions/favouriteLists";

const mockLists = [
  {
    title: "Corona Virus List",
    desc: "List of things to do to prepare for the Corona Virus",
    author: "Dennis Callanan",
    id: 1
  },
  {
    title: "Bathroom Cleaning List",
    desc: "List of tasks for cleaning the bathroom",
    author: "Emma Fenton",
    id: 2
  },
  {
    title: "Grocery Shopping List",
    desc: "Weekly grocery shopping liast",
    author: "Miss Consuela",
    id: 3
  }
];

class MainTabScreen extends Component {
  state = {
    index: 0,
    routes: [
      { key: "mylists", title: "My Lists", icon: "clipboard-check" },
      { key: "favourite", title: "Favourites", icon: "check-decagram" },
      { key: "all", title: "All Lists", icon: "cloud-check" }
    ]
  };

  _handleIndexChange = index => this.setState({ index });

  myLists = () => (
    <SearchListsContainer
      apiRequest={() => Promise.resolve({})}
      title="My Lists"
      items={mockLists}
    />
  );

  myFavLists = () => (
    <SearchListsContainer
      apiRequest={() => this.props.getFavouriteLists(this.props.currentUser.id)}
      title="My Favourite Lists"
      items={this.props.favouriteLists}
    />
  );

  allLists = () => (
    <SearchListsContainer
      apiRequest={() => Promise.resolve({})}
      title="All Lists"
      items={mockLists}
    />
  );

  _renderScene = BottomNavigation.SceneMap({
    mylists: this.myLists,
    favourite: this.myFavLists,
    all: this.allLists
  });

  render() {
    let navigation = (
      <BottomNavigation
        navigationState={this.state}
        onIndexChange={this._handleIndexChange}
        renderScene={this._renderScene}
      />
    );

    if (_.isEmpty(this.props.currentUser)) {
      navigation = <Text>Please log in at the account screen to continue</Text>;
    }

    return (
      <>
        <Header openDrawer={this.props.openDrawer} />
        {navigation}
      </>
    );
  }
}

MainTabScreen.propTypes = {
  openDrawer: PropTypes.func.isRequired,
  currentUser: PropTypes.object.isRequired,
  getFavouriteLists: PropTypes.func.isRequired,
  favouriteLists: PropTypes.array.isRequired
};

const mapStateToProps = state => {
  return {
    currentUser: state.users.currentUser,
    favouriteLists: state.favouriteLists.items
  };
};

const mapDispatchToProps = dispatch => ({
  getFavouriteLists: userID => dispatch(getFavouriteLists(userID))
});

export default connect(mapStateToProps, mapDispatchToProps)(MainTabScreen);
