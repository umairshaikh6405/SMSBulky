import React, { Component } from "react";
import { View, Text, TouchableOpacity, Image, FlatList, Dimensions } from "react-native";
import { widthPercentageToDP  as wp} from "react-native-responsive-screen";
import {  Fonts, Colors } from "../constants";
import QuestionTitle from "./QuestionTitle";
const SCREEN_WIDTH = Dimensions.get("window").width;
export default class DropDownQuestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: true,
      selected: "Choose",
      data: []
    };
  }

  hide = () => {
    console.log("hide");
    this.setState({
      collapsed: true
    });
  };

  renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          this.setState({
            collapsed: !this.state.collapsed,
            selected: item
          });
          this.props.onSelect(item, this.props.index);
        }}
        style={{
          flexDirection: "row",
          alignItems: "center",
          padding: 10,
          width: "75%"
        }}
      >
        <Text
          style={{
            width: "100%",
            fontSize: SCREEN_WIDTH / 24,
            color: this.state.selected == item ? Colors.black : Colors.gray,
            fontWeight : this.state.selected == item ? "bold" : "normal",
            marginLeft: SCREEN_WIDTH / 25
          }}
        >
          {item}
        </Text>
      </TouchableOpacity>
    );
  };
  render() {
    let QuestionOption = this.props.data.option_name.split(',')
    return (
      <QuestionTitle
      No={this.props.index}
      Title={this.props.data.name}
      isMendentrory={this.props.data.is_mandatory}
      >
        <View
          style={{
            width: SCREEN_WIDTH / 1.3,
            borderRadius: 10,
            borderWidth: 0.7,
            borderColor: "#707070",
            marginLeft:wp(1),
            backgroundColor: "white",
            elevation: this.state.collapsed ? 0 : 5,
            overflow: "hidden",
            marginTop:wp(1),
            marginBottom: wp(1)
          }}
        >
          {this.state.collapsed ? (
            <TouchableOpacity
              onPress={() => {
                this.props.isOpen(this);
                this.setState({ collapsed: !this.state.collapsed });
              }}
              style={{ width: "83%", padding: 10, justifyContent: "center" }}
            >
              <Text
                style={{
                  fontSize: SCREEN_WIDTH / 23,
                  color: this.state.selected == "Choose" ? "#989898" : "black",
                  paddingLeft: "5%"
                }}
              >
                {this.state.selected}
              </Text>
            </TouchableOpacity>
          ) : (
            <FlatList
              style={{
                width: "100%",
                height:
                 QuestionOption.length > 4
                    ? SCREEN_WIDTH / 2.8
                    : null,
                marginBottom: "1%"
              }}
              bounces={false}
              nestedScrollEnabled={true}
              data={QuestionOption}
              keyExtractor={(item, index) => `${index}`}
              renderItem={this.renderItem}
            />
          )}
          <Image
            style={{
              width: SCREEN_WIDTH / 20,
              height: SCREEN_WIDTH / 20,
              resizeMode: "center",
              position: "absolute",
              top: 10,
              right: 10
            }}
            source={
              this.state.collapsed
                ? require("../assets/icons-14-03.png")
                : require("../assets/icons-14-02.png")
            }
          />
        </View>
      </QuestionTitle>
    );
  }
}
