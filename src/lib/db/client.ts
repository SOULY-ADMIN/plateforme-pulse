import postgres from "postgres";

console.log("DATABASE_URL exists", !!process.env.DATABASE_URL);

const databaseUrl = process.env.DATABASE_URL?.trim();

function isPlaceholderDatabaseUrl(value: string) {
  const lower = value.toLowerCase();
  return (
    lower.includes("placeholder") ||
    lower.includes("user:password") ||
    lower.includes("localhost:5432/pulse")
  );
}

export const isDatabaseConfigured = Boolean(databaseUrl && !isPlaceholderDatabaseUrl(databaseUrl));

export const sql = isDatabaseConfigured && databaseUrl
  ? (console.log("Initializing SQL client"),
    postgres(databaseUrl, {
        connect_timeout: 5,
        idle_timeout: 20,
        max: 5,
        ssl: databaseUrl.includes("localhost") || databaseUrl.includes("127.0.0.1") ? false : "require"
      }))
  : null;
