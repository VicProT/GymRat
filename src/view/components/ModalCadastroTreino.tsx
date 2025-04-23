import React, { useState } from 'react';
import { View, TextInput, Button, Text, FlatList, StyleSheet } from 'react-native';
import { MaskedTextInput } from 'react-native-mask-text';

export default function ModalCadastroTreino({ onSalvar, onCancelar }: any) {
  const [descricao, setDescricao] = useState('');
  const [data, setData] = useState('');
  const [series, setSeries] = useState<any[]>([]);
  const [descSerie, setDescSerie] = useState('');
  const [repeticoes, setRepeticoes] = useState('');
  const [serie_qtds, setSerie_qtds] = useState('');

  const adicionarSerie = () => {
    setSeries([...series, { descricao: descSerie, repeticoes, serie_qtds }]);
    setDescSerie('');
    setSerie_qtds('');
    setRepeticoes('');
  };

  return (
    <View style={styles.container}>
      <Text>Descrição do Treino:</Text>
      <TextInput style={styles.input} value={descricao} onChangeText={setDescricao} />

      <Text>Data:</Text>
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
    

      <Text>Nova Série:</Text>
      <TextInput placeholder="Descrição" style={styles.input} value={descSerie} onChangeText={setDescSerie} />
      <TextInput placeholder="Série" style={styles.input} value={serie_qtds} onChangeText={setSerie_qtds} />
      <TextInput placeholder="Repetições" style={styles.input} value={repeticoes} onChangeText={setRepeticoes} />
      <Button title="Adicionar Série" onPress={adicionarSerie} />

      <FlatList
        data={series}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ item }) => (
          <Text>{item.descricao} - {item.serie_qtds} x {item.repeticoes}</Text>
        )}
      />

      <Button title="Salvar Treino" onPress={() => onSalvar({ descricao, data, series })} />
      <Button title="Cancelar" onPress={onCancelar} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  input: { borderWidth: 1, marginBottom: 10, padding: 8 }
});
