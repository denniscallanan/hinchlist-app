import React, { Component } from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Header from "./Header";
import { apiRequest } from "../api/client";
import { List, Checkbox, Button } from "react-native-paper";
import AsyncStorage from "@react-native-community/async-storage";
import {
  addFavouriteListsSuccess,
  deleteFavouriteListsSuccess
} from "../redux/actions/favouriteLists";
import { deleteMyLists } from "../redux/actions/myLists";

class TaskScreen extends Component {
  state = {
    tasks: [],
    allChecked: false,
    favourited: false,
    liked: false
  };

  componentDidMount = () => {
    console.log("Task component mounting");
    this.getTaskData();
    this.getFavouritesData();
    this.getLikedData();
  };

  getTaskData = () => {
    apiRequest("/api/tasks/lists/" + this.props.route.params.listItem.list_id, {
      method: "GET"
    })
      .then(response => {
        console.log(response);
        this.setState(
          {
            tasks: response.result.items.map(item => ({
              ...item,
              checked: false
            }))
          },
          () => {
            this.loadCheckState().then(data => {
              if (data && data.tasks && data.tasks.length > 0) {
                console.log("Found local stored check state");
                console.log(data);
                this.setState(
                  {
                    tasks: data.tasks,
                    allChecked: data.tasks.every(task => task.checked)
                  },
                  () => {
                    console.log(this.state.tasks);
                  }
                );
              }
            });
          }
        );
      })
      .catch(error => {
        console.log(error);
      });
  };

  getFavouritesData = () => {
    apiRequest(
      "/api/favourites/lists/" + this.props.route.params.listItem.list_id,
      {
        method: "GET"
      }
    ).then(response => {
      this.setState({ favourited: response.result.favourited });
    });
  };

  getLikedData = () => {
    apiRequest("/api/votes/lists/" + this.props.route.params.listItem.list_id, {
      method: "GET"
    }).then(response => {
      this.setState({ liked: response.result.liked });
    });
    apiRequest(
      "/api/votes/counts/" + this.props.route.params.listItem.list_id,
      {
        method: "GET"
      }
    ).then(response => {
      this.setState({ count: response.result.count });
    });
  };

  storeCheckState = async () => {
    const storeKey = "lifelistitem_" + this.props.route.params.listItem.list_id;
    try {
      await AsyncStorage.setItem(
        storeKey,
        JSON.stringify({ tasks: this.state.tasks })
      );
    } catch (error) {
      console.log("Error storing to check state: " + error);
    }
  };

  loadCheckState = async () => {
    const storeKey = "lifelistitem_" + this.props.route.params.listItem.list_id;
    try {
      const item = await AsyncStorage.getItem(storeKey);
      return JSON.parse(item);
    } catch (error) {
      console.log("Error loading from check state: " + error);
    }
  };

  toggleTaskCheck = idx => {
    const tasks = this.state.tasks;
    tasks[idx] = { ...tasks[idx], checked: !tasks[idx].checked };
    this.setState({ tasks });
  };

  getTaskItems = () => {
    return this.state.tasks.map((taskItem, idx) => {
      return (
        <List.Item
          title={taskItem.title}
          key={taskItem.id}
          left={() => (
            <Checkbox
              color={taskItem.checked ? "green" : "red"}
              status={taskItem.checked ? "checked" : "indeterminate"}
              onPress={() => {
                this.toggleTaskCheck(idx);
              }}
            />
          )}
        />
      );
    });
  };

  checkAll = () => {
    this.setState({
      tasks: this.state.tasks.map(taskItem => ({
        ...taskItem,
        checked: !this.state.allChecked
      })),
      allChecked: !this.state.allChecked
    });
  };

  stateButtonPressed = (apiPath, stateKey) => {
    const urlPath =
      "/api/" +
      apiPath +
      "/" +
      (this.state[stateKey] ? "take" : "give") +
      "/" +
      this.props.route.params.listItem.list_id;
    apiRequest(urlPath, {
      method: "POST"
    }).then(response => {
      if (response.result && response.result.status) {
        this.setState({ [stateKey]: !this.state[stateKey] }, () => {
          if (stateKey === "favourited" && this.state[stateKey]) {
            this.props.addFavouriteListsSuccess(
              this.props.route.params.listItem
            );
          } else {
            this.props.deleteFavouriteListsSuccess(
              this.props.route.params.listItem.list_id
            );
          }
        });
      }
    });
  };

  likeButtonPressed = () => {
    this.stateButtonPressed("votes", "liked");
  };

  starButtonPressed = () => {
    this.stateButtonPressed("favourites", "favourited");
  };

  deleteButtonPressed = () => {
    this.props.deleteMyLists(this.props.route.params.listItem.list_id);
    this.props.deleteFavouriteListsSuccess(
      this.props.route.params.listItem.list_id
    );
    this.props.navigation.navigate("Main");
  };

  render() {
    return (
      <>
        <Header
          icon="arrow-left"
          onPress={() => {
            this.storeCheckState();
            this.props.navigation.navigate("Main");
          }}
          likeCount={this.state.count}
          likeButtonPressed={this.likeButtonPressed}
          starButtonPressed={this.starButtonPressed}
          deleteButtonPressed={
            this.props.currentUser.user_id ===
            this.props.route.params.listItem.author_id
              ? this.deleteButtonPressed
              : null
          }
          liked={this.state.liked}
          starred={this.state.favourited}
        />
        <View>
          <List.Section>
            <List.Subheader>
              {this.props.route.params.listItem.title}
            </List.Subheader>
            {this.getTaskItems()}
          </List.Section>
          <Button onPress={this.checkAll}>
            {this.state.allChecked ? "Uncheck all" : "Check all"}
          </Button>
        </View>
      </>
    );
  }
}

TaskScreen.propTypes = {
  currentUser: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
  addFavouriteListsSuccess: PropTypes.func.isRequired,
  deleteFavouriteListsSuccess: PropTypes.func.isRequired,
  deleteMyLists: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  currentUser: state.users.currentUser
});

const mapDispatchToProps = dispatch => ({
  deleteMyLists: listId => dispatch(deleteMyLists(listId)),
  addFavouriteListsSuccess: list => dispatch(addFavouriteListsSuccess(list)),
  deleteFavouriteListsSuccess: listId =>
    dispatch(deleteFavouriteListsSuccess(listId))
});

export default connect(mapStateToProps, mapDispatchToProps)(TaskScreen);
