import React, { Component } from "react";
import { Button, Card, FAB, TextInput, Surface } from "react-native-paper";
import { ScrollView, Alert } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Header from "./Header";
import { postMyListsSuccess } from "../redux/actions/myLists";
import { apiRequest } from "../api/client";

class PostScreen extends Component {
  state = {
    title: "",
    description: "",
    tasks: [""]
  };

  upsertList = list => {
    apiRequest("/api/lists", {
      method: "POST",
      body: JSON.stringify(list)
    })
      .then(response => {
        console.log(response);
        this.props.postMyListsSuccess(response.result);
        this.props.navigation.navigate("Main");
      })
      .catch(error => {
        console.log(error);
      });
  };

  submitForm = () => {
    const form = {
      ...this.state,
      tasks: this.state.tasks.filter(task => task && task.length > 0)
    };
    if (form.tasks.length < 3) {
      Alert.alert("List must contain at least 3 tasks.");
      return;
    }
    if (this.state.title.length < 4 || this.state.title.length > 40) {
      Alert.alert("Title should be between 4 and 40 characters");
      return;
    }
    this.upsertList(form);
  };

  render() {
    return (
      <>
        <Header
          icon="arrow-left"
          onPress={() => this.props.navigation.navigate("Main")}
        />
        <Card style={{ flexDirection: "column", flex: 1 }}>
          <Card.Title
            title="Create List"
            subtitle={this.props.currentUser.name}
          />
          <Surface>
            <TextInput
              label="Title"
              value={this.state.title}
              mode="flat"
              onChangeText={title => this.setState({ title })}
              style={{ backgroundColor: "#FAFAFA" }}
            />
            <TextInput
              label="Description"
              value={this.state.description}
              mode="flat"
              onChangeText={description => this.setState({ description })}
              style={{ backgroundColor: "#FAFAFA" }}
            />
          </Surface>
          <Card.Title
            title="Tasks"
            subtitle="20 tasks maximum"
            style={{ marginTop: 10 }}
          />
          <Surface
            style={{
              flex: 1
            }}
          >
            <ScrollView>
              {this.state.tasks.map((task, idx) => {
                return (
                  <TextInput
                    key={idx}
                    label={"Task " + (idx + 1)}
                    value={task}
                    mode="flat"
                    onChangeText={task => {
                      const tasks = this.state.tasks;
                      tasks[idx] = task;
                      this.setState({ tasks });
                    }}
                    style={{ backgroundColor: "#FAFAFA" }}
                  />
                );
              })}
            </ScrollView>
          </Surface>
          <Card.Actions>
            <Button onPress={this.submitForm}>Submit</Button>
          </Card.Actions>
        </Card>
        <FAB
          style={{
            position: "absolute",
            marginRight: 36,
            marginBottom: 0,
            right: 0,
            bottom: "12%",
            backgroundColor: "green"
          }}
          onPress={() => {
            const tasks = this.state.tasks;
            if (tasks.length >= 20) {
              return;
            }
            tasks.push("");
            this.setState({ tasks });
          }}
          small
          icon="plus"
        />
        <FAB
          style={{
            position: "absolute",
            marginRight: 86,
            marginBottom: 0,
            right: 0,
            bottom: "12%",
            backgroundColor: "red"
          }}
          onPress={() => {
            const tasks = this.state.tasks;
            tasks.pop();
            this.setState({ tasks });
          }}
          small
          icon="minus"
        />
      </>
    );
  }
}

PostScreen.propTypes = {
  currentUser: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
  postMyListsSuccess: PropTypes.func.isRequired,
  listId: PropTypes.string
};

const mapStateToProps = state => ({
  currentUser: state.users.currentUser
});

const mapDispatchToProps = dispatch => ({
  postMyListsSuccess: list => dispatch(postMyListsSuccess(list))
});

export default connect(mapStateToProps, mapDispatchToProps)(PostScreen);
