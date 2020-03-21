import React, { Component } from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Header from "./Header";
import { apiRequest } from "../api/client";
import { List, Checkbox, Button } from "react-native-paper";
import AsyncStorage from "@react-native-community/async-storage";

class TaskScreen extends Component {
  state = {
    tasks: [],
    allChecked: false
  };

  componentDidMount = () => {
    apiRequest("/api/tasks/lists/" + this.props.route.params.listItem.list_id, {
      method: "GET"
    })
      .then(response => {
        this.setState(
          {
            tasks: response.result.items.map(item => ({
              id: item.id,
              title: item.title,
              checked: false
            }))
          },
          () => {
            this.loadCheckState().then(data => {
              if (data && data.tasks) {
                this.setState({
                  tasks: data.tasks,
                  allChecked: data.tasks.every(task => task.checked)
                });
              }
            });
          }
        );
      })
      .catch(error => {
        console.log(error);
      });
  };

  storeCheckState = async () => {
    const storeKey = "lifelistitem_" + this.props.route.params.listItem.list_id;
    try {
      await AsyncStorage.setItem(storeKey, JSON.stringify(this.state));
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

  render() {
    return (
      <>
        <Header
          icon="arrow-left"
          onPress={() => {
            this.storeCheckState();
            this.props.navigation.navigate("Main");
          }}
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
  route: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired
};

const mapStateToProps = () => ({});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(TaskScreen);
