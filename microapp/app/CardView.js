var React = require('react');
var ReactNative = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  PixelRatio,
  Image,
  Alert,
  Platform,
  Dimensions,
  TouchableHighlight,
  View,
  TouchableOpacity,
  ImageEditor,
  ActivityIndicator
} = ReactNative;
import CropImage from 'react-native-cropimage';
import AppTheme from 'hikereactsdk/appthemes/AppTheme'
import ThemeText from 'hikereactsdk/appthemes/components/ThemeText';
import { HikeSharing, HikeStorage, HikeChatCard, HikeUtils } from 'hikereactsdk';

class CardView extends React.Component {
  constructor(props) {
    super(props);
    console.log(" constructor card");
    
    
    this.h = props.appData.messageHash;
    this.uid = props.appData.msisdn;
    this.isSent = props.appData.isSent;
    if (Platform.OS === 'ios') {
      this.hd = props.appData.hd;
    
    }
    else {
      this.hd = JSON.parse(props.appData.cardObj).hd;

    }
    this.state ={
      loadingDone:true,
      uri:this.hd.imageUrl,
    }
    
  }
  
  
  componentWillReceiveProps(initProps) {
    console.log("i m in componentWIll");
    if (Platform.OS === 'ios') {
       if(this.state.uri !==initProps.appData.cardObj.hd.imageUrl ){
         this.isSent =initProps.appData.isSent ;
      this.setState({uri : initProps.appData.cardObj.hd.imageUrl});
        }
    
    }
    else{
        if(this.state.uri !==JSON.parse(initProps.appData.cardObj).hd.imageUrl ){
          this.isSent =initProps.appData.isSent ;
      this.setState({uri : JSON.parse(initProps.appData.cardObj).hd.imageUrl});
        }
    }

  }
  render() {
    console.log("render card");
    //let appData = this.props.appData;
    
    //console.log(uri);
    return (
      <View style={{ flex: 1,justifyContent:this.isSent ? 'flex-end' : 'flex-start',alignItems: this.isSent ? 'flex-end' : 'flex-start'}} >
        {this.state.loadingDone ?
        <View style = {{width:"50%",height:"100%"}}>
          <CropImage
            style ={{backgroundColor:'black'}}
            source={{
              uri: this.state.uri
            }}
            crop={{
              top: 0,
              left: 0,
              height: 340


            }}
            
            height={340}
            width={'100%'}

          />
          </View> 
        
          :
          <View style={{ marginTop: 100 }}>
            <View style={styles.spinnerStyle}>
              <ActivityIndicator color={AppTheme.getColorPalette().accentColor} size={ 'large'} />
            </View>
          </View>
        }
      </View>


    );
  }
}
var styles = StyleSheet.create({
  font: {
    fontFamily: Platform.OS === 'ios' ? "FaktSoftPro-Medium" : "FaktSoftProMedium"
  },
  spinnerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    padding: 10,
    flex: 1,
    flexDirection: 'column',
  },
  question: {
    alignItems: 'flex-start',
    fontSize: 24,
  },
  header: {
    flex: 1,
  },
  headerContent: {
    borderWidth: 0,
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  content: {
    flex: 5,
  },
  button: {
    flex: 1,
    borderRadius: 5,
  },
  footer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  rowStyle: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  barImage: {
    width: 32,
    height: 32
  },
  image: {
    height: 24,
    width: 24,
    borderRadius: 15,
  },
});
export default CardView
