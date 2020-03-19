import React, { Component } from "react";
import { BottomNavigation } from "react-native-paper";
import SearchListsContainer from "./SearchListsContainer";
import { Text } from "react-native";
import Header from "./Header";
import _ from "lodash";
import PropTypes from "prop-types";
import { connect } from "react-redux";

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

const filter = (query, unfilteredList) =>
  unfilteredList.filter(item =>
    item.title.toLowerCase().includes(query.toLowerCase())
  );

const myLists = () => (
  <SearchListsContainer
    search={query => Promise.resolve(filter(query, mockLists.slice(1, 3)))}
    title="My Lists"
  />
);

const myFavLists = () => (
  <SearchListsContainer
    search={query => Promise.resolve(filter(query, mockLists.slice(0, 1)))}
    title="My Favourite Lists"
  />
);

const allLists = () => (
  <SearchListsContainer
    search={query => Promise.resolve(filter(query, mockLists))}
    title="All Lists"
  />
);

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

  _renderScene = BottomNavigation.SceneMap({
    mylists: myLists,
    favourite: myFavLists,
    all: allLists
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
  currentUser: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    currentUser: state.users.currentUser
  };
};

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(MainTabScreen);
