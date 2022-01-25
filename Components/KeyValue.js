import React from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import TextInputMask from "react-native-text-input-mask";
import { Colors, ConstantsVar } from "../constants";


export default class KeyValue extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showError: false,
            value: this.props.value ? this.props.value : "",
            name: "",
            showPassword: true
        };
    }

    getText = () => {
        return this.state.value
    }

    setValue = (value) => {
        this.setState({
            value: value ? value : ""
        })
    }

    error = () => {
        this.setState({
            showError: true
        })
    }

    render() {
        var { onChangeText, mask, style, keyboardType, secureTextEntry, disable, maxLength, showEye, showBorder, onSelect, item , onNameSelect, onRemove} = this.props
        var { showError, value, name, showPassword } = this.state
        return (
            <View style={style}>
                <View style={{flexDirection:"row", alignItems:"flex-end"}}>
                <Text style={{ flex:1, marginLeft: wp(4), marginBottom: wp(1), color: showBorder ? Colors.secondary : "white", }}>Name{" \t \t \t \t \t "}Value</Text>
                <Text 
                onPress={()=>onRemove && onRemove(item)}
                style={{width:wp(10), textAlign:"right", 
                fontSize:wp(5), marginLeft: wp(4), marginBottom:
                 wp(1),fontWeight:"600", color: Colors.red, }}>X</Text>
                </View>
               
                <View style={{
                    alignItems: "flex-end", backgroundColor: "white", justifyContent: "center", elevation: 4, paddingHorizontal: wp(4), borderRadius: wp(5), paddingLeft: wp(4),
                    borderColor: showError ? Colors.red : Colors.secondary, borderWidth: showError ? 2 : showBorder ? 2 : 0
                }}>
                    <View style={{ width: "100%", flexDirection: "row", alignItems: "center" }}>
                        <TextInput
                            // ref={(ref)=>{
                            //     ConstantsVar.refList(ref)
                            // }}
                            value={name}
                            style={[{
                                width: "45%",
                                height: wp(12),
                                color: showError ? Colors.red : Colors.black,
                                backgroundColor: "white"
                            }]}
                            onFocus={() => {
                                if (showError) {
                                    this.setState({
                                        showError: false
                                    })
                                }
                            }}
                            returnKeyType="done"
                            editable={disable ? false : true}
                            maxLength={maxLength ? maxLength : 10000}
                            keyboardType={"default"}
                            placeholder={"Name"}
                            placeholderTextColor={Colors.lightGray}
                            secureTextEntry={secureTextEntry ? showPassword : false}
                            onChangeText={(text) => {
                                onNameSelect && onNameSelect(text, item.quiz_id)
                                this.setState({ name: text, showError: false })
                                onChangeText ? onChangeText(text) : null

                            }}
                        />

                        <Text style={{ flex: 1, fontWeight: "bold", fontSize: wp(5), textAlign: "center" }}>:</Text>

                        <TextInputMask
                            value={value}
                            keyboardType={keyboardType?keyboardType:"default"}
                            placeholderTextColor={Colors.lightGray}
                            style={[{
                                backgroundColor: "white", width: "45%",
                                elevation: 4, padding: wp(4), elevation:0,
                             color: showError ? Colors.red : Colors.black
                            }]}
                            onFocus={() => {
                                if (showError) {
                                    this.setState({
                                        showError: false
                                    })
                                }
                            }}
                            refInput={ref => { this.input = ref }}
                            placeholder={"Value"}
                            onChangeText={(formatted, extracted) => {
                                this.setState({
                                    value: formatted,
                                    showError: false
                                })
                                onChangeText ? onChangeText(formatted) : null
                                onSelect && onSelect(formatted, item.quiz_id)
                            }}
                        mask={mask?mask:null}
                        />
                    </View>
                    {showEye &&

                        <TouchableOpacity style={{ height: "100%", justifyContent: "center", position: "absolute", paddingRight: wp(4) }}
                            onPress={() => { this.setState({ showPassword: !showPassword }) }}
                        >
                            <Image
                                style={{ width: wp(6), height: wp(6), resizeMode: "contain", tintColor: Colors.primary }}
                                source={!showPassword ? require('../assets/showPass.png') : require('../assets/hidePass.png')} />
                        </TouchableOpacity>
                    }
                </View>

            </View>
        );
    }
}
