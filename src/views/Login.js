import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import {Container, Header, Left, Right, Content, Body} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Input, Button} from 'react-native-elements';
import * as colors from '../assets/css/Colors';
import {CommonActions} from '@react-navigation/native';
import {font_title, profile_icon, api_url, login} from '../config/Constants';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import Snackbar from 'react-native-snackbar';
import {StatusBar, Loader} from '../components/GeneralComponents';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.state = {
      user_name: '',
      password: '',
      branch: this.props.route.params.branch_name,
      validation: false,
      isLoding: false,
    };
    //alert(this.state.branch);
  }

  handleBackButtonClick = () => {
    this.props.navigation.goBack(null);
  };

  reports = () => {
    this.props.navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: 'Reports'}],
      }),
    );
  };

  login = async () => {
    Keyboard.dismiss();
    await this.checkValidate();
    if (this.state.validation) {
      this.setState({isLoding: true});
      await axios({
        method: 'post',
        url: api_url + login,
        data: {
          user_name: this.state.user_name,
          password: this.state.password,
        },
      })
        .then(async response => {
          this.setState({isLoding: false});
          //alert(JSON.stringify(response));
          if (
            (response.data.status == 1 &&
              response.data.result.branch == this.state.branch) ||
            this.state.user_name == 'admin'
          ) {
            this.saveData(response.data);
          } else if (response.data.status == 0) {
            alert(response.data.message);
          } else if (response.data.result.branch != this.state.branch) {
            alert('check your branch!');
          }
        })
        .catch(error => {
          this.setState({isLoding: false});
          //alert(error);
          this.showSnackbar('Something went wrong');
        });
    }
  };

  checkValidate() {
    if (this.state.user_name == '') {
      this.setState({validation: false});
      this.showSnackbar('Username is required');
      return false;
    } else if (this.state.password == '') {
      this.setState({validation: false});
      this.showSnackbar('Password is required');
      return false;
    } else {
      this.setState({validation: true});
      return true;
    }
  }

  saveData = async data => {
    if (data.status == 1) {
      try {
        await AsyncStorage.setItem('user_id', data.result.id.toString());
        await AsyncStorage.setItem(
          'user_name',
          data.result.user_name.toString(),
        );
        await AsyncStorage.setItem('password', data.result.password.toString());
        await AsyncStorage.setItem('branch', data.result.branch.toString());
        global.id = await data.result.id;
        global.user_name = await data.result.user_name;
        global.password = await data.result.password;
        global.branch = await data.result.branch;
        await this.reports();
      } catch (e) {
        console.log(e);
      }
    } else {
      alert(this.props.message);
    }
  };

  showSnackbar(msg) {
    Snackbar.show({
      title: msg,
      duration: Snackbar.LENGTH_SHORT,
    });
  }

  render() {
    return (
      <Container style={styles.container}>
        <View>
          <StatusBar />
        </View>
        <Header androidStatusBarColor={colors.theme_bg} style={styles.header}>
          <Loader visible={this.state.isLoding} />
          <Left style={styles.left}>
            <TouchableOpacity
              style={{width: 100}}
              onPress={() => this.handleBackButtonClick()}
              activeOpacity={1}>
              <FontAwesome
                name="chevron-left"
                size={20}
                color="black"
                style={{marginLeft: 10}}
              />
            </TouchableOpacity>
          </Left>
          <Body style={styles.body}>
            <Image style={styles.img_style} source={profile_icon} />
          </Body>
          <Right />
        </Header>
        <Content style={styles.content}>
          <View style={styles.content}>
            <Text style={styles.txt_style}>Enter user name </Text>
            <Text style={styles.txt_style}>and password</Text>
          </View>
          <View style={styles.margin_10} />
          <Input
            placeholder="Enter your name"
            label={'User Name'}
            leftIcon={<Icon name="user" size={24} color="black" />}
            onChangeText={TextInputValue =>
              this.setState({user_name: TextInputValue})
            }
          />
          <Input
            label={'Password'}
            placeholder="Enter your password"
            secureTextEntry={this.state.password.length === 0 ? false : true}
            leftIcon={<Icon name="lock" size={24} color="black" />}
            onChangeText={TextInputValue =>
              this.setState({password: TextInputValue})
            }
          />
          <View style={styles.margin_10} />
          <Button
            title="Login"
            buttonStyle={styles.buttonStyle}
            onPress={this.login}
          />
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.theme_fg,
  },
  header: {
    backgroundColor: colors.theme_white,
  },
  content: {
    padding: '5%',
  },
  body: {
    alignItems: 'center',
  },
  txt_style: {
    fontSize: 35,
    fontFamily: font_title,
  },
  buttonStyle: {
    borderRadius: 20,
    height: 45,
    width: '90%',
    backgroundColor: colors.theme_bg,
    alignSelf: 'center',
  },
  inputStyle: {
    fontSize: 18
  },
  margin_10: {
    margin: 10,
  },
  left: {
    flex: 1,
  },
  img_style: {
    width: 50,
    height: 50,
  },
});
