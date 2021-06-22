import React, {Component} from 'react';
import {View, StyleSheet, Text, Keyboard} from 'react-native';
import {
  Header,
  Row,
  Col,
  Content,
  Body,
  Title,
  Container,
  Left,
} from 'native-base';
import {Icon as Icn} from 'react-native-elements';
import * as colors from '../assets/css/Colors';
import axios from 'axios';
import {
  api_url,
  customers_details,
  please_wait,
  font_title,
  font_description,
} from '../config/Constants';
import LottieView from 'lottie-react-native';

export default class CustomerDetails extends Component {
  constructor(props) {
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.state = {
      value: 0,
      isLoding: false,
      id: this.props.route.params.id,
    };
  }

  async componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      this.show_customer_details();
    });
  }

  componentWillUnmount() {
    this._unsubscribe();
  }
  handleBackButtonClick = () => {
    this.props.navigation.goBack(null);
  };

  show_customer_details = async () => {
    Keyboard.dismiss();
    await axios({
      method: 'post',
      url: api_url + customers_details,
      data: {
        customer_id: this.state.id,
      },
    })
      .then(async response => {
        this.setState({
          customer_name: response.data.result.customer_name,
          customer_code: response.data.result.customer_code,
          number: response.data.result.contact_no,
          email: response.data.result.email,
          gender: response.data.result.gender,
          branch: response.data.result.branch,
        });
      })
      .catch(error => {
        this.showSnackbar('Something went wrong');
      });
  };

  render() {
    return (
      <Container>
        <Header
          androidStatusBarColor={colors.theme_bg}
          style={{backgroundColor: '#F08080', toolbarDefaultBorder: '#FFFFFF'}}>
          <Row>
            <Col
              style={{
                height: '100%',
                width: '15%',
                alignSelf: 'center',
                justifyContent: 'center',
              }}>
              <Left style={styles.header}>
                <Icn
                  onPress={this.handleBackButtonClick}
                  name="arrow-back"
                  size={24}
                  color="#FFFFFF"
                />
              </Left>
            </Col>
            <Col style={{height: '100%', width: '85%', alignSelf: 'center'}}>
              <Body>
                <Title style={styles.title}>Customer Details</Title>
              </Body>
            </Col>
          </Row>
        </Header>

        <Content style={styles.padding_6}>
          <View>
            {this.state.customer_name == null && (
              <View>
                <View style={{height: 200, marginTop: '50%'}}>
                  <LottieView source={please_wait} autoPlay loop />
                </View>
              </View>
            )}
            {this.state.customer_name != null && (
              <Text
                style={{fontSize: 30, margin: '3%', fontFamily: font_title}}>
                {this.state.customer_name}
              </Text>
            )}

            {this.state.customer_name != null && (
              <Text
                style={{fontSize: 20, margin: '3%', fontFamily: font_title}}>
                MOBILE NUMBER
              </Text>
            )}
            {this.state.customer_name != null && (
              <Text
                style={{
                  fontSize: 15,
                  margin: '7%',
                  fontFamily: font_description,
                }}>
                {this.state.number}
              </Text>
            )}
            {this.state.customer_name != null && (
              <Text
                style={{fontSize: 20, margin: '3%', fontFamily: font_title}}>
                EMAIL
              </Text>
            )}
            {this.state.customer_name != null && (
              <Text
                style={{
                  fontSize: 15,
                  margin: '7%',
                  fontFamily: font_description,
                }}>
                {this.state.email}
              </Text>
            )}
            {this.state.customer_name != null && (
              <Text
                style={{fontSize: 20, margin: '3%', fontFamily: font_title}}>
                GENDER
              </Text>
            )}
            {this.state.customer_name != null && (
              <Text
                style={{
                  fontSize: 15,
                  margin: '7%',
                  fontFamily: font_description,
                }}>
                {this.state.gender}
              </Text>
            )}
            {this.state.customer_name != null && (
              <Text
                style={{fontSize: 20, margin: '3%', fontFamily: font_title}}>
                CUSTOMER CODE
              </Text>
            )}
            {this.state.customer_name != null && (
              <Text
                style={{
                  fontSize: 15,
                  margin: '7%',
                  fontFamily: font_description,
                }}>
                {this.state.customer_code}
              </Text>
            )}
            {this.state.customer_name != null && (
              <Text
                style={{fontSize: 20, margin: '3%', fontFamily: font_title}}>
                BRANCH
              </Text>
            )}
            {this.state.customer_name != null && (
              <Text
                style={{
                  fontSize: 15,
                  margin: '7%',
                  fontFamily: font_description,
                }}>
                {this.state.branch}
              </Text>
            )}
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
  padding_6: {
    padding: '6%',
  },
  padding_20: {
    padding: 20,
  },
  btn: {
    width: 250,
    margin: 30,
    borderWidth: 2,
    borderColor: colors.theme_bg,
    backgroundColor: colors.theme_bg,
    borderRadius: 20,
    alignSelf: 'center',
  },
});
