import React, { Component } from "react";
import { View, Text } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Header from "./Header";

class TaskScreen extends Component {
  componentDidMount = () => {
    console.log("Component Mounting");
    console.log(this.props.route);
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
          <Text>
            View the list of tasks here for{" "}
            {this.props.route.params.listItem.title}
          </Text>
        </View>
      </>
    );
  }
}

TaskScreen.propTypes = {
  route: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired
};

const mapStateToProps = () => ({});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(TaskScreen);
