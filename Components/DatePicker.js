import React, { Component } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, TouchableWithoutFeedback, SafeAreaView, } from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import ReactNativeModal from 'react-native-modal';
// import DropDownPicker from 'react-native-dropdown-picker';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Colors, ConstStyles, Fonts, ServerConnection, ConstantsVar, GlobalFun } from '../constants';

export default class DatePicker extends Component {
    constructor(props) {
        super(props);
        this.text = ""
        this.state = {
            isVisible: false,
            Selected: -1,
            showError:false
        };
    }

    getText = () => {
        return this.text
    }

    setValue=(value)=>{
        if(value){
            this.text = value
            this.setState({
                Selected : 1
            })
        }
    }

    error = () => {
      this.setState({
        showError : true
      })
    }

    render() {
        let {  style, textStyle, title, showBorder , onSelect , item} = this.props
        let { Selected ,showError} = this.state
        return (
            <View style={style}>
                   <Text style={{marginLeft:wp(4) , marginBottom:wp(1), color:showBorder ? Colors.secondary : "white",}}>{title}</Text>
                <TouchableOpacity
                    onPress={() => {
                        this.setState({
                            isVisible: !this.state.isVisible,
                            showError:false,
                        })
                    }}
                    style={[{
                        elevation: 4, padding: wp(4), borderRadius: wp(10), paddingLeft: wp(6),borderColor: showError ?Colors.red : Colors.secondary , borderWidth:showError ? 2: showBorder ? 2 : 0,
                        justifyContent: "center",backgroundColor:"white"
                    }]}
                >

                    <Text style={[{ color: showError ? Colors.red : Selected == -1 ? Colors.lightGray : Colors.primary }, textStyle]}>{Selected == -1 ? title : this.text}</Text>

                    <Image
                        style={{resizeMode: "contain", width: wp(5), height: wp(5), position: "absolute", right: wp(5), tintColor: showError ? Colors.red : Selected == -1 ? Colors.lightGray : "black"  }}
                        source={require("../assets/calander.png")}
                    />
                </TouchableOpacity>

                <ReactNativeModal
                    style={{ margin: 0, justifyContent: 'flex-end', }}
                    isVisible={this.state.isVisible}
                    animationIn="slideInUp"
                    animationOut="slideOutDown"
                    backdropOpacity={0.3}
                    onSwipeComplete={() => {
                        this.setState({
                            isVisible: false
                        })
                    }}
                    swipeDirection={["down"]}
                    onBackdropPress={() => {
                        this.setState({
                            isVisible: false
                        })
                    }}

                >

                    <SafeAreaView>
                        <TouchableOpacity
                            activeOpacity={1}
                            style={{
                                width: wp(100),
                                backgroundColor: "rgba(0,0,0,0)",
                                alignContent: "center", justifyContent: "flex-end"
                            }}
                        >

                            <Image
                                style={{ width: "100%", resizeMode: "stretch", height: wp(12) }}
                                source={require("../assets/cartslider.png")}
                            />

                            <View style={{ flexDirection: "row" , width:"100%",backgroundColor: "white", alignSelf:"center", paddingHorizontal:wp(2.2), paddingBottom:wp(2)}}>
                                <Text
                                    style={{
                                        color: "black",flex:1,
                                        fontSize: wp(4), backgroundColor: "white"
                                    }}
                                >{title} </Text>

                                <Text
                                onPress={()=>{
                                    this.setState({
                                        isVisible: false
                                    })
                                }}
                                    style={{
                                        textAlign: "center",
                                        color: Colors.red,
                                        fontSize: wp(4), backgroundColor: "white", paddingRight:wp(2)
                                    }}
                                >Cancel</Text>

                            </View>
                            <View style={{backgroundColor:"white"}}>
                            <CalendarPicker
                                    onDateChange={(date) => {
                                        let formatedDate = GlobalFun.convertStamptToDate(date);
                                        onSelect && onSelect(formatedDate,item.quiz_id)
                                        this.text = formatedDate
                                        this.setState({
                                            Selected : 1 ,
                                            isVisible:false
                                        })
                                    }}
                                />
        </View>
                        </TouchableOpacity>
                    </SafeAreaView>
                </ReactNativeModal>
            </View>
        );
    }
}
