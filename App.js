import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import { Provider as BlogProvider } from './src/context/BlogContext';

import IndexScreen from './src/screens/IndexScreen';
import BlogScreen from './src/screens/BlogScreen';
import CreateScreen from './src/screens/CreateScreen';
import EditScreen from './src/screens/EditScreen';

const navigator = createStackNavigator({
  Index: IndexScreen,
  Blog: BlogScreen,
  Create: CreateScreen,
  Edit: EditScreen
}, {
  initialRouteName: 'Index',
  defaultNavigationOptions: {
    title: 'Blogs'
  }
});

const App = createAppContainer(navigator);

//We do this in react and react native to allow ourselves to wrap the app
//CONTEXT vs PROPS:
//Props: directly to child, CONTEXT: to nested child
//CONTEXT: more difficult to set up
//CONTEXT: less code to pass data to super nested child
export default () => {
  return <BlogProvider>
      <App />
    </BlogProvider>
}