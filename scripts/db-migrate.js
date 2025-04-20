// Executar com: node scripts/db-migrate.js
import { exec } from "child_process";
exec("npx drizzle-kit push:pg", (error, stdout, stderr) => {
  if (error) {
    console.error(`Erro ao executar migração: ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`Erro da migração: ${stderr}`);
    return;
  }
  console.log(`Migração concluída: ${stdout}`);
});