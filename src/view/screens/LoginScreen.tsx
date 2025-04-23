import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { loginUsuario } from '../../aplicacao/controller/usuarioController';

export default function LoginScreen({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = async () => {
    const usuario = await loginUsuario(email.trim(), senha.trim());
    
    if (usuario) {
      navigation.navigate('Home', { usuario });
    } else {
      alert('Credenciais inválidas');
    }
  };
  

  return (
    <View style={styles.container}>
      <Text>Email:</Text>
      <TextInput style={styles.input} onChangeText={setEmail} value={email} />
      <Text>Senha:</Text>
      <TextInput style={styles.input} secureTextEntry onChangeText={setSenha} value={senha} />
      <Button title="Entrar" onPress={handleLogin} />
      <Button title="Cadastrar" onPress={() => navigation.navigate('Cadastro')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  input: { borderWidth: 1, marginBottom: 10, padding: 8 }
});