import React, { Component } from "react";
import { View, Text, TouchableOpacity, Dimensions } from "react-native";
import Modal from "react-native-modal";
import { Colors, ConstantsVar, Fonts } from "../constants";
const Width = Dimensions.get("window").width;
export default class PopUpDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ShowDialog: false,
      message: "",
      tittle: "",
    };
  }
  showDialog = (value, message, tittle) => {
    this.setState({
      ShowDialog: value,
      message: message,
      tittle: tittle
    });
  };

  render() {
    let {lable,onPress,messageStyle} = this.props
    return (
      <Modal
        style={{ felx: 1, width: "100%" }}
        isVisible={this.state.ShowDialog}
        onModalHide={()=> {
           onPress() 
        }}
        animationIn="slideInLeft"
        animationOut="slideOutRight"
        backdropOpacity={0.5}
        useNativeDriver={true}

      >
        <View style={{ width: "90%", alignItems: "center" }}>
          <View
            style={{
              backgroundColor: "white",
              width: "85%",
              borderRadius:Width/20,
              alignItems: "center",
              padding:Width /20
            }}
          >
            <Text
              style={{
                fontSize: Width / 22,
                textAlign: "center",
               margin:0,
               padding:0,
                color: Colors.primary,
              }}
            >
              {this.state.tittle}
            </Text>
            <Text
              style={[{
                fontSize: Width / 28,
                width:"87%",
                marginVertical:Width / 40,
                color: "black",
                textAlign:"center"
              },messageStyle]}
            >
              {this.state.message} 
            </Text>



            <TouchableOpacity
              onPress={() => {
              this.showDialog(false, ""); 
              }}
              style={{
                width:Width/2.9,
                height:Width/10,
               marginTop:Width/20,
               alignSelf:'center',
                justifyContent: "center",
                alignContent: "center",
                backgroundColor: Colors.primary
              }}
            >
              <Text
                style={{
                  fontSize: Width / 22,
                  color: "white",
                  textAlign: "center"
                }}
              >
               {lable ? lable : "no lable"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }
}
