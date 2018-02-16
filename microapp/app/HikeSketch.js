
import React, { Component } from 'react';

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  FlatList,
  TouchableHighlight,
  TouchableOpacity,
  Platform

} from 'react-native';
import AppTheme from 'hikereactsdk/appthemes/AppTheme';
import CardView from './CardView';
import SignaturePad from './SignaturePad';

export default class HikeSketch extends Component {
  constructor(props){
    super(props);
    this.state={
      color:'',
    }
    this.strokeColors= [
      { color: '#808080' },
      { color: '#FF0000' },
      { color: '#0000FF' },
      { color: '#800080' },
      { color: '#FFFF00' },
      { color: '#00FF00' },
      { color: '#FFA500' },
      { color: '#FFFFFF'}];
      var currentThemeData = this.props.current_theme_data;
		if (currentThemeData) {
			if (Platform.OS === 'android')
			currentThemeData = JSON.parse(currentThemeData);
			AppTheme.initThemeData(currentThemeData);
		}
  }


shallowEqual(objA, objB) {
  if (objA === objB) {
    return true;
  }

  if (typeof objA !== 'object' || objA === null ||
      typeof objB !== 'object' || objB === null) {
    return false;
  }

  var keysA = Object.keys(objA);
  var keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  // Test for A's keys different from B.
  var bHasOwnProperty = hasOwnProperty.bind(objB);
  for (var i = 0; i < keysA.length; i++) {
    if (!bHasOwnProperty(keysA[i]) || objA[keysA[i]] !== objB[keysA[i]]) {
      return false;
    }
  }

  return true;
}

 shallowCompare(instance, nextProps, nextState) {
  return (
    !this.shallowEqual(instance.state, nextState)
  );
}


  shouldComponentUpdate(nextProps, nextState) {
    return this.shallowCompare(this, nextProps, nextState);
  }


  componentWillReceiveProps(initProps) {
    console.log("Deeksha here i m in componentWIll");
    
      this.forceUpdate();
    

  }

  strokeComponent(color){
            return( <View style={[{ backgroundColor: color }, styles.strokeColorButton]} >
              <Text style={{color:'white'}}>{this.state.color.color}</Text></View>);
    }
    strokeSelectedComponent(color, index, changed) {
              return (
                <View style={[{ backgroundColor: color, borderWidth: 2, borderColor: '#C0C0C0' }, styles.strokeColorButton]} >
                <Text style={{color:'white'}}>{this.state.color.color}</Text>
                </View>
              )
       }
  
  _renderItem = ({item, index}) => (
    <TouchableOpacity style={{ marginHorizontal: 2.5 }} onPress={() => {
      var temp=item.color;
      this.setState({ color: item })
      console.log(item.color);
      this.forceUpdate();
      
      this._colorChanged = true
    }}>
    { this.state.color.color!== item.color &&  this.strokeComponent(item.color) }
    { this.state.color.color=== item.color && this.strokeSelectedComponent(item.color, index, this._colorChanged) }
      
    </TouchableOpacity>
  )
  render = () => {
    console.log("main render");
     let appData = { ...this.props };
     if (appData.triggerPoint == "card") return (<CardView appData={appData} />);
    return (
      <View style={{flex:1,backgroundColor: '#2b2b2b'}}>
        
        
           <SignaturePad 
                      appData = {appData}
                      onError={this._signaturePadError}
                        onChange={this._signaturePadChange}
                        penColor={'#FF0000' }
                        style={{flex: 1, backgroundColor: 'transparent'}}/>
          
        
      </View>  
    )
  };

  _signaturePadError = (error) => {
    console.error(error);
  };

  _signaturePadChange = ({base64DataUrl}) => {
    console.log("Got new signature: " + base64DataUrl);
    console.log(this.state.color.color); 
    penColor=this.state.color.color;
  };
}
const styles = StyleSheet.create({
  container: {
    flex:1,
    height:"340",
    backgroundColor: '#292C33',
  },
  strokeColorButton: {
    marginHorizontal: 1.5,
    marginVertical: 8,
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  strokeWidthButton: {
    marginHorizontal: 1.5,
    marginVertical: 8,
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#39579A'
  },
  functionButton: {
    marginVertical: 16,
    justifyContent: 'center',
    alignItems: 'center',
  }
});