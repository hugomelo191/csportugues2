import { db } from "../server/db";
import { migrate } from "drizzle-orm/neon-serverless/migrator";
import { Pool } from "@neondatabase/serverless";
import * as schema from "../shared/schema";

// Função para migrar o banco de dados
async function runMigration() {
  console.log("Iniciando migração do banco de dados...");
  
  try {
    // Migrar usando o esquema definido
    await migrate(db, { migrationsFolder: "./drizzle" });
    console.log("Migração concluída com sucesso!");
    
    // Criar usuário admin se não existir
    await createAdminUserIfNeeded();
    
    console.log("Processo de migração finalizado.");
  } catch (error) {
    console.error("Erro durante a migração:", error);
    process.exit(1);
  } finally {
    // Fechar a conexão com o banco de dados
    await (db.driver as Pool).end();
  }
}

// Função para criar um usuário admin inicial
async function createAdminUserIfNeeded() {
  const { users } = schema;
  const adminUser = await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.role, "admin")
  });
  
  if (!adminUser) {
    console.log("Criando usuário administrador padrão...");
    
    // Hash de senha fictício para "admin123" - em produção, deve-se usar scrypt ou bcrypt
    const hashedPassword = "f7d7e15a8f3ff12f337d0bdfa24f55d06e31cd0afb89d095b648ae540e61c71d.c4cb61eea91e5990d5ae17bb21661b2f";
    
    await db.insert(users).values({
      username: "admin",
      password: hashedPassword,
      role: "admin"
    });
    
    console.log("Usuário administrador criado com sucesso!");
  } else {
    console.log("Usuário administrador já existe, pulando criação.");
  }
}

// Executar a migração
runMigration().catch(console.error);