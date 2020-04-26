import React, { Component } from "react";
import { Searchbar, List } from "react-native-paper";
import { View, ActivityIndicator } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { ScrollView } from "react-native-gesture-handler";

class SearchListsContainer extends Component {
  state = {
    query: "",
    filteredItems: []
  };

  componentDidMount = () => {
    if (this.props.searchOnMount) {
      this.props.apiRequest().then(() => {
        this.dynamicSearchForLists("");
      });
    }
  };

  static getDerivedStateFromProps(props, state) {
    return {
      ...state,
      filteredItems: props.itemStore.items.filter(item =>
        item.title.toLowerCase().includes(state.query.toLowerCase())
      )
    };
  }

  filter = (query, unfilteredList) =>
    unfilteredList.filter(item =>
      item.title.toLowerCase().includes(query.toLowerCase())
    );

  dynamicSearchForLists = query => {
    this.setState({
      query,
      filteredItems: this.filter(query, this.props.itemStore.items)
    });
  };

  clickedSearchForLists = () => {
    if (!this.props.searchOnMount) {
      this.props.apiRequest(this.state.query).then(() => {
        this.dynamicSearchForLists("");
      });
    }
  };

  isLoading = () => {
    return this.props.itemStore.loading;
  };

  styles = {
    searchBar: {
      margin: 20
    }
  };

  getListItems = () => {
    return this.state.filteredItems.map(listItem => {
      return (
        <List.Item
          title={listItem.title}
          key={listItem.list_id}
          left={() => <List.Icon icon="check-box-multiple-outline" />}
          onPress={() => this.props.navigation.navigate("Task", { listItem })}
        />
      );
    });
  };

  render() {
    if (this.isLoading()) {
      return (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            flexDirection: "row",
            padding: 10
          }}
        >
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    }
    const { query } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <Searchbar
          style={this.styles.searchBar}
          placeholder={"Search " + this.props.title}
          onChangeText={query => {
            if (this.props.searchOnMount) {
              this.dynamicSearchForLists(query);
            } else {
              this.setState({ query });
            }
          }}
          onIconPress={this.clickedSearchForLists}
          value={query}
        />
        <List.Section style={{ flex: 1 }}>
          <List.Subheader>{this.props.title}</List.Subheader>
          <ScrollView>{this.getListItems()}</ScrollView>
        </List.Section>
      </View>
    );
  }
}

SearchListsContainer.propTypes = {
  title: PropTypes.string.isRequired,
  apiRequest: PropTypes.func.isRequired,
  currentUser: PropTypes.object.isRequired,
  itemStore: PropTypes.object.isRequired,
  searchOnMount: PropTypes.bool.isRequired,
  navigation: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  currentUser: state.users.currentUser
});

const mapDispatchToProps = () => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchListsContainer);
