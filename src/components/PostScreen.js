import React, { Component } from "react";
import { View, Text } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Header from "./Header";

class PostScreen extends Component {
  componentDidMount = () => {
    // make API call to get tasks
  };

  render() {
    return (
      <>
        <Header
          icon="arrow-left"
          onPress={() =>
            this.props.navigation.navigate("Main", { name: "Jane" })
          }
        />
        <View>
          <Text>Post a new Life list here</Text>
        </View>
      </>
    );
  }
}

PostScreen.propTypes = {
  route: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired
};

const mapStateToProps = () => ({});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(PostScreen);
