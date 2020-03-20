import React, { Component } from "react";
import { BottomNavigation } from "react-native-paper";
import { Text } from "react-native";
import Header from "./Header";
import _ from "lodash";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import MyLists from "./MyLists";
import AllLists from "./AllLists";
import FavouriteLists from "./FavouriteLists";

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
    mylists: () => <MyLists />,
    favourite: () => <FavouriteLists />,
    all: () => <AllLists />
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
