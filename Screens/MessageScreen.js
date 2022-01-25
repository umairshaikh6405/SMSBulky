import AsyncStorage from '@react-native-community/async-storage';
import { CommonActions } from '@react-navigation/routers';
import React, { Component } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard, ImageBackground, KeyboardAvoidingView, Alert, FlatList, } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import RoundButton from '../Components/RoundButton';
import TopHeader from '../Components/TopHeader';
import { Colors, ConstStyles, Fonts, ServerConnection, ConstantsVar } from '../constants';


export default class MessageScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messagetext : ""
        };
    }




    render() {
        const {messagetext} = this.state
        return (
            <View style={{ flex: 1, backgroundColor: "white", alignItems: "center" }}
            >
                <TopHeader
                    title="WELCOME"
                />

              <View style={{width:"100%", flex:1, alignItems:"center", justifyContent:"center" }}>
              <RoundButton
                    title={"Select Group of numbers"}
                    style={{ width: wp(90), backgroundColor: Colors.secondary, borderRadius: 0 }}
                    textStyle={{ fontSize: wp(4) }}
                    onPress={() => {

                    }}
                />

                <TextInput
                    placeholder='Write Message'
                    multiline={true}
                    style={{
                        width: "90%", height: wp(90),
                        padding: wp(5),
                        paddingTop: wp(3),
                        marginTop: wp(5),
                        borderWidth: 2, borderColor: Colors.primary, fontSize: wp(5)
                    }}
                    onChangeText={(text)=>{
                        this.setState({
                            messagetext : text
                        })
                    }}
                />
                <View style={{ width: "90%", flexDirection:"row", justifyContent:"space-between", marginVertical:wp(4)}}>
                <Text style={{fontSize:wp(3), color:Colors.gray}}>{parseInt(messagetext.length/160)+1} Message(s)</Text>
                <Text style={{fontSize:wp(3), color:Colors.gray}}>{messagetext.length}/160</Text>
                </View>

              

                <RoundButton
                    title={"Send SMS"}
                    style={{ width: wp(90), backgroundColor: Colors.secondary, borderRadius: 0 }}
                    textStyle={{ fontSize: wp(4) }}
                    onPress={() => {

                    }}
                />
              </View>


            </View>
        );
    }
}


