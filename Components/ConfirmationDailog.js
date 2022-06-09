import React, { useState } from 'react'
import { View, Text, Dimensions, StyleSheet,TouchableOpacity, Image } from 'react-native';
import { width } from 'react-native-dimension';
import Modal from "react-native-modal";
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Colors from '../constants/Colors';

let propsData = {}

export default ConfirmationDailog = React.forwardRef((props, ref) => {

  const [isVisible, ModalVisibility] = useState(false)
  const [message, setMessage] = useState("")


  React.useImperativeHandle(ref, () => ({

    isVisible(params){
      propsData = params
      ModalVisibility(!isVisible);
      setMessage(params.message)
    }


  }));


  const {NegText,NegPress,PosText,PosPress, data} = propsData

  return (
    <Modal
      style={{ felx: 1, width: "100%",  alignSelf:"center", alignItems:"center" }}
      isVisible={isVisible}
      animationIn="slideInLeft"
      animationOut="slideOutRight"
      backdropOpacity={0.5}
      useNativeDriver={true}
      hideModalContentWhileAnimating={true}
      onBackdropPress={()=>{
        ModalVisibility(false)
        propsData = {}
      }}
    >
      <View style={styles.modalView}>


        <Text style={styles.msgText}>{message}</Text>

        <View style={{flexDirection:"row"}}>
       {NegText && <TouchableOpacity style={[styles.negBtn,{ marginRight:wp(3), backgroundColor:Colors.red,}]}
          onPress={()=>{
            ModalVisibility(false)
            NegPress && NegPress(data)
          }}
          >
          <Text style={[styles.okayText]}>{NegText}</Text>
        </TouchableOpacity>}

       {PosText && <TouchableOpacity style={styles.okayBtn}
          onPress={()=>{
            ModalVisibility(false)
            PosPress  && PosPress(data)
          }}
          >
          <Text style={styles.okayText}>{PosText}</Text>
        </TouchableOpacity>}
        </View>
      </View>
    </Modal>
  )
})

const styles = StyleSheet.create({

  modalView : {
    width: wp(85),  backgroundColor: "white" ,
    borderRadius:wp(2) ,
    padding:wp(6) ,

  } ,

  limitedStockText : {
    fontSize :wp (5) ,

    color : Colors.primary
  },
  msgText : {

    fontSize:wp(4),
    color: "black",
    marginTop:wp(2),
    marginBottom:wp(6),
  },
  negBtn : {
    backgroundColor:Colors.primary,
    flex:1,
    justifyContent:"center" ,
    alignItems:"center" ,
    padding:wp(1.5),
    borderRadius:wp(2)

  },
  okayBtn : {
    backgroundColor:Colors.primary,
    flex:1,
    justifyContent:"center" ,
    alignItems:"center" ,
    padding:wp(1.5),
    borderRadius:wp(2)

  } ,
  okayText : {
    fontSize :wp (4.5) ,
    color : "white"
  }
})

