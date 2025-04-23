import { db } from '../../db/drizzle';
import { series } from '../../db/schema';
import { eq } from 'drizzle-orm';

export async function cadastrarSeries(descricao: string, repeticao: number, serie_qtd: number, treino_id: number) {
    await db.insert(series).values({ descricao, repeticao, serie_qtd, treino_id });
  }

export async function buscarSeries(treinoId: number) {
  return await db.select().from(series).where(eq(series.treino_id, treinoId));
}

export async function deletarSerie(id: number) {
  await db.delete(series).where(eq(series.id, id));
}
