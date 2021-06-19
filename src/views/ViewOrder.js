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
  show_branches,
  add_branches,
  font_title,
  font_description,
} from '../config/Constants';
import axios from 'axios';
import Snackbar from 'react-native-snackbar';
import {StatusBar, Loader} from '../components/GeneralComponents';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';
import {CommonActions} from '@react-navigation/native';
import { Table, TableWrapper, Row as Rowd, Rows, Cols, Cell } from 'react-native-table-component';

export default class ViewOrder extends Component {
  constructor(props) {
    super(props);
     this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.state = {
      HeadTable: ['OrderId', 'Customer Name', 'Service', 'Track'],
      DataTable: [
        ['0001', 'Sasi', 'Shirt', 'Check'],
        ['0002', 'Lokeshwaran', 'Pant', 'Check'],
        ['0003', 'Ramashraja', 'Kurtha', 'Check'],
        ['0004', 'Sivakumar', 'T-shirt', 'Check'],
        ['0005', 'Sakthi', 'jeans', 'Check']
      ]
    }
  }

  handleBackButtonClick = () => {
    this.props.navigation.goBack(null);
  };

  render() {
    const state = this.state;
    return (
      <Container>
        <View>
          <StatusBar />
        </View>
        <Header
          androidStatusBarColor={colors.theme_bg}
          style={{backgroundColor: colors.theme_bg}}>
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
                <Title style={styles.title}>View Order</Title>
              </Body>
            </Col>
          </Row>
        </Header>
        <Content style={styles.container}>
        <Table borderStyle={{borderWidth: 1, borderColor: '#ffa1d2'}}>
          <Rowd data={state.HeadTable} style={styles.HeadStyle} textStyle={styles.TableText}/>
          <Rows data={state.DataTable} textStyle={styles.TableText}/>
        </Table>
        </Content>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    padding: 17,
    paddingTop: 35,
    backgroundColor: '#ffffff' 
  },
   title: {
    fontSize: 18,
    fontFamily: font_title,
    color: '#FFFFFF',
    marginTop: 15,
    marginRight: 30,
  },
  HeadStyle: { 
    height: 80,
    width:'100%',
    alignContent: "center",
    backgroundColor: '#ffe0f0'
  },
  TableText: { 
    margin: 8,
    fontSize:12,
    fontWeight:'bold'
  }
});