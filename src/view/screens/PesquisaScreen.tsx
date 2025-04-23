import React, { useState } from 'react';
import { View, TextInput, FlatList, Text, StyleSheet } from 'react-native';

const treinosFake = [
  { descricao: 'Peito', data: '2024-04-01' },
  { descricao: 'Costas', data: '2024-04-02' }
];

export default function PesquisaScreen() {
  const [filtro, setFiltro] = useState('');

  const resultados = treinosFake.filter(treino =>
    treino.descricao.toLowerCase().includes(filtro.toLowerCase()) ||
    treino.data.includes(filtro)
  );

  return (
    <View style={styles.container}>
      <TextInput placeholder="Filtrar por descrição ou data" onChangeText={setFiltro} value={filtro} style={styles.input} />
      <FlatList
        data={resultados}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <Text style={styles.item}>{item.descricao} - {item.data}</Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  input: { borderWidth: 1, padding: 8, marginBottom: 10 },
  item: { padding: 8, borderBottomWidth: 1 }
});