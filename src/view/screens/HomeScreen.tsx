import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, Modal, StyleSheet } from 'react-native';
import ModalCadastroTreino from '../components/ModalCadastroTreino';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen({ route, navigation }: any) {
  const { usuario } = route.params;
  const [modalVisible, setModalVisible] = useState(false);
  const [treinos, setTreinos] = useState<any[]>([]);

  //Função para carregar os treinos
  const loadTreinos = async () => {
    try {
      const treinosSalvos = await AsyncStorage.getItem(`treinos_${usuario.id}`);
      if (treinosSalvos) {
        setTreinos(JSON.parse(treinosSalvos));
      }
    } catch (error) {
      console.error('Erro ao carregar os treinos', error);
    }
  };

  //Função para salvar os treinos 
  const saveTreinos = async (treinos: any[]) => {
    try {
      await AsyncStorage.setItem(`treinos_${usuario.id}`, JSON.stringify(treinos));
    } catch (error) {
      console.error('Erro ao salvar os treinos', error);
    }
  };

  //Carregar os treinos assim que a tela for montada
  useEffect(() => {
    loadTreinos();
  }, []);

  const adicionarTreino = (novoTreino: any) => {
    const novosTreinos = [...treinos, novoTreino];
    setTreinos(novosTreinos);
    saveTreinos(novosTreinos); //Salvar os treinos 
    setModalVisible(false);
  };

  const removerTreino = (index: number) => {
    const novaLista = [...treinos];
    novaLista.splice(index, 1);
    setTreinos(novaLista);
    saveTreinos(novaLista); //Deletar os treinos
  };

  const atualizarTreino = (index: number, treinoAtualizado: any) => {
    const novaLista = [...treinos];
    novaLista[index] = treinoAtualizado;
    setTreinos(novaLista);
    saveTreinos(novaLista); //Editar os treinos 
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo, {usuario.nome} ({usuario.idade} anos)</Text>
      <Button title="Pesquisar Treinos" onPress={() => navigation.navigate('Pesquisa')} />
      <Button title="Adicionar Treino" onPress={() => setModalVisible(true)} />

      <FlatList
        data={treinos}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.treinoBox}>
            <Text>{item.descricao} - {item.data}</Text>
            <Text>Total de Séries: {item.series.length}</Text>


            {item.series.map((serie: any, idx: number) => (
              <View key={idx} style={{ marginLeft: 10 }}>
                <Text>→ {serie.descricao}</Text>
              </View>
            ))}


            <Button title="Editar" onPress={() => navigation.navigate('EditarTreino', { treino: item, index, atualizarTreino })} />
            <Button title="Excluir" onPress={() => removerTreino(index)} />
          </View>
        )}
      />

      <Modal visible={modalVisible} animationType="slide">
        <ModalCadastroTreino onSalvar={adicionarTreino} onCancelar={() => setModalVisible(false)} />
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 12 },
  treinoBox: { marginVertical: 8, padding: 10, backgroundColor: '#f0f0f0' }
});
