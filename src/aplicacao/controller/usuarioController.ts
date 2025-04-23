import { db } from '../../db/drizzle';
import { usuarios } from '../../db/schema';
import { eq } from 'drizzle-orm';

export async function cadastrarUsuario(nome: string, idade: number, email: string, senha: string) {
  await db.insert(usuarios).values({ nome, idade, email, senha });
}

export async function loginUsuarios(email: string, senha: string) {
  const resultado = await db.select().from(usuarios).where(eq(usuarios.email, email));
  return resultado.find(u => u.senha === senha);
}

export async function loginUsuario(email: string, senha: string) {
  const resultado = await db
    .select()
    .from(usuarios)
    .where(eq(usuarios.email, email));

  return resultado.find(u => u.senha === senha) ?? null;
}
