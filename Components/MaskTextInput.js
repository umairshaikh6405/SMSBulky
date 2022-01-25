import React from "react";
import { Text, TextInput, View } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import TextInputMask from "react-native-text-input-mask";
import { Colors } from "../constants";



export default class MaskTextInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
           showError : false,
           value:""
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
        var { onChangeText, placeholder, style ,keyboardType ,secureTextEntry,mask , item , onSelect , showBorder} = this.props
        var {showError,value} = this.state
        return (
            <View style={style}>
            <Text style={{marginLeft:wp(4) , marginBottom:wp(1), color: showBorder ? Colors.secondary : "white", }}>{placeholder ? placeholder : ""}</Text>
        <View style={{ alignItems:"flex-end", backgroundColor: "white", justifyContent:"center" , elevation: 4,  borderRadius: wp(5), 
                 borderColor: showError ?Colors.red : Colors.secondary , borderWidth:showError ? 2: showBorder ? 2 : 0 , overflow:"hidden"}}>
            <TextInputMask
            value={value}
            keyboardType={keyboardType?keyboardType:"default"}
            placeholderTextColor={Colors.lightGray}
            style={[{
                backgroundColor: "white",width:"100%",
                elevation: 4, padding: wp(4),  
                 borderColor:Colors.red , borderWidth:showError ? 2:0 , color:showError?Colors.red : Colors.black
            }]}
            onFocus={()=>{
                if(showError){
                    this.setState({
                        showError : false
                    })
                }
            }}
            refInput={ref => { this.input = ref }}
            placeholder={placeholder?placeholder:""}
            onChangeText={(formatted, extracted) => {
                this.setState({
                    value:formatted
                })
                onChangeText ? onChangeText(formatted) : null
                onSelect && onSelect(formatted , item.quiz_id)
            }}
            mask={mask?mask:null}
          />
          </View>
          </View>
        );
    }
}
