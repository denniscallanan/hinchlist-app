import React, { Component } from "react";
import { Searchbar, List } from "react-native-paper";
import { View } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class SearchListsContainer extends Component {
  state = {
    query: "",
    filteredItems: []
  };

  searchForLists = query => {
    this.setState({ query });
    this.props.search(query).then(filteredItems => {
      this.setState({ filteredItems });
    });
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
          key={listItem.id}
          left={() => <List.Icon icon="check-box-multiple-outline" />}
        />
      );
    });
  };

  componentDidMount = () => {
    this.searchForLists("");
  };

  render() {
    const { query } = this.state;
    return (
      <View>
        <Searchbar
          style={this.styles.searchBar}
          placeholder={"Search " + this.props.title}
          onChangeText={this.searchForLists}
          value={query}
        />
        <List.Section>
          <List.Subheader>{this.props.title}</List.Subheader>
          {this.getListItems()}
        </List.Section>
      </View>
    );
  }
}

SearchListsContainer.propTypes = {
  title: PropTypes.string.isRequired,
  search: PropTypes.func.isRequired,
  currentUser: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    currentUser: state.users.currentUser
  };
};

const mapDispatchToProps = () => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchListsContainer);
