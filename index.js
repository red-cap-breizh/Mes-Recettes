/**
 * @format
 */

import {AppRegistry} from 'react-native';
//import App from './App';
import Test from './app/vues/Test';
import Router from './app/Router';
import {name as appName} from './app.json';

//AppRegistry.registerComponent(appName, () => Test);
AppRegistry.registerComponent(appName, () => Router);
