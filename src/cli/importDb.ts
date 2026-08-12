import { query } from "@/db";
import { ARGS } from "@/cli/args";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

const names = ["Table", "Data", "FKey"];

export async function importDb() {
  const scriptsPromises = names.map(async (name) => {
    const fileName = join(import.meta.dirname, "..", "sql", `PostgreSQL_${name}_Script.sql`);
    return (await readFile(fileName)).toString().replace("\uFEFF", ""); // BOM makes PostgreSQL throw a syntax error
  });

  const scripts = await Promise.all(scriptsPromises);

  await query(
    [
      `DROP SCHEMA IF EXISTS ${ARGS.schema} CASCADE;`,
      `CREATE SCHEMA ${ARGS.schema} AUTHORIZATION ${ARGS.user};`,
      `SET SCHEMA '${ARGS.schema}';`,
      ...scripts,
    ].join("\n"),
  );
}
