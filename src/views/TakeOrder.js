import React, {Component} from 'react';
import {View, Text, StyleSheet, TextInput, Alert, Keyboard,Picker,Image} from 'react-native';
import {
  Content,
  Container,
  Header,
  Body,
  Title,
  Left,
  Card,
  Row,
  Col,
} from 'native-base';
import {Button, Icon} from 'react-native-elements';
import * as colors from '../assets/css/Colors';
import {
  api_url,
  add_employee,
  show_branches,
  font_title,
  font_description,
  cuff, 
  sho, 
  chest, 
  armhole, 
  backneck, 
  frontneck, 
  shirt_length, 
  arm_length, 
  sh,
} from '../config/Constants';
import axios from 'axios';
import Snackbar from 'react-native-snackbar';
import {StatusBar, Loader} from '../components/GeneralComponents';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';
import Menu, {MenuItem, MenuDivider} from 'react-native-material-menu';
import {CommonActions} from '@react-navigation/native';

var radio_props = [
  {label: 'Male', value: 'Male'},
  {label: 'Female', value: 'Female'},
];

export default class TakeOrder extends Component<props> {
  _menu = null;
  constructor(props) {
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.state = {
      user_name: '',
      branch: '',
      password: '',
      choosenIndex:0,
      branch_lists: [],
      validation: false,
      isLoding: false,
    };
    this.show_branches(); 
  }

  setMenuRef = ref => {
    this._menu = ref;
  };

  hideMenu1 = () => {
    this._menu.hide();
    this.setState({branch: 'MainBranch'});
  };

  hideMenu2 = () => {
    this._menu.hide();
    this.setState({branch: 'SubBranch'});
  };

  showMenu = () => {
    this._menu.show();
  };

  handleBackButtonClick = () => {
    this.props.navigation.goBack(null);
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

  add_employee = async branch => {
    Keyboard.dismiss();
    await this.checkValidate();
    if (this.state.validation) {
      this.setState({isLoding: true});
      await axios({
        method: 'post',
        url: api_url + add_employee,
        data: {
          user_name: this.state.user_name,
          branch: this.state.branch_name,
          password: this.state.password,
        },
      })
        .then(async response => {
          this.setState({isLoding: false});
          if (response.data.status == 1 && this.state.choosenIndex == 0) {
            alert('Select any Branch');
          }else if(response.data.status == 1 && this.state.choosenIndex != 0){
             await this.alert_func();
          } else {
            alert(response.data.message);
          }
        })
        .catch(error => {
          this.setState({isLoding: false});
          alert(error);
          this.showSnackbar('Something went wrong');
        });
    }
  };


  checkValidate() {
    if (this.state.user_name == '') {
      this.setState({validation: false});
      this.showSnackbar('Employee name field required');
      return false;
    } else if (this.state.password == '') {
      this.setState({validation: false});
      this.showSnackbar('password field required');
      return false;
    } else {
      this.setState({validation: true});
      return true;
    }
  }

  alert_func = () =>
    Alert.alert('Success', 'Employee Added', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {text: 'OK', onPress: () => this.report()},
    ]);

  report() {
    this.props.navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: 'Reports'}],
      }),
    );
  }

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
                <Title style={styles.title}>Take Order</Title>
              </Body>
            </Col>
          </Row>
        </Header>

        <Content>
          <View>
            <Text
              style={{
                fontSize: 25,
                margin: 10,
                padding: 5,
                fontFamily: font_title,
              }}>
              Enter Order Details
            </Text>
          </View>
          <View>
            <TextInput
              style={styles.textin}
              placeholder={'Customer Code'}
              onChangeText={TextInputValue =>
                this.setState({customer_code: TextInputValue})
              }
            />
          </View>
           <View>
            <TextInput
              style={styles.textin}
              placeholder={'Customer Name'}
              onChangeText={TextInputValue =>
                this.setState({customer_name: TextInputValue})
              }
            />
          </View>
          <View style={{paddingLeft: '13%'}}>
                  <Picker style={styles.pickerStyle}
                    selectedValue={this.state.language}
                    onValueChange={(itemValue, itemPosition) =>
                      this.setState({ branch_name: itemValue, choosenIndex: itemPosition })
                    }
                  >   
                  <Picker.Item label='SELECT SERVICE' value='Choose Here' />
                   {this.state.branch_lists.map((row, index) => (
                      <Picker.Item key={row.id} label={row.branch_name} value={row.branch_name} />
                    ))} 
                  </Picker>
       
          </View>
          <View>
          <View style={{alignSelf:'center'}}>
          <Text
              style={{
                fontSize: 20,
                margin: 10,
                padding: 5,
                fontFamily: font_title,
              }}>
              Enter Measurements
            </Text>
          </View>
            <Card style={styles.card}>
              <Row>
                <Col>
                  <View>
                    <Image source={shirt_length} style={styles.img} />
                  </View>
                </Col>
                <Col style={styles.col}>
                  <View style={styles.colview}>
                    <Text style={styles.text2}>Shirt Length</Text>
                    <TextInput
                      style={styles.textin2}
                      keyboardType="numeric"
                      onChangeText={TextInputValue =>
                        this.setState({shirt_length: TextInputValue})
                      }
                    />
                  </View>
                </Col>
              </Row>
            </Card>

            <Card style={styles.card}>
              <Row>
                <Col>
                  <View>
                    <Image source={arm_length} style={styles.img} />
                  </View>
                </Col>
                <Col style={styles.col}>
                  <View style={styles.colview}>
                    <Text style={styles.text2}>Arm Length</Text>
                    <TextInput
                      style={styles.textin2}
                      keyboardType="numeric"
                      onChangeText={TextInputValue =>
                        this.setState({arm_length: TextInputValue})
                      }
                    />
                  </View>
                </Col>
              </Row>
            </Card>

            <Card style={styles.card}>
              <Row>
                <Col>
                  <View>
                    <Image source={sho} style={styles.img} />
                  </View>
                </Col>
                <Col style={styles.col}>
                  <View style={styles.colview}>
                    <Text style={styles.text2}>Shoulder </Text>
                    <TextInput
                      style={styles.textin2}
                      keyboardType="numeric"
                      onChangeText={TextInputValue =>
                        this.setState({shoulder: TextInputValue})
                      }
                    />
                  </View>
                </Col>
              </Row>
            </Card>

            <Card style={styles.card}>
              <Row>
                <Col>
                  <View>
                    <Image source={frontneck} style={styles.img} />
                  </View>
                </Col>
                <Col style={styles.col}>
                  <View style={styles.colview}>
                    <Text style={styles.text2}>Front Neck</Text>
                    <TextInput
                      style={styles.textin2}
                      keyboardType="numeric"
                      onChangeText={TextInputValue =>
                        this.setState({front_neck: TextInputValue})
                      }
                    />
                  </View>
                </Col>
              </Row>
            </Card>

            <Card style={styles.card}>
              <Row>
                <Col>
                  <View>
                    <Image source={backneck} style={styles.img} />
                  </View>
                </Col>
                <Col style={styles.col}>
                  <View style={styles.colview}>
                    <Text style={styles.text2}>Back Neck</Text>
                    <TextInput
                      style={styles.textin2}
                      keyboardType="numeric"
                      onChangeText={TextInputValue =>
                        this.setState({back_neck: TextInputValue})
                      }
                    />
                  </View>
                </Col>
              </Row>
            </Card>

            <Card style={styles.card}>
              <Row>
                <Col>
                  <View>
                    <Image source={chest} style={styles.img} />
                  </View>
                </Col>
                <Col style={styles.col}>
                  <View style={styles.colview}>
                    <Text style={styles.text2}>Chest</Text>
                    <TextInput
                      style={styles.textin2}
                      keyboardType="numeric"
                      onChangeText={TextInputValue =>
                        this.setState({chest: TextInputValue})
                      }
                    />
                  </View>
                </Col>
              </Row>
            </Card>

            <Card style={styles.card}>
              <Row>
                <Col>
                  <View>
                    <Image source={armhole} style={styles.img} />
                  </View>
                </Col>
                <Col style={styles.col}>
                  <View style={styles.colview}>
                    <Text style={styles.text2}>Arm Hole</Text>
                    <TextInput
                      style={styles.textin2}
                      keyboardType="numeric"
                      onChangeText={TextInputValue =>
                        this.setState({arm_hole: TextInputValue})
                      }
                    />
                  </View>
                </Col>
              </Row>
            </Card>

            <Card style={styles.card}>
              <Row>
                <Col>
                  <View>
                    <Image source={cuff} style={styles.img} />
                  </View>
                </Col>
                <Col style={styles.col}>
                  <View style={styles.colview}>
                    <Text style={styles.text2}>Cuff </Text>
                    <TextInput
                      style={styles.textin2}
                      keyboardType="numeric"
                      onChangeText={TextInputValue =>
                        this.setState({cuff: TextInputValue})
                      }
                    />
                  </View>
                </Col>
              </Row>
            </Card>

            <Card style={styles.card}>
              <Row>
                <Col>
                  <View>
                    <Image source={sh} style={styles.img} />
                  </View>
                </Col>
                <Col style={styles.col}>
                  <View style={styles.colview}>
                    <Text style={styles.text2}>Hip</Text>
                    <TextInput
                      style={styles.textin2}
                      keyboardType="numeric"
                      onChangeText={TextInputValue =>
                        this.setState({hip: TextInputValue})
                      }
                    />
                  </View>
                </Col>
              </Row>
            </Card>

            <Card style={styles.card}>
              <Row>
                <Col>
                  <View>
                    <Image source={shirt_length} style={styles.img} />
                  </View>
                </Col>
                <Col style={styles.col}>
                  <View style={styles.colview}>
                    <Text style={styles.text2}>Pant</Text>
                    <TextInput
                      style={styles.textin2}
                      keyboardType="numeric"
                      onChangeText={TextInputValue =>
                        this.setState({pant: TextInputValue})
                      }
                    />
                  </View>
                </Col>
              </Row>
            </Card>
            {/* <Card style={styles.card}>
              <Row>
                <Col>
                  <View>
                    <Image source={sh} style={styles.img} />
                  </View>
                </Col>
               <Col style={styles.col}>
                  <View style={styles.colview}>
                    <Text style={styles.text}>Seat</Text>
                    <TextInput
                      style={styles.textin}
                      keyboardType="numeric"
                      onChangeText={TextInputValue =>
                        this.setState({seat: TextInputValue})
                      }
                    />
                  </View>
                </Col>
              </Row>
            </Card>*/}
            {/* <Card style={styles.card}>
              <Row>
                <Col>
                  <View>
                    <Image source={sh} style={styles.img} />
                  </View>
                </Col>
                <Col style={styles.col}>
                  <View style={styles.colview}>
                    <Text style={styles.text}>Paincha</Text>
                    <TextInput
                      style={styles.textin}
                      keyboardType="numeric"
                      onChangeText={TextInputValue =>
                        this.setState({paincha: TextInputValue})
                      }
                    />
                  </View>
                </Col>
              </Row>
            </Card>*/}
            </View>
          <View style={{marginTop: 20}}>
            <Button
              onPress={this.add_employee}
              buttonStyle={styles.btn}
              title={'Place Order'}
              titleStyle={{
                color: colors.theme_fg,
                fontSize: 20,
                fontFamily: font_title,
              }}></Button>
          </View>
        </Content>
        <Loader visible={this.state.isLoding} />
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
   card: {
    height: 160,
    width: 350,
    backgroundColor:colors.theme_fg,
    borderRadius: 10,
    alignSelf: 'center',
    borderBottomWidth: 2,
  },
  col: {},
  colview: {
    margin: 30,
  },
  textin2: {
    margin: 5,
    fontWeight: 'bold',
    fontSize: 16,
    alignSelf: 'center',
    borderWidth: 1,
    height: 50,
    width: 100,
    borderRadius: 5,
    borderColor: '#F08080',
  },
  text2: {
    fontWeight: 'bold',
    fontSize: 20,
    alignSelf: 'center',
    color: 'gray',
  },
  img: {
    height: 150,
    width: 150,
    alignSelf: 'center',
  },
  textin: {
    alignSelf: 'center',
    fontFamily: font_description,
    padding: 6,
    margin: 20,
    fontSize: 18,
    borderRadius: 10,
    height: 43,
    width: 300,
    borderWidth: 2,
    borderColor: 'gray',
  },
  text: {
    fontFamily: font_title,
    fontSize: 20,
    alignSelf: 'center',
  },
   pickerStyle:{  
    height: 70,  
    width: "80%",  
    color: '#344953',  
    justifyContent: 'center',  
  },  
  btn: {
    width: 250,
    margin: 30,
    borderWidth: 2,
    borderColor: colors.theme_bg,
    backgroundColor: colors.theme_bg,
    borderRadius: 20,
    alignSelf: 'center',
  },
});
