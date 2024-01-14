# Meta

This directory contains scripts that will fetch data from EPSG database. Scripts can be ran both standalone or in a web worker.

To run all scripts, run `npm run-script update-existing` script. To see help on arguments, run `npm run-script update-existing -- -h` *(**note:** when running npm scripts, arguments should always be separated from the script name by `--`)*.

Each entity is being built into proj4 string with exception of EllipsoidalCS which contains coordinates conversion parameters that can't be passed to proj4. User needs to convert coordinates through a special function before using them.

Strings will be merged in the client.

`data` directory contains fetched entities.

# Why scripts are not documented?

Because I would need to copy half of GeoTIFF and GML docs. Don't even ask, just accept everything as it is.

# What's with objects' names and values?

To save up space, keys are reduced to one letter, and from values often stripped parameters' names or "+" signs. Sorry about that, we're trying to reduce library size here.

# Why strings?

We could split proj4 strings to object, but, I believe, objects uses more RAM than string, though, files will take less space. Since there's a lot of data to store, we'll reduce RAM usage by using strings and parsing them in client.

Anyway, there shouldn't be much difference between the two, and I already encoded everything in strings :p