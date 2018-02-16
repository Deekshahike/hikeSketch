'use strict';

import React, { Component, PropTypes } from 'react';
import {
  View,
  WebView,
  StyleSheet,
  BackHandler,
   NativeModules,
   Platform,
   ActivityIndicator

} from 'react-native';

import AppTheme from 'hikereactsdk/appthemes/AppTheme'
import ThemeText from 'hikereactsdk/appthemes/components/ThemeText';
import {DialogBox} from 'hikereactsdk';
import {HikeUtils,HikeAppState,HikeSharing} from 'hikereactsdk';
import htmlContent from './injectedHtml';
// import injectedSignaturePad from './injectedJavaScript/signaturePad';
// import injectedApplication from './injectedJavaScript/application';
// import injectedErrorHandler from './injectedJavaScript/errorHandler';
// import injectedExecuteNativeFunction from './injectedJavaScript/executeNativeFunction';

class SignaturePad extends Component {

  static propTypes = {
    onChange: PropTypes.func,
    onError: PropTypes.func,
    style: View.propTypes.style,
    penColor: PropTypes.string,
    dataURL: PropTypes.string,
  };

  static defaultProps = {
    onChange: () => {
    },
    onError: () => {

    },
    style: {}
  };

  constructor(props) {
    console.log("i m here");
    super(props);
    this.sendingData='';
    this.onMessage = this.onMessage.bind(this);
    this.negativePress = this.negativePress.bind(this);
    this.positivePress = this.positivePress.bind(this);
    this.state = {base64DataUrl: props.dataURL || null};
    const { backgroundColor } = StyleSheet.flatten(props.style);
    // var injectedJavaScript = injectedExecuteNativeFunction
    //   + injectedErrorHandler
    //   + injectedSignaturePad
    //   + injectedApplication( backgroundColor, props.dataURL);
   var html = htmlContent(props.penColor,backgroundColor, props.dataURL);
     this.source = {html}; //We don't use WebView's injectedJavaScript because on Android, the WebView re-injects the JavaScript upon every url change. Given that we use url changes to communicate signature changes to the React Native app, the JS is re-injected every time a stroke is drawn.
  }
   componentWillReceiveProps(nextProps){
     console.log("i m in  recieve props" + this.props.penColor + nextProps.penColor );
     
    //const { backgroundColor } = StyleSheet.flatten(nextProps.style);
    // var injectedJavaScript = injectedExecuteNativeFunction
    //   + injectedErrorHandler
    //   + injectedSignaturePad
    //   + injectedApplication( backgroundColor, nextProps.dataURL);
    // this.html = htmlContent(injectedJavaScript);
    

   }
   negativePress() {
    this.setState({ showDialog: false });
  }
  _onNavigationChange = (args) => {
    this._parseMessageFromWebViewNavigationChange(unescape(args.url));
  };

  _parseMessageFromWebViewNavigationChange = (newUrl) => {
    //Example input:
    //applewebdata://4985ECDA-4C2B-4E37-87ED-0070D14EB985#executeFunction=jsError&arguments=%7B%22message%22:%22ReferenceError:%20Can't%20find%20variable:%20WHADDUP%22,%22url%22:%22applewebdata://4985ECDA-4C2B-4E37-87ED-0070D14EB985%22,%22line%22:340,%22column%22:10%7D"
    //All parameters to the native world are passed via a hash url where every parameter is passed as &[ParameterName]<-[Content]&
    var hashUrlIndex = newUrl.lastIndexOf('#');
    if(hashUrlIndex === -1) {
      return;
    }

    var hashUrl = newUrl.substring(hashUrlIndex);
    hashUrl = decodeURIComponent(hashUrl);
    var regexFindAllSubmittedParameters = /&(.*?)&/g;

    var parameters = {};
    var parameterMatch = regexFindAllSubmittedParameters.exec(hashUrl);
    if(!parameterMatch) {
      return;
    }

    while(parameterMatch) {
      var parameterPair = parameterMatch[1]; //For example executeFunction=jsError or arguments=...

      var parameterPairSplit = parameterPair.split('<-');
      if(parameterPairSplit.length === 2) {
        parameters[parameterPairSplit[0]] = parameterPairSplit[1];
      }

      parameterMatch = regexFindAllSubmittedParameters.exec(hashUrl);
    }

    if(!this._attemptToExecuteNativeFunctionFromWebViewMessage(parameters)) {
      logger.warn({parameters, hashUrl}, 'Received an unknown set of parameters from WebView');
    }
  };

  _attemptToExecuteNativeFunctionFromWebViewMessage = (message) => {
    if(message.executeFunction && message.arguments) {
      var parsedArguments = JSON.parse(message.arguments);

      var referencedFunction = this['_bridged_' + message.executeFunction];
      if(typeof(referencedFunction) === 'function') {
        referencedFunction.apply(this, [parsedArguments]);
        return true;
      }
    }

    return false;
  };

  _bridged_jsError = (args) => {
    this.props.onError({details: args});
  };

  _bridged_finishedStroke = ({base64DataUrl}) => {
    this.props.onChange({base64DataUrl});
    this.setState({base64DataUrl});
  };

  _renderError = (args) => {
    this.props.onError({details: args});
  };

  _renderLoading = (args) => {

  };
  base64ToImage(base64Str, path, optionalObj) {

    if (!base64Str || !path) {
        throw new Error('Missing mandatory arguments base64 string and/or path string');
    }

    var optionalObj = optionalObj || {};
    var imageBuffer = decodeBase64Image(base64Str);
    var imageType = optionalObj.type || imageBuffer.type || 'png';
    var fileName = optionalObj.fileName || 'img-' + Date.now();
    var abs;
    var fileName = '' + fileName;

    if (fileName.indexOf('.') === -1) {
        imageType = imageType.replace('image/', '');
        fileName = fileName + '.' + imageType;
    }

    abs = path + fileName;
    fs.writeFile(abs, imageBuffer.data, 'base64', function(err) {
        if (err && optionalObj.debug) {
            console.log("File image write error", err);
        }

    });
    return {
        'imageType': imageType,
        'fileName': fileName
    };
}
 decodeBase64Image(base64Str) {
    var matches = base64Str.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    var image = {};
    if (!matches || matches.length !== 3) {
        throw new Error('Invalid base64 string');
    }

    image.type = matches[1];
    image.data = new Buffer(matches[2], 'base64');

    return image;
}
  onMessage(data){
    console.log( data.nativeEvent.data);
    this.sendingData = data.nativeEvent.data;
     this.setState({showDialog :true});
     this.positivePress();
  }
  positivePress() {
    
    const { appData } = this.props;
    console.log(this.props.appData);
   // var data = { 'filePath': this.pathname.slice(8), 'uploadUrl': "https://microapps-175405.appspot.com/image/upload", 'doCompress': false };
   var data = {
     "imgData" : this.sendingData,

   };
    HikeUtils.doPost('IMAGE_UPLOAD', {
      data: data
    }).then(
      (data) => {
         
        console.log( data );
        
        var user_id = JSON.parse(appData.passData).group_id;
        if (!user_id) {
          user_id = Platform.OS == 'ios' ? appData.msisdn : JSON.parse(appData.passData).uid;;
        }
        var ssm = {
          cardData: JSON.stringify({
            h: 200,
            is_transparent : true,
            layoutId: "index.html",
            ld: {
              msisdn: "+hikesketch+"
            },
            hd: {
              imageUrl:Platform.OS == 'ios'?data.imageUrl : JSON.parse(data.response).imageUrl
            },
            parent_msisdn: "+hikesketch+",
            push: "silent",
            notifText: "Surprise!!!"
          }),
          hikeMessage: "Surprise!!!",
          sharedData: JSON.stringify({
            recipients: "hikesketch",
            cd: {
              imageUrl:Platform.OS == 'ios'?data.imageUrl :JSON.parse(data.response).imageUrl

            }
          }),
          userId: user_id,
          isReact: true
        }
        console.log(user_id);
        console.log(ssm)
        HikeSharing.sendSharedMessage(ssm);
        this.setState({ showDialog: false });
        if(Platform.OS == 'ios'){
          HikeAppState.exitApp();
        }else{
        BackHandler.exitApp(0);
        }
      }).catch((exception) => {
        console.log("uploading exception")

      })
  }
  render = () => {
   
    return (
      <View style={{flex :1}}>
        {this.state.showDialog ?
          
         <View style={{flex: 1,justifyContent: 'center',alignItems: 'center'}}>
              <ActivityIndicator color={AppTheme.getColorPalette().accentColor} size={ 'large'} />
            </View>
          
          :
        <WebView automaticallyAdjustContentInsets={false}
                 onNavigationStateChange={this._onNavigationChange}
                 renderError={this._renderError}
                 renderLoading={this._renderLoading}
                 source={this.source}
                 javaScriptEnabled={true}
                 style={this.props.style}
                 onMessage = {this.onMessage}
                 pointerEvents={'none'}
                 scalesPageToFit={false}/>
        }
        </View>         
    )
  };
}

module.exports = SignaturePad;
