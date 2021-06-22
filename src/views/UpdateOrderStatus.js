import React, {Component} from 'react';
import {View, Text, StyleSheet, Keyboard, FlatList} from 'react-native';
import {Content, Container, Header, Row, Col} from 'native-base';
import {Button, CheckBox} from 'react-native-elements';
import {
  api_url,
  show_measurement_details_by_id,
  update_measurement_position,
  show_all_status,
  add_tracking,
  font_title,
} from '../config/Constants';
import * as colors from '../assets/css/Colors';
import {StatusBar} from '../components/GeneralComponents';
import axios from 'axios';

export default class UpdateOrderStatus extends Component {
  constructor(props) {
    super(props);
    this.handleBackButtonClsk = this.handleBackButtonClick.bind(this);
    this.state = {
      customer_id: this.props.route.params.customer_id,
      customer_name: '',
      measurements_data: [],
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

  //handling check boxes
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

  //showing positions
  show_all_status = async () => {
    Keyboard.dismiss();
    await axios({
      method: 'get',
      url: api_url + show_all_status,
    })
      .then(async response => {
        this.setState({position_data: response.data.result});
      })
      .catch(error => {
        this.showSnackbar('Something went wrong');
      });
  };

  //for showing all datas
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

  //for add tracking status
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
              style={{color: 'white', fontSize: 18, fontFamily: font_title}}>
              Work Update
            </Text>
          </View>
        </Header>

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
                    </Col>
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
