import React, {Component} from 'react';
import {View, Text, StyleSheet, Keyboard, FlatList} from 'react-native';
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
  no_data,
  font_title,
  show_all_measurements,
  show_measurement_details_by_branch,
} from '../config/Constants';
import axios from 'axios';
import {StatusBar} from '../components/GeneralComponents';
import LottieView from 'lottie-react-native';
import Snackbar from 'react-native-snackbar';

export default class StatusUpdate extends Component {
  constructor(props) {
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.state = {
      order_datas: [],
      orders_by_branch: [],
      isLoding: false,
    };
  }

  handleBackButtonClick = () => { 
    this.props.navigation.goBack(null);
  };
  
  async componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      this.show_measurement_details_by_branch();
    });
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  view_details = id => {
    this.props.navigation.navigate('ViewMeasurementDetails', {customer_id: id});
  };

  update_status = id => {
    this.props.navigation.navigate('UpdateOrderStatus', {customer_id: id});
  };

  showSnackbar(msg) {
    Snackbar.show({
      title: msg,
      duration: Snackbar.LENGTH_SHORT,
      backgroundColor:colors.theme_bg
    });
  }

  show_measurement_details_by_branch = async () => {
    Keyboard.dismiss();
    await axios({
      method: 'post',
      url: api_url + show_measurement_details_by_branch,
      data: {
        branch: global.branch,
      },
    })
      .then(async response => {
        this.setState({orders_by_branch: response.data.result});
      })
      .catch(error => {
        this.showSnackbar('Something went wrong');
      });
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
        {this.state.orders_by_branch == '' && (
          <View>
            <View style={{height: 250, marginTop: '40%'}}>
              <LottieView source={no_data} autoPlay loop />
            </View>
            <Text
              style={{
                alignSelf: 'center',
                fontFamily: font_title,
                fontSize: 15,
              }}>
              No Orders Available!
            </Text>
          </View>
        )}

        <FlatList
          data={this.state.orders_by_branch}
          renderItem={({item, index}) => (
            <Content>
              <List>
                <ListItem itemDivider>
                  <Text style={{fontFamily: font_title, fontSize: 20}}>
                    Order Id: {item.id}
                  </Text>
                </ListItem>
                <ListItem>
                  <Row>
                    <Col>
                      <Text style={{fontFamily: font_title, fontSize: 18}}>
                        {item.customer_name}
                      </Text>
                      <Text>{item.service_name}</Text>
                      <Text>{item.taken_on}</Text>
                      <View style={{marginTop: 10}} />             
                   
                        <Button
                          buttonStyle={styles.btn}
                          onPress={() => this.update_status(item.id)}
                          title={'UpdateStatus'}
                          titleStyle={{
                            color: colors.theme_bg,
                            fontSize: 13,
                            fontFamily: font_title,
                          }}
                        />
                      
                      <View style={{marginTop: 10}} />
                    
                        <Button
                          buttonStyle={styles.btn}
                          onPress={() => this.view_details(item.id)}
                          title={'Measurement Details'}
                          titleStyle={{
                            color: colors.theme_bg,
                            fontSize: 13,
                            fontFamily: font_title,
                          }}
                        />
                     
                    </Col>
                  </Row>
                </ListItem>
              </List>
            </Content>
          )}
          keyExtractor={item => item.id}
        />
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 17,
    paddingTop: 35,
    backgroundColor: '#ffffff',
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
    borderWidth: 2,
  },
});
