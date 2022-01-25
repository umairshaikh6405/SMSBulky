import React, { Component } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, TouchableWithoutFeedback, SafeAreaView, } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import ReactNativeModal from 'react-native-modal';
// import DropDownPicker from 'react-native-dropdown-picker';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Colors, ConstStyles, Fonts, ServerConnection, ConstantsVar } from '../constants';

export default class RoundDropDown extends Component {
    constructor(props) {
        super(props);
        this.selectedtext = ""
        this.state = {
            isVisible: false,
            Selected: -1,
            showError: false,
            SearchText: ""
        };
    }

    getText = () => {
        return this.selectedtext
    }

    setValue = (value) => {
        if (value) {
            this.selectedtext = value
            this.setState({
                Selected: this.props.data.findIndex(x => {
                    const text = x.name ? x.name : x
                    return text == value
                })
            })
        }
    }

    error = () => {
        this.setState({
            showError: true
        })
    }

    render() {
        let { data, style, textStyle, title , onSelect , item , showBorder} = this.props
        let { Selected, showError ,SearchText} = this.state
        const listItem = item
        return (
            <View style={style}>
                <Text style={{ marginLeft: wp(4), marginBottom: wp(1), color:  showBorder ? Colors.secondary : "white" }}>{title}</Text>
                <TouchableOpacity
                    onPress={() => {
                        this.setState({
                            isVisible: !this.state.isVisible,
                            showError: false,
                            SearchText: ""
                        })
                    }}
                    style={[{
                        elevation: 4, padding: wp(4), borderRadius: wp(10), paddingLeft: wp(6), borderColor: showError ?Colors.red : Colors.secondary, borderWidth: showError ? 2: showBorder ? 2 : 0,
                        justifyContent: "center", backgroundColor: "white"
                    }]}
                >

                    <Text style={[{ color: showError ? Colors.red : Selected == -1 ? Colors.lightGray : Colors.primary }, textStyle]}>{Selected == -1 ? title : data[Selected].name ? data[Selected].name : data[Selected]}</Text>

                    <Image
                        style={{ width: "100%", resizeMode: "contain", width: wp(3), height: wp(3), position: "absolute", right: wp(5), tintColor: showError ? Colors.red : Selected == -1 ? Colors.lightGray : "black" }}
                        source={require("../assets/downArrow.png")}
                    />
                </TouchableOpacity>

                <ReactNativeModal
                    style={{ margin: 0, justifyContent: 'flex-end', }}
                    isVisible={this.state.isVisible}
                    animationIn="slideInUp"
                    onModalShow={()=>{
                        if(this.state.Selected != -1){
                            // this.FlatList.scrollToIndex({animated:false, index:this.state.Selected})
                        }
                       
                    }}
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

                            <View style={{ flexDirection: "row", width: "100%", backgroundColor: "white", alignSelf: "center", paddingHorizontal: wp(2.2), paddingBottom: wp(2) }}>
                                <Text
                                    style={{
                                        color: "black", flex: 1,
                                        fontSize: wp(4), backgroundColor: "white"
                                    }}
                                >{title} </Text>

                                <Text
                                    onPress={() => {
                                        this.setState({
                                            isVisible: false
                                        })
                                    }}
                                    style={{
                                        textAlign: "center",
                                        color: Colors.red,
                                        fontSize: wp(4), backgroundColor: "white", paddingRight: wp(2)
                                    }}
                                >Cancel</Text>

                            </View>
                            {data.length > 8 && <TextInput
                                style={{
                                    padding: 0, margin: 0, paddingVertical: wp(3),
                                    backgroundColor: Colors.boldBorderColor, color: Colors.gray, paddingHorizontal: wp(2)
                                }}
                                placeholder="Search"
                                placeholderTextColor={Colors.gray}
                                onChangeText={(text) => {
                                    this.setState({
                                        SearchText: text
                                    })
                                }}
                            />}
                            <FlatList
                                ref={(ref)=>{
                                    this.FlatList = ref
                                }}
                                style={{ backgroundColor: "white", height: data.length < 8 ? null : wp(100) }}
                                data={data}
                                ListEmptyComponent={()=> <Text style={{alignSelf:"center", paddingVertical:wp(5)}}>No Item Found</Text>}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={({ item, index }) => {
                                    const text = item.name ? item.name : item
                                    if (SearchText == "" || text.toString().includes(SearchText)) {



                                        return (<>

                                            <TouchableOpacity
                                                style={{
                                                    flexDirection: "row",
                                                    justifyContent: "flex-start",
                                                    backgroundColor: Selected == index ? Colors.secondary : "white",
                                                    padding: wp(3)
                                                }}
                                                onPress={() => {
                                                    
                                                    this.selectedtext = text
                                                    this.setState({
                                                        Selected: index,
                                                        isVisible: false
                                                    },()=>{
                                                        // if(listItem.quiz_id != 3){
                                                        //     item.id = null
                                                        // }
                                                        onSelect && onSelect(text,listItem, item ? item : {})
                                                    })
                                                }}

                                            >

                                                <Text
                                                    style={{
                                                        textAlign: "center",
                                                        color: Colors.primary,
                                                        fontSize: wp(3.8), alignSelf: "center"
                                                    }}
                                                >{text} </Text>


                                            </TouchableOpacity>
                                        </>
                                        )
                                    }
                                }
                                }


                            />
                        </TouchableOpacity>
                    </SafeAreaView>
                </ReactNativeModal>
            </View>
        );
    }
}
