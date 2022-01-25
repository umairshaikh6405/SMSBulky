import React, {Component, useEffect, useRef} from 'react';
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
        }}
      />
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarLabel: 'GROUPS',
        }}
      />
      
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarLabel: 'Settings',
        }}
      />
    </Tab.Navigator>
  );
}