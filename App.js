/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React from 'react';
 import {
   View,
   StatusBar,
   Dimensions, Text, TextInput
 } from 'react-native';
 import { SafeAreaView } from "react-native-safe-area-context";
 import MainNavigation from './Navigation/MainNavigation';
 import { Colors, ConstantsVar } from './constants';
 import LoadingView from './Components/LoadingView';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import FlashMessage from 'react-native-flash-message';
import ConfirmationDailog from './Components/ConfirmationDailog';
 const WIDTH = Dimensions.get("window").width;
 const HEIGHT = Dimensions.get("window").height;
 
 class App extends React.Component {
   constructor(props) {
     super(props);
     if (Text.defaultProps == null) Text.defaultProps = {};
     Text.defaultProps.allowFontScaling = false;
     Text.defaultProps.style = {fontSize : wp(4)};
     if (TextInput.defaultProps == null) TextInput.defaultProps = {};
     TextInput.defaultProps.allowFontScaling = false;
     TextInput.defaultProps.style = {fontSize : wp(4)};
   }
 
 
 
   render() {
     return (
       <View style={{ flex: 1, backgroundColor: Colors.primary }}>
          <FlashMessage position="top" />
         <SafeAreaView style={{ backgroundColor: Colors.primary, width: WIDTH, height: HEIGHT + StatusBar.currentHeight }}>
           <View style={{ backgroundColor: "white", flex: 1 }}>
               <View style={{ flex: 1 }}>
                 <StatusBar backgroundColor={Colors.primary} barStyle="light-content" />
                 <MainNavigation />
                 <LoadingView/>
                 <ConfirmationDailog ref={(ref) => ConstantsVar.ConDailog = ref} />
               </View>
           </View>
         </SafeAreaView>
        
       </View>
 
     )
   }
 }
 
 export default App;