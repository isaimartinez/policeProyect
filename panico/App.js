import React,{useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {Login, Main, Details} from './src/screens/';
import { useSelector, useDispatch } from 'react-redux'
import { fetchData } from './src/redux/reducers/mainSlice';

import { navigationRef } from './src/navigation/RootNavigation';


const App = () => {
  const {user} = useSelector((state) => state.main)
  const dispatch = useDispatch()

  useEffect(() => {
   dispatch(fetchData("userInfo"))
  }, [])

  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer ref={navigationRef}>
      <StatusBar barStyle={"dark-content"}/>
      {/* <Stack.Navigator initialRouteName={user && "Details"}> */}
      <Stack.Navigator>
        {
          user ? (
            <>
              <Stack.Screen name="Main" component={Main} options={{ title: 'Botón de Pánico' }} />
              <Stack.Screen name="Details" component={Details} options={{ title: 'Detalles' }} />
            </>
          ) : (
            <>
              <Stack.Screen name="Login" component={Login} options={{headerShown: false,}} />
            </>
          )
        }
      </Stack.Navigator>
    </NavigationContainer>
  );
};


export default App;
