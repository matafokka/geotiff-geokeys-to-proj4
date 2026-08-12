import { Client, Pool } from "pg";
import { ARGS } from "@/cli/args";

const pool = new Pool(ARGS);

process.on("beforeExit", () => pool.end());

function createQueryFn(client: Client | Pool) {
  return async <T>(query: string, values?: string[]) => (await client.query(query, values)).rows as T[];
}

/** Queries the database */
export const query = createQueryFn(pool);

/**
 * Runs database transaction
 *
 * @param executor Function that executes the transaction. Must use the provided `query` function
 * instead of {@link query}.
 */
export async function transaction(executor: (query: ReturnType<typeof createQueryFn>) => void) {
  const client = await pool.connect();
  const query = createQueryFn(client);

  try {
    await query("BEGIN");
    await executor(query);
    await query("COMMIT");
  } catch (e) {
    await query("ROLLBACK");
    throw e;
  } finally {
    client.release();
  }
}
