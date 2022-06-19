import React, { Component } from 'react';
import { View, Text, Image, Platform } from 'react-native';
import { Colors, ConstantsVar } from '../constants';
import AsyncStorage from '@react-native-community/async-storage';

export default class SplashScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }


    _bootstrapAsync = async () => {
        
            this.props.navigation.replace("MyTabs")
       
    };


    componentDidMount(){
        setTimeout(() => {
            this._bootstrapAsync()
        }, 1000);
    }



    render() {
        return (
            <View style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: Colors.primary
            }}>
                <Image
                    style={{ flex: 1, resizeMode: "contain" }}
                    source={require("../assets/splash.png")}
                />
            </View>
        )
    }
}
