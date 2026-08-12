# Documentation for the library's developers

## Mappings

Mappings are generated from the EPSG database. The database is imported into the PostgreSQL server. Then the mappings
are generated.

The generation can be run by `gen:lib` and `gen:lib:*` scripts. All scripts accept the same arguments.

### Updating from a new EPSG database

Before working on the project, you need to create a database and update the mappings.

1. Set up [PostgreSQL](https://www.postgresql.org/) server *(other RDBMS are not supported)*.

1. Head over to the [EPSG website](https://epsg.org/download-dataset.html)

1. Create an account (if you don't have one).

1. Download PostgreSQL scripts.

1. Extract the downloaded scripts to `src/sql` directory.

1. See the update script's arguments by running `npm run gen:lib -- --help`.

1. Update both database and mappings by running `npm run gen:lib`.

   **Be very careful** because the update script has default arguments and it will drop the specified schema
   in the specified database.

### Updating from an existing PostgreSQL database

Run `npm run gen:lib:code`.

### Updating PostgreSQL database only

Run `npm run gen:lib:db`.
