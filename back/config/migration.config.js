import fs from "fs";
import path from "path";

import pool from "./db.config.js";
import logger from "../utils/logger.js";
import { __dirname } from "../utils/dirname.util.js";

async function runMigrations() {
  const migrationPath = path.join(__dirname, "../migrations");

  if (!fs.existsSync(migrationPath)) {
    logger.error("Le dossier migrations n'existe pas.");
    process.exit(1);
  }

  const files = fs.readdirSync(migrationPath).sort();

  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS migrations (
          id INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(255) NOT NULL UNIQUE,
          executed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    for (const file of files) {
      const filePath = path.join(migrationPath, file);
      if (path.extname(filePath) === ".sql") {
        const [existingMigration] = await pool.query(
          "SELECT * FROM migrations WHERE name = ?",
          [file]
        );

        if (existingMigration.length === 0) {
          logger.info(`Execute : ${file}`);
          try {
            const sql = fs.readFileSync(filePath, "utf8");
            await pool.query(sql);
            await pool.query("INSERT INTO migrations (name) VALUES (?)", [
              file,
            ]);
          } catch (readErr) {
            logger.error(
              `Erreur lors de l'exécution du fichier ${file}:`,
              readErr
            );
          }
        } else {
          logger.info(`Déjà migré : ${file}`);
        }
      }
    }

    logger.info("Migrations terminées avec succès.");
  } catch (err) {
    logger.error("Erreur lors de la migration :", err);
  } finally {
    await pool.end();
    process.exit(0);
  }
}

await runMigrations();
