import React from 'react';
import { Image as Img, StatusBar as Sb } from 'react-native';
import * as colors from '../assets/css/Colors';
import Spinner from 'react-native-loading-spinner-overlay';
import ContentLoader, { Rect, Circle } from 'react-content-loader/native';

export function StatusBar(props){
	return <Sb
	    barStyle = "light-content"
	    hidden = {false} 
	    backgroundColor = {colors.theme_bg}
	    translucent = {false}
	    networkActivityIndicatorVisible = {true}
	 />
} 

export function ChatLoader(){
	return <ContentLoader
      height={160}
      speed={1}
      backgroundColor={colors.theme_grey}
      foregroundColor={'#999'}
      viewBox="0 0 340 160"
    >
      {/* Only SVG shapes */}
      
      <Rect x="70" y="10" rx="4" ry="4" width="250" height="15" />
      <Rect x="70" y="35" rx="3" ry="3" width="120" height="8" />

    </ContentLoader>
}

export function Loader(props){
	return <Spinner
      visible={props.visible}
      color={colors.theme_bg}
      size="large"
      animation="fade"
    />
}
