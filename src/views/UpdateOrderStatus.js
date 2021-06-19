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

export default class UpdateOrderStatus extends Component<props> {
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
              style={{color: 'white', fontSize: 22, fontFamily: font_title}}>
              INFO
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
                        Taken Employee Name
                      </Text>
                      <Text style={{color: 'gray', fontSize: 15}}>
                        Taken on 20/12/2020
                      </Text>
                     
                    </Col>
                  
                  </Row>
                  <View style={{marginTop: 5}} />
                 
                      <CheckBox
                        title="Measuring"
                        
                      />
                   
                      <CheckBox
                        title="Cutting"
                       
                      />
                  
                      <CheckBox
                        title="Stitching"
                        
                      />
                 
                    <CheckBox
                      title="Quality"
             
                    />
                 
                    <CheckBox
                      title="Delivery"
                    
                    />
                 
                

                  <View style={{margin: 5}} />

              
                    <Button
                      title={'Update Work Status'}
                      titleStyle={{
                        color: colors.theme_bg,
                        fontSize: 18,
                        fontFamily: font_title,
                      }}
                      buttonStyle={styles.btn}
                     
                    />
                  
                </View>
              </View>
            
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
