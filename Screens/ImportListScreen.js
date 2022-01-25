import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    Image,
    TextInput,
    ScrollView,
    FlatList,
} from 'react-native';
import { Colors, ConstantsVar, Fonts, ConstStyles, ServerConnection } from '../constants';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import ContactSearchBar from '../Components/ContactSearchBar';
import TopHeader from '../Components/TopHeader';
import RoundButton from '../Components/RoundButton';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { EventRegister } from 'react-native-event-listeners';
import { DataProvider, LayoutProvider, RecyclerListView } from 'recyclerlistview';
import ImportContactListItem from './ImportContactListItem';
import OptionDailog from '../Components/OptionDailog'
import DocumentPicker, {
    types,
} from 'react-native-document-picker'
import RNFetchBlob from 'rn-fetch-blob';


let dataProvider = new DataProvider((r1, r2) => {
    return r1 !== r2;
});
export default class ContactsScreen extends Component {
    constructor(props) {
        super(props);
        this.isAll = true

        this.state = {
            selectedContacts: [],
            showcontactsdata: dataProvider.cloneWithRows([]),
            searchPlaceholder: 'Search',
            searchText: "",
        };


        this._layoutProvider = new LayoutProvider(
            index => {
                return 0
            },
            (type, dim) => {
                dim.width = wp(100);
                dim.height = wp(16);
            }
        );

        this.renderItem = this.renderItem.bind(this);

    }

    async componentDidMount() {
        this.loadContacts();
    }
    loadContacts() {
        this.setState({
            showcontactsdata: dataProvider.cloneWithRows([{
                displayName: "sdfsafsaf",
                phoneNumber: "079897879878"
            }]),
            searchPlaceholder: `Search ${"0"} contacts`,
        });
    }

    handleSearch = (text) => {
        this.setState({
            searchText: text
        })
    };

    addContact = (list) => {
        const updatelist = [...list, ...this.state.showcontactsdata._data]
        const uniqueContact = [];
        updatelist.forEach(obj => {
            if (!uniqueContact.some(o => o.phoneNumber === obj.phoneNumber)) {
              uniqueContact.push({ ...obj })
            }
          });
        this.setState({
            showcontactsdata: dataProvider.cloneWithRows(uniqueContact),
            searchPlaceholder: `Search ${uniqueContact.length} contacts`,
        });
    }

    contains = ({ displayName, phoneNumber, givenName }, query) => {
        if (phoneNumber.length > 0) {

            let removestr = /\s/g;
            phoneNumber = phoneNumber.replace(removestr, '');
            phoneNumber = phoneNumber.replace('+92', '0');
            if (
                displayName == "" ||
                phoneNumber == ""
            ) {
                return false;
            } else {
                return true;
            }
        }
        return false;
    };

    renderItem = (type, data, index) => {
        let item = data
        if (this.state.searchText == "" && item.phoneNumber.includes(this.state.searchText) || item.displayName.includes(this.state.searchText) || item.givenName.includes(this.state.searchText)) {
            return <ImportContactListItem
                item={item}
                index={index}
                isAll={this.isAll}
            />
        } else {
            return <View />
        }

    };


    importFormCSV = () => {
        DocumentPicker.pick({
            allowMultiSelection: false,
            type: [types.csv],
        })
            .then((result) => {
               
                let chunkData = ""
                RNFetchBlob.fs
                    .readStream(
                        // file path
                        result[0].uri,
                        // encoding, should be `utf8`
                        "utf8",
                        // Buffer size special value to read a text file line by line
                        -1,
                        // // Wait 5 ms between onData events (200 Hz event stream)
                        1000 / 200
                    )
                    .then(ifstream => {
                        this.csvStream = ifstream;
                        ifstream.open();
                        ifstream.onData(chunk => {

                            chunkData += chunk
                           
                        });
                        ifstream.onError(err => {
                            console.log("Sdfdsfdsf err", err);
                        });

                        ifstream.onEnd(() => {
                            let list = []
                            console.log("Sdfdsfdsf chunk", chunkData);
                            if(chunkData.includes("\r\n")){
                                list = chunkData.split("\r\n")
                            }else{
                                list = chunkData.split("")
                            }
                            
                            let csvList = []
                            list.forEach(element => {
                                if (element != "") {
                                    let iii = element.split("\t")
                                    console.log("32423423",iii);
                                    csvList.push({
                                        displayName: iii[0],
                                        phoneNumber: iii[1]
                                    })
                                }
                            });
                            this.addContact(csvList)
                        });
                    });


            })
            .catch((error) => {
                console.log("sdfdsfds", error);
            })
    }




    render() {
        return (
            <SafeAreaView
                style={{
                    flex: 1,
                    backgroundColor: '#fff',
                    borderWidth: 0,
                    position: 'relative',
                }}>
                <View style={styles.container}>
                    <TopHeader
                        title="Create Contact Group"
                    />
                    <View style={styles.mainContainer}>
                        <View style={{ width: wp(100), height: wp(15), flexDirection: "row", backgroundColor: "white", ...ConstStyles.shadow }}>

                            <TextInput
                                style={{ flex: 1, backgroundColor: "white", paddingHorizontal: wp(7) }}
                                placeholder='Search'
                                onChangeText={this.handleSearch}

                            />

                            <RoundButton
                                title={"+"}
                                style={{ width: wp(18), backgroundColor: Colors.secondary, borderRadius: 0 }}
                                textStyle={{ fontSize: wp(8), marginTop: -wp(1.5) }}
                                onPress={() => {
                                    this.optionDailog.showDialog()
                                }}
                            />

                        </View>
                        <View style={styles.walletContainer}>
                            <View style={{ flexDirection: 'row', alignItems: 'flex-end', paddingBottom: wp(3) }}>
                                <BouncyCheckbox
                                    size={wp(6)}
                                    fillColor={Colors.primary}
                                    unfillColor="#FFFFFF"
                                    isChecked={true}
                                    text="Contacts"
                                    iconStyle={{ borderColor: Colors.primary }}
                                    textStyle={{
                                        textDecorationLine: "none",
                                    }}
                                    onPress={(isChecked) => {
                                        this.isAll = isChecked
                                        EventRegister.emit("select_Import_All", isChecked)
                                        console.log("esfewrwer");
                                    }}
                                />
                            </View>

                        </View>


                        <RecyclerListView
                            style={{ width: wp(100), minHeiht: wp(10) }}
                            layoutProvider={this._layoutProvider}
                            disableRecycling={true}
                            dataProvider={this.state.showcontactsdata}
                            rowRenderer={this.renderItem}
                        />

                        <RoundButton
                            title={"Create Group"}
                            style={{ width: wp(90), backgroundColor: Colors.secondary, borderRadius: 0 }}
                            textStyle={{ fontSize: wp(4) }}
                            onPress={() => {

                            }}
                        />
                    </View>
                    <OptionDailog
                        ref={(ref) => {
                            this.optionDailog = ref

                        }}
                        onPress={(type) => {
                            if(type == 1){
                                this.importFormCSV()
                            } else {
                                this.props.navigation.navigate("ContactsScreen", {
                                    addContact: this.addContact
                                })
                            }
                            
                        }}
                    />
                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white',
    },
    mainContainer: {
        flex: 1,
        width: wp(100),
        alignItems: 'center',
    },
    walletContainer: {
        width: wp(92),
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: wp(2),
    },
    priceContainer: {
        backgroundColor: Colors.primary,
        borderTopRightRadius: wp(2),
        borderBottomLeftRadius: wp(2),
        paddingVertical: wp(1),
        paddingHorizontal: wp(5),
    },
    bottomcontainer: {
        borderWidth: 0,
        height: wp(14),
        width: wp(100),
        position: 'absolute',
        bottom: 0,
        flexDirection: 'row',
    },
    bottombackbtn: {
        width: wp(50),
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        borderTopWidth: wp(0.14),
        borderColor: '#D9D2D2',
    },
    backtext: {
        fontFamily: Fonts.primaryRegular,
        fontSize: wp(4.5),
    },
    bottomconfirmbtn: {
        width: wp(50),
        backgroundColor: '#AFAFAF',
        justifyContent: 'center',
        alignItems: 'center',
    },
    confirmtext: {
        color: 'white',
        fontFamily: Fonts.primaryRegular,
        fontSize: wp(4.5),
    },
    notificationcontainer: {
        height: wp(6),
        backgroundColor: '#1FA724',
        width: wp(100),
        justifyContent: 'center',
    },
    notificationText: {
        fontSize: wp('3%'),
        fontFamily: Fonts.primarySemiBold,
        color: 'white',
        textAlign: 'center',
    },
    bottomMain: {
        height: wp(14),
        width: wp(100),
        position: 'absolute',
        bottom: 0,
        flexDirection: 'row',
        borderTopWidth: 1,
    },
    confirmtrue: {
        width: wp(50),
        backgroundColor: Colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
    },
    otpbtn: {
        paddingHorizontal: wp(3.5),
        paddingVertical: wp(1.2),
        borderWidth: 1,
        borderRadius: wp(5),
        marginLeft: wp(3),
        flexDirection: 'row',
        borderColor: Colors.primary,
        marginTop: wp(2.5),
    },
    otptext: {
        fontSize: wp('3%'),
        fontFamily: Fonts.primarySemiBold,
        color: Colors.primary,
        textAlign: 'center',
    },
});
