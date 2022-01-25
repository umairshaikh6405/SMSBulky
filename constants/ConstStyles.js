import {StyleSheet} from 'react-native' ;
import Fonts from './Fonts';
import Colors from './Colors';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

const ConstStyles = StyleSheet.create({
    shadow :{
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        
        elevation: 5,
    },
    textInputBorder:{
        alignSelf: 'center', width: wp('60%'), marginTop: wp('3%'), borderWidth: 0.5, padding: 0, 
        fontSize: wp("3.9%"), paddingStart:wp("5%"),
        color: "black"
        , borderColor: 'grey', height: wp("10%")
      },
      passwordInputBorder:{ 
        justifyContent:"center",alignSelf:"center", width: wp('60%'), padding: 0, 
        fontSize: wp("3.9%"), paddingStart:wp("3%"),
        color: "black" , height: wp("10%"), 
      }

});
export default ConstStyles ;