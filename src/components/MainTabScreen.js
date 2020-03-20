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
import { FAB } from "react-native-paper";

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
    mylists: () => <MyLists navigation={this.props.navigation} />,
    favourite: () => <FavouriteLists navigation={this.props.navigation} />,
    all: () => <AllLists navigation={this.props.navigation} />
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
        <Header onPress={this.props.navigation.openDrawer} />
        {navigation}
        <FAB
          style={{
            position: "absolute",
            marginRight: 36,
            marginBottom: 120,
            right: 0,
            bottom: 0
          }}
          small
          icon="plus"
          onPress={() =>
            this.props.navigation.navigate("Post", { name: "Jane" })
          }
        />
      </>
    );
  }
}

MainTabScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
  currentUser: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    currentUser: state.users.currentUser
  };
};

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(MainTabScreen);
