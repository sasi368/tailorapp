import React, {Component} from 'react';
import {View, Text, StyleSheet, TextInput, Alert, Keyboard,Picker,FlatList,Image} from 'react-native';
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
  List,
  ListItem,
} from 'native-base';
import {Button, Icon, SearchBar, Input} from 'react-native-elements';
import * as colors from '../assets/css/Colors';
import {
  api_url,
  show_services,
  add_measurements,
  add_employee,
  show_branches,
  show_customers_by_code,
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
import {StatusBar, Loader, ChatLoader} from '../components/GeneralComponents';
import {CommonActions} from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default class TakeOrder extends Component<props> {

  constructor(props) {
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.state = {
      customer_code: '',
      customer_name: '',
      service_name: '',
      service_price: '',
      shirt_length: '',
      arm_length: '',
      shoulder: '',
      front_neck: '',
      back_neck: '',
      chest: '',
      arm_hole: '',
      cuff: '',
      hip: '',
      pant: '',
      seat: '',
      paincha: '',
      service_name: '',
      choosenIndex:0,
      choosenIndex2:0,
      services_lists: [],
      show_customers_by_code: [],
      validation: false,
      isLoding: false,
      isLodingContent:false,
    };
    this.show_services();
  }

  async componentDidMount() {  
    this._unsubscribe=this.props.navigation.addListener('focus',()=>{
      this.show_customers_by_code();
    });
  }

  search = async(val) =>{
    await this.setState({ customer_code : val });
    if(this.state.customer_code.length == 4){
      await this.show_customers_by_code();
    }
  }

  handleBackButtonClick = () => {
    this.props.navigation.goBack(null);
  };

  updateSearch = (customer_code) => {
    this.setState({ customer_code });
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

  place_order = async () => {
    Keyboard.dismiss();
    this.setState({isLoding: true});
    await axios({
      method: 'post',
      url: api_url + add_measurements,
      data: {
        customer_code: this.state.customer_code,
        customer_name: this.state.customer_name,
        service_name: this.state.service_name,
        service_price: 100,
        shirt_length: this.state.shirt_length,
        arm_length: this.state.arm_length,
        shoulder: this.state.shoulder,
        front_neck: this.state.front_neck, 
        back_neck: this.state.back_neck,
        chest: this.state.chest,
        arm_hole: this.state.arm_hole,
        cuff: this.state.cuff,
        hip: this.state.hip,
        pant: this.state.pant,
        seat: this.state.seat,
        paincha: this.state.paincha,
        branch: global.branch,
      },
    })
      .then(async response => {
        this.setState({isLoding: false});
        if (response.data.status == 1) {
          //alert(JSON.stringify(response));
          this.alert_func();
        } else {
          alert(response.data.message);
        }
      })
      .catch(error => {
        //alert(error);
        this.setState({isLoding: false});
        this.showSnackbar('Something went wrong');
      });
  };

  show_customers_by_code = async () => {
    Keyboard.dismiss();
    this.setState({isLodingContent: true});
    await axios({
      method: 'post',
      url: api_url + show_customers_by_code,
      data: {
        customer_code: this.state.customer_code,
      },
    })
      .then(async response => {
        this.setState({isLodingContent: false, show_customers_by_code: response.data.result});
      })
      .catch(error => {
        this.setState({isLodingContent: false});
        //alert(error);
        this.showSnackbar('Something went wrong');
      });
  };

  alert_func = () =>
    Alert.alert('Success', 'Order Placed', [
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
          <Input
            placeholder='Search Customer Code'
            inputStyle={{fontSize:15,padding:5,alignSelf:'center',fontFamily:font_description, padding:10}}
            inputContainerStyle={{height:40, width:'90%', borderRadius:25, borderWidth:1,alignSelf:'center',borderColor:colors.theme_fg_five}}
            placeholderTextColor = 'gray'
            underlineColorAndroid="transparent"
            onChangeText={(TextInputValue) =>
              this.search(TextInputValue)
            }
            leftIcon={
              <FontAwesome  name='search' 
              size={20}
              color='black'
              style={{ color:colors.theme_bg,margin:10}}
            />
            }
          /> 
          </View>

           {this.state.isLodingContent == true &&  
            <ChatLoader />
            }
          <View>
             <List>
                <FlatList
                  data={this.state.show_customers_by_code}
                  renderItem={({ item }) => (
                  <View style={{paddingLeft: '13%'}}>
                   <Picker style={styles.pickerStyle}
                    selectedValue={this.state.language}
                    onValueChange={(itemValue, itemPosition) =>
                      this.setState({ customer_name: itemValue, choosenIndex2: itemPosition })
                    }
                   >   
                      <Picker.Item label={item.customer_name} value={item.customer_name} />
                   
                   </Picker>
                   </View>      
                  )}
                  keyExtractor={item => item.customer_name}
                />
              </List>
          </View>

          <View style={{paddingLeft: '13%'}}>
                  <Picker style={styles.pickerStyle}
                    selectedValue={this.state.language}
                    onValueChange={(itemValue, itemPosition) =>
                      this.setState({ service_name: itemValue,choosenIndex: itemPosition })
                    }
                  >   
                  <Picker.Item label='SELECT SERVICE' value='Choose Here' />
                   {this.state.services_lists.map((row, index) => (
                      <Picker.Item key={row.id} label={row.service_name} value={row.service_name} />
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
             {this.state.choosenIndex != 0 &&
          <View style={{marginTop: 20}}>

          
         
            <Button
              onPress={this.place_order}
              buttonStyle={styles.btn}
              title={'Place Order'}
              titleStyle={{
                color: colors.theme_fg,
                fontSize: 20,
                fontFamily: font_title,
              }}></Button>
          
             
          </View>
        }
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
