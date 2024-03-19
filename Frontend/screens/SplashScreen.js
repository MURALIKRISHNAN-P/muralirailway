import React from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    Dimensions,
    StyleSheet,
    StatusBar,
    Linking,
     Image, ImageBackground
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '@react-navigation/native';
import { ScrollView } from 'react-native';

const SplashScreen = ({navigation}) => {
    const { colors } = useTheme();

    return (
      <View style={styles.container}>
          <ScrollView>
          <ImageBackground 
        source={require('../assets/dealer2.jpg')} 
        style={{width:undefined, padding:16, paddingTop:48, height:500}}
        >
          <StatusBar backgroundColor='#009387' barStyle="light-content"/>
        <View style={styles.header}>
            <View>
                
            </View>
            <Animatable.Image 
                animation="bounceIn"
                duraton="1500"
            source={require('../assets/logo.png')}
            style={styles.logo}
            resizeMode="stretch"
            />
           <Text style={[styles.title, {
                color: '#FFFFFF'
            }]}>Southern Railway</Text>
            <Text style={[styles.title, {
                color: '#FFFFFF'
            }]}>Salem Division</Text>
        </View>
        </ImageBackground>
        
        <Animatable.View 
            style={[styles.footer, {
                backgroundColor: colors.background
            }]}
            animation="fadeInUpBig"
        >
            <Text style={[styles.title, {
                color: colors.text
            }]}>Welcome to Staff Quarters Grievance Redressal Portal! (Gruha Mithra)</Text>
            <Text style={styles.text}>Sign in with account</Text>
            <View style={styles.button}>
            <TouchableOpacity onPress={()=>navigation.navigate('Login')}>
                <LinearGradient
                    colors={['#08d4c4', '#01ab9d']}
                    style={styles.signIn}
                >
                    <Text style={styles.textSign}>Get Started</Text>
                    <MaterialIcons 
                        name="navigate-next"
                        color="#fff"
                        size={20}
                    />
                </LinearGradient>
            </TouchableOpacity>
            </View>
            <View>
             <View style={{alignItems:"center",alignContent:"center",marginTop:10,paddingTop:5}}>
                <Text style={[{color: 'gray',fontSize: 16,fontWeight: 'bold'}, {color: colors.text}]}>Powered By</Text>
                <TouchableOpacity onPress={() => Linking.openURL(`https://www.sonatech.ac.in/`)}
          style={{flex: 1}}>
            <Text style={{width:"100%", color:'gray',fontWeight:"bold"}}>Sona College Of Technology</Text>
            </TouchableOpacity>
            </View>
            </View>
        </Animatable.View>
        </ScrollView>
      </View>
    );
};

export default SplashScreen;

const {height} = Dimensions.get("screen");
const height_logo = height * 0.28;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    // backgroundColor: 'rgba(100,100,100, 0.5)',
    // backgroundColor: '#009387'
  },
  header: {
      flex: 2,
      justifyContent: 'center',
      alignItems: 'center'
  },
  footer: {
      flex: 1,
      backgroundColor: '#fff',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      paddingVertical: 50,
      paddingHorizontal: 30
  },
  logo: {
      width: height_logo,
      height: height_logo
  },
  title: {
      color: '#05375a',
      fontSize: 25,
      fontWeight: 'bold'
  },

  title_ico: {
    color: '#FFFFFF',
    fontSize: 25,
    fontWeight: 'bold'
},
  text: {
      color: 'grey',
      marginTop:5
  },
  button: {
      alignItems: 'flex-end',
      marginTop: 25,
      marginBottom:10
  },
  signIn: {
      width: 150,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 50,
      flexDirection: 'row'
  },
  textSign: {
      color: 'white',
      fontWeight: 'bold'
  }
});

