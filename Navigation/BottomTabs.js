import React, {Component, useEffect, useRef} from 'react';
import {
  Image
} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Colors} from '../constants';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import HomeScreen from '../Screens/HomeScreen';
import MessageScreen from '../Screens/MessageScreen';
import Settings from '../Screens/Settings';

const Tab = createBottomTabNavigator();
export default function MyTabs(props) {
  return (
    <Tab.Navigator
      initialRouteName={'VisitPlan'}
      tabBarOptions={{
        headerShown: false,
        keyboardHidesTabBar: true,
        activeTintColor: Colors.primary,
        inactiveTintColor: Colors.lightGray,
        labelStyle: {
          fontSize: wp(2.8)
        },
        safeAreaInsets: {bottom: 0},
        style: {
          paddingBottom: wp('1.5%'),
          height: wp('13%'),
        },
      }}>
        <Tab.Screen
        name="MessageScreen"
        component={MessageScreen}
        options={{
          tabBarLabel: 'Message',
          tabBarIcon: ({ focused, color, size }) => {
            return <Image
               style={{width:wp(9), height:wp(9), resizeMode:"contain", tintColor:color}}
              source={require("../assets/message.png")}
            />;
          }
        }}
      />
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarLabel: 'GROUPS',
          tabBarIcon: ({ focused, color, size }) => {
            return <Image
               style={{width:wp(9), height:wp(9), resizeMode:"contain", tintColor:color}}
              source={require("../assets/group.png")}
            />;
          }
        }}
      />
      
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarLabel: 'Settings',
          tabBarIcon: ({ focused, color, size }) => {
            return <Image
               style={{width:wp(8), height:wp(8), resizeMode:"contain", tintColor:color}}
              source={require("../assets/setting.png")}
            />;
          }
        }}
      />
    </Tab.Navigator>
  );
}