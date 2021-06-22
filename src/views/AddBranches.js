import React, {Component} from 'react';
import {View, Text, StyleSheet, TextInput, Alert, Keyboard} from 'react-native';
import {
  Content,
  Container,
  Header,
  Body,
  Title,
  Left,
  Row,
  Col,
} from 'native-base';
import {Button, Icon} from 'react-native-elements';
import * as colors from '../assets/css/Colors';
import {
  api_url,
  add_branches,
  font_title,
  store_img,
  font_description,
} from '../config/Constants';
import axios from 'axios';
import Snackbar from 'react-native-snackbar';
import {StatusBar, Loader} from '../components/GeneralComponents';
import {CommonActions} from '@react-navigation/native';
import LottieView from 'lottie-react-native';

export default class AddBranches extends Component {
  constructor(props) {
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.state = {
      branch_name: '',
      validation: false,
      isLoding: false,
    };
  }

  handleBackButtonClick = () => {
    this.props.navigation.goBack(null);
  };

  add_branches = async () => {
    Keyboard.dismiss();
    await this.checkValidate();
    if (this.state.validation) {
      this.setState({isLoding: true});
      await axios({
        method: 'post',
        url: api_url + add_branches,
        data: {
          branch_name: this.state.branch_name,
        },
      })
        .then(async response => {
          this.setState({isLoding: false});
          if (response.data.status == 0) {
            alert(response.data.message);
          } else {
            await this.alert_func();
          }
        })
        .catch(error => {
          this.setState({isLoding: false});
          this.showSnackbar('Something went wrong');
        });
    }
  };

  checkValidate() {
    if (this.state.branch_name == '') {
      this.setState({validation: false});
      this.showSnackbar('Branch name field required');
      return false;
    } else {
      this.setState({validation: true});
      return true;
    }
  }

  alert_func = () =>
    Alert.alert('Success', 'Branch Added Successfully', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {text: 'OK', onPress: () => this.report_src()},
    ]);

  report_src = () => {
    this.props.navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: 'Reports'}],
      }),
    );
  };

  showSnackbar(msg) {
    Snackbar.show({
      title: msg,
      duration: Snackbar.LENGTH_SHORT,
    });
  }

  render() {
    return (
      <Container>
        <View>
          <StatusBar />
        </View>
        <Header
          androidStatusBarColor={colors.theme_bg}
          style={{backgroundColor: colors.theme_bg}}>
          <Loader visible={this.state.isLoding} />
          <Row>
            <Col
              style={{
                height: '100%',
                width: '15%',
                alignSelf: 'center',
                justifyContent: 'center',
              }}>
              <Left style={styles.header}>
                <Icon
                  onPress={this.handleBackButtonClick}
                  name="arrow-back"
                  type="fontawesome"
                  size={24}
                  color="#FFFFFF"
                />
              </Left>
            </Col>
            <Col style={{height: '100%', width: '85%', alignSelf: 'center'}}>
              <Body>
                <Title style={styles.title}>Add Branch</Title>
              </Body>
            </Col>
          </Row>
        </Header>

        <Content>
          <View>
            <Text
              style={{
                fontSize: 25,
                margin: 10,
                padding: 5,
                fontFamily: font_title,
              }}>
              Enter Branch Name
            </Text>
          </View>
          <View style={styles.image_view}>
            <LottieView source={store_img} autoPlay loop={true} />
          </View>
          <View>
            <TextInput
              style={styles.textin}
              placeholder={'Branch Name'}
              onChangeText={TextInputValue =>
                this.setState({branch_name: TextInputValue})
              }
            />
          </View>

          <View style={{marginTop: 20}}>
            <Button
              onPress={() => this.add_branches()}
              buttonStyle={styles.btn}
              title={'Add'}
              titleStyle={{
                color: colors.theme_fg,
                fontSize: 20,
                fontFamily: font_title,
              }}></Button>
          </View>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontFamily: font_title,
    color: '#FFFFFF',
    marginTop: 15,
    marginRight: 30,
  },
  header: {
    alignSelf: 'center',
  },
  textin: {
    alignSelf: 'center',
    fontFamily: font_description,
    padding: 6,
    margin: 20,
    fontSize: 18,
    borderRadius: 10,
    height: 43,
    width: 300,
    borderWidth: 2,
    borderColor: 'gray',
  },
  text: {
    fontFamily: font_title,
    fontSize: 20,
    alignSelf: 'center',
  },
  btn: {
    width: 200,
    margin: 30,
    borderWidth: 2,
    borderColor: colors.theme_bg,
    backgroundColor: colors.theme_bg,
    borderRadius: 15,
    alignSelf: 'center',
  },
  image_view: {
    alignSelf: 'center',
    height: 200,
    width: 300,
  },
});
