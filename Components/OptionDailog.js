import React, { Component } from "react";
import { View, Text, TouchableOpacity, Dimensions } from "react-native";
import Modal from "react-native-modal";
import { widthPercentageToDP as wp} from "react-native-responsive-screen";
import { Colors, ConstantsVar, Fonts } from "../constants";
const Width = Dimensions.get("window").width;
export default class OptionDailog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ShowDialog: false,
    };
  }
  showDialog = () => {
    this.setState({
      ShowDialog: true,
    });
  };

  render() {
    let {onPress} = this.props
    return (
      <Modal
        style={{ felx: 1, width: "100%" }}
        isVisible={this.state.ShowDialog}
        animationIn="slideInLeft"
        animationOut="slideOutRight"
        backdropOpacity={0.5}
        useNativeDriver={true}

      >
        <View style={{ width: "90%", alignItems: "center" , backgroundColor:"white"}}>
        <TouchableOpacity
              onPress={() => {
                this.setState({
                  ShowDialog: false,
                },()=>{
                  onPress(1) 
                });
              }}
              style={{
                width:"100%",
                height:wp(20),
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
               From CSV
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                this.setState({
                  ShowDialog: false,
                },()=>{
                  onPress(2) 
                });
              }}
              style={{
                width:"100%",
                height:wp(20),
                marginTop:wp(4),
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
               From contact
              </Text>
            </TouchableOpacity>


            
          </View>
      </Modal>
    );
  }
}
