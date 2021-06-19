import React, {Component} from 'react';
import {View, Text, StyleSheet, TextInput, Alert, Keyboard} from 'react-native';
import {
  Content,
  Container,
  Header,
  List, 
  ListItem,
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

export default class StatusUpdate extends Component {
  constructor(props) {
    super(props);
     this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.state = {
    }
  }

  handleBackButtonClick = () => {
    this.props.navigation.goBack(null);
  };

  Updatestatus = () => {
    this.props.navigation.navigate('MeasurementDetails');
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
                <Title style={styles.title}>Status Update</Title>
              </Body>
            </Col>
          </Row>
        </Header>
        <Content>
        <Content>
          <List>
            <ListItem itemDivider>
              <Text style={{fontFamily:font_title,fontSize:20}}>Order Id: 0006</Text>
            </ListItem>                    
            <ListItem>
            <Row>
            <Col>
              <Text style={{fontFamily:font_title,fontSize:18}}>Sasikumar</Text>
              <Text>Pants</Text>
              <Text>20/02/2020</Text>
              <View style={{marginTop:10}} /> 
                <Button 
                 buttonStyle={styles.btn}
                  title={'UpdateStatus'}
                  titleStyle={{
                    color: colors.theme_bg,
                    fontSize: 13,
                    fontFamily: font_title,
                  }} />    
                <View style={{marginTop:10}} />  
                 <Button
                  buttonStyle={styles.btn}
                  title={'Measurement Details'}
                  onPress={this.Updatestatus}
                  titleStyle={{
                    color: colors.theme_bg,
                    fontSize: 13,
                    fontFamily: font_title,
                  }} />      
            </Col> 
            </Row>
            </ListItem>
           <ListItem itemDivider>
              <Text style={{fontFamily:font_title,fontSize:20}}>Order Id: 0006</Text>
            </ListItem>                    
            <ListItem>
            <Row>
            <Col>
             <Text style={{fontFamily:font_title,fontSize:18}}>Sasikumar</Text>
              <Text>Pants</Text>
              <Text>20/02/2020</Text>
              <View style={{marginTop:10}} /> 
                <Button
                 buttonStyle={styles.btn}
                  title={'UpdateStatus'}
                  titleStyle={{
                    color: colors.theme_bg,
                    fontSize: 13,
                    fontFamily: font_title,
                  }} />    
                <View style={{marginTop:10}} />  
                 <Button
                  buttonStyle={styles.btn}
                  title={'Measurement Details'}
                  titleStyle={{
                    color: colors.theme_bg,
                    fontSize: 13,
                    fontFamily: font_title,
                  }} />      
            </Col> 
            </Row>
            </ListItem>
          <ListItem itemDivider>
              <Text style={{fontFamily:font_title,fontSize:20}}>Order Id: 0006</Text>
            </ListItem>                    
            <ListItem>
            <Row>
            <Col>
              <Text style={{fontFamily:font_title,fontSize:18}}>Sasikumar</Text>
              <Text>Pants</Text>
              <Text>20/02/2020</Text>
              <View style={{marginTop:10}} /> 
                <Button 
                  buttonStyle={styles.btn}
                  title={'UpdateStatus'}
                  titleStyle={{
                    color: colors.theme_bg,
                    fontSize: 13,
                    fontFamily: font_title,
                  }} />    
                <View style={{marginTop:10}} />  
                 <Button
                  buttonStyle={styles.btn}
                  title={'Measurement Details'}
                  titleStyle={{
                    color: colors.theme_bg,
                    fontSize: 13,
                    fontFamily: font_title,
                  }} />      
            </Col> 
            </Row>
            </ListItem>
            <ListItem itemDivider>
              <Text style={{fontFamily:font_title,fontSize:20}}>Order Id: 0006</Text>
            </ListItem>                    
            <ListItem>
            <Row>
            <Col>
              <Text style={{fontFamily:font_title,fontSize:18}}>Sasikumar</Text>
              <Text>Pants</Text>
              <Text>20/02/2020</Text>
              <View style={{marginTop:10}} /> 
                <Button 
                  buttonStyle={styles.btn}
                  title={'UpdateStatus'}
                  titleStyle={{
                    color: colors.theme_bg,
                    fontSize: 13,
                    fontFamily: font_title,
                  }} />    
                <View style={{marginTop:10}} />  
                 <Button
                  buttonStyle={styles.btn}
                  title={'Measurement Details'}
                  titleStyle={{
                    color: colors.theme_bg,
                    fontSize: 13,
                    fontFamily: font_title,
                  }} />      
            </Col> 
            </Row>
            </ListItem>
          </List>
        </Content>
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
   btn: {
    width: '60%',
    borderColor: colors.theme_bg,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    borderWidth:2
  },
});