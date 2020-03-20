import 'react-native-gesture-handler';
import React, { Component } from 'react';
import AccountScreen from './src/components/AccountScreen'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainTabScreen from './src/components/MainTabScreen';
import {
  AccessToken,
  GraphRequest,
  GraphRequestManager
} from "react-native-fbsdk";
import { setUser } from './src/redux/actions/users'
import {connect} from 'react-redux';
import PropTypes from "prop-types";
import TaskScreen from './src/components/TaskScreen'
import PostScreen from './src/components/PostScreen'


const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

class App extends Component {

  componentDidMount = () => {
    console.log("Main App mounted. Checking access")
    this.checkAccess()
  }

  getUserFirstName = () => {
    return this.props.currentUser.name ? this.props.currentUser.name.split(" ")[0] : "Login"
  }

  setUserFromAccessToken = () => {
    AccessToken.getCurrentAccessToken().then(data => {
      console.log(data.accessToken.toString());
      const infoRequest = new GraphRequest(
        "/me?fields=name,picture",
        null,
        this._responseInfoCallback
      );
      // Start the graph request.
      new GraphRequestManager().addRequest(infoRequest).start();
    });
  }

  setMockUser = () => {
    this._responseInfoCallback(null, {
      id: "1234567",
      name: "Dennis Callanan"
    })
  }

  checkAccess = () => {
    this.setMockUser()
    // this.setUserFromAccessToken()
  }
  
  _responseInfoCallback = (error, result) => {
    if (error) {
      console.log("Error fetching data: ");
      console.log(error);
      this.props.setUser({})
    } else {
      this.props.setUser(result)
    }
  };

  mainTabScreen = ({ navigation }) => <MainTabScreen
      navigation={navigation}
    />

  accountScreen = ({ navigation }) => <AccountScreen 
      navigation={navigation} 
      checkAccess={this.checkAccess} 
    />

    taskScreen = ({ route, navigation }) => <TaskScreen 
      route={route}
      navigation={navigation}
    />

    postScreen = ({ route, navigation }) => <PostScreen 
      route={route}
      navigation={navigation}
    />

    mainDrawerNavigator = () => (
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={this.mainTabScreen} />
        <Drawer.Screen name={"Account (" + this.getUserFirstName() + ")"} component={this.accountScreen} />
      </Drawer.Navigator>
    )

  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false
          }}
        >
          <Stack.Screen
            name="Main"
            component={this.mainDrawerNavigator}
          />
          <Stack.Screen name="Task" component={this.taskScreen} />
          <Stack.Screen name="Post" component={this.postScreen} />
        </Stack.Navigator> 
      </NavigationContainer>
    );
  }
}

App.propTypes = {
  setUser: PropTypes.func.isRequired,
  currentUser: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  currentUser: state.users.currentUser
})

const mapDispatchToProps = (dispatch) => ({
  setUser: (currentUser) => dispatch(setUser(currentUser))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App)
