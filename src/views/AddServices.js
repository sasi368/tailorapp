import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Alert,
  TouchableOpacity,
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
  Thumbnail,
} from 'native-base';
import {Icon} from 'react-native-elements';
import * as colors from '../assets/css/Colors';
import {
  api_url,
  img_url,
  add_services,
  font_title,
  font_description,
} from '../config/Constants';
import Snackbar from 'react-native-snackbar';
import {StatusBar, Loader} from '../components/GeneralComponents';
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'react-native-fetch-blob';
import {CommonActions} from '@react-navigation/native';

const options = {
  title: 'Select a photo',
  takePhotoButtonTitle: 'Take a photo',
  chooseFromLibraryButtonTitle: 'Choose from gallery',
};

export default class AddServices extends Component {
  constructor(props) {
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.state = {
      service_name: '',
      service_img: '',
      service_price: '',
      validation: false,
      isLoding: false,
    };
  }

  handleBackButtonClick = () => {
    this.props.navigation.goBack(null);
  };

  select_photo() {
    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
        alert('User cancelled image picker');
      } else if (response.error) {
        alert(response.error);
      } else {
        const source = {uri: response.uri};
        this.setState({
          data: response.data,
        });
        this.serviceimageupdate();
      }
    });
  }

  serviceimageupdate = async () => {
    this.setState({isLoding: true});
    RNFetchBlob.fetch(
      'POST',
      api_url + add_services,
      {
        'Content-Type': 'multipart/form-data',
      },
      [
        {
          name: 'service_img',
          filename: 'image.png',
          type: 'image/png',
          data: this.state.data,
        },
        {
          name: 'service_name',
          data: this.state.service_name,
        },
        {
          name: 'service_price',
          data: this.state.service_price,
        },
      ],
    )
      .then(resp => {
        this.setState({isLoding: false});
        this.alert_func();
      })
      .catch(err => {
        this.setState({isLoding: false});
        this.showSnackbar('Error on while uploading,Try again');
      });
  };

  checkValidate() {
    if (this.state.service_name == '') {
      this.setState({validation: false});
      this.showSnackbar('service name field required');
      return false;
    } else if (this.state.service_img == '') {
      this.setState({validation: false});
      this.showSnackbar('service img field required');
      return false;
    } else {
      this.setState({validation: true});
      return true;
    }
  }

  alert_func = () =>
    Alert.alert('Success', 'Service Added', [
      {
        text: 'Cancel',
        onPress: this.report(),
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
                <Title style={styles.title}>Enter service Details</Title>
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
              Enter Service Details
            </Text>
          </View>
          <View>
            <TextInput
              style={styles.textin}
              placeholder={'Service Name'}
              onChangeText={TextInputValue =>
                this.setState({service_name: TextInputValue})
              }
            />
          </View>
          <View>
            <TextInput
              style={styles.textin}
              placeholder={'Service Price'}
              onChangeText={TextInputValue =>
                this.setState({service_price: TextInputValue})
              }
            />
          </View>
          <View style={{alignSelf: 'center', marginTop: '20%'}}>
            <TouchableOpacity onPress={this.select_photo.bind(this)}>
              <Text style={{fontSize: 17, fontFamily: font_title}}>
                Upload service image here
              </Text>
              <Icon name="upload" type="antdesign" size={160} color="#000000" />
              <Thumbnail
                large
                source={{uri: img_url + this.state.service_img}}
              />
            </TouchableOpacity>
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
});
