import React, { Component } from 'react';
import { Dimensions, Text, View } from 'react-native';
import {  Fonts, Colors } from '../constants';
const SCREEN_WIDTH = Dimensions.get("window").width;
const QuestionTitle = ({ No, Title, isMendentrory, children }) => {
    return (
        <View style={{ width: "100%", paddingTop: SCREEN_WIDTH / 45, paddingBottom: SCREEN_WIDTH / 45, backgroundColor: "white",
         marginBottom: SCREEN_WIDTH / 40, zIndex: 999, paddingLeft: "4%", }}>
            <View style={{
                width: '90%', flexDirection: "row"
            }}>
                <Text style={{
                    width: '94%',
                    fontSize: SCREEN_WIDTH / 25,  color: Colors.secondary, marginTop: "2%"
                }}>{Title}</Text>
            </View>
            <View style={{ marginLeft: "3%", marginTop: SCREEN_WIDTH / 100 }}>
                {children}
            </View>
        </View>
    );
};

export default QuestionTitle;
