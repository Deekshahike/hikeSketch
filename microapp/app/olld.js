/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  Image,
  StyleSheet,
  Text,
  View,
  Alert,
  TouchableOpacity,
  NativeModules, BackHandler, Platform
} from 'react-native';

import RNSketchCanvas from './components/HikeSketch';
import CardView from './CardView';
import { SketchCanvas } from './components/HikeSketch';
import { DialogBox } from 'hikereactsdk';
import AppTheme from 'hikereactsdk/appthemes/AppTheme'
export default class HikeSketch extends Component {
  constructor(props) {
    super(props)

    this.state = {
      example: 0,
      color: '#FF0000',
      thickness: 5,
      message: '',
      imageSaved: false,
      showDialog: false,
    }
    this.filePath='';
    var currentThemeData = this.props.current_theme_data;
		if (currentThemeData) {
			if (Platform.OS === 'android')
			currentThemeData = JSON.parse(currentThemeData);
			AppTheme.initThemeData(currentThemeData);
		}
    this.negativePress = this.negativePress.bind(this);
    this.positivePress = this.positivePress.bind(this);

  }
  negativePress() {
    this.setState({ showDialog: false });
  }
  positivePress() {
    this.setState({ showDialog: false });
     let appData = { ...this.props };
    var data = { 'filePath': this.pathname.slice(8), 'uploadUrl': "https://microapps-175405.appspot.com/image/upload", 'doCompress': false };
    NativeModules.HikeUtilsModule.uploadFile(JSON.stringify(data)).then(
      (data) => {
        console.log("uploaded" + data)
        console.log("url is" + JSON.parse(data).imageUrl);
        var user_id = JSON.parse(appData.passData).uid;
        if (!user_id) {
          user_id = JSON.parse(appData.passData).group_id;
        }
        var ssm = {
          cardData: JSON.stringify({
            h: 200,
            layoutId: "index.html",
            ld: {
              msisdn: "+hikesketch+"
            },
            hd: {
              imageUrl: JSON.parse(data).imageUrl
            },
            parent_msisdn: "+hikesketch+",
            push: "silent",
            notifText: "Surprise!!!"
          }),
          hikeMessage: "Surprise!!!",
          sharedData: JSON.stringify({
            recipients: "hikesketch",
            cd: {
              imageUrl: JSON.parse(data).imageUrl

            }
          }),

          userId: user_id,

          isReact: true
        }
        console.log(JSON.parse(appData.passData).uid);
        console.log(ssm)
        NativeModules.HikeSharingModule.sendSharedMessage(ssm);
        BackHandler.exitApp();
      }).catch((exception) => {
        console.log("uploading exception")

      })
  }

  render() {

    let appData = { ...this.props };
    console.log(appData.passData);

    if (appData.triggerPoint == "card") return (<CardView appData={appData} />);
    return (
      <View style={styles.container}>
        {this.state.showDialog ?
          <DialogBox
            renderWithList={true}
            visible={this.state.showDialog}
            heading={"Do you want to send sketch? "}
            negbtntext={"NO"}
            posbtntext={"YES"}
            onNegativePress={this.negativePress}
            onPositivePress={this.positivePress}
            />
         
          :
          null}
        <View style={{ flex: 1, backgroundColor: 'transparent' }}>
          <RNSketchCanvas
            containerStyle={{ flex: 1, backgroundColor: 'transparent' }}
            canvasStyle={{ backgroundColor: 'transparent', flex: 1 }}
            onStrokeEnd={data => {
            }}
            closeComponent={<View style={styles.functionButton}><Text style={{ color: 'white' }}>Close</Text></View>}
            onClosePressed={() => {
              this.setState({ example: 0 })
            }}
            undoComponent={<Image  tintColor={'white'} source={require('../images/undo.png')} />}
            onUndoPressed={(id) => {
              // Alert.alert('do something')
            }}
            clearComponent={<Image  tintColor={'white'} source={require('../images/ic_med_delete.png')} />}
            onClearPressed={() => {
              // Alert.alert('do something')
              this.setState({ imageSaved: false })
            }}
            infoComponent={<View style={styles.functionButton}><Text style={{ color: 'white' }}>Info</Text></View>}
            onInfoPressed={() => {
              // Alert.alert('some info')
            }}
            strokeComponent={color => (
              <View style={[{ backgroundColor: color }, styles.strokeColorButton]} />
            )}
            strokeSelectedComponent={(color, index, changed) => {
              return (
                <View style={[{ backgroundColor: color, borderWidth: 2, borderColor: '#C0C0C0' }, styles.strokeColorButton]} />
              )
            }}
            strokeWidthComponent={(w) => {
              return (<View style={styles.strokeWidthButton}>
                <View style={{
                  backgroundColor: 'white', marginHorizontal: 2.5,
                  width: Math.sqrt(w / 3) * 10, height: Math.sqrt(w / 3) * 10, borderRadius: Math.sqrt(w / 3) * 10 / 2
                }} />
              </View>
              )
            }}
            defaultStrokeIndex={0}
            defaultStrokeWidth={10}
            saveComponent={<Image tintColor={'white'} source={require('../images/ic_reg_send.png')} />}
            savePreference={() => {
              this.filename1 = String(Math.ceil(Math.random() * 100000000));
              this.pathname = String("file:///storage/emulated/0/Pictures/RNSketchCanvas/" + this.filename1 + ".png");
              return {
                folder: 'RNSketchCanvas',
                filename: this.filename1,
                transparent: false,
                imageType: 'png'
              }
            }}
            onSketchSaved={success => {
              this.setState({ imageSaved: true })
              console.log("started uploading")
              this.setState({ showDialog: true });

              //Alert.alert("Sketch sent succesfully")


            }}
          />

        </View>

        
      </View>
    );
  }
}
//source={{uri: "file:///storage/emulated/0/Pictures/RNSketchCanvas/null.jpg"}} />}
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
