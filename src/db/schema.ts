import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const usuarios = sqliteTable('usuarios', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  nome: text('nome').notNull(),
  idade: integer('idade').notNull(),
  email: text('email').notNull(),
  senha: text('senha').notNull(),
});

export const treinos = sqliteTable('treinos', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  descricao: text('descricao').notNull(),
  data: text('data').notNull(),
  usuarioId: integer('usuario_id').notNull(),
});

export const series = sqliteTable('serie', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  descricao: text('descricao'),
  serie_qtd: integer('serie_qtd'),
  repeticao: integer('repeticao'),
  treino_id: integer('treino_id')
})




