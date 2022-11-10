import React,{useEffect, useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {getData} from './src/Apis/storage'
import { View, Text, SafeAreaView } from 'react-native'
import Login from './src/screens/login';
import Main from './src/screens/Main';
import { useSelector, useDispatch } from 'react-redux'
import { setUser, fetchData } from './src/redux/reducers/mainSlice';

const App = () => {

  const {user} = useSelector((state) => state.main)
  const dispatch = useDispatch()


  useEffect(() => {
   dispatch(fetchData("userInfo"))
  }, [])
  

  const Stack = createNativeStackNavigator();


  return (
    <NavigationContainer>
      <Stack.Navigator>
        {
          user ? (
            <>
              <Stack.Screen name="Main" component={Main} options={{ title: 'Botón de Pánico' }} />
            </>
          ) : (
            <>
              <Stack.Screen name="Login" component={Login} />
            </>
          )
        }
      </Stack.Navigator>
    </NavigationContainer>
  );
};


export default App;
