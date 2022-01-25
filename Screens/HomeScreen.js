import AsyncStorage from '@react-native-community/async-storage';
import { CommonActions } from '@react-navigation/routers';
import React, { Component } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard, ImageBackground, KeyboardAvoidingView, Alert, FlatList, } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import RoundButton from '../Components/RoundButton';
import TopHeader from '../Components/TopHeader';
import { Colors, ConstStyles, Fonts, ServerConnection, ConstantsVar } from '../constants';
import DocumentPicker, {
    DirectoryPickerResponse,
    DocumentPickerResponse,
    isInProgress,
    types,
} from 'react-native-document-picker'
import RNFetchBlob from 'rn-fetch-blob';
import csv from 'csvtojson'

export default class HomeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            groupList : []
        };
    }




    render() {
        const {groupList } =  this.state
        return (
            <View style={{ flex: 1, backgroundColor: Colors.boldBorderColor, }}
            >
                <TopHeader
                    title="GROUPS"
                />

                <View style={{ width: wp(100), height: wp(15), flexDirection: "row", ...ConstStyles.shadow }}>

                    <TextInput
                        style={{ flex: 1, backgroundColor: "white", paddingHorizontal: wp(7) }}
                        placeholder='Search'
                        onChangeText={() => {
                            
                        }}

                    />

                    <RoundButton
                        title={"+"}
                        style={{ width: wp(18), backgroundColor: Colors.secondary, borderRadius: 0 }}
                        textStyle={{ fontSize: wp(8), marginTop: -wp(1.5) }}
                        onPress={() => {
                            this.props.navigation.navigate("ImportListScreen")
                        }}
                    />

                </View>


                <FlatList
                    style={{ flex: 1 }}
                    data={groupList}
                    renderItem={() => {
                        return (
                            <View style={{
                                width: wp(100), height: wp(20),
                                backgroundColor: "white",
                                ...ConstStyles.shadow,
                                marginVertical: wp(2),
                                justifyContent:"center"
                            }}>

                                <Text>dsfsdfdsfs</Text>

                            </View>
                        )
                    }}
                />

            </View>
        );
    }
}









{/* <TouchableOpacity
title="open picker for multi selection of word files"
onPress={() => {
    DocumentPicker.pick({
        allowMultiSelection: false,
        type: [types.csv],
    })
        .then((result) => {                             

            RNFetchBlob.fs
                .readStream(
                    // file path
                    result[0].uri,
                    // encoding, should be `utf8`
                    "utf8",
                    // Buffer size special value to read a text file line by line
                    -1,
                    // // Wait 5 ms between onData events (200 Hz event stream)
                    1000 / 200
                )
                .then(ifstream => {
                    this.csvStream = ifstream;
                    ifstream.open();
                    ifstream.onData(chunk => {
                        // chunk will be a string when encoding is 'utf8'

                        console.log("Sdfdsfdsf", chunk);
                    });
                    ifstream.onError(err => {
                        console.log("Sdfdsfdsf err", err);
                    });

                    ifstream.onEnd(() => {
                        console.log("Sdfdsfdsf end");
                    });
                });

           
        })
        .catch((error) => {
            console.log("sdfdsfds",error);
        })
}}
>

<Text>dsfsdfdsfs</Text>
</TouchableOpacity> */}




