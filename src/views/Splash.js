import React, {Component} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {CommonActions} from '@react-navigation/native';
import {branch_logo} from '../config/Constants';
import * as colors from '../assets/css/Colors';
import AsyncStorage from '@react-native-community/async-storage';

export default class Splash extends Component {
  async componentDidMount() {
    await this.home();
  }

  home = async () => {
    const user_id = await AsyncStorage.getItem('user_id');
    const user_name = await AsyncStorage.getItem('user_name');
    const password = await AsyncStorage.getItem('password');

    if (user_id !== null) {
      global.id = user_id;
      global.user_name = user_name;
      global.password = password;

      this.props.navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'Reports'}],
        }),
      );
    } else {
      global.id = '';
      this.props.navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'SelectBranch'}],
        }),
      );
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.image_view}>
          <Image
            style={{flex: 1, width: undefined, height: undefined}}
            source={branch_logo}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.theme_fg,
  },
  image_view: {
    height: 150,
    width: 290,
  },
});
