import React, {Component} from 'react';
import {View, Text, StyleSheet, TextInput, Alert, Keyboard,FlatList} from 'react-native';
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
  show_all_measurements,
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

export default class ViewOrder extends Component {
  constructor(props) {
    super(props);
     this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.state = {
      customer_name: '',
      order_datas:[],
      isLoding: false,
    }
    this.show_order_details(); 
  }

  handleBackButtonClick = () => { 
    this.props.navigation.goBack(null);
  };

  show_tracking = order_id => {
    this.props.navigation.navigate('Tracking', {order_id: order_id});
  };

  show_order_details = async () => {
    Keyboard.dismiss();
    await axios({
      method: 'get',
      url: api_url + show_all_measurements,
    })
      .then(async response => {
        //alert(JSON.stringify(response));
        this.setState({order_datas: response.data.result});
      })
      .catch(error => {
        this.showSnackbar('Something went wrong');
      }); 
  };


  render() {

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
                <Title style={styles.title}>View Orders</Title>
              </Body>
            </Col>
          </Row> 
        </Header>
          <FlatList
              data={this.state.order_datas}
              renderItem={({item, index}) => (
                <Content>
               
                  <List>
                    <ListItem itemDivider>
                      <Row>
                      <Col>
                      <Text style={{fontFamily:font_title,fontSize:20}}>Order Id: {item.id}</Text>
                       <Text style={{fontSize:14,fontFamily:font_title,color:colors.theme_bg}} onPress={() => this.show_tracking(item.id)}>Track Order</Text>
                      </Col>
                      </Row>
                    </ListItem>                    
                    <ListItem>
                    <Row>
                    <Col>
                      <Text style={{fontFamily:font_title,fontSize:18}}>{item.customer_name}</Text>
                      <Text>{item.service_name}</Text>
                      <Text>{item.taken_on}</Text>
                         
                    </Col> 
                    </Row>
                    </ListItem>
                  </List>
                  
                </Content>
            )}
              keyExtractor={item => item.id}
            />
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