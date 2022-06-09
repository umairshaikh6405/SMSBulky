import "react-native-gesture-handler";
import * as React from "react";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createStackNavigator, TransitionSpecs, HeaderStyleInterpolators } from "@react-navigation/stack";
import SplashScreen from "../Screens/SplashScreen";
import HomeScreen from "../Screens/HomeScreen";
import MyTabs from "./BottomTabs";
import ImportListScreen from "../Screens/ImportListScreen";
import ContactsScreen from "../Screens/ContactsScreen";


const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "white",
  },
};

const MyTransition = {
  gestureDirection: 'horizontal',
  transitionSpec: {
    open: TransitionSpecs.TransitionIOSSpec,
    close: TransitionSpecs.TransitionIOSSpec,
  },
  headerStyleInterpolator: HeaderStyleInterpolators.forFade,
  cardStyleInterpolator: ({ current, next, layouts }) => {
    return {
      cardStyle: {
        transform: [
          {
            translateX: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [layouts.screen.width+100, 0],
            }),
          },
          // {
          //   rotate: current.progress.interpolate({
          //     inputRange: [0, 1],
          //     outputRange: [1, 0],
          //   }),
          // },
        ],
      },
      overlayStyle: {
        opacity: current.progress.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 0.5],
        }),
      },
    };
  },
}

const Stack = createStackNavigator();
const ScreenNavigator = () => {
  return (
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator
        screenOptions={{ headerShown: false, animationEnabled: true,...MyTransition }}
      >

        <Stack.Screen name="SplashScreen"           component={SplashScreen}        /> 
        <Stack.Screen name="MyTabs"            component={MyTabs}         />  
        <Stack.Screen name="ImportListScreen"            component={ImportListScreen}         />  
        <Stack.Screen name="ContactsScreen"            component={ContactsScreen}         />  
        <Stack.Screen name="SelectGroup"            component={HomeScreen}         />  
       
        
       </Stack.Navigator>
    </NavigationContainer>
  );
};

export default ScreenNavigator;
