import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerContent } from './screens/DrawerContent';
import { StyleSheet, Text, View ,Button , ActivityIndicator} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme } from '@react-navigation/native';
import SignUpScreen from './screens/SignUpScreen'
import Login from './screens/Login'
import ComplaintForm from './screens/ComplaintForm'
import HomeScreen from './screens/HomeScreen'
import Validation from './screens/Validation'
import AsyncStorage from '@react-native-community/async-storage';
import { 
  Provider as PaperProvider, 
  DefaultTheme as PaperDefaultTheme,
  DarkTheme as PaperDarkTheme 
} from 'react-native-paper';
import { AuthContext } from './components/context';

import RootStackScreen from './screens/RootStackScreen';


const Stack = createStackNavigator();

const Drawer = createDrawerNavigator();
import { enableScreens } from 'react-native-screens';
import MainTabScreen from './screens/MainTabScreen';
import ComplaintCard from './screens/ComplaintCard';
import ProfileScreen from './screens/ProfileScreen';
import History from './screens/History';
import Report from './screens/Report';
import UserReport from './screens/UserReport';
import CompletedGrievence from './screens/CompletedGrievence';
import Complictionstatus from './screens/Complictionstatus';
import Demo from './screens/Demo';


const App = () => {
  enableScreens();


  const [isDarkTheme, setIsDarkTheme] = React.useState(false);

  const initialLoginState = {
    isLoading: true,
    userName: null,
    userToken: null,
  };

  const CustomDefaultTheme = {
    ...NavigationDefaultTheme,
    ...PaperDefaultTheme,
    colors: {
      ...NavigationDefaultTheme.colors,
      ...PaperDefaultTheme.colors,
      background: '#ffffff',
      text: '#333333'
    }
  }
  
  const CustomDarkTheme = {
    ...NavigationDarkTheme,
    ...PaperDarkTheme,
    colors: {
      ...NavigationDarkTheme.colors,
      ...PaperDarkTheme.colors,
      background: '#333333',
      text: '#ffffff'
    }
  }

  const theme = isDarkTheme ? CustomDarkTheme : CustomDefaultTheme;

    const loginReducer = (prevState, action) => {
      switch( action.type ) {
        case 'RETRIEVE_TOKEN': 
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'LOGIN': 
          return {
            ...prevState,
            userName: action.id,
            userToken: action.token,
            isLoading: false,
          };
        case 'LOGOUT': 
          return {
            ...prevState,
            userName: null,
            userToken: null,
            isLoading: false,
          };
        case 'REGISTER': 
          return {
            ...prevState,
            userName: action.id,
            userToken: action.token,
            isLoading: false,
          };
      }
    };

    const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState);

    const authContext = React.useMemo(() => ({
      signIn: async(foundUser) => {
        // setUserToken('fgkj');
        // setIsLoading(false);
        console.log("APP.JS",foundUser.userName)
        const demo=foundUser.userDepartment
        console.log(demo)
        try {
          await AsyncStorage.setItem('foundUser',JSON.stringify(foundUser));
          
          await AsyncStorage.setItem('Name', foundUser.userName);
          await AsyncStorage.setItem('PFNumber',foundUser.userPFNumber);
          await AsyncStorage.setItem('Station',foundUser.userStation);
          await AsyncStorage.setItem('QtrNumber',foundUser.userQtrNumber);
          await AsyncStorage.setItem('Role',foundUser.userRole);
          await AsyncStorage.setItem('Mobile',foundUser.userMobile);
          await AsyncStorage.setItem('Colony',foundUser.userColony  );
          await AsyncStorage.setItem('Dek',foundUser.userToken);
          await AsyncStorage.setItem('demo',demo);
          // await AsyncStorage.setItem('Email',foundUser.userEmail);
        } catch(e) {
          console.log(e); 
        }
        // console.log('user token: ', userToken);
        dispatch({ type: 'LOGIN', id: foundUser.userPFNumber, token: foundUser.userName });
      },
      signOut: async() => {
        // setUserToken(null);
        // setIsLoading(false);
        try {

          await AsyncStorage.removeItem('foundUser')

          await AsyncStorage.removeItem('Name');
          await AsyncStorage.removeItem('PFNumber');
          await AsyncStorage.removeItem('Station');
          await AsyncStorage.removeItem('QtrNumber');
          await AsyncStorage.removeItem('Role');
          await AsyncStorage.removeItem('Mobile');
          await AsyncStorage.removeItem('Colony');
          await AsyncStorage.removeItem('demo');
          await AsyncStorage.removeItem('Dek');
        } catch(e) {
          console.log(e);
        }
        dispatch({ type: 'LOGOUT' });
      },
      signUp: () => {
        // setUserToken('fgkj');
        // setIsLoading(false);
      },
      toggleTheme: () => {
        setIsDarkTheme( isDarkTheme => !isDarkTheme );
      }
    }), []);

    useEffect(() => {
      setTimeout(async() => {
        // setIsLoading(false);
        let userToken;
        userToken = null;
        try {

          userToken = await AsyncStorage.getItem('foundUser');
          console.log(JSON.parse(userToken))

          userToken = await AsyncStorage.getItem('Name');
          userName = await AsyncStorage.getItem('Name');
          userPFNumber = await AsyncStorage.getItem('PFNumber');
          userRole = await AsyncStorage.getItem('Role');
          userStation = await AsyncStorage.getItem('Station');
          userQtrNumber = await AsyncStorage.getItem('QtrNumber');
          userColony = await AsyncStorage.getItem('Colony');
          userDepart=await AsyncStorage.getItem('demo');
          userTok=await AsyncStorage.getItem('Dek');
          
          console.log("App.js:",userDepart)
        } catch(e) {
          console.log(e);
        }
        console.log('usertoken: ', userToken);
        dispatch({ type: 'RETRIEVE_TOKEN', token: userToken });
      }, 1000);
    }, []);

    if( loginState.isLoading ) {
      return(
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
          <ActivityIndicator size="large"/>
        </View>
      );
  }

  return (
    <PaperProvider theme={theme}>
    <AuthContext.Provider value={authContext}>
    <NavigationContainer theme={theme}>
    { loginState.userToken !== null ? (
        <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
          <Drawer.Screen name="HomeDrawer" component={MainTabScreen} />
          <Drawer.Screen name="ComplaintForm" component={ComplaintForm} />
          <Drawer.Screen name="ProfileScreen" component={ProfileScreen} />
          <Drawer.Screen name="HomeScreen" component={HomeScreen} />
          <Drawer.Screen name="ComplaintCard" component={ComplaintCard} />
          <Drawer.Screen name="History" component={History} />
          <Drawer.Screen name="Report" component={Report} />
          <Drawer.Screen name="UserReport" component={UserReport} />
          <Drawer.Screen name="CompletedGrievence" component={CompletedGrievence} />
          <Drawer.Screen name="Complictionstatus" component={Complictionstatus} />    
          <Drawer.Screen name="Demo" component={Demo} />   
        </Drawer.Navigator>

         )  
         :
           <RootStackScreen/>
         }
    </NavigationContainer>
    </AuthContext.Provider> 
    </PaperProvider>
  
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
  