import React, {Component} from 'react';
import {View, Text, StyleSheet, TextInput, Alert, Keyboard,Picker} from 'react-native';
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
  add_employee,
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
import Menu, {MenuItem, MenuDivider} from 'react-native-material-menu';
import {CommonActions} from '@react-navigation/native';

var radio_props = [
  {label: 'Male', value: 'Male'},
  {label: 'Female', value: 'Female'},
];

export default class AddEmployee extends Component<props> {
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
                <Title style={styles.title}>Enter Employee Details</Title>
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
              Enter Employee Details
            </Text>
          </View>
          <View>
            <TextInput
              style={styles.textin}
              placeholder={'Employee Name'}
              onChangeText={TextInputValue =>
                this.setState({user_name: TextInputValue})
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
              style={styles.textin}
              placeholder={'Password'}
              secureTextEntry={true}
              onChangeText={TextInputValue =>
                this.setState({password: TextInputValue})
              }
            />
          </View>
          <View style={{marginTop: 20}}>
            <Button
              onPress={this.add_employee}
              buttonStyle={styles.btn}
              title={'Save and Continue'}
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
