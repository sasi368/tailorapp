import React, {Component} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {Content, Container, Header, Row, Col, Card} from 'native-base';
import {
  api_url,
  show_measurement_details_by_id,
  please_wait,
  font_title,
} from '../config/Constants';
import * as colors from '../assets/css/Colors';
import {StatusBar} from '../components/GeneralComponents';
import axios from 'axios';
import LottieView from 'lottie-react-native';

export default class MeasurementDetails extends Component {
  constructor(props) {
    super(props);
    this.handleBackButtonClsk = this.handleBackButtonClick.bind(this);
    this.state = {
      customer_id: this.props.route.params.customer_id,
      measurements_data: [],
      isLoding: false,
    };
  }

  handleBackButtonClick = () => {
    this.props.navigation.goBack(null);
  };

  async componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      this.show_measurement_details();
    });
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  //for showing all details
  show_measurement_details = async () => {
    await axios({
      method: 'post',
      url: api_url + show_measurement_details_by_id,
      data: {
        id: this.state.customer_id,
      },
    })
      .then(async response => {
        this.setState({measurements_data: response.data.result});
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
          androidStatusBarColor={'#F08080'}
          style={{backgroundColor: '#F08080'}}>
          <View style={{justifyContent: 'center'}}>
            <Text
              style={{color: 'white', fontSize: 20, fontFamily: font_title}}>
              Measurement Details
            </Text>
          </View>
        </Header>
        {this.state.measurements_data == '' && (
          <View>
            <View style={{height: 200, marginTop: '50%'}}>
              <LottieView source={please_wait} autoPlay loop />
            </View>
          </View>
        )}
        <FlatList
          data={this.state.measurements_data}
          renderItem={({item, index}) => (
            <Content>
              <View style={{margin: 20, marginLeft: 30}}>
                <View>
                  <Text style={{fontFamily: font_title, fontSize: 20}}>
                    {item.customer_name}
                  </Text>
                </View>

                <View>
                  <Text
                    style={{
                      fontSize: 15,
                      color: colors.theme_bg,
                      fontFamily: font_title,
                    }}>
                    {item.service_name}
                  </Text>
                </View>

                <View>
                  <Row>
                    <Col>
                      <Text
                        style={{
                          fontFamily: font_title,
                          fontSize: 18,
                          color: colors.theme_bg,
                        }}>
                        ₹ {item.service_price}
                      </Text>
                      <Text style={{color: 'gray', fontSize: 15}}>
                        {global.user_name}
                      </Text>
                    </Col>
                    <Col>
                      <Text
                        style={{
                          fontFamily: font_title,
                          fontSize: 15,
                          alignSelf: 'center',
                        }}>
                        Taken On: {item.taken_on}
                      </Text>
                    </Col>
                  </Row>
                  <View style={{marginTop: 5}} />

                  <View style={{margin: 5}} />
                </View>
              </View>
              <Card style={styles.card}>
                <Row style={{height: 50}}>
                  <Col
                    style={{
                      backgroundColor: '#F08080',
                      borderTopStartRadius: 20,
                      borderTopEndRadius: 20,
                    }}>
                    <View style={{margin: 10}}>
                      <Text
                        style={{
                          alignSelf: 'center',
                          color: 'white',
                          fontFamily: font_title,
                          fontSize: 20,
                        }}>
                        Measurements
                      </Text>
                    </View>
                  </Col>
                </Row>
                <View style={{margin: 5}} />

                <Row>
                  <Col>
                    <Text style={styles.text}>Shirt Length</Text>
                  </Col>
                  {item.shirt_length != null && item.id && (
                    <Col>
                      <Text style={styles.text}>{item.shirt_length}</Text>
                    </Col>
                  )}
                  {item.shirt_length == null && item.id && (
                    <Col>
                      <Text style={styles.text}>----</Text>
                    </Col>
                  )}
                </Row>

                <Row>
                  <Col>
                    <Text style={styles.text}>Arm Length</Text>
                  </Col>
                  {item.arm_length != null && item.id && (
                    <Col>
                      <Text style={styles.text}>{item.arm_length}</Text>
                    </Col>
                  )}
                  {item.arm_length == null && item.id && (
                    <Col>
                      <Text style={styles.text}>----</Text>
                    </Col>
                  )}
                </Row>

                <Row>
                  <Col>
                    <Text style={styles.text}>Shoulder </Text>
                  </Col>
                  {item.shoulder != null && item.id && (
                    <Col>
                      <Text style={styles.text}>{item.shoulder}</Text>
                    </Col>
                  )}
                  {item.shoulder == null && item.id && (
                    <Col>
                      <Text style={styles.text}>----</Text>
                    </Col>
                  )}
                </Row>

                <Row>
                  <Col>
                    <Text style={styles.text}>Front Neck</Text>
                  </Col>
                  {item.front_neck != null && item.id && (
                    <Col>
                      <Text style={styles.text}>{item.front_neck}</Text>
                    </Col>
                  )}
                  {item.front_neck == null && item.id && (
                    <Col>
                      <Text style={styles.text}>----</Text>
                    </Col>
                  )}
                </Row>

                <Row>
                  <Col>
                    <Text style={styles.text}>Back Neck</Text>
                  </Col>
                  {item.back_neck != null && item.id && (
                    <Col>
                      <Text style={styles.text}>{item.back_neck}</Text>
                    </Col>
                  )}
                  {item.back_neck == null && item.id && (
                    <Col>
                      <Text style={styles.text}>----</Text>
                    </Col>
                  )}
                </Row>

                <Row>
                  <Col>
                    <Text style={styles.text}>Chest</Text>
                  </Col>
                  {item.chest != null && item.id && (
                    <Col>
                      <Text style={styles.text}>{item.chest}</Text>
                    </Col>
                  )}
                  {item.chest == null && item.id && (
                    <Col>
                      <Text style={styles.text}>----</Text>
                    </Col>
                  )}
                </Row>

                <Row>
                  <Col>
                    <Text style={styles.text}>Arm Hole</Text>
                  </Col>
                  {item.arm_hole != null && item.id && (
                    <Col>
                      <Text style={styles.text}>{item.arm_hole}</Text>
                    </Col>
                  )}
                  {item.arm_hole == null && item.id && (
                    <Col>
                      <Text style={styles.text}>----</Text>
                    </Col>
                  )}
                </Row>

                <Row>
                  <Col>
                    <Text style={styles.text}>cuff</Text>
                  </Col>
                  {item.cuff != null && item.id && (
                    <Col>
                      <Text style={styles.text}>{item.cuff}</Text>
                    </Col>
                  )}
                  {item.cuff == null && item.id && (
                    <Col>
                      <Text style={styles.text}>----</Text>
                    </Col>
                  )}
                </Row>

                <Row>
                  <Col>
                    <Text style={styles.text}>Hip</Text>
                  </Col>
                  {item.hip != null && item.id && (
                    <Col>
                      <Text style={styles.text}>{item.hip}</Text>
                    </Col>
                  )}
                  {item.hip == null && item.id && (
                    <Col>
                      <Text style={styles.text}>----</Text>
                    </Col>
                  )}
                </Row>

                <Row>
                  <Col>
                    <Text style={styles.text}>Seat</Text>
                  </Col>
                  {item.seat != null && item.id && (
                    <Col>
                      <Text style={styles.text}>{item.seat}</Text>
                    </Col>
                  )}
                  {item.seat == null && item.id && (
                    <Col>
                      <Text style={styles.text}>----</Text>
                    </Col>
                  )}
                </Row>

                <Row>
                  <Col>
                    <Text style={styles.text}>Paincha</Text>
                  </Col>
                  {item.paincha != null && item.id && (
                    <Col>
                      <Text style={styles.text}>{item.paincha}</Text>
                    </Col>
                  )}
                  {item.paincha == null && item.id && (
                    <Col>
                      <Text style={styles.text}>----</Text>
                    </Col>
                  )}
                </Row>
              </Card>
            </Content>
          )}
          keyExtractor={item => item.id}
        />
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 2,
    borderRadius: 20,
    backgroundColor: colors.theme_fg,
    height: 500,
    width: 350,
    alignSelf: 'center',
  },
  text: {
    marginLeft: 20,
    fontSize: 16,
    fontFamily: font_title,
  },
  btn: {
    borderWidth: 2,
    borderColor: '#FFFFFF',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    alignSelf: 'center',
  },
});
