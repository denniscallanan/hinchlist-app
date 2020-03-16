import React, { Component } from 'react';
import { BottomNavigation } from 'react-native-paper';
import { SearchListsContainer } from './src/components/SearchListsContainer'


const mockLists = [
  {
    "title": "Corona Virus List",
    "desc": "List of things to do to prepare for the Corona Virus",
    "author": "Dennis Callanan",
    "id": 1
  },
  {
    "title": "Bathroom Cleaning List",
    "desc": "List of tasks for cleaning the bathroom",
    "author": "Emma Fenton",
    "id": 2,
  },
  {
    "title": "Grocery Shopping List",
    "desc": "Weekly grocery shopping liast",
    "author": "Miss Consuela",
    "id": 3
  }
]

const filter = (query, unfilteredList) => unfilteredList.filter((item) => item.title.toLowerCase().includes(query.toLowerCase()))

const myLists = () => <SearchListsContainer
  search={(query) => Promise.resolve(filter(query, mockLists.slice(1,3)))}
  title="My Lists"
/>

const myFavLists = () => <SearchListsContainer
  search={(query) => Promise.resolve(filter(query, mockLists.slice(0, 1)))}
  title="My Favourite Lists"
/>

const allLists = () => <SearchListsContainer
  search={(query) => Promise.resolve(filter(query, mockLists))}
  title="All Lists"
/>


export default class App extends Component {

  state = {
    index: 0,
    routes: [
      { key: 'mylists', title: 'My Lists', icon: 'clipboard-check' },
      { key: 'favourite', title: 'Favourites', icon: 'check-decagram' },
      { key: 'all', title: 'All Lists', icon: 'cloud-check' },
    ],
  };

  _handleIndexChange = index => this.setState({ index });

  _renderScene = BottomNavigation.SceneMap({
    mylists: myLists,
    favourite: myFavLists,
    all: allLists,
  });

  render() {
    return (
      <BottomNavigation
        navigationState={this.state}
        onIndexChange={this._handleIndexChange}
        renderScene={this._renderScene}
      />
    );
  }
}
