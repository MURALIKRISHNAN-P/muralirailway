import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import SplashScreen from './SplashScreen';
import Login from './Login';
import SignUpScreen from './SignUpScreen';
import HomeScreen from './HomeScreen';
//import ComplaintForm from './ComplaintForm';
import EditUserRole from './EditUserRole';


const RootStack = createStackNavigator();

const RootStackScreen = ({navigation}) => (
    <RootStack.Navigator headerMode='none'>
        <RootStack.Screen name="SplashScreen" component={SplashScreen}/>
        <RootStack.Screen name="Login" component={Login}/>
        <RootStack.Screen name="SignUpScreen" component={SignUpScreen}/>
        <RootStack.Screen name="HomeScreen" component={HomeScreen}/>
        <RootStack.Screen name="EditUserRole" component={EditUserRole}/>
    </RootStack.Navigator>
);

export default RootStackScreen;