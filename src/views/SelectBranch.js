import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView, 
  Image,
  Dimensions,
  TouchableOpacity,
  Keyboard,
  FlatList,
  Picker,
} from 'react-native';
import {Content, CardItem, Card, Body} from 'native-base';
import {Button} from 'react-native-elements';
import * as colors from '../assets/css/Colors';
import axios from 'axios';
import {
  api_url,
  show_branches,
  font_description,
  profile_icon,
  branch_logo,
  font_title,
} from '../config/Constants';
import {StatusBar, Loader} from '../components/GeneralComponents';
import Snackbar from 'react-native-snackbar';
import Menu, {MenuItem, MenuDivider} from 'react-native-material-menu';

const win = Dimensions.get('window');
const ratio = win.width / 541;


export default class SelectBranch extends Component {
  _menu = null;
  constructor(props) {
    super(props);
    this.state = {
      branch_lists: [],
      branch: '',
      branch_name:'',
      language:'',
      choosenIndex:0,
      pickedData: null,
      validation: false,
      isLoding: false,
    };
    this.show_branches(); 
  }

  login = () => {
    this.props.navigation.navigate('Login', {branch_name: this.state.branch_name});
  };

  services = () => {
    this.props.navigation.navigate('Services');
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
 

  drpFrame(style) {
    style.width = width - 60;
    style.height = this.state.options.length > 4 ? 200 : -1;
    return style;
  }

  showSnackbar(msg) {
    Snackbar.show({
      title: msg,
      duration: Snackbar.LENGTH_SHORT,
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <StatusBar />
        </View>
        <Loader visible={this.state.isLoding} />
        <ScrollView keyboardShouldPersistTaps="always">
          <View style={{padding: '10%'}}>
            <Image style={{width: 100, height: 100}} source={profile_icon} />
          </View>

          <View style={{margin: '10%'}} />
          <Content>
            <Card style={{width: '83%', alignSelf: 'center', borderRadius: 8}}>
              <CardItem
                header
                style={{borderTopLeftRadius: 8, borderTopRightRadius: 8}}>
                <Text style={{fontSize: 30, fontFamily: font_description}}>
                  Select Branch
                </Text>
   
              </CardItem>
           
              <CardItem>
                <Body>
                  
                  <Picker style={styles.pickerStyle}
                    selectedValue={this.state.language}
                    onValueChange={(itemValue, itemPosition) =>
                      this.setState({ branch_name: itemValue, choosenIndex: itemPosition })
                    }
                  >   
                  <Picker.Item label='Choose Here' value='Choose Here' />
                   {this.state.branch_lists.map((row, index) => (
                      <Picker.Item key={row.id} label={row.branch_name} value={row.branch_name} />
                    ))} 
                  </Picker>
                 
                </Body>
              </CardItem>
            
              <CardItem
                footer
                style={{borderBottomLeftRadius: 8, borderBottomRightRadius: 8}}>
                  {this.state.choosenIndex != 0 && 
                  <Button
                    title="Next"
                    buttonStyle={{
                      borderRadius: 20,
                      height: 45,
                      width: 110,
                      backgroundColor: colors.theme_bg,
                    }}
                    onPress={this.login}
                  />
                }
              </CardItem>
            </Card>

            <View style={{alignSelf: 'center', flex: 1}}>
              <Image
                style={{
                  width: win.width,
                  height: 362 * ratio,
                }}
                source={branch_logo}
              />
            </View>
          </Content>
          <View style={{margin: 20}} />
        </ScrollView>
        <Loader visible={this.state.isLoding} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: colors.theme_fg,
  },
  content: {
    height: '100%',
    alignItems: 'center',
  },
  signin_text: {
    fontSize: 15,
    fontFamily: font_description,
    paddingLeft: '35%',
    color: colors.theme_black,
    marginBottom: '4%',
  },
  signin_text1: {
    fontSize: 15,
    color: colors.theme_bg,
    fontWeight: 'bold',
    marginBottom: '4%',
  },
  input: {
    height: 50,
    margin: 12,
    paddingLeft: 15,
    borderRadius: 30,
    borderWidth: 0.5,
    borderColor: '#D1EDF2',
    backgroundColor: '#D1EDF2',
  },  
  pickerStyle:{  
    height: 60,  
    width: "100%",  
    color: '#344953',  
    justifyContent: 'center',  
  }  
});
