const HELP = `
Usage: update <option 1> <option 1 value> <option 2> <option2 value> ...

Updates PostgreSQL database and generates code from the EPSG SQL scripts

Prerequisites:
  1. Set up PostgreSQL. Other RDBMS are not supported.
  2. Download PostgreSQL database (archive with scripts) from https://epsg-registry.org.
  3. Copy the scripts to the "src/sql" directory.
  4. Run this script.

WARNING: Don't forward untrusted input to the arguments!

Options:
  -h, --help           Show this help and exit
  --update=            What to update (default: "all")
      <all | db | code>
  --generate-code-only  Only generate code from existing database, don't do anything else
  --host                PostgreSQL host (default: "localhost")
  --port                PostgreSQL port (default: "5432")
  --database            PostgreSQL database (default: "postgres")
  --schema              PostgreSQL schema (default: "epsg")
  --user                PostgreSQL database user (default: "user")
  --password            Password for the user (default: "12345")

Examples:
  update --user some-user password 12345                Import EPSG database and generate code
  update --update db --user some-user password 12345    Import EPSG database only
  update --update code --user some-user password 12345  Generate code only
`;

export function printHelp() {
  console.log(HELP);
}
