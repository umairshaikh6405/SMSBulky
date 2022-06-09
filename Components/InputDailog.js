import React, { Component } from "react";
import { View, Text, TouchableOpacity, Dimensions, TextInput } from "react-native";
import Modal from "react-native-modal";
import { widthPercentageToDP as wp} from "react-native-responsive-screen";
import { Colors, ConstantsVar, Fonts, ServerConnection } from "../constants";
import RoundButton from "./RoundButton";
import RoundTextInput from "./RoundTextInput";
const Width = Dimensions.get("window").width;
export default class InputDailog extends Component {
  constructor(props) {
    super(props);
    this.groupName = ""
    this.state = {
      ShowDialog: false,
    };
  }
  showDialog = (isShow) => {
    this.setState({
      ShowDialog: isShow,
    });
  };

  render() {
    let { onPress } = this.props
    return (
      <Modal
        style={{ felx: 1, width: "100%" }}
        isVisible={this.state.ShowDialog}
        animationIn="slideInLeft"
        animationOut="slideOutRight"
        backdropOpacity={0.5}
        onBackdropPress={()=> this.showDialog(false)}
        onBackButtonPress={()=> this.showDialog(false)}
        useNativeDriver={true}

      >
        <View style={{ width: "90%",  backgroundColor: "white", padding:wp(5) }}>
          
        <Text style={{fontSize : wp(4.5), alignSelf:"center", color:"black"}}>Enter Group Name</Text>
          <RoundTextInput
           onChangeText={(text)=>{
            this.groupName = text
          }}
          />

          <RoundButton
            title={"Create Group"}
            style={{ width: "100%", backgroundColor: Colors.secondary, marginTop:wp(4)}}
            textStyle={{ fontSize: wp(4) }}
            onPress={() => {
              if(this.groupName == ""){
                ServerConnection.showErrorMsg("Please enter group name first")
              }else{
                onPress(this.groupName)
              }
              
            }}
          />


        </View>
      </Modal>
    );
  }
}
