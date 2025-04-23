import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { cadastrarUsuario } from '../../aplicacao/controller/usuarioController';


export default function CadastroScreen({ navigation }: any) {
  const [nome, setNome] = useState('');
  const [idade, setIdade] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleCadastro = async () => {
    await cadastrarUsuario(nome.trim(), parseInt(idade), email.trim(), senha.trim());
    alert('Usuário cadastrado com sucesso!');
    navigation.navigate('Login');
  };
  

  return (
    <View style={styles.container}>
      <Text>Nome:</Text>
      <TextInput style={styles.input} onChangeText={setNome} value={nome} />
      <Text>Idade:</Text>
      <TextInput style={styles.input} keyboardType="numeric" onChangeText={setIdade} value={idade} />
      <Text>Email:</Text>
      <TextInput style={styles.input} onChangeText={setEmail} value={email} />
      <Text>Senha:</Text>
      <TextInput style={styles.input} secureTextEntry onChangeText={setSenha} value={senha} />
      <Button title="Cadastrar" onPress={handleCadastro} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  input: { borderWidth: 1, marginBottom: 10, padding: 8 }
});