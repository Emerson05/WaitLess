import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Login from '../pages/Login'
import First from '../pages/First'
import Restaurant from '../pages/Restaurant'
import Signin from '../pages/Signin'


const Stack = createNativeStackNavigator();


export default function Routes(){
  return(
    <Stack.Navigator>
      <Stack.Screen
          name="First"
          component={First}
          options={{headerShown: false}}
      />
      
      <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
      />

      <Stack.Screen
          name="Signin"
          component={Signin}
          options={{headerShown: false}}
      />

      <Stack.Screen
          name="Restaurant"
          component={Restaurant}
          options={{headerShown: false}}
      />

    </Stack.Navigator>
  )
}