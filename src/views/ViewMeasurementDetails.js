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
     
    };
  }

  handleBackButtonClick = () => {
    this.props.navigation.goBack(null);
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
            <Content>
              <View style={{margin: 20, marginLeft: 30}}>
                <View>
                  <Text style={{fontFamily: font_title, fontSize: 20}}>
                    customer name
                  </Text>
                </View>

                <View>
                  <Text
                    style={{
                      fontSize: 15,
                      color: colors.theme_bg,
                      fontFamily: font_title,
                    }}>
                    service name
                  </Text>
                </View>

                <View>
                  <Row>
                    <Col>
                      <Text style={{color: 'gray', fontSize: 15}}>
                        Taken Employee  Name
                      </Text>
                    </Col>
                    <Col>
                     <Text style={{fontFamily:font_title, fontSize: 15,alignSelf:'center'}}>
                         12/2/20
                      </Text>
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
                 
                    <Col>
                      <Text style={styles.text}>90</Text>
                    </Col>
                
                </Row>

                <Row>
                  <Col>
                    <Text style={styles.text}>Arm Length</Text>
                  </Col>
                
                    <Col>
                      <Text style={styles.text}>90</Text>
                    </Col>

                </Row>

                <Row>
                  <Col>
                    <Text style={styles.text}>Shoulder </Text>
                  </Col>
             
                    <Col>
                      <Text style={styles.text}>79</Text>
                    </Col>

                </Row>

                <Row>
                  <Col>
                    <Text style={styles.text}>Front Neck</Text>
                  </Col>
               
                    <Col>
                      <Text style={styles.text}>23</Text>
                    </Col>     
                </Row>

                <Row>
                  <Col>
                    <Text style={styles.text}>Back Neck</Text>
                  </Col>
                 
                    <Col>
                      <Text style={styles.text}>89</Text>
                    </Col>
             
                </Row>

                <Row>
                  <Col>
                    <Text style={styles.text}>Chest</Text>
                  </Col>
                  
                    <Col>
                      <Text style={styles.text}>78</Text>
                    </Col>
                  
                  
                </Row>

                <Row>
                  <Col>
                    <Text style={styles.text}>Arm Hole</Text>
                  </Col>
                 
                    <Col>
                      <Text style={styles.text}>67</Text>
                    </Col>
    
                </Row>

                <Row>
                  <Col>
                    <Text style={styles.text}>cuff</Text>
                  </Col>
                
                    <Col>
                      <Text style={styles.text}>90</Text>
                    </Col>
  
          
                </Row>

                <Row>
                  <Col>
                    <Text style={styles.text}>Hip</Text>
                  </Col>
             
                    <Col>
                      <Text style={styles.text}>89</Text>
                    </Col>
                
               
                </Row>

                <Row>
                  <Col>
                    <Text style={styles.text}>Seat</Text>
                  </Col>
                
                    <Col>
                      <Text style={styles.text}>34</Text>
                    </Col>
                  
                </Row>

                <Row>
                  <Col>
                    <Text style={styles.text}>Paincha</Text>
                  </Col>
           
                    <Col>
                      <Text style={styles.text}>98</Text>
                    </Col>
                 
                </Row>
              </Card>
              <Divider
                style={{marginTop: 10, backgroundColor: colors.theme_bg}}
              />
            </Content>
         
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
