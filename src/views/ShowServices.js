import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, Keyboard, FlatList} from 'react-native';
import {
  Content,
  Container,
  Header,
  Row,
  Col,
  Card,
  Left,
  Title,
  Body,
} from 'native-base';
import {
  api_url,
  img_url,
  show_services,
  please_wait,
  font_title,
} from '../config/Constants';
import * as colors from '../assets/css/Colors';
import {Icon} from 'react-native-elements';
import {StatusBar} from '../components/GeneralComponents';
import axios from 'axios';
import LottieView from 'lottie-react-native';

export default class ShowServices extends Component {
  constructor(props) {
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.state = {
      services_lists: [],
      validation: false,
      isLoding: false,
    };
    this.show_services();
  }

  handleBackButtonClick = () => {
    this.props.navigation.goBack(null);
  };

  show_services = async () => {
    Keyboard.dismiss();
    this.setState({isLoding: true});
    await axios({
      method: 'get',
      url: api_url + show_services,
    })
      .then(async response => {
        this.setState({isLoding: false, services_lists: response.data.result});
      })
      .catch(error => {
        this.setState({isLoding: false});
        //alert(error);
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
          androidStatusBarColor={'#F08080'}
          style={{backgroundColor: '#F08080'}}>
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
                  onPress={() => this.handleBackButtonClick()}
                  name="arrow-back"
                  type="fontawesome"
                  size={24}
                  color="#FFFFFF"
                />
              </Left>
            </Col>
            <Col style={{height: '100%', width: '85%', alignSelf: 'center'}}>
              <Body>
                <Title style={styles.title}>Services</Title>
              </Body>
            </Col>
          </Row>
        </Header>

        <Content style={{paddingLeft: 10}}>
          <View style={styles.margin_5} />
          {this.state.services_lists == '' && (
            <View>
              <View style={{height: 250, marginTop: '50%'}}>
                <LottieView source={please_wait} autoPlay loop />
              </View>
            </View>
          )}

          <View>
            <FlatList
              data={this.state.services_lists}
              numColumns={2}
              renderItem={({item, index}) => (
                <Row>
                  <Col style={styles.padding_style}>
                    <Card style={styles.card}>
                      <Text style={styles.text}>{item.service_name}</Text>
                      <Image
                        source={{uri: img_url + item.service_img}}
                        resizeMode="contain"
                        style={styles.img}></Image>
                      <Text style={styles.price_text}>
                        ₹ {item.service_price}
                      </Text>
                    </Card>
                  </Col>
                </Row>
              )}
              keyExtractor={item => item.id}
            />
          </View>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    padding: 2,
    height: 190,
    width: 170,
    backgroundColor: colors.theme_fg,
    borderRadius: 20,
  },
  text: {
    fontFamily: font_title,
    fontSize: 16,
    alignSelf: 'center',
  },
  price_text: {
    fontFamily: font_title,
    fontSize: 14,
    alignSelf: 'center',
  },
  view_style: {
    justifyContent: 'center',
  },
  text_style: {
    color: 'white',
    alignSelf: 'center',
    fontSize: 20,
    fontFamily: font_title,
  },
  img: {
    alignSelf: 'center',
    marginTop: 10,
    height: 120,
    width: '80%',
  },
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
  padding_style: {
    padding: 2,
  },
  margin_5: {
    margin: 5,
  },
  icon: {
    marginLeft: 10,
    marginTop: 10,
  },
});
