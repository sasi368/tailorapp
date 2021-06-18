import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet, 
  Image,
  TextInput,
  Alert,
  Keyboard, 
} from 'react-native';
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
import {Button, Icon} from 'react-native-elements';
import { cuff, sho, chest, armhole, backneck, frontneck, shirt_length, arm_length, sh} from '../config/Constants';
import {StatusBar, Loader} from '../components/GeneralComponents';
import * as colors from '../assets/css/Colors';
import axios from 'axios';
import Snackbar from 'react-native-snackbar';
import {api_url, add_measurements} from '../config/Constants';

export default class Measurements extends Component<props> {
  constructor(props) {
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.state = {
      customer_id: this.props.route.params.customer_id,
      customer_name: this.props.route.params.customer_name,
      service_name: this.props.route.params.service_name,
      service_price: this.props.route.params.service_price,
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
      isLoding: false,
    };
  }

  handleBackButtonClick = () => {
    this.props.navigation.goBack(null);
  };

  alert_func = () =>
    Alert.alert('Success', 'Measurements Added Successfully', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {text: 'OK', onPress: () => this.customer_details()},
    ]);

  add_measurement = async () => {
    Keyboard.dismiss();
    this.setState({isLoding: true});
    await axios({
      method: 'post',
      url: api_url + add_measurements,
      data: {
        customer_id: this.state.customer_id,
        customer_name: this.state.customer_name,
        service_name: this.state.service_name,
        service_price: this.state.service_price,
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

  customer_details = () => {
    this.props.navigation.navigate('CustomerDetails', {
      service_name: this.state.service_name,
      service_price: this.state.service_price,
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
          androidStatusBarColor={'#F08080'}
          style={{backgroundColor: '#F08080'}}>
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
                <Title style={styles.title}>Measurements</Title>
              </Body>
            </Col>
          </Row>
        </Header>

        <Content>
          <View>
            <Card style={styles.card}>
              <Row>
                <Col>
                  <View>
                    <Image source={shirt_length} style={styles.img} />
                  </View>
                </Col>
                <Col style={styles.col}>
                  <View style={styles.colview}>
                    <Text style={styles.text}>Shirt Length</Text>
                    <TextInput
                      style={styles.textin}
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
                    <Text style={styles.text}>Arm Length</Text>
                    <TextInput
                      style={styles.textin}
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
                    <Text style={styles.text}>Shoulder </Text>
                    <TextInput
                      style={styles.textin}
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
                    <Text style={styles.text}>Front Neck</Text>
                    <TextInput
                      style={styles.textin}
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
                    <Text style={styles.text}>Back Neck</Text>
                    <TextInput
                      style={styles.textin}
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
                    <Text style={styles.text}>Chest</Text>
                    <TextInput
                      style={styles.textin}
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
                    <Text style={styles.text}>Arm Hole</Text>
                    <TextInput
                      style={styles.textin}
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
                    <Text style={styles.text}>Cuff </Text>
                    <TextInput
                      style={styles.textin}
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
                    <Text style={styles.text}>Hip</Text>
                    <TextInput
                      style={styles.textin}
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
                    <Text style={styles.text}>Pant</Text>
                    <TextInput
                      style={styles.textin}
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
            <View>
              <Button
                buttonStyle={styles.btn}
                title={'ADD'}
                onPress={this.add_measurement}></Button>
            </View>
          </View>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: 'bold',
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
  textin: {
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
  text: {
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
  btn: {
    margin: 10,
    backgroundColor: '#F08080',
    borderRadius: 5,
    height: 40,
    width: 100,
    alignSelf: 'center',
  },
});
