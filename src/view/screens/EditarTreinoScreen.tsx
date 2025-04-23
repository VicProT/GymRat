import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { MaskedTextInput } from 'react-native-mask-text';

export default function EditarTreinoScreen({ route, navigation }: any) {
  const { treino, index, atualizarTreino } = route.params;
  
  const [descricao, setDescricao] = useState(treino.descricao);
  const [data, setData] = useState(treino.data);
  const [series, setSeries] = useState(treino.series);
  
  const handleSave = () => {
    const treinoAtualizado = {
      descricao,
      data,
      series,
    };
    
    atualizarTreino(index, treinoAtualizado);
    
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar Treino</Text>
      <TextInput
        style={styles.input}
        value={descricao}
        onChangeText={setDescricao}
        placeholder="Descrição do treino"
      />
      
      <MaskedTextInput
        mask="99/99/9999"
        onChangeText={(text, rawText) => setData(text)} 
        value={data}
        placeholder="dd/mm/aaaa"
        keyboardType="numeric"
        style={{
          borderWidth: 1,
          borderColor: '#ccc',
          padding: 10,
          marginVertical: 10,
          borderRadius: 6,
        }}
      />


      <Button title="Salvar" onPress={handleSave} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 12 },
  input: { borderWidth: 1, padding: 8, marginBottom: 10, borderRadius: 5 },
});
