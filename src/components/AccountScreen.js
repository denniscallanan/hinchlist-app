import React, { Component } from "react";
import { LoginButton } from "react-native-fbsdk";
import { View } from "react-native";
import Header from "./Header";
import PropTypes from "prop-types";

class AccountScreen extends Component {
  render() {
    return (
      <>
        <Header openDrawer={this.props.openDrawer} />
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <LoginButton
            readPermissions={["public_profile"]}
            onLoginFinished={(error, result) => {
              if (error) {
                console.log("login has error: " + result.error);
              } else if (result.isCancelled) {
                console.log("login is cancelled.");
              } else {
                console.log("Login finished. Checking access");
                this.props.checkAccess();
              }
            }}
            onLogoutFinished={() => {
              this.props.updateUser({});
            }}
          />
        </View>
      </>
    );
  }
}

AccountScreen.propTypes = {
  openDrawer: PropTypes.func.isRequired,
  checkAccess: PropTypes.func.isRequired,
  updateUser: PropTypes.func.isRequired
};

export default AccountScreen;
