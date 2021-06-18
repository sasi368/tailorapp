import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  Keyboard,
  FlatList,
} from 'react-native';
import {
  Header,
  Row,
  Col,
  Content,
  Body,
  Title,
  Container,
  Left,
  Thumbnail,
  List,
  ListItem,
} from 'native-base';
import {Icon as Icn} from 'react-native-elements';
import * as colors from '../assets/css/Colors';
import {
  font_description,
  customer_icon,
  user,
  api_url,
  show_customers,
  no_data,
  font_title,
} from '../config/Constants';
import {StatusBar} from '../components/GeneralComponents';
import axios from 'axios';
import Snackbar from 'react-native-snackbar';
import LottieView from 'lottie-react-native';

export default class CustomerList extends Component {
  constructor(props) {
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.state = {
      customer_lists: [],
      validation: false,
      isLoding: false,
    };
  }

  async componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      this.show_customer();
    });
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  handleBackButtonClick = () => {
    this.props.navigation.goBack(null);
  };

  add_customer = () => {
    this.props.navigation.navigate('AddCustomer');
  };

  customer_details = id => {
    this.props.navigation.navigate('CustomerDetails', {id: id});
  };

  show_customer = async () => {
    Keyboard.dismiss();
    this.setState({isLoding: true});
    await axios({
      method: 'get',
      url: api_url + show_customers,
    })
      .then(async response => {
        this.setState({isLoding: false, customer_lists: response.data.result});
      })
      .catch(error => {
        this.setState({isLoding: false});
        //alert(error);
        this.showSnackbar('Something went wrong');
      });
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
          style={{
            backgroundColor: colors.theme_bg,
            toolbarDefaultBorder: colors.theme_bg,
          }}>
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
                <Title style={styles.title}>Select Customer</Title>
              </Body>
            </Col>
          </Row>
        </Header>

        <ScrollView>
          <Content style={styles.padding_6}>
            <View>
              <Row>
                <Col style={{width: '15%'}}>
                  <Icn
                    onPress={this.add_customer}
                    name="pluscircle"
                    type="antdesign"
                    size={30}
                    color="#000000"
                  />
                </Col>
                <Col style={{width: '40%'}}>
                  <Text style={{fontSize: 20, fontFamily: font_title}}>
                    Add Customer
                  </Text>
                </Col>
              </Row>
            </View>
            <View style={{margin: 10}} />

            {this.state.customer_lists == '' && (
              <View>
                <View style={{height: 250, marginTop: '25%'}}>
                  <LottieView source={no_data} autoPlay loop />
                </View>
                <Text
                  style={{
                    alignSelf: 'center',
                    fontFamily: font_title,
                    fontSize: 15,
                  }}>
                  No Customers Found!
                </Text>
              </View>
            )}

            <FlatList
              threshold={20}
              data={this.state.customer_lists}
              renderItem={({item, index}) => (
                <List>
                  <ListItem avatar>
                    <TouchableOpacity
                      onPress={() => this.customer_details(item.id)}
                      activeOpacity={1}>
                      {(item.gender == 'Male' || item.gender == 'male') && (
                        <Left>
                          <Thumbnail source={customer_icon} />
                        </Left>
                      )}
                      {(item.gender == 'female' || item.gender == 'Female') && (
                        <Left>
                          <Thumbnail source={user} />
                        </Left>
                      )}
                    </TouchableOpacity>
                    <Body>
                      <Text style={{fontFamily: font_title, fontSize: 18}}>
                        {item.customer_name}
                      </Text>
                      <Text note style={{fontFamily: font_description}}>
                        {item.contact_no}
                      </Text>
                    </Body>

                    {/* <Icn
                          style={{paddingLeft:5}}
                          name='trash-o'
                          type='font-awesome'
                          size={28}
                          color='#000000'
                        />  */}
                  </ListItem>
                </List>
              )}
              keyExtractor={item => item.id}
            />
          </Content>
        </ScrollView>
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
});
