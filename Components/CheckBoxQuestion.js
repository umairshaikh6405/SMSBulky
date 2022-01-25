import React, { Component } from "react";
import { View, Text, FlatList, TouchableOpacity, Image, Dimensions } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import {  Fonts, Colors } from "../constants";
import QuestionTitle from "./QuestionTitle";
const SCREEN_WIDTH = Dimensions.get("window").width;
class CheckBoxWithText extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false
    };
  }

  render() {
    return (
      <TouchableOpacity
        onPress={() => {
          this.setState({
            checked: !this.state.checked
          });
          this.props.onCheckChangeListner(
            !this.state.checked,
            this.props.index
          );
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
            width: SCREEN_WIDTH / 22,
            height: SCREEN_WIDTH / 22,
            borderWidth: 0.8,
            borderColor: Colors.gray,
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Image
            style={{
              width: SCREEN_WIDTH / 22,
              height: SCREEN_WIDTH / 22,
              resizeMode: "contain",
              display: this.state.checked ? "flex" : "none"
            }}
            source={require("../assets/icons-12.png")}
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
          {this.props.text}
        </Text>
      </TouchableOpacity>
    );
  }
}


export default class CheckBoxQuestion extends Component {
  constructor(props) {
    super(props);
    this.selectItems = []
    this.state = {
      checked: false,
      showError: false
    };
  }

  renderItem = ({ item, index }) => {
    let QuestionOption =  this.props.item.arrayType ? this.props.item.option_name : this.props.item.option_name.split(',')
    return (
      <CheckBoxWithText
        index={index}
        text={this.props.item.arrayType ? item.topic ? item.topic : item.name : item}
        onCheckChangeListner={(isChecked, index) => {
          let itemChild = QuestionOption[index];
          let itemIndex = -1;
          for (let i = 0; i < this.selectItems.length; i++) {
            const element = this.selectItems[i];
            if (element == itemChild) {
              itemIndex = i;
            }
          }
          if (isChecked) {
            if (itemIndex == -1) {
              this.selectItems.push(itemChild);
            } else {
              this.selectItems[itemIndex] = itemChild;
            }
          } else {
            if (itemIndex != -1) {
              this.selectItems.splice(itemIndex, 1);
            }
          }

          this.props.onCheckChange(this.selectItems, this.props.item.quiz_id, this.props.item.arrayType);
        }}
      />
    );
  };

  error = () => {
    this.setState({
        showError: true
    })
}

  render() {
    let QuestionOption =  this.props.item.arrayType ? this.props.item.option_name : this.props.item.option_name.split(',')
    return (
      <View
        style={this.props.style ? this.props.style : {}}
      >
        <QuestionTitle
          No={this.props.index}
          Title={this.props.item.name}
          isMendentrory={this.props.item.is_mandatory}
        >
          <FlatList
            keyExtractor={(item, index) => `${index}`}
            bounces={false}
            ListEmptyComponent={()=> <Text style={{alignSelf:"center", paddingVertical:wp(5)}}>No Item Found</Text>}
            data={QuestionOption}
            renderItem={this.renderItem}
          />
        </QuestionTitle>
      </View>
    );
  }
}
