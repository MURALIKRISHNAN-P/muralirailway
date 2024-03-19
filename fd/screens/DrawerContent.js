import AsyncStorage from '@react-native-community/async-storage';
import React,{useState , createRef, Component , useEffect} from 'react';
import { View, StyleSheet } from 'react-native';
import Ip from './Ip';
import {
    useTheme,
    Avatar,
    Title,
    Caption,
    Paragraph,
    Drawer,
    Text,
    TouchableRipple,
    Switch
} from 'react-native-paper';
import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { AuthContext } from '../components/context';


export function DrawerContent(props)  {

    const [Name,setName]=useState('')
    const [Role,setRole]=useState('')

    useEffect(() => {
        readData()
    }, [])

    const readData = async() => {
        try {
          userName = await AsyncStorage.getItem('Name');
          setName(userName)
          userPFNumber = await AsyncStorage.getItem('PFNumber');
          userMobile = await AsyncStorage.getItem('Mobile');
          userRole = await AsyncStorage.getItem('Role');
          setRole(userRole)
          userStation = await AsyncStorage.getItem('Station');
          userQtrNumber = await AsyncStorage.getItem('QtrNumber');
          userColony = await AsyncStorage.getItem('Colony');
        } catch(e) {
          console.log(e);
        }
    }

    const paperTheme = useTheme();
    const { signOut ,toggleTheme} = React.useContext(AuthContext);
    return(
        <View style={{flex:1}}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        <View style={{flexDirection:'row',marginTop: 15}}>
                            <Avatar.Image 
                                 source={require('../assets/logo.png')}
                                size={50}
                            />
                            <View style={{marginLeft:15, flexDirection:'column'}}>
                                <Title style={styles.title}>{Name}</Title>
                                <Caption style={styles.caption}>@{Role}</Caption>
                            </View>
                        </View>

                        {/* <View style={styles.row}>
                            <View style={styles.section}>
                                <Paragraph style={[styles.paragraph, styles.caption]}>00</Paragraph>
                                <Caption style={styles.caption}>Accepted</Caption>
                            </View>
                            <View style={styles.section}>
                                <Paragraph style={[styles.paragraph, styles.caption]}>00</Paragraph>
                                <Caption style={styles.caption}>Complaints</Caption>
                            </View>
                        </View> */}
                    </View>

                    <Drawer.Section style={styles.drawerSection}>
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="home-outline" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Home"
                            onPress={() => {props.navigation.navigate('Home')}}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="account-outline" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Profile"
                            onPress={() => {props.navigation.navigate('ProfileScreen')}}
                        />
                        

                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="history" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Your History"
                            onPress={() => {props.navigation.navigate('History')}}
                        />

                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="comment-text-multiple-outline" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Grievance Form"
                            onPress={() => {props.navigation.navigate('ComplaintFor')}}
                        />  
                        {
                            Role!='Occupant' && Role!='JuniorEngineer' &&(
                               
                                <DrawerItem 
                                icon={({color, size}) => (
                                    <Icon 
                                    name="account-check-outline" 
                                    color={color}
                                    size={size}
                                    />
                                )}
                                label="User Approval"
                                onPress={() => {props.navigation.navigate('Valid')}}
                            />
                             
                            )

                        }
                       
                            {
                            Role!='Occupant' && Role!='JuniorEngineer' &&(
                               
                                <DrawerItem 
                                icon={({color, size}) => (
                                    <Icon 
                                    name="text-box-check-outline" 
                                    color={color}
                                    size={size}
                                    />
                                )}
                                label="Grievance Approval"
                                onPress={() => {props.navigation.navigate('Card')}}
                            />
                             
                            )

                        }

{
                            Role!='Occupant' && Role!='JuniorEngineer' &&(
                               
                                <DrawerItem 
                                icon={({color, size}) => (
                                    <Icon 
                                    name="newspaper-variant-multiple-outline" 
                                    color={color}
                                    size={size}
                                    />
                                )}
                                label="Grievance Report"
                                onPress={() => {props.navigation.navigate('Report')}}
                            />
                             
                            )

                        }
                        {
                            Role!='Occupant' && Role!='JuniorEngineer' &&(
                               
                                <DrawerItem 
                                icon={({color, size}) => (
                                    <Icon 
                                    name="newspaper-variant-outline" 
                                    color={color}
                                    size={size}
                                    />
                                )}
                                label="User Report"
                                onPress={() => {props.navigation.navigate('UserReport')}}
                            />
                             
                            )

                        }
                         {
                            Role=='SeniorSectionEngineer'&&(
                               
                                <DrawerItem 
                                icon={({color, size}) => (
                                    <Icon 
                                    name="pencil" 
                                    color={color}
                                    size={size}
                                    />
                                )}
                                label="Change Completed Status"
                                onPress={() => {props.navigation.navigate('Complictionstatus')}}
                            />
                             
                            )

                        }

{
                            Role=='JuniorEngineer' &&(
                               
                                <DrawerItem 
                                icon={({color, size}) => (
                                    <Icon 
                                    name="text-box-check-outline" 
                                    color={color}
                                    size={size}
                                    />
                                )}
                                label="Grievance Approval"
                                onPress={() => {props.navigation.navigate('Valid')}}
                            />
                             
                            )

                        }




                    </Drawer.Section>
                    {/* <Drawer.Section title="Preferences">
                        <TouchableRipple onPress={() => {toggleTheme()}}>
                            <View style={styles.preference}>
                                <Text>Dark Theme</Text>
                                <View pointerEvents="none">
                                    <Switch value={paperTheme.dark}/>
                                </View>
                            </View>
                        </TouchableRipple>
                    </Drawer.Section> */}
                </View>
            </DrawerContentScrollView>
            <Drawer.Section style={styles.bottomDrawerSection}>
                <DrawerItem 
                    icon={({color, size}) => (
                        <Icon 
                        name="exit-to-app" 
                        color={color}
                        size={size}
                        />
                    )}
                    label="Sign Out"
                    onPress={() => {signOut()}}
                />
            </Drawer.Section>
        </View>
    );
    
}

const styles = StyleSheet.create({
    drawerContent: {
      flex: 1,
    },
    userInfoSection: {
      paddingLeft: 20,
    },
    title: {
      fontSize: 16,
      marginTop: 3,
      fontWeight: 'bold',
    },
    caption: {
      fontSize: 14,
      lineHeight: 14,
    },
    row: {
      marginTop: 20,
      flexDirection: 'row',
      alignItems: 'center',
    },
    section: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 15,
    },
    paragraph: {
      fontWeight: 'bold',
      marginRight: 3,
    },
    drawerSection: {
      marginTop: 15,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    preference: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 12,
      paddingHorizontal: 16,
    },
  });
