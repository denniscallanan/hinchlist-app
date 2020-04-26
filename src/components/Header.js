import React, { Component } from "react";
import { ImageBackground, View, Text } from "react-native";
import { IconButton } from "react-native-paper";
import PropTypes from "prop-types";

const EXTRA_HEADER_HEIGHT = 30;

class Header extends Component {
  render() {
    const likeCount = this.props.likeButtonPressed ? (
      <Text style={{ flexDirection: "row", top: 16, right: 12 }}>
        {this.props.likeCount || 0}
      </Text>
    ) : null;

    const likeButton = this.props.likeButtonPressed ? (
      <IconButton
        icon={this.props.liked ? "thumb-up" : "thumb-up-outline"}
        style={{ flexDirection: "row" }}
        size={24}
        onPress={this.props.likeButtonPressed}
      />
    ) : null;

    const starButton = this.props.starButtonPressed ? (
      <IconButton
        icon={this.props.starred ? "star" : "star-outline"}
        style={{ flexDirection: "row" }}
        size={24}
        onPress={this.props.starButtonPressed}
      />
    ) : null;

    const deleteButton = this.props.deleteButtonPressed ? (
      <IconButton
        icon={"trash-can-outline"}
        style={{ flexDirection: "row" }}
        size={24}
        onPress={this.props.deleteButtonPressed}
      />
    ) : null;

    return (
      <ImageBackground
        source={{
          uri: "https://cdn.hipwallpaper.com/i/78/42/ENmtT2.jpg"
        }}
        style={{
          height: 50 + EXTRA_HEADER_HEIGHT,
          position: "relative" // because it's parent
        }}
      >
        <View style={{ flexDirection: "row", top: 6 + EXTRA_HEADER_HEIGHT }}>
          <IconButton
            icon={this.props.icon || "menu"}
            size={24}
            onPress={this.props.onPress}
          />
          <View
            style={{
              width: "85%",
              justifyContent: "flex-end",
              flexDirection: "row"
            }}
          >
            {likeCount}
            {likeButton}
            {starButton}
            {deleteButton}
          </View>
        </View>
      </ImageBackground>
    );
  }
}

Header.propTypes = {
  onPress: PropTypes.func.isRequired,
  icon: PropTypes.string,
  likeCount: PropTypes.number,
  likeButtonPressed: PropTypes.func,
  starButtonPressed: PropTypes.func,
  deleteButtonPressed: PropTypes.func,
  liked: PropTypes.bool,
  starred: PropTypes.bool
};

export default Header;
