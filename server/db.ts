import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from "ws";
import * as schema from "@shared/schema";

// Configuração para WebSockets com NeonDB
neonConfig.webSocketConstructor = ws;

// Verificação da string de conexão
if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL deve estar definido. Certificar que a base de dados foi provisionada.");
}

// Criação do pool de conexões
export const pool = new Pool({ connectionString: process.env.DATABASE_URL });

// Criação do cliente Drizzle
export const db = drizzle(pool, { schema });

// Função de teste para validar a conexão
export async function testConnection() {
  try {
    const result = await pool.query('SELECT NOW()');
    console.log('Conexão ao banco de dados estabelecida:', result.rows[0].now);
    return true;
  } catch (error) {
    console.error('Erro ao conectar ao banco de dados:', error);
    return false;
  }
}