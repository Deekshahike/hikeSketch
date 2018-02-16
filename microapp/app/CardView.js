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
  ImageEditor
} = ReactNative;
import CropImage from 'react-native-cropimage';
import { HikeSharing,HikeStorage,HikeChatCard,HikeUtils } from 'hikereactsdk';

class CardView extends React.Component{
  constructor(props){
    super(props);
  
  }
  render() {
   
    //let appData = this.props.appData;
    var uri = JSON.parse(this.props.appData.cardObj).hd.imageUrl;
    console.log(uri);
    return (
      <View style={{flex:1}} >
      <CropImage
      backgroundColor = {'black'}
			source={{
				uri: uri
			}}
			crop={{
				top: 0,
				left: 0,
        height:340
			
      
			}}
			
			height={340}	
      width={'100%'}
  						
		/>
      </View>


    );
  }
}
var styles = StyleSheet.create({
  font:{
    fontFamily: Platform.OS === 'ios' ? "FaktSoftPro-Medium" : "FaktSoftProMedium"
  },
  container: {
    padding:10,
    flex:1,
    flexDirection:'column',
  },
  question:{
    alignItems:'flex-start',
    fontSize:24,
  },
  header:{
    flex:1,
  },
  headerContent:{
    borderWidth:0,
    borderBottomWidth:1,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center'
  },
  content:{
    flex:5,
  },
  button:{
    flex:1,
    borderRadius: 5,
  },
  footer:{
    flex:1,
    justifyContent:'flex-end',
  },
  rowStyle : {
    flex:1,
    flexDirection: 'row',
    alignItems:'center',
    justifyContent: 'space-between',
  },
  barImage:{
    width:32,
    height:32
  },
  image: {
    height: 24,
    width: 24,
    borderRadius: 15,
  },
});
export default CardView
