import React from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { Colors, ConstantsVar } from "../constants";


export default class RoundTextInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
           showError : false,
           value:this.props.value ? this.props.value :"",
           showPassword:true
        };
    }

    getText = () => {
        return this.state.value
    }

    setValue=(value)=>{
        this.setState({
            value:value?value:""
        })
    }

    error = () => {
      this.setState({
        showError : true
      })
    }

    render() {
        var { onChangeText, placeholder, style ,keyboardType ,secureTextEntry , disable,maxLength , showEye, showBorder , onSelect , item} = this.props
        var {showError,value, showPassword} = this.state
        return (
            <View style={style}>
                <Text style={{marginLeft:wp(4) , marginBottom:wp(1), color: showBorder ? Colors.secondary : "white", }}>{placeholder ? placeholder : ""}</Text>
            <View style={{ alignItems:"flex-end", backgroundColor: "white", justifyContent:"center" , elevation: 4, paddingHorizontal: wp(4), borderRadius: wp(5), paddingLeft: wp(6),
                     borderColor: showError ?Colors.red : Colors.secondary , borderWidth:showError ? 2: showBorder ? 2 : 0 }}>
            <TextInput
                // ref={(ref)=>{
                //     ConstantsVar.refList(ref)
                // }}
                value={value}
                style={[{
                   width:"100%",
                   height:wp(12),
                    color:showError?Colors.red : Colors.black,
                    backgroundColor:"white"
                }]}
                onFocus={()=>{
                    if(showError){
                        this.setState({
                            showError : false
                        })
                    }
                }}
                returnKeyType="done"
                editable = {disable ? false : true}
                maxLength={maxLength?maxLength:10000}
                keyboardType={keyboardType ? keyboardType : "default"}
                placeholder={placeholder ? placeholder : ""}
                placeholderTextColor={Colors.lightGray}
                secureTextEntry={secureTextEntry ? showPassword : false}
                onChangeText={(text)=>{
                    onSelect && onSelect(text , item.quiz_id)
                    this.setState({value:text,showError : false})
                    onChangeText ? onChangeText(text) : null
                   
                }}
            />
            
               {showEye && 
               
               <TouchableOpacity style={{height:"100%", justifyContent:"center",position:"absolute", paddingRight:wp(4)}} 
               onPress = {() => {this.setState({showPassword : !showPassword})}}
               >    
                   <Image 
                       style={{ width: wp(6), height: wp(6),resizeMode:"contain",tintColor:Colors.primary}}
                       source= {!showPassword ? require('../assets/showPass.png') : require('../assets/hidePass.png')} />
               </TouchableOpacity>   
               }
            </View>

            </View>
        );
    }
}
