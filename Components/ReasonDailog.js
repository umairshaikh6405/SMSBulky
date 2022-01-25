import React, { Component } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, TouchableWithoutFeedback, SafeAreaView, } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import ReactNativeModal from 'react-native-modal';
// import DropDownPicker from 'react-native-dropdown-picker';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Colors, ConstStyles, Fonts, ServerConnection, ConstantsVar } from '../constants';

export default class ReasonDailog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isVisible: false,
            Selected: -1
        };
    }


    isShow = (value) => {
        this.setState({
            isVisible: true
        })
    }


    render() {
        let { reason,onPress} = this.props
        return (
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

                        <View style={{ flexDirection: "row", width: "100%", backgroundColor: "white", alignSelf: "center", paddingHorizontal: wp(2.2), paddingBottom: wp(2) }}>
                            <Text
                                style={{
                                    color: "black", flex: 1,
                                    fontSize: wp(4), backgroundColor: "white"
                                }}
                            >Select the reason for leaving.</Text>

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

                        <FlatList
                            style={{ backgroundColor: "white", height: reason.length < 8 ? null : wp(100) }}
                            data={reason}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item, index }) => {
                                return (<>

                                    <TouchableOpacity
                                        style={{
                                            flexDirection: "row",
                                            justifyContent: "flex-start",
                                            padding: wp(3)
                                        }}
                                        onPress={() => {
                                            this.setState({
                                                isVisible: false
                                            },()=>{
                                                setTimeout(() => {
                                                    onPress(item)
                                                }, 500);
                                                
                                            })
                                           
                                        }}

                                    >

                                        <Text
                                            style={{
                                                textAlign: "center",
                                                color: Colors.primary,
                                                fontSize: wp(3.8), alignSelf: "center"
                                            }}
                                        >{item} </Text>


                                    </TouchableOpacity>
                                </>
                                )

                            }
                            }

                        />
                    </TouchableOpacity>
                </SafeAreaView>
            </ReactNativeModal>
        );
    }
}
