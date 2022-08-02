import React, { useState, useEffect} from "react"
import { View, StyleSheet, Image, TouchableOpacity} from 'react-native'
import Torch from "react-native-torch"
import RNShake from 'react-native-shake'
const App = () =>{
  const [ toggle, setToggle ] = useState(false)

  const handleChangeToggle = () =>{
    setToggle(oldToggle => !oldToggle)
  }

  useEffect(()=>{
    //Liga Flash Celular
    Torch.switchState(toggle)
  },[toggle])
  useEffect(()=>{
    /*
    Quando o celular for chacolhado , o comando sera executado
    */
    const subscription = RNShake.addListener(()=>{
      console.log("Chacolhou")
      setToggle(oldToggle => !oldToggle)
    });
    //Quando esta funcao vai ser chamado quando o compo
    //for desmontado
    return () => subscription.remove()
  },[]);
  return(
    <View style={toggle? style.container : style.containerLight}>
      <TouchableOpacity onPress={handleChangeToggle}>
        <Image
        style={toggle ? style.lightingOff : style.lightingOn } 
        source={
          toggle
          ? require('./assets/eco-light-off.png')
          : require('./assets/eco-light.png')}
        />
        <Image
        style={style.dioLogo} 
        source={
          toggle
          ? require('./assets/logo-dio-white.png')
          : require('./assets/logo-dio.png')}
        />
      </TouchableOpacity>
    </View>
  )

}

export default App

const style = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerLight:{
    flex:1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  lightingOn:{
    resizeMode: 'contain',
    alignSelf: 'center',
    width: 150,
    height: 150
  },
  lightingOff:{
    resizeMode: 'contain',
    alignSelf: 'center',
    tintColor: 'white',
    width: 150,
    height: 150
  },
  dioLogo:{
    resizeMode: 'contain',
    alignSelf: 'center',
    width: 250,
    height: 250
  }
})