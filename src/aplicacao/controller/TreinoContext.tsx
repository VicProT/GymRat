//Controla a lista de treinos e o que pode ser feito com ela (adicionar, atualizar, excluir).
import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Serie {
  descricao: string;
  repeticoes: string;
  serie_qtds: string;
}

export interface Treino {
  descricao: string;
  data: string;
  series: Serie[];
}

interface TreinoContextType {
  treinos: Treino[];
  adicionarTreino: (novoTreino: Treino) => void;
  atualizarTreino: (index: number, treinoAtualizado: Treino) => void;
  removerTreino: (index: number) => void;
}

const TreinoContext = createContext<TreinoContextType | undefined>(undefined);

export const TreinoProvider = ({ children }: { children: ReactNode }) => {
  const [treinos, setTreinos] = useState<Treino[]>([]);

  const adicionarTreino = (novoTreino: Treino) => {
    setTreinos(prev => [...prev, novoTreino]);
  };

  const atualizarTreino = (index: number, treinoAtualizado: Treino) => {
    setTreinos(prev => {
      const novaLista = [...prev];
      novaLista[index] = treinoAtualizado;
      return novaLista;
    });
  };

  const removerTreino = (index: number) => {
    setTreinos(prev => {
      const novaLista = [...prev];
      novaLista.splice(index, 1);
      return novaLista;
    });
  };

  return (
    <TreinoContext.Provider value={{ treinos, adicionarTreino, atualizarTreino, removerTreino }}>
      {children}
    </TreinoContext.Provider>
  );
};

export const useTreino = () => {
  const context = useContext(TreinoContext);
  if (!context) {
    throw new Error('useTreino deve ser usado dentro de um TreinoProvider');
  }
  return context;
};
