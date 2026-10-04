# Documentation for the library's developers

## Backlog

The features backlog is located here: https://github.com/users/matafokka/projects/1/views/1

The backlog only tracks features. For bugs, use the [Issues](https://github.com/matafokka/geotiff-geokeys-to-proj4/issues).

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

1. Extract the downloaded scripts to `src/sql/EPSG` directory.

1. See the update script's arguments by running `npm run gen:lib -- --help`.

1. Update both database and mappings by running `npm run gen:lib`.

   **Be very careful** because the update script has default arguments and it will drop the specified schema
   in the specified database.

### Updating from an existing PostgreSQL database

Run `npm run gen:lib:code`.

### Updating PostgreSQL database only

Run `npm run gen:lib:db`.

## Testing and benchmarking

Both are handled by Vitest.

Both can be run by `npm run test` and `npm run bench` commands respectively.

Both are co-located with the code and live inside `__tests__` directory.

The benchmarks are mainly to check if performance optimizations really produce the desired effect. It is best to run
only one benchmark as to quickly preview the performance changes.
