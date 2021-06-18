import React, { Fragment } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import * as colors from './src/assets/css/Colors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/Ionicons';
import { Content, Container, Header, Body, Radio, Title, Left, Row, Col, Right, Button as Btn, Card, CardItem, List, ListItem, Thumbnail} from 'native-base';
import { ScrollView, Text, View, Image } from 'react-native';
import { Icon as Icn } from 'react-native-elements';
import {font_title,font_description} from './src/config/Constants'; 

/* Screens */
import Splash from './src/views/Splash';
import SelectBranch from './src/views/SelectBranch';
import Login from './src/views/Login'; 
import Services from './src/views/Services';
import ShowServices from './src/views/ShowServices';
import MeasurementDetails from './src/views/MeasurementDetails';
import Reports from './src/views/Reports';
import Tracking from './src/views/Tracking';
import AddEmployee from './src/views/AddEmployee';
import AddCustomer from './src/views/AddCustomer';
import AddServices from './src/views/AddServices';
import CustomerDetails from './src/views/CustomerDetails';
import CustomerList from './src/views/CustomerList';
import Measurements from './src/views/Measurements';
import Logout from './src/views/Logout';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

Icon.loadFont()

function CustomDrawerContent(props) {

  return (
    <DrawerContentScrollView {...props}>
      <View style={{ padding:10, flexDirection:'column', borderBottomWidth:1, borderColor:colors.theme_fg, alignItems:'flex-start' }}>
        <Image style={{ width: 80, height: 80, borderRadius: 60 / 2, overflow: "hidden", borderWidth: 1,alignSelf:'center', }} source={ require('./src/assets/img/profile.png')} />
        <View style={{ margin: 5 }} />
        <View style={{alignSelf:'center'}} >
          <Text style={{ color:colors.theme_fg, fontFamily:font_title, fontSize:16 }} >{global.user_name}</Text>
        </View>
      </View>
      <View style={{backgroundColor:colors.theme_fg,padding:10}}>
      
          <Row>
            <Col style={{height:"100%",width:"85%",alignSelf:'center'}}> 
           
              <Text style={{color:colors.theme_bg, fontFamily:font_title, fontSize:16}}>
                User Type
              </Text>
             {global.user_name == 'admin' && 
              <Text style={{color:colors.theme_bg, fontFamily:font_title, fontSize:13}}>
                Admin
              </Text>
            }
             {global.user_name != 'admin' && 
              <Text style={{color:colors.theme_bg, fontFamily:font_title, fontSize:13}}>
                worker
              </Text>
            }
            </Col>
            <Col style={{height:"100%",width:"15%",alignSelf:'center'}}>  
              <Icn name='user' color={colors.theme_bg} size={30} type='font-awesome'/>  
            </Col>
          </Row>

      </View>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}
function MyDrawer() {
  return (
    <Drawer.Navigator 
      drawerContent={props => <CustomDrawerContent {...props} />} 
      initialRouteName="Reports"
      drawerStyle={{ width: '72%', backgroundColor: colors.theme_bg }}
      drawerContentOptions={{
        activeTintColor: colors.theme_fg, 
        inactiveTintColor: colors.theme_fg,
        labelStyle: { fontSize: 15, fontFamily:font_title },
      }}
    >
      <Drawer.Screen
        name="Reports"
        component={Reports}
        options={{ 
          drawerIcon: ({ tintColor }) => (
              <Icn name='linechart' type='antdesign' color={colors.theme_fg} size={25} />
          ),
        }}
      />
      {global.user_name != 'admin' &&
      <Drawer.Screen
        name="Show Services"
        component={ShowServices}
        options={{ 
          drawerIcon: ({ tintColor }) => (
              <Icn name='cart-plus' type='font-awesome' color={colors.theme_fg} size={25} />
          ),
        }}
      />
      }
      {global.user_name == 'admin' &&
      <Drawer.Screen
        name="Add Employee"
        component={AddEmployee}
        options={{ 
          drawerIcon: ({ tintColor }) => (
              <Icn name='addusergroup' type='antdesign' color={colors.theme_fg} size={25} />
          ),
        }}
      />
      }
      {global.user_name != 'admin' &&
      <Drawer.Screen
        name="Customers"
        component={CustomerList}
        options={{ 
          drawerIcon: ({ tintColor }) => (
              <Icn name='people' type='SimpleLineIcons' color={colors.theme_fg} size={25} />
          ),
        }}
      />
      }
      {global.user_name == 'admin' &&
      <Drawer.Screen
        name="Add Services"
        component={AddServices}
        options={{ 
          drawerIcon: ({ tintColor }) => (
              <Icn name='switcher' type='antdesign' color={colors.theme_fg} size={25} />
          ),
        }}
      />
      }
      {global.user_name == 'admin' &&
      <Drawer.Screen
        name="Tracking"
        component={Tracking}
        options={{ 
          drawerIcon: ({ tintColor }) => (
              <Icn name='bar-graph' type='entypo' color={colors.theme_fg} size={25} />
          ),
        }}
      />
      }
      <Drawer.Screen
        name="Logout"
        component={Logout}
        options={{ 
          drawerIcon: ({ tintColor }) => (
              <Icn name='exit-to-app' type='MaterialIcons' color={colors.theme_fg} size={28} />
          ),
        }}
      />

    </Drawer.Navigator>
  );
}


function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none" initialRouteName="Splash" >

        <Stack.Screen name="Services" component={Services} />
        <Stack.Screen name="ShowServices" component={ShowServices} />
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="SelectBranch" component={SelectBranch} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="MeasurementDetails" component={MeasurementDetails} />
        <Stack.Screen name="Reports" component={MyDrawer} />
        <Stack.Screen name="Tracking" component={Tracking} />
        <Stack.Screen name="AddCustomer" component={AddCustomer} />
        <Stack.Screen name="AddEmployee" component={AddEmployee} />
        <Stack.Screen name="AddServices" component={AddServices} />
        <Stack.Screen name="CustomerDetails" component={CustomerDetails} />
        <Stack.Screen name="CustomerList" component={CustomerList} />
        <Stack.Screen name="Measurements" component={Measurements} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App;

