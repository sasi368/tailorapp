import React, {Component} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Container, Header, Row, Col, Left, Body, Title} from 'native-base';
import {Icon as Icn} from 'react-native-elements';
import * as colors from '../assets/css/Colors';
import StepIndicator from 'react-native-step-indicator';
import axios from 'axios';
import {Loader} from '../components/GeneralComponents';
import Snackbar from 'react-native-snackbar';
import {
  api_url,
  show_order_status,
  font_description,
} from '../config/Constants';

const labels = [
  'Measuring',
  'Cutting',
  'Stitching',
  'Quality Check',
  'Delivery',
];
const customStyles = {
  stepIndicatorSize: 40,
  currentStepIndicatorSize: 50,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: '#000000',
  stepStrokeWidth: 3,
  stepStrokeFinishedColor: '#000000',
  stepStrokeUnFinishedColor: '#aaaaaa',
  separatorFinishedColor: colors.theme_bg,
  separatorUnFinishedColor: '#aaaaaa',
  stepIndicatorFinishedColor: colors.theme_bg,
  stepIndicatorUnFinishedColor: '#ffffff',
  stepIndicatorCurrentColor: '#ffffff',
  stepIndicatorLabelFontSize: 13,
  currentStepIndicatorLabelFontSize: 13,
  stepIndicatorLabelCurrentColor: colors.theme_bg,
  stepIndicatorLabelFinishedColor: '#ffffff',
  stepIndicatorLabelUnFinishedColor: '#aaaaaa',
  labelColor: '#999999',
  labelSize: 20,
  currentStepLabelColor: colors.theme_bg,
};
export default class Tracking extends Component {
  constructor(props) {
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.state = {
      order_id: this.props.route.params.order_id,
      isLoding: false,
    };
    this.show_order_status();
  }

  handleBackButtonClick = () => {
    this.props.navigation.goBack(null);
  };

  show_order_status = async () => {
    this.setState({isLoding: true});
    await axios({
      method: 'post',
      url: api_url + show_order_status,
      data: {
        order_id: this.state.order_id,
      },
    })
      .then(async response => {
        this.setState({isLoding: false});
        if (response.data.status == 0) {
          alert(response.data.message);
        } else {
          this.setState({
            order_result: response.data.result.position,
            customer_name: response.data.result.customer_name,
            service_name: response.data.result.service_name,
            employee_name: response.data.result.employee_name,
          });
        }
      })
      .catch(error => {
        this.showSnackbar('No Update Status Available');
      });
  };

  showSnackbar(msg) {
    Snackbar.show({
      title: msg,
      duration: Snackbar.LENGTH_SHORT,
      backgroundColor:colors.theme_bg
    });
  }

  render() {
    return (
      <Container style={styles.container1}>
        <Header
          androidStatusBarColor={colors.theme_bg}
          style={{
            backgroundColor: colors.theme_bg,
            toolbarDefaultBorder: '#FFFFFF',
          }}>
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
                <Title style={styles.title}>Track Order</Title>
              </Body>
            </Col>
          </Row>
        </Header>

        {this.state.customer_name != null && (
          <View style={{padding: 15}}>
            {this.state.customer_name != null && (
              <Text style={{color: 'gray', fontSize: 15, margin: 5}}>
                Customer Name: {this.state.customer_name}
              </Text>
            )}
            {this.state.customer_name != null && (
              <Text style={{color: 'gray', fontSize: 15, margin: 5}}>
                Service Name: {this.state.service_name}
              </Text>
            )}
            {this.state.customer_name != null && (
              <Text style={{color: 'gray', fontSize: 15, margin: 5}}>
                Employee Name: {this.state.employee_name}
              </Text>
            )}
          </View>
        )}

        <View style={styles.container}>
          <View style={styles.stepIndicator}>
            <StepIndicator
              customStyles={customStyles}
              currentPosition={this.state.order_result}
              labels={labels}
              direction="vertical"
            />
          </View>
        </View>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#ffffff',
  },
  container1: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: colors.theme_fg,
  },
  stepIndicator: {
    marginVertical: 10,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 15,
    marginRight: 30,
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
  btn: {
    width: 250,
    margin: 10,
    borderWidth: 2,
    borderColor: colors.theme_bg,
    backgroundColor: colors.theme_bg,
    borderRadius: 20,
    alignSelf: 'center',
  },
});
