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

export default class SurveyRadioButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: -1
    };
  }
  renderItem = ({ item, index }) => {
    let color = this.state.selected == index ? Colors.primary : "white";
    return (
      <TouchableOpacity
        onPress={() => {
          this.setState({
            selected: index
          });
          this.props.onSelect(item, this.props.item.quiz_id);
        }}
        style={{
          flexDirection: "row",
          alignItems: "center",
          width: "80%",
          padding: 5
        }}
      >
        <View
          style={{
            width: SCREEN_WIDTH / 20,
            height: SCREEN_WIDTH / 20,
            borderRadius: 20,
            borderWidth: 0.8,
            borderColor: Colors.gray,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: color
          }}
        >
          <View
            style={{
              width: SCREEN_WIDTH / 50,
              height: SCREEN_WIDTH / 50,
              borderRadius: 20,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "white"
            }}
          />
        </View>

        <Text
          style={{
            width: "100%",
            fontSize: SCREEN_WIDTH / 26,
            color: Colors.black,
            marginLeft: SCREEN_WIDTH / 25
          }}
        >
          {item}
        </Text>
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <QuestionTitle
        No={this.props.index}
        Title={this.props.data.name}
        isMendentrory={this.props.data.is_mandatory}
      >
        <FlatList
          bounces={false}
          data={this.props.data.option_name.split(',')}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => `${index}`}
        />
      
      </QuestionTitle>
    );
  }
}
