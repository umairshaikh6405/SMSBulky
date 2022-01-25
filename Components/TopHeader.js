
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
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { Fonts, Colors, ConstStyles } from "../constants";

export default TopHeader = (props) => {
    return (
        <View style={{
            width: wp(100), ...ConstStyles.shadow,
            height: wp(15), backgroundColor: Colors.primary,
            alignItems:"center", flexDirection:"row"
        }}>
            <Text style={{
                width: "100%", fontSize: wp(5), color: "white",
                position: "absolute", fontWeight:"500", textAlign:"center"
            }}>{props.title}</Text>

          {props.navigation && <TouchableOpacity
            style={{padding:wp(3)}}
            onPress={()=>{
                props.navigation.goBack()
            }}
            >
                <Image
                style={{width:wp(8), height:wp(8)}}
                source={require('../assets/backarrowicon.png')}
                />
            </TouchableOpacity>}
            
        </View>
    );
}

