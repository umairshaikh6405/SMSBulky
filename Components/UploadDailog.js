import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  Dimensions,
} from 'react-native';
import { Colors, Fonts, ConstantsVar} from '../constants';
import Modal from 'react-native-modal';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import RoundButton from './RoundButton';
import { widthPercentageToDP as wp} from 'react-native-responsive-screen';

const SCREEN_WIDTH = Dimensions.get('window').width
export default class UploadDailog extends Component {
  constructor(props) {
    super(props);
    this.comp = null
    this.limit = 0;
    this.state = {
      isDone:false,
      isVisible: false,
      counter: 0,
    };
  }



  isShow = (value, totalCount) => {
      this.limit = totalCount ? totalCount : 0;
      this.setState({
        counter: 0,
        isVisible: value,
      });
  };

  changeProgress = value => {
      this.setState({
        counter: value,
      });
  };


  done = (comp) => {
    this.comp = comp
    this.setState({
      isDone: true,
    });
  };


  

  render() {
    return (
      <Modal
        style={{
          flex: 1,
          alignItems: 'center',
          backgroundColor: 'white',
          margin: 0,
        }}
        isVisible={this.state.isVisible}
        animationIn="slideInLeft"
        coverScreen={true}
        animationOut="slideOutDown"
        backdropColor={'white'}
        backdropOpacity={1}
        useNativeDriver={true}
        hideModalContentWhileAnimating={true}>
        {!this.state.isDone && <View
          style={{
            width: SCREEN_WIDTH / 2.6,
            height: SCREEN_WIDTH / 2.6,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <AnimatedCircularProgress
            size={SCREEN_WIDTH / 3.3}
            width={10}
            fill={this.state.counter * 100 / this.limit}
            rotation={360}
            duration={0}
            style={{overflow: 'visible'}}
            tintColor={Colors.primary}
            backgroundColor="#e4e4e4"></AnimatedCircularProgress>

          <Text
            style={{
              position: 'absolute',
              fontSize: SCREEN_WIDTH / 25,
              marginTop: SCREEN_WIDTH / 30,
              color: Colors.primary,
              fontFamily: Fonts.primarySemiBold,
            }}>
            {parseInt(this.state.counter * 100 / this.limit)}%
          </Text>
        </View>}
        <View style={{width:"100%", flexDirection:"row", justifyContent:"space-around"}}>

        <Text style={{
              fontSize: SCREEN_WIDTH / 25,
              marginTop: SCREEN_WIDTH / 30,
              color: Colors.green,
              fontFamily: Fonts.primaryBold,
            }}>Sent : {this.state.counter}</Text>
        <Text style={{
              fontSize: SCREEN_WIDTH / 25,
              marginTop: SCREEN_WIDTH / 30,
              color: Colors.black,
              fontFamily: Fonts.primarySemiBold,
            }}>Total : {this.limit}</Text>

        </View>

       {this.state.isDone && <RoundButton
          title={"Ok"}
          style={{ width: wp(90), backgroundColor: Colors.secondary, borderRadius: 0 , marginTop:wp(10)}}
          textStyle={{ fontSize: wp(4) }}
          onPress={() => {
            this.setState({
              counter: 0,
              isVisible: false,
              isDone: false,
            },()=>{
              this.comp()
            });
          }}
        />}
       
      </Modal>
    );
  }
}
