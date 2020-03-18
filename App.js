import 'react-native-gesture-handler';
import React, { Component } from 'react';
import AccountScreen from './src/components/AccountScreen'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import MainTabScreen from './src/components/MainTabScreen';
import {
  AccessToken,
  GraphRequest,
  GraphRequestManager
} from "react-native-fbsdk";


const Drawer = createDrawerNavigator();

class App extends Component {

  state = {
    currentUser: {}
  }

  componentDidMount = () => {
    console.log("Main App mounted. Checking access")
    this.checkAccess()
  }

  updateUser = (currentUser) => {
    this.setState({currentUser})
  }

  checkAccess = () => {
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
  };
  
  _responseInfoCallback = (error, result) => {
    if (error) {
      console.log("Error fetching data: ");
      console.log(error);
      this.updateUser({})
    } else {
      this.updateUser(result)
    }
  };

  mainTabScreen = ({ navigation }) => <MainTabScreen 
        openDrawer={navigation.openDrawer}
        currentUser={this.state.currentUser} 
    />

  accountScreen = ({ navigation }) => <AccountScreen 
      openDrawer={navigation.openDrawer} 
      checkAccess={this.checkAccess} 
      updateUser={this.updateUser}
    />

  render() {
    return (
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="Home">
            <Drawer.Screen name="Home" component={this.mainTabScreen} />
            <Drawer.Screen name="Account" component={this.accountScreen} />
        </Drawer.Navigator>
      </NavigationContainer>
    );
  }
}

export default App