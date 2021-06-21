import React, {Component} from 'react';
import {View, Text, StyleSheet, Keyboard, FlatList} from 'react-native';
import {Content, Container, Header, Row, Col, Card} from 'native-base';
import {Button, CheckBox, Divider} from 'react-native-elements';
import {
  api_url,
  show_measurement_details,
  update_measurement_position,
  please_wait,
  show_all_status,
  no_data,
  add_tracking,
  show_tracking_position, 
  font_title,
  font_description,
} from '../config/Constants';
import * as colors from '../assets/css/Colors';
import {StatusBar} from '../components/GeneralComponents';
import axios from 'axios';
import LottieView from 'lottie-react-native';
import UIStepper from 'react-native-ui-stepper';

export default class MeasurementDetails extends Component<props> {
  constructor(props) {
    super(props);
    this.handleBackButtonClsk = this.handleBackButtonClick.bind(this);
    this.state = {
      customer_id: this.props.route.params.customer_id,
      customer_name: '',
      service_name: '',
      employee_name: global.user_name,
      position: '',
      position_data: [],
      view_value: true,
      checked: true,
      Measuring: false,
      Cutting: false,
      Stitching: false,
      Quality: false,
      Delivery: false,
      isLoding: false,
      getvalue: [],
    };
    this.show_all_status();
  }

  async componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      this.show_measurement_details();
    }); 
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  handleBackButtonClick = () => {
    this.props.navigation.goBack(null);
  };
/*
  view_track = (customer_name, service_name, taken_on) => {
    this.props.navigation.navigate('Tracking', {
      customer_name: customer_name,
      service_name: service_name,
      taken_on: taken_on,
    });
  };
*/
  show_measurement_details = async () => {
    Keyboard.dismiss();
    await axios({
      method: 'post',
      url: api_url + show_measurement_details,
      data: {
        customer_id: this.state.customer_id,
      },
    })
      .then(async response => {
        this.setState({measurements_data: response.data.result});
      })
      .catch(error => {
        this.showSnackbar('Something went wrong');
      });
  };

  //updating a measurement api position by giving id and position field
  update_measurement_position = async (id, position) => {
    Keyboard.dismiss();
    await axios({
      method: 'post',
      url: api_url + update_measurement_position,
      data: {
        id: id,
        position: position,
      },
    })
      .then(async response => {
        //alert(JSON.stringify(response));
        /*this.setState({ measurements_data:response.data.result });*/
      })
      .catch(error => {
        this.showSnackbar('Something went wrong');
      });
  };

  show_all_status = async () => {
    Keyboard.dismiss();
    await axios({
      method: 'get',
      url: api_url + show_all_status,
    })
      .then(async response => {
        //alert(JSON.stringify(response));
        this.setState({position_data: response.data.result});
      })
      .catch(error => {
        this.showSnackbar('Something went wrong');
      });
  };

  check(item, value) {
    if (item.check) {
      item.check = false;
    } else {
      (item.check = true), this.setState({position: 1});
    }
    this.forceUpdate();
  }

  check2(item, value) {
    if (item.check2) {
      item.check2 = false;
    } else {
      (item.check2 = true), this.setState({position: 2});
    }
    this.forceUpdate();
  }

  check3(item, value) {
    if (item.check3) {
      item.check3 = false;
    } else {
      (item.check3 = true), this.setState({position: 3});
    }
    this.forceUpdate();
  }

  check4(item, value) {
    if (item.check4) {
      item.check4 = false;
    } else {
      (item.check4 = true), this.setState({position: 4});
    }
    this.forceUpdate();
  }

  check5(item, value) {
    if (item.check5) {
      item.check5 = false;
    } else {
      (item.check5 = true), this.setState({position: 5});
    }
    this.forceUpdate();
  }

  add_tracking = async (customer_name, service_name, id) => {
    Keyboard.dismiss();
    await axios({
      method: 'post',
      url: api_url + add_tracking,
      data: {
        customer_name: customer_name,
        service_name: service_name,
        employee_name: this.state.employee_name,
        position: this.state.position,
      },
    })
      .then(async response => {
        if (response.data.status == 1) {
          this.update_measurement_position(id, this.state.position);
          alert('Status Updated');
        } else {
          alert(response.data.message);
        }
      })
      .catch(error => {
        this.showSnackbar('Something went wrong');
      });
  };

  add_service_price = async (value, service_price, id) => {
    var total_price_add = parseFloat(service_price) * parseFloat(value);
    await this.setState({
      add_service_price_id: id,
      total_price_add: total_price_add,
    });
  };

  subract_service_price = async service_price => {
    let total_price_sub = parseFloat(service_price) - parseFloat(service_price);
    alert(total_price_sub);
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
              style={{color: 'white', fontSize: 22, fontFamily: font_title}}>
              INFO
            </Text>
          </View>
        </Header>
        {this.state.measurements_data == null && (
          <View>
            <View style={{height: 200, marginTop: '50%'}}>
              <LottieView source={please_wait} autoPlay loop />
            </View>
          </View>
        )}
        {this.state.measurements_data == '' && (
          <View>
            <View style={{height: 200, marginTop: '40%'}}>
              <LottieView source={no_data} autoPlay loop />
            </View>
            <Text
              style={{
                alignSelf: 'center',
                fontFamily: font_title,
                fontSize: 15,
              }}>
              No Details Found!
            </Text>
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
                      <Text style={{color: 'gray', fontSize: 15}}>
                        Taken Employee {global.user_name}
                      </Text>
                      <Text style={{color: 'gray', fontSize: 15}}>
                        Taken on {item.taken_on}
                      </Text>
                      {this.state.total_price_add == null && (
                        <Text
                          style={{
                            color: colors.theme_black,
                            fontFamily: font_title,
                            fontSize: 20,
                          }}>
                          ₹ {item.service_price}
                        </Text>
                      )}
                      {this.state.total_price_add != null &&
                        this.state.add_service_price_id == item.id && (
                          <Text
                            style={{
                              color: colors.theme_black,
                              fontFamily: font_title,
                              fontSize: 20,
                            }}>
                            ₹ {this.state.total_price_add}
                          </Text>
                        )}
                    </Col>
                   {/* <UIStepper
                      onValueChange={value => {
                        this.add_service_price(
                          value,
                          item.service_price,
                          item.id,
                        );
                      }}
                      displayValue={this.state.view_value}
                      borderColor={colors.theme_bg}
                      textColor={colors.theme_bg}
                      tintColor={colors.theme_bg}
                    />*/}
                  </Row>
                  <View style={{marginTop: 5}} />
                  {item.position != 1 &&
                    item.position != 2 &&
                    item.position != 3 &&
                    item.position != 4 &&
                    item.position != 5 &&
                    item.id && (
                      <CheckBox
                        title="Measuring"
                        checked={item.check}
                        onPress={() => this.check(item)}
                      />
                    )}
                  {item.position != 2 &&
                    item.position != 3 &&
                    item.position != 4 &&
                    item.position != 5 &&
                    item.id && (
                      <CheckBox
                        title="Cutting"
                        checked={item.check2}
                        onPress={() => this.check2(item)}
                      />
                    )}
                  {item.position != 3 &&
                    item.position != 4 &&
                    item.position != 5 &&
                    item.id && (
                      <CheckBox
                        title="Stitching"
                        checked={item.check3}
                        onPress={() => this.check3(item)}
                      />
                    )}
                  {item.position != 4 && item.position != 5 && item.id && (
                    <CheckBox
                      title="Quality"
                      checked={item.check4}
                      onPress={() => this.check4(item)}
                    />
                  )}
                  {item.position != 5 && item.id && (
                    <CheckBox
                      title="Delivery"
                      checked={item.check5}
                      onPress={() => this.check5(item)}
                    />
                  )}

                  {item.position == 5 && item.id && (
                    <CheckBox
                      title="Measuring"
                      checked={this.state.checked}
                      onPress={() => this.check(item)}
                    />
                  )}

                  {item.position == 5 && item.id && (
                    <CheckBox
                      title="Cutting"
                      checked={this.state.checked}
                      onPress={() => this.check(item)}
                    />
                  )}
                  {item.position == 5 && item.id && (
                    <CheckBox
                      title="Stitching"
                      checked={this.state.checked}
                      onPress={() => this.check(item)}
                    />
                  )}
                  {item.position == 5 && item.id && (
                    <CheckBox
                      title="Quality"
                      checked={this.state.checked}
                      onPress={() => this.check(item)}
                    />
                  )}
                  {item.position == 5 && item.id && (
                    <CheckBox
                      title="Delivery"
                      checked={this.state.checked}
                      onPress={() => this.check(item)}
                    />
                  )}

                  <View style={{margin: 5}} />

                  {item.position != 5 && item.id && (
                    <Button
                      title={'Update Work Status'}
                      titleStyle={{
                        color: colors.theme_bg,
                        fontSize: 18,
                        fontFamily: font_title,
                      }}
                      buttonStyle={styles.btn}
                      onPress={() =>
                        this.add_tracking(
                          item.customer_name,
                          item.service_name,
                          item.id,
                        )
                      }
                    />
                  )}
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
              <Divider
                style={{marginTop: 10, backgroundColor: colors.theme_bg}}
              />
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
