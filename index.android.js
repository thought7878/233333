/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var MainView = require('./app/main.js');

var {
  AppRegistry,
  StyleSheet,
  View,
} = React;



AppRegistry.registerComponent('AwesomeProject', () => MainView);
