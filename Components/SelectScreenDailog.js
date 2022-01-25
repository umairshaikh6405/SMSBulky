import React, { Component } from "react";
import { View, Text, TouchableOpacity, Dimensions } from "react-native";
import Modal from "react-native-modal";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { Colors, ConstantsVar, Fonts } from "../constants";
const Width = Dimensions.get("window").width;
export default class SelectScreenDailog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ShowDialog: false,
    };
  }
  showDialog = (value) => {
    this.setState({
      ShowDialog: value
    });
  };

  render() {
    return (
      <Modal
        style={{ felx: 1, width: "100%" }}
        isVisible={this.state.ShowDialog}
        animationIn="slideInLeft"
        animationOut="slideOutRight"
        backdropOpacity={0.5}
        useNativeDriver={true}
        hideModalContentWhileAnimating={true}
        onBackdropPress={()=> this.setState({ ShowDialog: false})}

      >
        <View style={{ width: "90%", alignItems: "center" , backgroundColor:Colors.lightblue, paddingVertical:wp(5)}}>
        
        <TouchableOpacity
        style={{width:"80%",alignItems:"center", backgroundColor:Colors.primary , paddingVertical:wp(4), paddingHorizontal:wp(6)}}
        onPress={()=>{
            this.setState({
                ShowDialog:false
            })
            this.props.onPress(0)
        }}
        >
            <Text style={{fontSize:wp(4), color:"white"}}>Show And Submit Document</Text>
        </TouchableOpacity>
        <TouchableOpacity
        style={{width:"80%",alignItems:"center", backgroundColor:Colors.primary , paddingVertical:wp(4), paddingHorizontal:wp(6), marginTop:wp(2)}}
        onPress={()=>{
            this.setState({
                ShowDialog:false
            })
            this.props.onPress(1)
        }}
        >
            <Text style={{fontSize:wp(4), color:"white"}}>Campaign Details</Text>
        </TouchableOpacity>
        </View>
      </Modal>
    );
  }
}
