import { db } from '../../db/drizzle';
import { treinos } from '../../db/schema';
import { eq, like } from 'drizzle-orm';

export async function cadastrarTreino(descricao: string, data: string, usuarioId: number) {
  await db.insert(treinos).values({ descricao, data, usuarioId });
}

export async function buscarTreinos(usuarioId: number) {
  return await db.select().from(treinos).where(eq(treinos.usuarioId, usuarioId));
}

export async function buscarTreinoPorDescricao(termo: string, usuarioId: number) {
  return await db.select().from(treinos)
    .where(like(treinos.descricao, `%${termo}%`));
}

export async function deletarTreino(id: number) {
  await db.delete(treinos).where(eq(treinos.id, id));
}

