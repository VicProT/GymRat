import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './src/view/screens/LoginScreen';
import CadastroScreen from './src/view/screens/CadastroScreen';
import HomeScreen from './src/view/screens/HomeScreen';
import PesquisaScreen from './src/view/screens/PesquisaScreen';
import EditarTreinoScreen from './src/view/screens/EditarTreinoScreen';
import { TreinoProvider } from './src/aplicacao/controller/TreinoContext';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <TreinoProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Cadastro" component={CadastroScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Pesquisa" component={PesquisaScreen} />
          <Stack.Screen name="EditarTreino" component={EditarTreinoScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </TreinoProvider>
  );
}
