import XLSX from 'xlsx';

import React,{useState , createRef, Component , useEffect} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import * as Animatable from 'react-native-animatable';
import * as Print from 'expo-print'
import DatePicker from 'react-native-date-ranges';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
//import {
  //Dropdown,
//} from 'sharingan-rn-modal-dropdown';
//import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';

/*import {
	DateRange,
	ReactiveBase,
	ReactiveList,
} from '@appbaseio/reactivesearch-native';*/

import { 
    View, 
    Text, 
    Button, 
    TouchableOpacity, 
    PermissionsAndroid,
    Dimensions,
    TextInput,
    Platform,
    Alert,
    StyleSheet,
    ScrollView,
    StatusBar,
    ActivityIndicator,
    Image
} from 'react-native';
//import { AppRegistry, StyleSheet, Text, View, Button, Alert, Image, ScrollView, TouchableWithoutFeedback } from 'react-native';
//import { Table, Row, Rows, TableWrapper } from 'react-native-table-component';

// react-native-fs
import { writeFile, readFile, DocumentDirectoryPath, DownloadDirectoryPath } from 'react-native-fs';
//import { message } from 'antd';
const DDP = DownloadDirectoryPath + "/";
const output = str => str;

import axios from 'axios';
import Ip from './Ip';
import { DataTable } from 'react-native-paper';
import RNHTMLtoPDF from 'react-native-html-to-pdf';

import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import Icon from 'react-native-vector-icons/MaterialIcons';


<DatePicker
    style={ { width: 350, height: 45 } }
    customStyles = { {
        placeholderText:{ fontSize:20 }, // placeHolder style
        headerStyle : {  },			// title container style
        headerMarkTitle : { }, // title mark style 
        headerDateTitle: { }, // title Date style
        contentInput: {}, //content text container style
        contentText: {}, //after selected text Style
    } } // optional 
    centerAlign // optional text will align center or not
	allowFontScaling = {false} // optional
	placeholder={'Select start date and end date to filter'}
  mode={'range'}
  selectedBgColor="black"
	selectedTextColor="blue"
  calendarBgColor="black"
/>

const items = [
  // this is the parent or 'item'
  {
    name: 'Sort by Mechanical Complaints',
    id: 0,
    // these are the children or 'sub items'
    children: [
      {
        name: 'Carpentry',
        id: 10,
      },
      {
        name: 'Drainage Problem',
        id: 11,
      },
      {
        name: 'Painting',
        id: 12,
      },
      {
        name: 'Sewage Disposal',
        id: 13,
      },
      {
        name: 'Others',
        id: 14,
      },
    ],
  },
  {
    name: 'Sort by Electrical Complaints',
    id: 0,
    // these are the children or 'sub items'
    children: [
      {
        name: 'Electrical Wiring',
        id: 10,
      },
      {
        name: 'Fan Problems',
        id: 11,
      },
      {
        name: 'Light Problem',
        id: 12,
      },
      {
        name: 'Switch Problem',
        id: 13,
      },
      {
        name: 'Others',
        id: 14,
      },
    ],
  },
  {
    name: 'Sort by Status',
    id: 1,
    // these are the children or 'sub items'
    children: [
      {
        name: 'Completed',
        id: 15,
      },
      {
        name: 'Pending',
        id: 16,
      },
      {
        name: 'Rejected',
        id: 17,
      },
      {
        name: 'In-Work',
        id: 18,
      },
    ],
  },
  {
    name: 'Sort by Station',
    id: 2,
    // these are the children or 'sub items'
    children: [
      {
        name: 'TPT',
        id: 'Tirupattur - TPT',
        },
        {
        name: 'KEY',
        id: 'Kagankarai - KEY',
        },
        {
        name: 'SLY',
        id: 'Samalpatti - SLY',
        },
        {
        name: 'DST',
        id: 'Dasampatti - DST',
        },
        {
        name: 'DPI',
        id: 'Doddampatti - DPI',
        },
        {
        name: 'MAP',
        id: 'Morappur - MAP',
        },
        {
        name: 'TNGR',
        id: 'Thonganur - TNGR',
        },
        {
        name: 'BDY',
        id: 'Buddireddippatti - BDY',
        },
        {
        name: 'BQI',
        id: 'Bommidi - BQI',
        },
        {
        name: 'LCR',
        id: 'Lokur - LCR',
        },
        {
        name: 'DSPT',
        id: 'Danishpet - DSPT',
        },
        {
        name: 'TNT',
        id: 'Tinnappatti - TNT',
        },
        {
        name: 'KPPR',
        id: 'Karuppur - KPPR',
        },
        {
        name: 'OML',
        id: 'Omalur - OML',
        },
        {
        name: 'MCRD',
        id: 'Mecheri Road - MCRD',
        },
        {
        name: 'MTDM',
        id: 'Mettur Dam - MTDM',
        },
        {
        name: 'SA',
        id: 'Salem Jn - SA',
        },
        {
        name: 'VRPD',
        id: 'Virapandi Road - VRPD',
        },
        {
        name: 'DC',
        id: 'Magudanchavadi - DC',
        },
        {
        name: 'MVPM',
        id: 'Mavelipalayam - MVPM',
        },
        {
        name: 'SAMT',
        id: 'Salem Market - SAMT',
        },
        {
        name: 'SXT',
        id: 'SALEM TOWN - SXT',
        },
        {
        name: 'APN',
        id: 'Ayodhyapatamam - APN',
        },
        {
        name: 'MPLI',
        id: 'Minnampalli - MPLI',
        },
        {
        name: 'VGE',
        id: 'Valappadi Gate - VGE',
        },
        {
        name: 'ETP',
        id: 'Ettapur Road - ETP',
        },
        {
        name: 'PDKM',
        id: 'Peddanayakkan palaiyam - PDKM',
        },
        {
        name: 'ATU',
        id: 'Attur - ATU',
        },
        {
        name: 'TVS',
        id: 'Talaivasal Halt - TVS',
        },
        {
        name: 'MLYR',
        id: 'Melnariyaapanur Halt - MLYR',
        },
        {
        name: 'CHSM',
        id: 'Chinnasalem - CHSM',
        },
        {
        name: 'SRVT',
        id: 'Siruvattur Halt - SRVT',
        },
        {
        name: 'PRV',
        id: 'Pukiravari - PRV',
        },
        {
        name: 'KKTI',
        id: 'Kuttakudi Halt - KKTI',
        },
        {
        name: 'MKSP',
        id: 'MukhasaParur - MKSP',
        },
        {
        name: 'SGE',
        id: 'Sankaridurg - SGE',
        },
        {
        name: 'ANU',
        id: 'Anangur - ANU',
        },
        {
        name: 'CV',
        id: 'Cauvery - CV',
        },
        {
        name: 'ED',
        id: 'Erode Jn - ED',
        },
        {
        name: 'TPM',
        id: 'Totiyapalayam - TPM',
        },
        {
        name: 'PY',
        id: 'Perundurai - PY',
        },
        {
        name: 'IGR',
        id: 'Ingur - IGR',
        },
        {
        name: 'VZ',
        id: 'Vijyamanagalam - VZ',
        },
        {
        name: 'UKL',
        id: 'Uttukuli - UKL',
        },
        {
        name: 'CVD',
        id: 'Chavadipalayam - CVD',
        },
        {
        name: 'PAS',
        id: 'Pasur - PAS',
        },
        {
        name: 'URL',
        id: 'Unjalur - URL',
        },
        {
        name: 'KMD',
        id: 'Kodumudi - KMD',
        },
        {
        name: 'TUP',
        id: 'Tiruppur - TUP',
        },
        {
        name: 'VNJ',
        id: 'Vanjipalayam - VNJ',
        },
        {
        name: 'SNO',
        id: 'Somanur - SNO',
        },
        {
        name: 'SUU',
        id: 'Sulur Road - SUU',
        },
        {
        name: 'IGU',
        id: 'Irugur - IGU',
        },
        {
        name: 'SHI',
        id: 'Singanallur Halt - SHI',
        },
        {
        name: 'PLMD',
        id: 'Pilamedu - PLMD',
        },
        {
        name: 'CBF',
        id: 'Coimbatore North - CBF',
        },
        {
        name: 'CBE',
        id: 'Coimbatore Junction - CBE',
        },
        {
        name: 'PTJ',
        id: 'Podanur Jn - PTJ',
        },
        {
        name: 'TDE',
        id: 'Tudiyalur Halt - TDE',
        },
        {
        name: 'PKM',
        id: 'Periayanaikanpalayam - PKM',
        },
        {
        name: 'KAY',
        id: 'Karaimadai - KAY',
        },
        {
        name: 'MTP',
        id: 'Mettupalaiyam - MTP',
        },
        {
        name: 'QLR',
        id: 'Kallar - QLR',
        },
        {
        name: 'HLG',
        id: 'Hilgrove - HLG',
        },
        {
        name: 'ONR',
        id: 'Coonoor - ONR',
        },
        {
        name: 'WEL',
        id: 'Wellington - WEL',
        },
        {
        name: 'AVK',
        id: 'Aravankadu - AVK',
        },
        {
        name: 'KXT',
        id: 'Ketti - KXT',
        },
        {
        name: 'LOV',
        id: 'Lovdale - LOV',
        },
        {
        name: 'UAM',
        id: 'Udhagamandalam - UAM',
        },
        {
        name: 'MALR',
        id: 'Mallur - MALR',
        },
        {
        name: 'RASP',
        id: 'Rasipuram - RASP',
        },
        {
        name: 'KLGN',
        id: 'Kalangani - KLGN',
        },
        {
        name: 'NMKL',
        id: 'Namakkal - NMKL',
        },
        {
        name: 'MONR',
        id: 'Mohanur - MONR',
        },
        {
        name: 'VNGL',
        id: 'Vangal Halt - VNGL',
        },
        {
        name: 'KRR',
        id: 'Karur Jn - KRR',
        },
        {
        name: 'VEI',
        id: 'Velliyanai - VEI',
        },
        {
        name: 'PALM',
        id: 'Palayam - PALM',
        },
        {
        name: 'EDU',
        id: 'Eriodu - EDU',
        },
        {
        name: 'PGR',
        id: 'Pugalur - PGR',
        },
        {
        name: 'MPLM',
        id: 'Murthipalayam - MPLM',
        },
        {
        name: 'VRQ',
        id: 'Virarakkiyam - VRQ',
        },
        {
        name: 'MYU',
        id: 'Mayanoor - MYU',
        },
        {
        name: 'SEV',
        id: 'Sithalavai Halt - SEV',
        },
        {
        name: 'MMH',
        id: 'Mahadanapuram - MMH',
        },
        {
        name: 'LP',
        id: 'Lalapet - LP',
        },
        {
        name: 'TIC',
        id: 'Timmachipuram Halt - TIC',
        },
        {
        name: 'KLT',
        id: 'Kulithalai - KLT',
        },
        {
        name: 'Marudur Halt - MUQ',
        id: 'Marudur Halt - MUQ',
        },
        {
        name: 'PLI',
        id: 'Pettaivaytalai - PLI',
        },
        {
        name: 'PGN',
        id: 'Perugamani - PGN',
        },
        {
        name: 'EL',
        id: 'Elamanur - EL',
        },
        {
        name: 'JPM',
        id: 'Jiyapuram Halt - JPM',
        },
        {
        name: 'MTNL',
        id: 'Muttarasanallur - MTNL',
        },
    ],
  },
 
];

export default class Report extends Component{

  readData = async() => {
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

    this.begin()

}

  constructor(props){
    super(props);
    this.state1={
      data:[["No.","Mem.No","ID No"],
      [10,40,40],[24,5,36],[3,53,6],[4,5,26],[5,25,36]
    ],
    };

    this.state={
      posts:[],
      dro:(''),
      date:(''),
      Loading:true,
      startdate:'',
      enddate:''
    }
    
    this.exportFile=this.exportFile.bind(this);
  };

  onSelectedItemsChange = (selectedItems) => {
    this.setState({ selectedItems });
    axios.post(Ip+`/user/userallComplaints`)
    .then(response =>{
      //console.log(dis)
      this.state.posts=response.data
      //console.log(response.data)
      if(selectedItems){
        if(selectedItems=="Completed"){
      this.setState({posts:response.data.filter(complaint=>complaint.status=="10")})
        }
        else if(selectedItems=="Pending"){
      this.setState({posts:response.data.filter(complaint=>complaint.status=="00")})
        }
        else if(selectedItems=="Rejected"){
      this.setState({posts:response.data.filter(complaint=>complaint.status=="-01")})
        }
        else if(selectedItems=="On Progress with Junior Engineer"){
      this.setState({posts:response.data.filter(complaint=>complaint.status=="04")})
        }
        else if(selectedItems=="On Progress With Additional Divisional Engineer"){
      this.setState({posts:response.data.filter(complaint=>complaint.status=="01")})
        }
        else if(selectedItems=="On Progress With Divisional Engineer"){
      this.setState({posts:response.data.filter(complaint=>complaint.status=="02")})
        }
        else if(selectedItems=="On Progress With Senior Divisional Engineer"){
      this.setState({posts:response.data.filter(complaint=>complaint.status=="03")})
        }

        else if(selectedItems=="Carpentry"){
          const data = response.data.filter(function(item){
            for(let i=0;i<item.ComplaintCategory.length;i++){
              //console.log(item.ComplaintCategory[i]);
              if(item.ComplaintCategory[i]=='Carpentry'){
            return item.ComplaintCategory[i] == 'Carpentry';
              }
            }
         }).map(function({PFNumber, Name, referenceKey,QtrNumber,Colony,Station,Role,Department,ComplaintCategory,status,createdAt,updatedAt,Mobile}){
             return {PFNumber, Name, referenceKey,QtrNumber,Colony,Station,Role,Department,ComplaintCategory,status,createdAt,updatedAt,Mobile};
         });
         this.setState({posts:data})
        }

        else if(selectedItems=="Drainage Problem"){
          const data = response.data.filter(function(item){
            for(let i=0;i<item.ComplaintCategory.length;i++){
              //console.log(item.ComplaintCategory[i]);
              if(item.ComplaintCategory[i]=='DrainageProblem'){
            return item.ComplaintCategory[i] == 'DrainageProblem';
              }
            }
         }).map(function({PFNumber, Name, referenceKey,QtrNumber,Colony,Station,Role,Department,ComplaintCategory,status,createdAt,updatedAt,Mobile}){
             return {PFNumber, Name, referenceKey,QtrNumber,Colony,Station,Role,Department,ComplaintCategory,status,createdAt,updatedAt,Mobile};
         });
         this.setState({posts:data})
        }
        else if(selectedItems=="Painting"){
          const data = response.data.filter(function(item){
            for(let i=0;i<item.ComplaintCategory.length;i++){
              //console.log(item.ComplaintCategory[i]);
              if(item.ComplaintCategory[i]=='Painting'){
            return item.ComplaintCategory[i] == 'Painting';
              }
            }
         }).map(function({PFNumber, Name, referenceKey,QtrNumber,Colony,Station,Role,Department,ComplaintCategory,status,createdAt,updatedAt,Mobile}){
             return {PFNumber, Name, referenceKey,QtrNumber,Colony,Station,Role,Department,ComplaintCategory,status,createdAt,updatedAt,Mobile};
         });
         this.setState({posts:data})
        }
        else if(selectedItems=="Sewage Disposal"){
      const data = response.data.filter(function(item){
            for(let i=0;i<item.ComplaintCategory.length;i++){
              //console.log(item.ComplaintCategory[i]);
              if(item.ComplaintCategory[i]=='Sewage Disposal'){
            return item.ComplaintCategory[i] == 'Sewage Disposal';
              }
            }
         }).map(function({PFNumber, Name, referenceKey,QtrNumber,Colony,Station,Role,Department,ComplaintCategory,status,createdAt,updatedAt,Mobile}){
             return {PFNumber, Name, referenceKey,QtrNumber,Colony,Station,Role,Department,ComplaintCategory,status,createdAt,updatedAt,Mobile};
         });
         this.setState({posts:data})
        }
        else if(selectedItems=="Others"){
      const data = response.data.filter(function(item){
            for(let i=0;i<item.ComplaintCategory.length;i++){
              //console.log(item.ComplaintCategory[i]);
              if(item.ComplaintCategory[i]=='Others '){
            return item.ComplaintCategory[i] == 'Others ';
              }
            }
         }).map(function({PFNumber, Name, referenceKey,QtrNumber,Colony,Station,Role,Department,ComplaintCategory,status,createdAt,updatedAt,Mobile}){
             return {PFNumber, Name, referenceKey,QtrNumber,Colony,Station,Role,Department,ComplaintCategory,status,createdAt,updatedAt,Mobile};
         });
         this.setState({posts:data})
        }
        else if(selectedItems=="Electrical Wiring"){
      const data = response.data.filter(function(item){
            for(let i=0;i<item.ComplaintCategory.length;i++){
              //console.log(item.ComplaintCategory[i]);
              if(item.ComplaintCategory[i]=='ElectricalWiring'){
            return item.ComplaintCategory[i] == 'ElectricalWiring';
              }
            }
         }).map(function({PFNumber, Name, referenceKey,QtrNumber,Colony,Station,Role,Department,ComplaintCategory,status,createdAt,updatedAt,Mobile}){
             return {PFNumber, Name, referenceKey,QtrNumber,Colony,Station,Role,Department,ComplaintCategory,status,createdAt,updatedAt,Mobile};
         });
         this.setState({posts:data})
        }
        else if(selectedItems=="Fan Problems"){
      const data = response.data.filter(function(item){
            for(let i=0;i<item.ComplaintCategory.length;i++){
              //console.log(item.ComplaintCategory[i]);
              if(item.ComplaintCategory[i]=='FanProblems '){
            return item.ComplaintCategory[i] == 'FanProblems ';
              }
            }
         }).map(function({PFNumber, Name, referenceKey,QtrNumber,Colony,Station,Role,Department,ComplaintCategory,status,createdAt,updatedAt,Mobile}){
             return {PFNumber, Name, referenceKey,QtrNumber,Colony,Station,Role,Department,ComplaintCategory,status,createdAt,updatedAt,Mobile};
         });
         this.setState({posts:data})
        }
        else if(selectedItems=="Light Problem"){
          const data = response.data.filter(function(item){
            for(let i=0;i<item.ComplaintCategory.length;i++){
              //console.log(item.ComplaintCategory[i]);
              if(item.ComplaintCategory[i]=='LightProblem '){
            return item.ComplaintCategory[i] == 'LightProblem ';
              }
            }
         }).map(function({PFNumber, Name, referenceKey,QtrNumber,Colony,Station,Role,Department,ComplaintCategory,status,createdAt,updatedAt,Mobile}){
             return {PFNumber, Name, referenceKey,QtrNumber,Colony,Station,Role,Department,ComplaintCategory,status,createdAt,updatedAt,Mobile};
         });
         this.setState({posts:data})
        }
        else if(selectedItems=="Switch Problem"){
      const data = response.data.filter(function(item){
            for(let i=0;i<item.ComplaintCategory.length;i++){
              //console.log(item.ComplaintCategory[i]);
              if(item.ComplaintCategory[i]=='SwitchProblem '){
            return item.ComplaintCategory[i] == 'SwitchProblem ';
              }
            }
         }).map(function({PFNumber, Name, referenceKey,QtrNumber,Colony,Station,Role,Department,ComplaintCategory,status,createdAt,updatedAt,Mobile}){
             return {PFNumber, Name, referenceKey,QtrNumber,Colony,Station,Role,Department,ComplaintCategory,status,createdAt,updatedAt,Mobile};
         });
         this.setState({posts:data})
        }
        else{
      if(selectedItems){
      this.setState({posts:response.data.filter(complaint=>complaint.Station==selectedItems)})
        }
      }
    }
  });
  };

  begin(){
    this.state.Loading=true
    if(userRole=='Occupant')
    {
        global.Rol='6'
        
    }
    if(userRole=='SeniorSectionEngineer')
    {
      global.Rol='4'
  
    }
    if(userRole=='AdditionalDivisionalEngineer')
    {
      global.Rol='3'

    }
    if(userRole=='DivisionalEngineer')
    {
      global.Rol='2'
      
    }
    if(userRole=='SeniorDivisionalEngineer')
    {
      global.Rol='1'
    
    }
    if(userRole=='JuniorEngineer'){
      global.Rol='5'
    }
    console.log(userDepart)
    global.dis ={
      PFNumber : userPFNumber,
      Name:userName,
      QtrNumber:userQtrNumber,
      Department:userDepart,
      Colony:userColony,
      Role:Rol,
      Station:userStation,
      Mobile:userMobile,
  }
  console.log(dis)
  axios.post(Ip+`/user/userallComplaints`,dis)
  .then(response =>{
    console.log(response.data)
    this.state.Loading=false
    this.setState({posts:response. data})
    })
    .catch(error =>
    {
        console.log(error)
    })
      this.render() 

  }

  requestRunTimePermission=()=>{
    var that=this;
    async function externalStoragePermission(){
      try{
        const granted=await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title:'External',
            message:'App needs Permission',
          }
        );
        if(granted === PermissionsAndroid.RESULTS.GRANTED){
          that.exportFile();
        }else{
          alert('Write external');
        }
      }catch(err){
        Alert.alert('Write permission err',err);
        console.warn(err);
      }
    }
    if(Platform.OS==='android'){
      externalStoragePermission();
    }else{
      this.exportFile();
    }
  }
  exportFile(){
    var data=
      this.state.posts.map((user) => (
        {
    "PFNumber":`${user.PFNumber}`,
    "Name":`${user.Name}`,
    "Reference Key":`${user.referenceKey}`,
    "Qtr Number":`${user.QtrNumber}`,
    "Complaint Category":`${user.ComplaintCategory}`,
    "Mobile":`${user.Mobile}`,
    "Date":`${user.createdAt}`,
    "Updated At":`${user.updatedAt}`
        }
      ))
    const ws=XLSX.utils.json_to_sheet(data);
    const wb=XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb,ws,"SheetJS");

    const wbout=XLSX.write(wb,{type:'binary',bookType:"xlsx"});
    const file=DDP+"Report.xlsx";

    writeFile(file,output(wbout),'ascii').then((res)=>{
      Alert.alert("Export success"+file);
    }).catch((err)=>{
      Alert.alert("Export error"+err.message);
    });
  };

  componentDidMount(){
    this.readData()
  }

  onDateChange(dat){
    console.log("Hi")
    console.log(dat)
    this.setState({startdate:dat.startDate});
    this.setState({enddate:dat.endDate});
    const d= {
      start:this.state.startdate,
      end:this.state.enddate
    }
    console.log(d)
    axios.post(Ip+'/admin/grievance/date-wise/',d)
  .then(response =>{
    console.log("Hi")
    this.state.Loading=false
    axios.post(Ip+`/admin/getList/`,dis)
    .then(res=>{
      console.log(res)
      let slist=res.data;
      console.log(slist,slist.includes(res.Station))
      let result=dis.Role==1?response.data:response.data.filter(r=>slist.includes(r.Station))
      this.setState({posts:result})
      })
      console.log(response)
    })
    .catch(error =>
    {
        console.log(error)
    })
    console.log(this.state.startdate,this.state.enddate)

  }

  refresh(){
    this.state.Loading=true
    console.log(this.date)
    console.log(this.dro)
    axios.post(Ip+`/user/userallComplaints`,dis)
    .then(response =>{
      this.state.Loading=false
      console.log(response.data)
      this.setState({posts:response.data})
      })
      .catch(error =>
      {
          console.log(error)
      })

      this.render() 
      
  }

  render(){

    const sortby=[
      {
        value: "Sort by Complaint",
        label: "Sort by Complaint",
      },
      {
        value: "Sort by Completed status",
        label: "Sort by Completed status",
      },
      {
        value: "Sort by Pending status",
        label: "Sort by Pending status",
      },
      {
        value: "Sort by Rejected status",
        label: "Sort by Rejected status",
      },
      {
        value: "Sort by In-Work status",
        label: "Sort by In-Work status",
      },
      {
        value: "Sort by Station",
        label: "Sort by Station",
      },
      {
        value: "All",
        label: "All",
      },
    ]
    const {
      ...rest 
    } = this.props;

    return(
      <View style={styles.container}>
        <StatusBar backgroundColor='#009387' barStyle="light-content"/>
      <View style={styles.header}>
          <Text style={styles.text_header}>Grievance Report!</Text>
      </View>
      <Animatable.View 
          animation="fadeInUpBig"
          style={styles.footer}
      >
        <Button color={'#009387'} title='Refersh' onPress={() => this.refresh()}></Button>
        <View style={{flexDirection:"row"}}>
            </View>
            <Text style={[styles.text_footer, {
                marginTop: 35
            }]}>Select Date :</Text>
            <View style={{display:"flex",flexDirection:"row"}}>
            <DatePicker
            style={{width:"75%"}}
        ref = {(ref)=> this.picker = ref}
        selectedTextColor="#000"
        mode="range"
        onConfirm={ 
          (i)=>this.onDateChange(i)
        }
        {...rest}
        customButton = {this.customButton}
      />
      <TouchableOpacity style={{borderRadius:12,width:"45%",marginStart:15}} onPress={this.requestRunTimePermission}>
          <View style={{display:"flex",flexDirection:"row"}}>
          <FontAwesome
          style={{marginTop:15,marginStart:"25%"}}
                    name="download"
                    color="#009387"
                    size={20}
                />
            {/* {/<Text style={{fontSize: 18,textAlign: 'center',color:"#FFF",marginTop:10,marginStart:15}}>Create PDF</Text>/} */}
          </View>
        </TouchableOpacity>
      </View>

      <View>
        <SectionedMultiSelect
          items={items}
          IconRenderer={Icon}
          uniqueKey="name"
          subKey="children"
          selectText="Sort By"
          showDropDowns={true}
          readOnlyHeadings={true}
          single	={true}
          onSelectedItemsChange={this.onSelectedItemsChange}
          selectedItems={this.state.selectedItems}
        />
      </View>
      
      { this.state.Loading==true && (
            <View style={[styles.container_load,styles.horizontal_load]}>
            <ActivityIndicator size ="large" color="#009387" />
            </View>
          )
          }
      
      <ScrollView>
      <View style={{width:"50%"}}>
          </View>
          <View style={{marginTop:50}}>
          <ScrollView horizontal={true}>
        <DataTable style={{borderTopWidth:1,borderRadius:5}}>
        <DataTable.Header style={{borderLeftWidth:1,borderRightWidth:1,borderRadius:5,backgroundColor:"#009387"}}>
      <DataTable.Title style={{borderRightWidth:1,width:100,borderRadius:5}}><Text style={{fontWeight:"bold",color:"#fff",fontSize:15}}>{'\t'}PFNumber</Text></DataTable.Title>
      <DataTable.Title style={{borderRightWidth:1,width:100,borderRadius:5}}><Text style={{fontWeight:"bold",color:"#fff",fontSize:15}}>{'\t'}Name</Text></DataTable.Title>
      <DataTable.Title style={{borderRightWidth:1,width:100,borderRadius:5}}><Text style={{fontWeight:"bold",color:"#fff",fontSize:15}}>{'\t'}Complaint-ID</Text></DataTable.Title>
      <DataTable.Title style={{borderRightWidth:1,width:100,borderRadius:5}}><Text style={{fontWeight:"bold",color:"#fff",fontSize:15}}>{'\t'}QtrNumber</Text></DataTable.Title>
      <DataTable.Title style={{borderRightWidth:1,width:100,borderRadius:5}}><Text style={{fontWeight:"bold",color:"#fff",fontSize:15}}>{'\t'}Colony</Text></DataTable.Title>
      <DataTable.Title style={{borderRightWidth:1,width:100,borderRadius:5}}><Text style={{fontWeight:"bold",color:"#fff",fontSize:15}}>{'\t'}Station</Text></DataTable.Title>
      <DataTable.Title style={{borderRightWidth:1,width:100,borderRadius:5}}><Text style={{fontWeight:"bold",color:"#fff",fontSize:15}}>{'\t'}Role</Text></DataTable.Title>
      <DataTable.Title style={{borderRightWidth:1,width:100,borderRadius:5}}><Text style={{fontWeight:"bold",color:"#fff",fontSize:15}}>{'\t'}Complaint Department</Text></DataTable.Title>
      <DataTable.Title style={{borderRightWidth:1,width:100,borderRadius:5}}><Text style={{fontWeight:"bold",color:"#fff",fontSize:15}}>{'\t'}Complaint Category</Text></DataTable.Title>
      <DataTable.Title style={{borderRightWidth:1,width:100,borderRadius:5}}><Text style={{fontWeight:"bold",color:"#fff",fontSize:15}}>{'\t'}Status</Text></DataTable.Title>
      <DataTable.Title style={{borderRightWidth:1,width:100,borderRadius:5}}><Text style={{fontWeight:"bold",color:"#fff",fontSize:15}}>{'\t'}Date of Complaint</Text></DataTable.Title>
      <DataTable.Title style={{borderRightWidth:1,width:100,borderRadius:5}}><Text style={{fontWeight:"bold",color:"#fff",fontSize:15}}>{'\t'}Date of Update</Text></DataTable.Title>
      <DataTable.Title style={{width:100,borderRadius:5}}><Text style={{fontWeight:"bold",color:"#fff",fontSize:15}}>{'\t'}Mobile Number</Text></DataTable.Title>
    </DataTable.Header>
          {this.state.posts.map((u,i) => {
               return(
             
                 <View key={i}>
                   <DataTable.Row style={{borderRightWidth:1,borderLeftWidth:1,borderRadius:5,borderTopWidth:1,borderBottomWidth:1}}>
          <DataTable.Cell style={{borderRightWidth:1,width:200,borderRadius:5}}>{u.PFNumber}</DataTable.Cell>
          <DataTable.Cell style={{borderRightWidth:1,width:200,borderRadius:5}}>{u.Name}</DataTable.Cell>
          <DataTable.Cell style={{borderRightWidth:1,width:200,borderRadius:5}}>{u.referenceKey}</DataTable.Cell>
          <DataTable.Cell style={{borderRightWidth:1,width:200,borderRadius:5}}>{u.QtrNumber}</DataTable.Cell>
          <DataTable.Cell style={{borderRightWidth:1,width:200,borderRadius:5}}>{u.Colony}</DataTable.Cell>
          <DataTable.Cell style={{borderRightWidth:1,width:200,borderRadius:5}}>{u.Station}</DataTable.Cell>
          <DataTable.Cell style={{borderRightWidth:1,width:200,borderRadius:5}}>{u.Role}</DataTable.Cell>
          <DataTable.Cell style={{borderRightWidth:1,width:200,borderRadius:5}}>{u.Department}</DataTable.Cell>
          <DataTable.Cell style={{borderRightWidth:1,width:200,borderRadius:5}}>{u.ComplaintCategory}</DataTable.Cell>

          { u.status == '00' && (<DataTable.Cell style={{borderRightWidth:1,width:200,borderRadius:5}}>On Progress With SSE</DataTable.Cell>)}
          { u.status == '-01' && (<DataTable.Cell style={{borderRightWidth:1,width:200,borderRadius:5}}>Rejected</DataTable.Cell>)}
          { u.status == '10' && (<DataTable.Cell style={{borderRightWidth:1,width:200,borderRadius:5}}>Grievance Completed</DataTable.Cell>)}
          { u.status == '01' && (<DataTable.Cell style={{borderRightWidth:1,width:200,borderRadius:5}}>On Progress With Additional Divisional Engineer</DataTable.Cell>)}
          { u.status == '02' && (<DataTable.Cell style={{borderRightWidth:1,width:200,borderRadius:5}}>On Progress With Divisional Engineer</DataTable.Cell>)}
          { u.status == '03' && (<DataTable.Cell style={{borderRightWidth:1,width:200,borderRadius:5}}>On Progress With Senior Divisional Engineer</DataTable.Cell>)}
          { u.status == '04' && (<DataTable.Cell style={{borderRightWidth:1,width:200,borderRadius:5}}>Accepeted and On Progress with Junior Engineer</DataTable.Cell>)}

          <DataTable.Cell style={{borderRightWidth:1,width:200,borderRadius:5}}>{u.createdAt}</DataTable.Cell>
          <DataTable.Cell style={{borderRightWidth:1,width:200,borderRadius:5}}>{u.updatedAt}</DataTable.Cell>
          <DataTable.Cell style={{width:200,borderRadius:5}}>{u.Mobile}</DataTable.Cell>
          </DataTable.Row>
          </View>
               )
          }
          )
        }
        </DataTable>
        </ScrollView>
        </View>
        </ScrollView>
      </Animatable.View>
    </View>
      
      
        
    );
}
}

const styles = StyleSheet.create({
  container_load:{
    justifyContent:'center'
  },
  horizontal_load:{
    flexDirection:"row",
    justifyContent:"space-around",
    padding:10
  }, 
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  head: { height: 40, backgroundColor: '#f1f8ff' },
  text: { margin: 6 },
  container: {
    flex: 1, 
    backgroundColor: '#009387'
  },
  
  header: {
      flex: 1,
      justifyContent: 'flex-end',
      paddingHorizontal: 20,
      paddingBottom: 50
  },
  container_dropdown: {
      paddingTop: 30,
      marginLeft: 0,
      marginRight:200,
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      flex: 1,
    },
    
    buttonView: {
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'row',
      marginTop: 10,
    },
  footer: {
      flex: Platform.OS === 'ios' ? 3 : 5,
      backgroundColor: '#fff',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      paddingHorizontal: 20,
      paddingVertical: 30
  },
  text_header: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 30
  },
  text_footer: {
      color: '#05375a',
      fontSize: 18
  },
  action: {
      flexDirection: 'row',
      marginTop: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#f2f2f2',
      paddingBottom: 5
  },
  actionComplaint: {
      flexDirection: 'row',
      marginTop: 10,
      borderBottomWidth: 1,
      borderWidth:1,
      borderColor: '#f2f2f2',
      paddingBottom: 5
  },
  textInput: {
      flex: 1,
      marginTop: Platform.OS === 'ios' ? 0 : -12,
      paddingLeft: 10,
      color: '#05375a',
  },
  textInputComplaint: {
      flex:1,
      marginTop: Platform.OS === 'ios' ? 0 : -12,
      paddingTop:15,
      paddingLeft: 10,
      color: '#05375a',
  },
  button: {
      alignItems: 'center',
      marginTop: 50
  },
  buttonUpload: {
      alignItems: 'center',
      marginTop: 30
  },
  signInUpload: {
      width: '55%',
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10
  },
  textSignUpload: {
      fontSize: 18,
      fontWeight: 'bold'
  },
  signIn: {
      width: '100%',
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10
  },
  textSign: {
      fontSize: 18,
      fontWeight: 'bold'
  },
  textPrivate: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginTop: 20
  },
  color_textPrivate: {
      color: 'grey'
  },

  textStyle: {
    fontSize: 18,
    padding: 10,
    color: 'black',
    textAlign: 'center',
    color:"#FFF"
  },
});