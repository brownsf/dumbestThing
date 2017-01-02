/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
} from 'react-native';

import * as firebase from 'firebase';

import ReduxWrapper from './src/containers/ReduxWrapper';
// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDXqjmv9M2FLIbbyjfGezuwDy6w-1WOsA8",
  authDomain: "dumbestthing-63e2b.firebaseapp.com",
  databaseURL: "https://dumbestthing-63e2b.firebaseio.com",
  storageBucket: "dumbestthing-63e2b.appspot.com",
  messagingSenderId: "601848698890",
};
firebase.initializeApp(firebaseConfig);

export default class DumbestThing extends Component {
  render() {
    return (<ReduxWrapper />);
  }
}

AppRegistry.registerComponent('DumbestThing', () => DumbestThing);
