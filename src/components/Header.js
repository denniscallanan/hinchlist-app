import React, { Component } from "react";
import { ImageBackground } from "react-native";
import { IconButton } from "react-native-paper";
import PropTypes from "prop-types";

class Header extends Component {
  render() {
    return (
      <ImageBackground
        source={{
          uri: "https://cdn.hipwallpaper.com/i/78/42/ENmtT2.jpg"
        }}
        style={{
          height: 85,
          position: "relative" // because it's parent
        }}
      >
        <IconButton
          icon="menu"
          style={{ top: 40 }}
          size={24}
          onPress={this.props.openDrawer}
        />
      </ImageBackground>
    );
  }
}

Header.propTypes = {
  openDrawer: PropTypes.func.isRequired
};

export default Header;
