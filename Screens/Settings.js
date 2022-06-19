import AsyncStorage from '@react-native-community/async-storage';
import { CommonActions } from '@react-navigation/routers';
import React, { Component } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, Switch, Keyboard, ImageBackground, KeyboardAvoidingView, Alert, FlatList, } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import RoundButton from '../Components/RoundButton';
import TopHeader from '../Components/TopHeader';
import { Colors, ConstStyles, Fonts, ServerConnection, ConstantsVar } from '../constants';


export default class Settings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            SelectedSim : "SIM-1"
        };
    }

   async componentDidMount(){
        let SelectedSim = await AsyncStorage.getItem("SelectedSim")
        this.setState({
            SelectedSim : SelectedSim ? SelectedSim  : "SIM-1"
        })
       
    }




    render() {
        return (
            <View style={{ flex: 1, backgroundColor: Colors.boldBorderColor, }}
            >
                <TopHeader
                    title="Settings"
                />

                <View style={{ width: "100%", backgroundColor: Colors.boldBorderColor, flexDirection: "row" }}>
                    <View style={{ flex: 1, flexDirection: "row" }}>
                        <Text style={{ fontSize: wp(4), color: this.state.SelectedSim == "SIM-1" ? Colors.primary : Colors.gray }}>SIM-1</Text>
                        <Text style={{ fontSize: wp(4) }}> / </Text>
                        <Text style={{ fontSize: wp(4) , color: this.state.SelectedSim == "SIM-2" ? Colors.primary : Colors.gray }}>SIM-2</Text>
                    </View>

                    <Switch
                    value={this.state.SelectedSim != "SIM-1"}
                        onChange={()=>{
                            if(this.state.SelectedSim == "SIM-1"){
                                AsyncStorage.setItem("SelectedSim", "SIM-2")
                                this.setState({
                                    SelectedSim : "SIM-2"
                                })
                            }else{
                                AsyncStorage.setItem("SelectedSim", "SIM-1")
                                this.setState({
                                    SelectedSim : "SIM-1"
                                })
                            }
                            
                        }}
                    />


                </View>
                

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




