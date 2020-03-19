import React, { Component } from "react";
import { LoginButton } from "react-native-fbsdk";
import { View } from "react-native";
import Header from "./Header";
import PropTypes from "prop-types";
import { setUser } from "../redux/actions/users";
import { connect } from "react-redux";

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
              this.props.setUser({});
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
  setUser: PropTypes.func.isRequired,
  currentUser: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  currentUser: state.users.currentUser
});

const mapDispatchToProps = dispatch => ({
  setUser: currentUser => dispatch(setUser(currentUser))
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountScreen);
