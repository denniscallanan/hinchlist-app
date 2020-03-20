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

  componentDidMount = () => {
    if (this.props.searchOnMount) {
      this.props.apiRequest().then(() => {
        console.log(this.props.items);
        this.dynamicSearchForLists("");
      });
    }
  };

  filter = (query, unfilteredList) =>
    unfilteredList.filter(item =>
      item.title.toLowerCase().includes(query.toLowerCase())
    );

  dynamicSearchForLists = query => {
    this.setState({
      query,
      filteredItems: this.filter(query, this.props.items)
    });
  };

  clickedSearchForLists = () => {
    if (!this.props.searchOnMount) {
      this.props.apiRequest(this.state.query).then(() => {
        this.dynamicSearchForLists("");
      });
    }
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
        />
      );
    });
  };

  render() {
    const { query } = this.state;
    return (
      <View>
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
  apiRequest: PropTypes.func.isRequired,
  currentUser: PropTypes.object.isRequired,
  items: PropTypes.array.isRequired,
  searchOnMount: PropTypes.bool.isRequired
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
