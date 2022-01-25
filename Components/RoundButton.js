import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { Colors } from "../constants";

export default function RoundButton(props) {
    var { title, style , textStyle,onPress,disabled, item} = props
    return (
        <TouchableOpacity
        disabled={disabled?disabled:false}
        onPress={()=>onPress&&onPress(item)}
            style={[{
                elevation: 4, padding: wp(4), borderRadius: wp(5),
                justifyContent:"center", alignItems:"center"
            }, style]}
        >

        <Text style={[{color:"white", fontSize:wp(4)},textStyle]}>{title}</Text>
        </TouchableOpacity>
    );
};