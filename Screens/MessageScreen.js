import AsyncStorage from '@react-native-community/async-storage';
import { CommonActions } from '@react-navigation/routers';
import React, { Component } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard, ImageBackground, KeyboardAvoidingView, Alert, FlatList, PermissionsAndroid, ToastAndroid, } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import RoundButton from '../Components/RoundButton';
import TopHeader from '../Components/TopHeader';
import { Colors, ConstStyles, Fonts, ServerConnection, ConstantsVar } from '../constants';
import SmsAndroid from 'react-native-get-sms-android';
import UploadDailog from '../Components/UploadDailog';
import KeepAwake from 'react-native-keep-awake';
// import SendSMS from 'react-native-sms-multi-sim';


let timeout = null
export default class MessageScreen extends Component {
    constructor(props) {
        super(props);
        this.sendIndex = 0
        this.state = {
            messagetext : "",
            groupNumbers:[],
            successList:[],
            failList:[]
        };
    }

    componentDidMount() {
        timeout = null
        this.requestCameraPermission()

       
    }


    getSMS = () => {
        let filter = {

            box: 'inbox', // 'inbox' (default), 'sent', 'draft', 'outbox', 'failed', 'queued', and '' for all
            // bodyRegex: 'message'
        };
        SmsAndroid.list(
            JSON.stringify(filter),
            (fail) => {
                console.log('Failed with this error: ' + fail);
            },
            (count, smsList) => {
                console.log('List: ', smsList);
                let arr = JSON.parse(smsList);
                arr.length > 0 && ToastAndroid.show(`${arr[0]._id}`,ToastAndroid.LONG)
                arr.length > 0 && SmsAndroid.delete(
                    arr[0]._id ,
                    (fail) => {
                      console.log('Failed with this error: ' + fail);
                    },
                    (success) => {
                      console.log('SMS deleted successfully');
                    },
                  );
               
            },
        );
    }


    sendSMS = async (index) => {
        let SelectedSim = await AsyncStorage.getItem("SelectedSim")
        SelectedSim = SelectedSim ? SelectedSim == "SIM-1" ? 0 : 1 : 0

         
            SmsAndroid.autoSend(
                SelectedSim,
                this.state.groupNumbers[index].phoneNumber,
                this.state.messagetext,
                (fail) => {
                    alert("DSfsdfdsf 333" )
                    this.setState({
                        failList : [...this.state.failList, this.state.groupNumbers[index]] 
                    })
                    this.checkAndStop(index)
                },
                (success) => {
                    this.setState({
                        successList : [...this.state.successList, this.state.groupNumbers[index]] 
                    })
                    this.checkAndStop(index)
                },
              );
        
    }

    checkAndStop = (index) => {
        
        if (index == this.state.groupNumbers.length - 1) {
            this.UploadDailog.changeProgress(index+1)
            this.UploadDailog.done(()=>{
                this.props.navigation.dispatch(
                    CommonActions.reset({
                        index: 0,
                        routes: [{ name: "MessageScreen" }],
                    })
                );
                KeepAwake.deactivate();
            })
            ToastAndroid.show("Done", ToastAndroid.LONG)
           
        }else{
            setTimeout(() => {
                this.sendIndex += 1 
                this.UploadDailog.changeProgress(this.sendIndex)
                this.sendSMS(this.sendIndex)
            }, 5000);
        }
    }


    requestCameraPermission = () => {
        PermissionsAndroid.requestMultiple(
            [PermissionsAndroid.PERMISSIONS.READ_CONTACTS, PermissionsAndroid.PERMISSIONS.SEND_SMS, PermissionsAndroid.PERMISSIONS.READ_SMS],
            {
                title: "READ_CONTACTS, SEND_SMS",
                message:
                    "We need these permission" +
                    "so you can take usee this application",
                buttonNeutral: "Ask Me Later",
                buttonNegative: "Cancel",
                buttonPositive: "OK"
            }
        ).then((result) => {
           
            for (const key in result) {
                if (Object.hasOwnProperty.call(result, key)) {
                    const element = result[key];
                    if(element != "granted"){
                        Alert.alert(
                            'Permissions Denied',
                            'Accept all permissions to run this application',
                            [
                                { text: 'OK', onPress: () => this.requestCameraPermission()},
                            ]
                        );  
                
                        return
                    }
                }
            }
        }).catch(() => {

        });

    }

    callBack = (list) =>{
        this.setState({
            groupNumbers : list
        })
    }



    render() {
        const {messagetext} = this.state
        const isListSelected = this.state.groupNumbers.length > 0
        return (
            <TouchableWithoutFeedback
            onPress={()=> Keyboard.dismiss()}
            style={{flex:1}}
            >
            <View style={{ flex: 1, backgroundColor: "white", alignItems: "center" }}
            >
                <TopHeader
                    title="Send Message"
                />

              <View style={{width:"100%", flex:1, alignItems:"center",marginTop:wp(5) }}>
              <RoundButton
                    title={isListSelected ? this.state.groupNumbers.length + "  Contacts" : "Select Group of numbers"}
                    style={{ width: wp(90), backgroundColor: Colors.secondary, borderRadius: 0 }}
                    textStyle={{ fontSize: wp(4) }}
                    onPress={() => {
                        this.props.navigation.navigate("SelectGroup",{
                            callBack : this.callBack,
                            selectable : true
                            })
                    }}
                />

                <TextInput
                    placeholder='Write Message'
                    multiline={true}
                    style={{
                        fontSize:wp(4),
                        width: "90%", height: wp(60),
                        padding: wp(5),
                        paddingTop: wp(3),
                        marginTop: wp(5),
                        textAlignVertical: 'top',
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
                        if (this.state.messagetext.trim() == "") {
                            ServerConnection.showErrorMsg("Message box is empty")
                        } else if (!isListSelected) {
                            ServerConnection.showErrorMsg("Please select group")
                        } else {
                            this.UploadDailog.isShow(true,this.state.groupNumbers.length)
                            KeepAwake.activate();
                            if(timeout){
                                clearTimeout(timeout)
                            }
                            timeout = setTimeout(() => {
                                this.sendIndex = 0
                                this.sendSMS(0)
                            }, 1000);
                           
                        }
                    }}
                />
              </View>

              <UploadDailog
              ref={(ref)=>{
                  this.UploadDailog = ref
              }}
              />

            </View>
            </TouchableWithoutFeedback>
        );
    }
}


