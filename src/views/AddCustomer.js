import React, {Component} from 'react';
import {View, Text, StyleSheet, TextInput, Alert, Keyboard, Picker } from 'react-native';
import {
  Content,
  Container,
  Header,
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
  add_customer,
  show_branches,
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

var radio_props = [
  {label: 'Male', value: 'Male'},
  {label: 'Female', value: 'Female'},
];

export default class AddCustomer extends Component<props> {
  constructor(props) {
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.state = {
      customer_name: '',
      branch_lists: [],
      branch_name: '',
      gender: '',
      email: '',
      contact_no: '',
      address: '',
      value: '',
      choosenIndex:0,
      validation: false,
      isLoding: false,
    };
    this.show_branches(); 
  }

  handleBackButtonClick = () => {
    this.props.navigation.goBack(null);
  };

  add_customer = async () => {
    Keyboard.dismiss();
    await this.checkValidate();
    if (this.state.validation) {
      this.setState({isLoding: true});
      await axios({
        method: 'post',
        url: api_url + add_customer,
        data: {
          customer_name: this.state.customer_name,
          branch: this.state.branch_name,
          gender: this.state.gender,
          email: this.state.email,
          contact_no: this.state.contact_no,
          address: this.state.address,
        },
      })
        .then(async response => {
          this.setState({isLoding: false});
          if(response.data.status == 0){
            alert(response.data.message);
          }else{
            await this.alert_func();
          }   
        })
        .catch(error => {
          this.setState({isLoding: false});
          this.showSnackbar('Something went wrong');
        });
    }
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

  checkValidate() {
    if (this.state.customer_name == '') {
      this.setState({validation: false});
      this.showSnackbar('Customer name field required');
      return false;
    } else if (this.state.branch == '') {
      this.setState({validation: false});
      this.showSnackbar('Branch field required');
      return false;
    } else if (this.state.gender == '') {
      this.setState({validation: false});
      this.showSnackbar('Gender field required');
      return false;
    } else if (this.state.email == '') {
      this.setState({validation: false});
      this.showSnackbar('Email field required');
      return false;
    } else if (this.state.contact_no == '') {
      this.setState({validation: false});
      this.showSnackbar('Contact field required');
      return false;
    } else if (this.state.address == '') {
      this.setState({validation: false});
      this.showSnackbar('address field required');
      return false;
    } else {
      this.setState({validation: true});
      return true;
    }
  }

  alert_func = () =>
    Alert.alert('Success', 'Customer Added Successfully', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {text: 'OK', onPress: () => this.customer_list()},
    ]);

  customer_list = () => {
     this.props.navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: 'Reports'}],
      }),
    );
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
          style={{backgroundColor: colors.theme_bg}}>
          <Loader visible={this.state.isLoding} />
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
                <Title style={styles.title}>Enter Customer Details</Title>
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
              Enter Customer Details
            </Text>
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

          <View style={{alignSelf: 'center'}}>
            <RadioForm
              formHorizontal={true}
              animation={true}
              labelStyle={{fontSize: 20, fontFamily: font_title, padding: 10}}
              buttonColor={'#000000'}
              radio_props={radio_props}
              initial={0}
              onPress={value => {
                this.setState({gender: value});
              }}
            />
          </View>

          <View>
            <TextInput
              style={styles.textin}
              placeholder={'Email (optional)'}
              onChangeText={TextInputValue =>
                this.setState({email: TextInputValue})
              }
            />
          </View>
          <View>
            <TextInput
              style={styles.textin}
              placeholder={'Contact Number'}
              onChangeText={TextInputValue =>
                this.setState({contact_no: TextInputValue})
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
          <Picker.Item label='SELECT BRANCH' value='Choose Here' />
              {this.state.branch_lists.map((row, index) => (
                  <Picker.Item key={row.id} label={row.branch_name} value={row.branch_name} />
              ))} 
          </Picker>
          </View>
          <View>
            <TextInput
              style={{
                alignSelf: 'center',
                borderWidth: 2,
                height: 100,
                width: 300,
                borderRadius: 10,
                borderColor: 'gray',
                margin: 20,
                fontSize: 18,
                padding: 5,
              }}
              placeholder={'Address'}
              onChangeText={TextInputValue =>
                this.setState({address: TextInputValue})
              }
            />
          </View>
          <View style={{marginTop: 20}}>
          {this.state.choosenIndex != 0 &&
            <Button
              onPress={() => this.add_customer()}
              buttonStyle={styles.btn}
              title={'Save and Continue'}
              titleStyle={{
                color: colors.theme_fg,
                fontSize: 20,
                fontFamily: font_title,
              }}></Button>
          }
          </View>
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
  btn: {
    width: 250,
    margin: 30,
    borderWidth: 2,
    borderColor: colors.theme_bg,
    backgroundColor: colors.theme_bg,
    borderRadius: 20,
    alignSelf: 'center',
  },
  pickerStyle:{  
    height: 70,  
    width: "80%",  
    color: '#344953',  
    justifyContent: 'center',  
  },  
});
