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
import Contacts from 'react-native-contacts';
import ContactSearchBar from '../Components/ContactSearchBar';
import TopHeader from '../Components/TopHeader';
import ContactListItem from './ContactListItem';
import RoundButton from '../Components/RoundButton';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { EventRegister } from 'react-native-event-listeners';
import { DataProvider, LayoutProvider, RecyclerListView } from 'recyclerlistview';

let dataProvider = new DataProvider((r1, r2) => {
  return r1 !== r2;
});
export default class ContactsScreen extends Component {
  constructor(props) {
    super(props);
    this.params = this.props.route.params
    this.isAll = true
    this.ListRef = {}
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
    Contacts.getAll()
      .then((contacts) => {
        if (contacts.length != 0) {
          const filteredData = contacts.filter((user) => {
            return this.contains(user, '');
          });

          const uniqueContact = [];
          filteredData.forEach(obj => {
            if (!uniqueContact.some(o => o.phoneNumbers[0].number === obj.phoneNumbers[0].number)) {
              uniqueContact.push({ ...obj })
            }
          });
          this.setState({
            showcontactsdata: dataProvider.cloneWithRows(uniqueContact),
            searchPlaceholder: `Search ${uniqueContact.length} contacts`,
          });
        }
      })
      .catch((e) => {
        ServerConnection.showErrorMsg(e.message);
      });

    Contacts.checkPermission();
  }

  handleSearch = (text) => {
    this.setState({
      searchText: text
    })
  };

  contains = ({ displayName, phoneNumbers, givenName }, query) => {
    if (phoneNumbers.length > 0) {
      phoneNumbers = phoneNumbers[0].number ? phoneNumbers[0].number : '';
      displayName = displayName ? displayName : givenName ? givenName : '';
      phoneNumbers = phoneNumbers ? phoneNumbers : '';
      let removestr = /\s/g;
      phoneNumbers = phoneNumbers.replace(removestr, '');
      phoneNumbers = phoneNumbers.replace('+92', '0');
      if (
        displayName == "" ||
        phoneNumbers == ""
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
    if (this.state.searchText == "" && item.phoneNumbers[0].number.includes(this.state.searchText) || item.displayName.includes(this.state.searchText) || item.givenName.includes(this.state.searchText)) {
      return <ContactListItem
        ref={(ref)=>{
          this.ListRef[item.phoneNumbers[0].number] = ref
        }}
        item={item}
        index={index}
        isAll={this.isAll}
      />
    } else {
      return <View />
    }

  };

  componentWillUnmount() { }

  goBack(mobile) {
    const { navigation, route } = this.props;
    navigation.goBack();
    route.params.onSelect({ mobile });
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
            title="WELCOME"
          />
          <View style={styles.mainContainer}>
            <View style={{ width: wp(100) }}>
              <ContactSearchBar searchPlaceholder={this.state.searchPlaceholder} onChangeText={this.handleSearch} />
            </View>
            <View style={styles.walletContainer}>
              <View style={{ flexDirection: 'row', alignItems: 'flex-end', paddingBottom:wp(3) }}>
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
                    EventRegister.emit("select_All", isChecked)
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
              title={"Add To List"}
              style={{ width: wp(90), backgroundColor: Colors.secondary, borderRadius: 0 }}
              textStyle={{ fontSize: wp(4) }}
              onPress={() => {
                let selectList = []
                for (const key in this.ListRef) {
                  if (Object.hasOwnProperty.call(this.ListRef, key)) {
                    const element = this.ListRef[key];
                    let selecteditem = element.getSelected()
                    if(selecteditem){
                      selectList.push(selecteditem)
                    }
                    
                  }
                }
                this.params.addContact(selectList)
                this.props.navigation.goBack()
              }}
            />
          </View>
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
