import * as React from 'react';
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { Provider as StoreProvider } from 'react-redux';
import { StatusBar } from 'react-native';
import createStore from './src/redux/store';


StatusBar.setBarStyle('dark-content', true);

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#3498db',
    accent: '#f1c40f',
  },
};

const store = createStore()

export default function Main() {

    return (
      <StoreProvider store={store}>
        <PaperProvider theme={theme}>
          <App />
        </PaperProvider>
      </StoreProvider>
    );
  }
  
AppRegistry.registerComponent(appName, () => Main);
