import React, { useState, useEffect, Component } from 'react';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-community/async-storage';

import HomeScreen from './HomeScreen';
import ComplaintForm from './ComplaintForm';
import Validation from './Validation';
import ComplaintCard from './ComplaintCard';
//import ProfileScreen from './ProfileScreen';


const HomeStack = createStackNavigator();
const ComplaintFormStack = createStackNavigator();
const ValidationStack = createStackNavigator();
const ComplaintCardStack =createStackNavigator();
//const ProfileStack = createStackNavigator();

const Tab = createMaterialBottomTabNavigator();
import { AuthContext } from '../components/context';

const readData = async() => {
  try {
    userName = await AsyncStorage.getItem('Name');
    userPFNumber = await AsyncStorage.getItem('PFNumber');
    userMobile = await AsyncStorage.getItem('Mobile');
    userRole = await AsyncStorage.getItem('Role');
    userStation = await AsyncStorage.getItem('Station');
    userQtrNumber = await AsyncStorage.getItem('QtrNumber');
    userColony = await AsyncStorage.getItem('Colony');
  } catch(e) {
    console.log(e);
  }
}



const MainTabScreen = () => (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="#fff"
    >
      <Tab.Screen
        name="Home"
        component={HomeStackScreen}
        options={{
          tabBarLabel: ' ',
          tabBarColor: '#009387',
          tabBarIcon: ({ color }) => (
            <Icon name="ios-home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Valid"
        component={ValidationStackScreen}
        options={{
          tabBarLabel: ' ',
          tabBarColor: '#009387',
          tabBarIcon: ({ color }) => (
            <Icon name="ios-notifications" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Card"
        component={ComplaintCardStackScreen}
        options={{
          tabBarLabel: ' ',
          tabBarColor: '#009387',
          tabBarIcon: ({ color }) => (
            <Icon name="ios-person" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="ComplaintFor"
        component={ComplaintFormStackScreen}
        options={{
          tabBarLabel: ' ',
          tabBarColor: '#009387' ,
          tabBarIcon: ({ color }) => (
            <Icon name="ios-aperture" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
);

export default MainTabScreen;
const HomeStackScreen = ({navigation}) => (
  
<HomeStack.Navigator screenOptions={{
        headerStyle: {
        backgroundColor: '#009387',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
        fontWeight: 'bold'
        }
    }}>
        <HomeStack.Screen name="Home" component={HomeScreen} options={{
        title:'Home',
        headerLeft: () => (
            <Icon.Button name="ios-menu" size={25} backgroundColor="#009387" onPress={() => navigation.openDrawer()}></Icon.Button>
        )
        }} />
</HomeStack.Navigator>
);


const ComplaintFormStackScreen = ({navigation}) => (
<ComplaintFormStack.Navigator screenOptions={{
        headerStyle: {
        backgroundColor: '#009387',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
        fontWeight: 'bold'
        }
    }}>
        <ComplaintFormStack.Screen name="ComplaintFor" component={ComplaintForm} options={{
        title:'Grievence',
        headerLeft: () => (
            <Icon.Button name="ios-menu" size={25} backgroundColor='#009387' onPress={() => navigation.openDrawer()}></Icon.Button>
        )
        }} />
</ComplaintFormStack.Navigator>

);

const ValidationStackScreen = ({navigation}) => (
  <ValidationStack.Navigator screenOptions={{
          headerStyle: {
          backgroundColor: '#009387',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
          fontWeight: 'bold'
          }
      }}>
          <ValidationStack.Screen name="Valid" component={Validation} options={{
            title:' ',
          headerLeft: () => (
              <Icon.Button name="ios-menu" size={25} backgroundColor='#009387' onPress={() => navigation.openDrawer()}></Icon.Button>
          )
          }} />
  </ValidationStack.Navigator>
  
  );
  

  const ComplaintCardStackScreen = ({navigation}) => (
    <ComplaintCardStack.Navigator screenOptions={{
            headerStyle: {
            backgroundColor: '#009387',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
            fontWeight: 'bold'
            }
        }}>
            <ComplaintCardStack.Screen name="Card" component={ComplaintCard} options={{
              title:' ',
            headerLeft: () => (
                <Icon.Button name="ios-menu" size={25} backgroundColor='#009387' onPress={() => navigation.openDrawer()}></Icon.Button>
            )
            }} />
    </ComplaintCardStack.Navigator>
    
    );
    