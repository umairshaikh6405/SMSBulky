import React, { Component } from 'react'
import { Text, Linking, Image, View, Alert, TouchableOpacity, Platform, PermissionsAndroid, } from 'react-native'
import Modal from "react-native-modal";
import { Fonts, Colors } from '../constants';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import GPSState from 'react-native-gps-state'
import Geolocation from 'react-native-geolocation-service';

export default class LocPermissionDialog extends Component {
    constructor(props) {
        super(props); 
        this.state={
            isVisible : false , 
        }
    }

    componentDidMount(){
        GPSState.requestAuthorization(GPSState.AUTHORIZED_ALWAYS)
    }

    
    checkPermission(showAlert){
        return new Promise((resolve, reject)=>{
            Geolocation.getCurrentPosition(
                (position) => {
                    resolve(position.coords)
                },
                (error) => { 
                    resolve(null)
                   if(error.code == 1){
                       if(showAlert){
                        this.setState({
                            isVisible: true
                        })
                       }
                   }else if(error.code == 5){
                   this.checkPermission()
                   }
                },
                { enableHighAccuracy: false, timeout: 10000, maximumAge: 10000 ,showLocationDialog:true}
            );
        })
    }

    componentWillUnmount(){
        GPSState.removeListener()
    }


    getLocPermission = () => {
        if (Platform.OS === "android") {
            if (Platform.Version >= '29') {
                GPSState.openAppDetails()
            }
            else if (Platform.Version <= '29') {
                GPSState.requestAuthorization(GPSState.AUTHORIZED_ALWAYS)
            }
        } else {
            GPSState.openLocationSettings()

        }
        this.setState({
            isVisible: false
        })
    }

   
    isVisiable(){
        return this.state.isVisible
    }

    hide() {
        this.setState({
            isVisible: false
        })
    }


    render() {
        return (
            <Modal
                isVisible={this.state.isVisible}
                animationIn="slideInLeft"
                animationOut="slideOutRight"
                animationInTiming={500}
                useNativeDriver={true}
                backdropOpacity={0.5}
            >
                <View style={{ width: wp("80%"),height: wp("65%"), alignSelf: "center", borderRadius: wp(4), backgroundColor: "white" }}>

                    <View style={{
                        width: wp("80%"), height: wp("10%"), justifyContent: "center", alignSelf: "center", backgroundColor: Colors.primary,
                        borderTopLeftRadius: wp(4), borderTopRightRadius: wp(4)
                    }}>
                        <Text
                            style={{
                                textAlign: "center", color: "white", fontSize: wp(4.5)
                            }}>
                                Permission For Location
                        </Text>
                    </View>
                    <View style={{ margin: wp(5), height: wp("85%") }}>

                        <Image style={{ width: wp("10%"), height: wp("10%"),marginTop:wp(3), resizeMode: "contain", alignSelf: "center" }}
                            source={require('../assets/marker.png')}
                        />

                        <Text style={{
                                textAlign: "center", height:wp(10), fontSize: wp(3.5),marginTop:wp(5)
                            }}> We Wants Location Permission To Proceed Further</Text>

                        <TouchableOpacity
                            style={{
                                width: wp("25%"), height: wp("8%"),marginTop:wp(9), backgroundColor: Colors.primary, alignSelf: "center", justifyContent: "center",
                            }}
                            onPress={()=> this.getLocPermission()}
                                >
                            <Text
                                style={{
                                    textAlign: "center", color: "white",  fontSize: wp(3.5)
                                }}> Settings
                            </Text>

                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        );
    }
}


