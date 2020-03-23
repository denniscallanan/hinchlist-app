import React, { Component } from "react";
import { ImageBackground, View } from "react-native";
import { IconButton } from "react-native-paper";
import PropTypes from "prop-types";

class Header extends Component {
  render() {
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
        onPress={this.props.likeButtonPressed}
      />
    ) : null;

    return (
      <ImageBackground
        source={{
          uri: "https://cdn.hipwallpaper.com/i/78/42/ENmtT2.jpg"
        }}
        style={{
          height: 90,
          position: "relative" // because it's parent
        }}
      >
        <View style={{ flexDirection: "row", top: 46 }}>
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
            {likeButton}
            {starButton}
          </View>
        </View>
      </ImageBackground>
    );
  }
}

Header.propTypes = {
  onPress: PropTypes.func.isRequired,
  icon: PropTypes.string,
  likeButtonPressed: PropTypes.func,
  starButtonPressed: PropTypes.func,
  liked: PropTypes.bool,
  starred: PropTypes.bool
};

export default Header;
