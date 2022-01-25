import React, { Component } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  TextInput,
  Platform,
  Dimensions
} from "react-native";
import {  Fonts, Colors } from "../constants";
import QuestionTitle from "./QuestionTitle";

const SCREEN_WIDTH = Dimensions.get("window").width;

export default class TextArea extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: -1
    };
  }
  
  render() {
    return (
      <QuestionTitle
        No={this.props.index}
        Title={this.props.item.name}
        isMendentrory={this.props.item.is_mandatory}
      >
          <View style={{  width: "85%",borderWidth: 0.7,padding:SCREEN_WIDTH / 70, borderRadius: 10,
            borderColor: "#707070",marginLeft:SCREEN_WIDTH / 80, marginTop:SCREEN_WIDTH / 100,marginBottom:SCREEN_WIDTH / 100}}>
            <TextInput
                style={{
                    borderColor: 'black',
                     fontSize: SCREEN_WIDTH / 22,
                     marginLeft:SCREEN_WIDTH / 50,
                    width: "90%"
                }}
                onChangeText={(text)=>{
                  this.props.onSelect(text, this.props.index);
                }}
                multiline={true}
                placeholder={"Write..."}
            />
      </View>
      </QuestionTitle>
    );
  }
}
