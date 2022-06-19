import AsyncStorage from '@react-native-community/async-storage';
import { CommonActions } from '@react-navigation/routers';
import React, { Component } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, FlatList, } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import RoundButton from '../Components/RoundButton';
import TopHeader from '../Components/TopHeader';
import { Colors, ConstStyles, Fonts, ServerConnection, ConstantsVar } from '../constants';

export default class HomeScreen extends Component {
    constructor(props) {
        super(props);
        this.params = this.props.route.params
        this.selectable = this.params?.selectable
        this.state = {
            groupList : {}
        };
    }


    componentDidMount(){
        this.getGroups()
    }



    getGroups= async ()=>{
        let savedGroups = await AsyncStorage.getItem("SavedGroups")
        this.setState({
            groupList : savedGroups ? JSON.parse(savedGroups) : {}
        })
    }




    render() {
        const {groupList } =  this.state
        return (
            <View style={{ flex: 1, backgroundColor: Colors.boldBorderColor, }}
            >
                <TopHeader
                    title={ this.selectable ? "SELECT GROUPS" : "GROUPS"}
                />

                <View style={{ width: wp(100), height: wp(15), flexDirection: "row", ...ConstStyles.shadow }}>

                    <TextInput
                        style={{ flex: 1, backgroundColor: "white", paddingHorizontal: wp(7) }}
                        placeholder='Search'
                        onChangeText={() => {
                            
                        }}

                    />

                   {!this.selectable && <RoundButton
                        title={"+"}
                        style={{ width: wp(18), backgroundColor: Colors.secondary, borderRadius: 0 }}
                        textStyle={{ fontSize: wp(8), marginTop: -wp(1.5) }}
                        onPress={() => {
                            this.props.navigation.navigate("ImportListScreen",{
                                callBack : this.getGroups
                            })
                        }}
                    />}

                </View>


                <FlatList
                    style={{ flex: 1 }}
                    data={Object.keys(groupList)}
                    renderItem={({item, index}) => {
                        return (
                            <TouchableOpacity
                            onPress={()=>{
                                if (this.selectable) {
                                    this.props.navigation.goBack()
                                    this.params.callBack(groupList[item])
                                } else {
                                    let listData = "";
                                    groupList[item].forEach(element => {
                                        listData += `${element.displayName}: ${element.phoneNumber} \n`
                                   });
                                   alert(listData)
                                }
                            }}
                            style={{
                                width: wp(100), height: wp(17),
                                backgroundColor: "white",
                                ...ConstStyles.shadow,
                                marginVertical: wp(2),
                                flexDirection:"row",
                                justifyContent:"space-between",
                                paddingHorizontal:wp(4),
                                alignItems:"center"
                            }}>

                                <Text style={{fontSize:wp(4) , color:"black"}}>{item} ({groupList[item].length})</Text>
                               {!this.selectable && <TouchableOpacity
                                onPress={()=>{
                                    ConstantsVar.ConDailog.isVisible({
                                        message: "Are you sure you, you want to delete?",
                                        PosText: "Yes",
                                        NegText: "No",
                                        data:item,
                                        PosPress: (data) => {
                                            let iii = this.state.groupList
                                            delete iii[data];
                                            this.setState({
                                                groupList : iii
                                            })
                                            AsyncStorage.setItem("SavedGroups",JSON.stringify(iii))
                                        }
                                    })
                                }}
                                >
                                    <Image
                                        style={{ width: wp(10), height: wp(10) }}
                                        source={require("../assets/Delete-Icon.png")}
                                    />
                                </TouchableOpacity>}


                            </TouchableOpacity>
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




