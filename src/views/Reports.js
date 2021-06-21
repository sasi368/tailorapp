import React, {Component} from 'react';
import {View, Text, StyleSheet,Picker,Keyboard} from 'react-native';
import {
  Content,
  Container,
  Header,
  Body,
  Title,
  Left,
  Row,
  Col,
  Card,
} from 'native-base';
import {Icon as Icn, Button} from 'react-native-elements'; 
import {
  api_url,
  show_all_measurements,
  show_count_by_date,
  show_customers,
  show_all_status,
  show_today_by_date,
  show_branches,
  font_title,
  font_description,
} from '../config/Constants';
import * as colors from '../assets/css/Colors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {StatusBar} from '../components/GeneralComponents';
import DateTimePicker from 'react-native-modal-datetime-picker';
import Moment from 'moment';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import Menu, {MenuItem, MenuDivider} from 'react-native-material-menu';

export default class Reports extends Component {
  _menu = null;
  _menu2 = null;
  constructor(props) {
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.drawer = this.drawer.bind(this);
    this.state = {
      order_list: '',
      total_count: 0,
      taken_on: '',
      branch: '',
      branch_lists: [],
      branch_name:'',
      branch_name2:'',
      todayDatePickerVisible: false,
      fromDatePickerVisible: false,
      toDatePickerVisible: false,
      today_date: '',
      from_date: '',
      to_date: '',
    };
    this.show_branches();
  }

  async componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      this.show_customers_count();
      this.sales_lists();
      this.show_all_sales();
    });
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  setMenuRef = ref => {
    this._menu = ref;
  };
  setMenuRef2 = ref => {
    this._menu2 = ref;
  };
  hideMenu1 = () => {
    this._menu.hide();
    this.setState({branch: 'MainBranch'});
    this.saveTodayDate();
  };

  hideMenu2 = () => {
    this._menu.hide();
    this.setState({branch: 'SubBranch'});
    this.saveTodayDate();
  };

  hideMenu3 = () => {
    this._menu2.hide();
    this.setState({branch_type2: 'MainBranch'});
    this.saveFromDate();
  };

  hideMenu4 = () => {
    this._menu2.hide();
    this.setState({branch_type2: 'SubBranch'});
    this.saveFromDate();
  };

  showMenu = () => {
    this._menu.show();
  };

  showMenu2 = () => {
    this._menu2.show();
  };

  handleBackButtonClick = () => {
    this.props.navigation.goBack(null);
  };

  drawer = () => {
    this.props.navigation.toggleDrawer();
  };

  showFromDatePicker = () => {
    this.setState({fromDatePickerVisible: true});
  };

  hideFromDatePicker = () => {
    this.setState({fromDatePickerVisible: false});
  };

  showToDatePicker = () => {
    this.setState({toDatePickerVisible: true});
  };

  hideToDatePicker = () => {
    this.setState({toDatePickerVisible: false});
  };

  showTodayPicker = () => {
    this.setState({todayDatePickerVisible: true});
  };

  hideTodayPicker = () => {
    this.setState({todayDatePickerVisible: false});
  };

  formatAMPM(date) {
    var hours = date.getHours();
    // gets the day

    // gets the month
    var minutes = date.getMinutes();

    // gets AM/PM
    var ampm = hours >= 12 ? 'pm' : 'am';
    // converts hours to 12 hour instead of 24 hour
    hours = hours % 12;
    // converts 0 (midnight) to 12
    hours = hours ? hours : 12; // the hour '0' should be '12'
    // converts minutes to have leading 0
    minutes = minutes < 10 ? '0' + minutes : minutes;

    // the time string
    var time = hours + ':' + minutes + ' ' + ampm;

    // gets the match for the date string we want
    var match = date.toString().match(/\w{3} \w{3} \d{1,2} \d{4}/);
    return match[0] + ' ' + time;
  }

  handleFromDatePicked = async date => {
    this.setState({fromDatePickerVisible: false});
    var d = new Date(date);
    let time = this.formatAMPM(d);
    this.setState({from_date: time});
    this.saveFromDate();
  };

  handleToDatePicked = async date => {
    this.setState({toDatePickerVisible: false});
    var d = new Date(date);
    let time = this.formatAMPM(d);
    this.setState({to_date: time});
    //this.order_details();
  };

  handleTodayDatePicked = async date => {
    this.setState({todayDatePickerVisible: false});
    var d = new Date(date);
    let time = this.formatAMPM(d);
    this.setState({today_date: time});
    this.saveTodayDate();
  };

  saveTodayDate = async () => {
    await AsyncStorage.setItem('user_id', this.state.today_date.toString());
    await AsyncStorage.setItem('branch', this.state.branch.toString());
    global.today_date = await this.state.today_date;
    global.branch = await this.state.branch;
    if (global.branch != null) {
      await this.show_today_sales();
    } else {
      alert('select branch');
    }
  };

  saveFromDate = async () => {
    await AsyncStorage.setItem('user_id', this.state.from_date.toString());
    await AsyncStorage.setItem(
      'branch_name2',
      this.state.branch_name2.toString(),
    );
    global.from_date = await this.state.from_date;
    global.branch_name2 = await this.state.branch_name2;
    if (global.branch_name2 != null) {
      await this.order_details();
    } else {
      alert('select branch');
    }
  };

  order_details = async () => {
    Keyboard.dismiss();
    await axios({
      method: 'post',
      url: api_url + show_count_by_date,
      data: {
        taken_on: Moment(this.state.from_date).format('YYYY-MM-DD'),
        branch: this.state.branch_name2,
      },
    })
      .then(async response => {
        this.setState({total_count: response.data.count});
      })
      .catch(error => {
        alert(error);
        this.showSnackbar('Something went wrong');
      });
  };

  show_today_sales = async () => {
    Keyboard.dismiss();
    await axios({
      method: 'post',
      url: api_url + show_today_by_date,
      data: {
        taken_on: Moment(global.today_date).format('YYYY-MM-DD'),
        branch: this.state.branch_name,
      },
    })
      .then(async response => {
        //alert(JSON.stringify(response));
        this.setState({today_total_count: response.data.count});
      })
      .catch(error => {
        //alert(error);
        this.showSnackbar('Something went wrong');
      });
  };

  show_customers_count = async () => {
    await axios({
      method: 'get',
      url: api_url + show_customers,
    })
      .then(async response => {
        this.setState({customer_count: response.data.count});
      })
      .catch(error => {
        this.showSnackbar('Something went wrong');
      });
  };

  sales_lists = async () => {
    await axios({
      method: 'get',
      url: api_url + show_all_status,
    })
      .then(async response => {
        this.setState({payment_received_count: response.data.count});
      })
      .catch(error => {
        this.showSnackbar('Something went wrong');
      });
  };

  show_all_sales = async () => {
    await axios({
      method: 'get',
      url: api_url + show_all_measurements,
    })
      .then(async response => {
        this.setState({all_sales_count: response.data.count});
      })
      .catch(error => {
        this.showSnackbar('Something went wrong');
      });
  };

  show_branches = async () => {
    Keyboard.dismiss();
    this.setState({isLoding: true});
    await axios({
      method: 'get',
      url: api_url + show_branches,
    })
      .then(async response => {
        this.setState({isLoding: false, branch_lists: response.data.result});
        //alert(JSON.stringify(response));
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
          androidStatusBarColor={colors.theme_bg}
          style={{
            backgroundColor: colors.theme_bg,
            toolbarDefaultBorder: '#FFFFFF',
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
                  onPress={() => this.props.navigation.toggleDrawer()}
                  name="menu"
                  type="fontawesome"
                  size={25}
                  color="#FFFFFF"
                />
              </Left>
            </Col>
            <Col style={{height: '100%', width: '85%', alignSelf: 'center'}}>
              <Body>
                <Title style={styles.title}>Reports</Title>
              </Body>
            </Col>
          </Row>
        </Header>
        <Content>
          <View style={{padding: 10}}>
            <Row>
              <Col style={{height: '100%', width: '70%', alignSelf: 'center'}}>
                <Text
                  style={{
                    padding: 5,
                    color: 'gray',
                    fontSize: 18,
                    fontFamily: font_title,
                  }}>
                  Search Daily Reports
                </Text>
              </Col>
            </Row>
            <Row>
              <Col style={{height: '100%', width: '30%', alignSelf: 'center'}}>
                <Button
                  title="Select Date"
                  titleStyle={{color: colors.theme_bg, fontFamily: font_title}}
                  buttonStyle={styles.btn}
                  onPress={this.showTodayPicker}
                />
                <DateTimePicker
                  isVisible={this.state.todayDatePickerVisible}
                  mode="date"
                  onConfirm={this.handleTodayDatePicked}
                  onCancel={this.hideTodayPicker}
                />
                {global.today_date != '' && (
                  <Text
                    style={{
                      fontSize: 15,
                      fontFamily: font_title,
                      alignSelf: 'center',
                    }}>
                    {Moment(global.today_date).format('YYYY-MM-DD')}
                  </Text>
                )}
              </Col>
              <Col
                style={{
                  height: '100%',
                  width: '50%',
                  alignSelf: 'center',
                  marginTop: '5%',
                }}>
                 
                  <Picker style={{width:'100%',left:30}}
                    selectedValue={this.state.language}
                    onValueChange={(itemValue, itemPosition) =>
                      this.setState({ branch_name: itemValue, choosenIndex: itemPosition })
                    }
                  > 
                  <Picker.Item label='Choose Branch' value='Choose Here' />  
                   {this.state.branch_lists.map((row, index) => (
                      <Picker.Item key={row.id} label={row.branch_name} value={row.branch_name} />
                    ))} 
                  </Picker>
                    
              </Col>
            </Row>
          </View>
          <Card
            style={{
              width: '95%',
              alignSelf: 'center',
              borderRadius: 5,
              backgroundColor: 'lightgray',
            }}>
            <Text style={styles.txt}>Performance Reports</Text>
            <Card style={{width: 360, alignSelf: 'center', borderRadius: 3}}>
              <View style={{margin: 3}} />
              <Row
                style={{
                  justifyContent: 'center',
                  marginLeft: 5,
                  marginRight: 5,
                }}>
                <Col>
                  <Card
                    style={{
                      height: 100,
                      width: 168,
                      backgroundColor: 'tomato',
                      borderRadius: 10,
                    }}>
                    <FontAwesome
                      name="cart-arrow-down"
                      size={35}
                      color="black"
                      style={{color: '#FFFFFF', margin: 5, alignSelf: 'center'}}
                    />

                    <Text
                      style={{
                        color: '#FFFFFF',
                        fontSize: 20,
                        fontWeight: 'bold',
                        alignSelf: 'center',
                        fontFamily: font_description,
                      }}>
                      {this.state.all_sales_count}
                    </Text>

                    <Text
                      style={{
                        color: '#FFFFFF',
                        fontSize: 16,
                        fontWeight: 'bold',
                        alignSelf: 'center',
                        fontFamily: font_description,
                      }}>
                      Total Sales
                    </Text>
                  </Card>
                </Col>
                <View style={{margin: 2}} />
                <Col>
                  <Card
                    style={{
                      height: 100,
                      width: 168,
                      backgroundColor: 'thistle',
                      borderRadius: 10,
                    }}>
                    <FontAwesome
                      name="credit-card-alt"
                      size={35}
                      color="black"
                      style={{color: '#FFFFFF', margin: 5, alignSelf: 'center'}}
                    />
                    <Text
                      style={{
                        color: '#FFFFFF',
                        fontSize: 20,
                        fontWeight: 'bold',
                        alignSelf: 'center',
                        fontFamily: font_description,
                      }}>
                      {this.state.payment_received_count}
                    </Text>
                    <Text
                      style={{
                        color: '#FFFFFF',
                        fontSize: 16,
                        fontWeight: 'bold',
                        alignSelf: 'center',
                        fontFamily: font_description,
                      }}>
                      Payments Received
                    </Text>
                  </Card>
                </Col>
              </Row>

              <Row
                style={{
                  justifyContent: 'center',
                  marginLeft: 5,
                  marginRight: 5,
                }}>
                <Col>
                  <Card
                    style={{
                      height: 100,
                      width: 168,
                      backgroundColor: 'lightyellow',
                      borderRadius: 10,
                    }}>
                    <FontAwesome
                      name="shopping-basket"
                      size={35}
                      color="black"
                      style={{alignSelf: 'center', margin: 5}}
                    />
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: 'bold',
                        alignSelf: 'center',
                        fontFamily: font_description,
                      }}>
                      {this.state.today_total_count}
                    </Text>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: 'bold',
                        alignSelf: 'center',
                        fontFamily: font_description,
                      }}>
                      Today's Order
                    </Text>
                  </Card>
                </Col>
                <View style={{margin: 2}} />
                <Col>
                  <Card
                    style={{
                      height: 100,
                      width: 168,
                      backgroundColor: 'lightcyan',
                      borderRadius: 10,
                    }}>
                    <Icn
                      name="addusergroup"
                      type="antdesign"
                      size={35}
                      color="black"
                      style={{alignSelf: 'center', margin: 5}}
                    />
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: 'bold',
                        alignSelf: 'center',
                        fontFamily: font_description,
                      }}>
                      {this.state.customer_count}
                    </Text>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: 'bold',
                        alignSelf: 'center',
                        fontFamily: font_description,
                      }}>
                      Total Customers
                    </Text>
                  </Card>
                </Col>
              </Row>
              <View style={{margin: 3}} />
            </Card>
          </Card>

          <View style={{margin: 5}} />
          <Row>
            <Col style={{height: '100%', width: '70%', alignSelf: 'center'}}>
              <Text
                style={{
                  padding: 5,
                  color: 'gray',
                  fontSize: 18,
                  fontFamily: font_title,
                  margin: 10,
                }}>
                Search by Duration
              </Text>
            </Col>
          </Row>
          <Row>
            <Col style={{height: '100%', width: '30%', alignSelf: 'center'}}>
              <Button
                title="From Date"
                titleStyle={{color: colors.theme_bg, fontFamily: font_title}}
                buttonStyle={styles.btn}
                onPress={this.showFromDatePicker}
              />
              <DateTimePicker
                isVisible={this.state.fromDatePickerVisible}
                mode="date"
                onConfirm={this.handleFromDatePicked}
                onCancel={this.hideFromDatePicker}
              />
              {this.state.from_date != '' && (
                <Text
                  style={{
                    fontSize: 15,
                    fontFamily: font_title,
                    alignSelf: 'center',
                  }}>
                  {Moment(this.state.from_date).format('YYYY-MM-DD')}
                </Text>
              )}
            </Col>
            <Col style={{height: '100%', width: '30%', alignSelf: 'center'}}>
              <Button
                title="To Date"
                titleStyle={{color: colors.theme_bg, fontFamily: font_title}}
                buttonStyle={styles.btn}
                onPress={this.showToDatePicker}
              />
              <DateTimePicker
                isVisible={this.state.toDatePickerVisible}
                mode="date"
                onConfirm={this.handleToDatePicked}
                onCancel={this.hideToDatePicker}
              />
              {this.state.to_date != '' && (
                <Text
                  style={{
                    fontSize: 15,
                    fontFamily: font_title,
                    alignSelf: 'center',
                  }}>
                  {Moment(this.state.to_date).format('YYYY-MM-DD')}
                </Text>
              )}
            </Col>
             <Col
                style={{
                  height: '100%',
                  width: '50%',
                  alignSelf: 'center',
                  marginTop: '5%',
                }}>
                <Picker style={{width:'80%'}}
                    selectedValue={this.state.language}
                    onValueChange={(itemValue, itemPosition) =>
                      this.setState({ branch_name2: itemValue, choosenIndex: itemPosition })
                    }
                  > 
                  <Picker.Item label='Branch' value='Choose Here' />  
                   {this.state.branch_lists.map((row, index) => (
                      <Picker.Item key={row.id} label={row.branch_name} value={row.branch_name} />
                    ))} 
                  </Picker>
            </Col>
          </Row>
          <Card
            style={{
              width: '95%',
              alignSelf: 'center',
              borderRadius: 5,
              backgroundColor: 'lightgray',
            }}>
            <Text style={styles.txt}>Duration Reports</Text>

            <Card style={{width: 360, alignSelf: 'center', borderRadius: 3}}>
              <View style={{margin: 3}} />

              <Row
                style={{
                  justifyContent: 'center',
                  marginLeft: 5,
                  marginRight: 5,
                  height: 110,
                }}>
                <Col>
                  <Card
                    style={{
                      height: 100,
                      width: 168,
                      backgroundColor: 'tomato',
                      borderRadius: 10,
                    }}>
                    <FontAwesome
                      name="safari"
                      size={35}
                      color="black"
                      style={{color: '#FFFFFF', margin: 5, alignSelf: 'center'}}
                    />
                    <Text
                      style={{
                        color: '#FFFFFF',
                        fontSize: 20,
                        fontWeight: 'bold',
                        alignSelf: 'center',
                        fontFamily: font_description,
                      }}>
                      {this.state.total_count}
                    </Text>
                    <Text
                      style={{
                        color: '#FFFFFF',
                        fontSize: 16,
                        fontWeight: 'bold',
                        alignSelf: 'center',
                        fontFamily: font_description,
                      }}>
                      Completed Orders
                    </Text>
                  </Card>
                </Col>
                <View style={{margin: 2}} />
                <Col>
                  <Card
                    style={{
                      height: 100,
                      width: 168,
                      backgroundColor: 'thistle',
                      borderRadius: 10,
                    }}>
                    <FontAwesome
                      name="calendar"
                      size={35}
                      color="black"
                      style={{margin: 5, color: '#FFFFFF', alignSelf: 'center'}}
                    />
                    <Text
                      style={{
                        color: '#FFFFFF',
                        fontSize: 20,
                        fontWeight: 'bold',
                        alignSelf: 'center',
                        fontFamily: font_description,
                      }}>
                      {(this.state.all_sales_count - this.state.payment_received_count)}
                    </Text>
                    <Text
                      style={{
                        color: '#FFFFFF',
                        fontSize: 16,
                        fontWeight: 'bold',
                        alignSelf: 'center',
                        fontFamily: font_description,
                      }}>
                      Order Due
                    </Text>
                  </Card>
                </Col>
              </Row>
              <View style={{margin: 2}} />
            </Card>
          </Card>
        </Content>
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
  image: {
    alignSelf: 'center',
    height: 60,
    width: 60,
  },
  txt: {
    fontFamily: font_description,
    padding: 5,
    color: 'gray',
    fontSize: 18,
  },
  pickerStyle:{  
    height: 60,  
    width: "60%",  
    color: '#344953',  
  },  
  btn: {
    borderColor: colors.theme_white,
    backgroundColor: colors.theme_white,
    borderRadius: 10,
  },
});
