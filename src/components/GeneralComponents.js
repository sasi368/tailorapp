import React from 'react';
import { Image as Img, StatusBar as Sb } from 'react-native';
import * as colors from '../assets/css/Colors';
import Spinner from 'react-native-loading-spinner-overlay';


export function StatusBar(props){
	return <Sb
	    barStyle = "light-content"
	    hidden = {false} 
	    backgroundColor = {colors.theme_bg}
	    translucent = {false}
	    networkActivityIndicatorVisible = {true}
	 />
} 

export function Loader(props){
	return <Spinner
      visible={props.visible}
      color={colors.theme_bg}
      size="large"
      animation="fade"
    />
}
