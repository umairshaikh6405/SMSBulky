import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import { Colors, ConstantsVar, Fonts, } from '../constants';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { EventRegister } from 'react-native-event-listeners';
import BouncyCheckbox from 'react-native-bouncy-checkbox';



export default class ImportContactListItem extends Component {
  constructor(props) {
    super(props);
    this.item = null
    this.selected = this.props.isAll
  }

  getSelected = () => {
    if (this.selected) {
      return this.item
    }
  }

  componentDidMount() {
    this.listener = EventRegister.addEventListener('select_Import_All', (data) => {
      
      console.log("adsdsadsa",data,this.selected);
      if(data != this.selected){
        this.bouncyCheckboxRef?.onPress()
        this.selected = data
      }
     
     
    })
  }

  componentWillUnmount() {
    EventRegister.removeEventListener(this.listener)
  }



  render() {
    let { item, index } = this.props
    var phoneNumber = item.phoneNumber ? item.phoneNumber : '';
    let removestr = /\s/g;
    phoneNumber = phoneNumber.replace(removestr, '');
    phoneNumber = phoneNumber.replace('+92', '0');
    item = {
      phoneNumber: phoneNumber,
      displayName: item.displayName ? item.displayName : item.givenName ? item.givenName : ""
    }
    this.item = item
    return (
      <TouchableOpacity
        onPress={() => {
          this.bouncyCheckboxRef?.onPress()
          this.selected = !this.selected
        }}
        style={{
          width: wp(100),
          borderBottomWidth: wp(0.3),
          borderColor: '#D9D2D2',
          alignItems: 'center',
          marginBottom: wp(3),
        }}>
        <View
          style={{
            width: wp(89),
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingBottom: wp(2),
          }}>

          <BouncyCheckbox
            ref={(ref) => (this.bouncyCheckboxRef = ref)}
            size={wp(6)}
            style={{ width: wp(7) }}
            fillColor={Colors.primary}
            unfillColor="#FFFFFF"
            isChecked={this.selected}
            disableText={true}
            iconStyle={{ borderColor: Colors.primary }}
            textStyle={{
              textDecorationLine: "none",
            }}
          />
          <View style={{flex:1, paddingLeft:wp(4)}}>

            <Text style={{ fontFamily: Fonts.primarySemiBold, fontSize: wp(4.3) }}>{item.displayName}</Text>

            <Text>{item.phoneNumber}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  mainContainer: {
    flex: 1,
    width: wp(100),
    alignItems: 'center',
  },
  walletContainer: {
    width: wp(92),
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: wp(2),
  },
  priceContainer: {
    backgroundColor: Colors.primary,
    borderTopRightRadius: wp(2),
    borderBottomLeftRadius: wp(2),
    paddingVertical: wp(1),
    paddingHorizontal: wp(5),
  },
  bottomcontainer: {
    borderWidth: 0,
    height: wp(14),
    width: wp(100),
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
  },
  bottombackbtn: {
    width: wp(50),
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth: wp(0.14),
    borderColor: '#D9D2D2',
  },
  backtext: {
    fontFamily: Fonts.primaryRegular,
    fontSize: wp(4.5),
  },
  bottomconfirmbtn: {
    width: wp(50),
    backgroundColor: '#AFAFAF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirmtext: {
    color: 'white',
    fontFamily: Fonts.primaryRegular,
    fontSize: wp(4.5),
  },
  notificationcontainer: {
    height: wp(6),
    backgroundColor: '#1FA724',
    width: wp(100),
    justifyContent: 'center',
  },
  notificationText: {
    fontSize: wp('3%'),
    fontFamily: Fonts.primarySemiBold,
    color: 'white',
    textAlign: 'center',
  },
  bottomMain: {
    height: wp(14),
    width: wp(100),
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    borderTopWidth: 1,
  },
  confirmtrue: {
    width: wp(50),
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  otpbtn: {
    paddingHorizontal: wp(3.5),
    paddingVertical: wp(1.2),
    borderWidth: 1,
    borderRadius: wp(5),
    marginLeft: wp(3),
    flexDirection: 'row',
    borderColor: Colors.primary,
    marginTop: wp(2.5),
  },
  otptext: {
    fontSize: wp('3%'),
    fontFamily: Fonts.primarySemiBold,
    color: Colors.primary,
    textAlign: 'center',
  },
});
