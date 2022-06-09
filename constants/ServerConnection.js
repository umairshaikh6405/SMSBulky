import React, { Component } from "react";
import AsyncStorage from "@react-native-community/async-storage";
import { Colors, ConstantsVar } from "../constants";
import RNFetchBlob from "rn-fetch-blob";
import { showMessage } from "react-native-flash-message";


let backUP = {}

const ServerConnection = {
    apiRequest: async (requestType, dataParam, responseCallback) => {
        if (true) {
            ConstantsVar.LoadingView.show(true)
            let USER_INFO = await AsyncStorage.getItem("@@USER_INFO");
            let reqData = [{ name: "", data: "" }];
            if (USER_INFO) {
                USER_INFO = JSON.parse(USER_INFO)
                reqData.push({ name: "user_id", data: USER_INFO.id })
            }
            let postData = []
            if (dataParam) {
                for (const key in dataParam) {
                    if(key == "IMAGE_FILE"){
                        console.log("dataParam[key]",dataParam[key])
                        reqData.push({
                            name: dataParam[key].name,
                            filename: dataParam[key].name + ".jpeg",
                            data: dataParam[key].data,
                            type: "image/jpeg",
                        });
                    }else if (dataParam.hasOwnProperty(key)) {
                        const element = dataParam[key];
                        reqData.push({ name: key, data: element+"" })
                        postData.push({key : key , value:element , description : ""})
                    }
                }
            }
            console.log("url", ConstantsVar.baseUrl+requestType)
            console.log("request Data: ", JSON.stringify(reqData))
            console.log("request postData: ", JSON.stringify(postData))
            RNFetchBlob.fetch(
                "POST",
                ConstantsVar.baseUrl + requestType,
                {
                    "Content-Type": "multipart/form-data",
                },
                reqData
            ).then((res) => {
                ConstantsVar.LoadingView.show(false)
                console.log("response:=> ", res)
                var response = res.json();
                console.log("request response: ", response)
                if (response.status == 'success') {
                    if (response.message) {
                        ServerConnection.showSuccessMsg(response.message)
                    }
                    responseCallback(true, response);
                } else {
                    if (response.message) {
                        ServerConnection.showErrorMsg(response.message)
                    }
                    responseCallback(false, response);
                }
            }).catch((err) => {
                ConstantsVar.LoadingView.show(false)
                responseCallback(false, null);
                ServerConnection.catError(err.message)
                console.log("request error: ", err.message)
                backUP[requestType] = {
                    requestType : requestType,
                    dataParam : dataParam,
                    responseCallback : responseCallback
                }
            });
        } else {

        }
    },

    apiImgRequest: async (requestType, dataParam, imgDataList, responseCallback) => {
        if (true) {
            ConstantsVar.LoadingView.show(true)
            let UserID = await AsyncStorage.getItem("@@USER_ID");
            let reqData = [{ name: "", data: "" }];
            if (UserID) {
                reqData.push({ name: "userid", data: UserID })
            }
            if (dataParam) {
                for (const key in dataParam) {
                    if (dataParam.hasOwnProperty(key)) {
                        const element = dataParam[key];
                        reqData.push({ name: key, data: element })
                    }
                }
            }
            console.log("url", ConstantsVar.baseUrl+requestType)
            console.log("request response: ", JSON.stringify(reqData))
            if (imgDataList) {
                for (const key in imgDataList) {
                    if (imgDataList.hasOwnProperty(key) && imgDataList[key]) {
                        reqData.push({
                            name: key,
                            filename: key + ".jpeg",
                            data: imgDataList[key],
                            type: "image/jpeg",
                        });
                    }
                }
            }
           // console.log("request response: ", JSON.stringify(reqData))
            RNFetchBlob.fetch(
                "POST",
                ConstantsVar.baseUrl + requestType,
                {
                    "Content-Type": "multipart/form-data",
                },
                reqData
            ).then((res) => {
                ConstantsVar.LoadingView.show(false)
                var response = res.json();
                console.log("request response: ", response)
                if (response.ResponseCode == 1) {
                    if (response.ResponseMessage) {
                        ServerConnection.showSuccessMsg(response.ResponseMessage)
                    }
                } else {
                    if (response.ResponseMessage) {
                        ServerConnection.showErrorMsg(response.ResponseMessage)
                    }
                }
                responseCallback(true, response);
            }).catch((err) => {
                ConstantsVar.LoadingView.show(false)
                responseCallback(false, null);
                ServerConnection.catError(err.message)
                console.log("request error: ", err.message)
            });
        } else {

        }
    },
    apiGetRequest: async (requestType,responseCallback) => {
        if (true) {
            console.log("url", JSON.stringify(ConstantsVar.baseUrl + requestType))
            ConstantsVar.LoadingView.show(true)
            RNFetchBlob.fetch(
                "GET",
                ConstantsVar.baseUrl + requestType,
            ).then((res) => {
                ConstantsVar.LoadingView.show(false)
                var response = res.json();
                console.log("request response: ", response)
                if (response.ResponseCode == 1) {
                    if (response.ResponseMessage) {
                        ServerConnection.showSuccessMsg(response.ResponseMessage)
                    }
                } else {
                    if (response.ResponseMessage) {
                        ServerConnection.showErrorMsg(response.ResponseMessage)
                    }
                }
                responseCallback(true, response);
            }).catch((err) => {
                ConstantsVar.LoadingView.show(false)
                responseCallback(false, null);
                ServerConnection.catError(err.message)
                console.log("request error: ", err.message)
            });
        } else {

        }
    },
    catError:(message)=>{
        if(message.includes("JSON Parse error")){
            ServerConnection.showErrorMsg("Invalid response from server")
        }else if(message.includes("Unable to resolve host") || message.includes("The Internet connection appears to be offline")){
            ServerConnection.showErrorMsg("Please check your internet connection & try again")
            // ConstantsVar.LoadingView.internetError(true,()=>{
            //     ServerConnection.apiRequest(backUP.requestType,backUP.dataParam,backUP.responseCallback)
            // })
        } else{
            ServerConnection.showErrorMsg(message)
        }
    },
    showErrorMsg: (msg) => {
        showMessage({
            message: msg,
            color: "white",
            backgroundColor: Colors.red
          });
    },
    showSuccessMsg: (msg) => {
        showMessage({
            message:msg,
            color: "white",
            backgroundColor: Colors.green
          });
    }

};

export default ServerConnection;






