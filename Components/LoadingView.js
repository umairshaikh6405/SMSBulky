import React, { Component } from "react";
import { View, Text, TouchableOpacity, Dimensions, Image } from "react-native";
import Modal from "react-native-modal";
import { widthPercentageToDP } from "react-native-responsive-screen";
import { Colors, ConstantsVar, Fonts } from "../constants";
const Width = Dimensions.get("window").width;
export default class LoadingView extends Component {
  constructor(props) {
    super(props);
    this.onTryPress = null
    this.state = {
      ShowDialog: false,
      interConnecError : false
    };
    ConstantsVar.LoadingView = this
  }
  show = (value) => {
    this.setState({
      ShowDialog: value,
    });
  };

  internetError = (value,onPress) => {
    this.onTryPress = onPress
    setTimeout(() => {
      this.setState({
        interConnecError: value,
      });
    }, 500);
  };

  render() {
    return (
      <>
        <Modal
          style={{ felx: 1, width: "100%" }}
          isVisible={this.state.ShowDialog}
          animationIn="slideInLeft"
          animationOut="slideOutRight"
          backdropOpacity={0.5}
          hideModalContentWhileAnimating={true}
          useNativeDriver={true}

        >
          <View style={{ width: "90%", alignItems: "center", backgroundColor: "white", borderRadius: widthPercentageToDP(5) }}>
            <Image
              style={{ width: "50%", height: widthPercentageToDP(50), resizeMode: "contain" }}
              source={require("../assets/loading.gif")}

            />

          </View>
        </Modal>
        <Modal
          style={{ felx: 1, width: "100%" }}
          isVisible={this.state.interConnecError}
          animationIn="slideInLeft"
          animationOut="slideOutRight"
          backdropOpacity={0.5}
          hideModalContentWhileAnimating={true}
          useNativeDriver={true}

        >
          <View style={{ width: "90%", alignItems: "center", backgroundColor: "white", borderRadius: widthPercentageToDP(5) }}>
            <Image
              style={{ width: "100%", height: widthPercentageToDP(50), resizeMode: "contain" }}
              source={require("../assets/Internet-Access-Error.jpeg")}

            />

      <TouchableOpacity 
      onPress={()=> this.onTryPress && this.onTryPress()}
      style={{width:"50%", height:"20%", backgroundColor:"red", position:"absolute", bottom:"10%"}}
      >

      </TouchableOpacity>


          </View>
        </Modal>
      </>
    );
  }
}
