# geotiff-geokeys-to-proj4 beta

This library converts geokeys embedded in GeoTIFF file to Proj4 string, so you can georeference your images. Intended to be used with [geotiff.js](https://github.com/geotiffjs/geotiff.js/) and [proj4js](https://github.com/proj4js/proj4js), it's basically a glue between these libraries, but it can be used with alternatives.

Designed for both frontend and backend. Supports ES3+ environments *(any browser from 2000 year)*. Size is ~1 Mb *(despite what npm says, it counts both sources and bundle)*.

Grab it from npm: `npm install geotiff-geokeys-to-proj4`.

### Looking for maintainers!

This library needs monthly database updates. Please, see [this section](#manually-updating-from-epsg-database) on how to do it. If you want to help, please, create an issue to let me know that we've got a maintainer, and submit pull requests with the updated files.

# [Docs](https://matafokka.github.io/geotiff-geokeys-to-proj4/module-geokeysToProj4.html)

# Usage

## Importing this library

In **Node.js** or with **bundler**: `const geokeysToProj4 = require("geotiff-geokeys-to-proj4");`

In a **browser**: `<script src="path/to/main-dist.js"></script>` - after that you'll have `geokeysToProj4` global variable.

If you're using **global transforms**, consider importing sources: `const geokeysToProj4 = require("geotiff-geokeys-to-proj4/main");` or `<script src="path/to/main.js"></script>`

## General usage

In general, you want to:

1. Read geokeys.
1. Pass them to `geokeysToProj4.toProj4()` (let's call returned object `projObj`).
1. Pass `projObj.proj4` (which is Proj4 string) to proj4js.
1. Convert pixel coordinates to CRS coordinates (let's call them `crsX` and `crsY`).
1. Convert CRS coordinates to usable units *(in most cases, meters, but GeoTIFF allows speed, angular speed, and scale)*: `geokeysToProj4(crsX, crsY, projObj.coordinatesConversionParameters)`.
1. The returned object will contain x and y coordinates which are ready to be projected with proj4js. So project them.

Of course, you can alter this workflow to use this library with any other (presumably, server-side) software.

Let's demonstrate everything from start to finish on an example with [geotiff.js](https://github.com/geotiffjs/geotiff.js/) and [proj4js](https://github.com/proj4js/proj4js):

```js
// Import all the stuff
const geotiff = require("geotiff"); // geotiff.js
const proj4 = require("proj4"); // proj4js
const geokeysToProj4 = require("geotiff-geokeys-to-proj4"); // This library

// Let's wrap our example in a function
async function workWithGeoTIFF(blob) {
	// Read image. See geotiff.js docs on what all of that means.
	let tiff = await geotiff.fromBlob(blob); // Read blob
	let imageCount = await tiff.getImageCount(); // Get image count

	// Work with each image in GeoTIFF
	for (let i = 0; i < imageCount; i++) {
		let image = await tiff.getImage(i); // Get image instance
		let geoKeys = image.getGeoKeys(); // Get geokeys
		let projObj = geokeysToProj4.toProj4(geoKeys); // Convert geokeys to proj4 string
		// The function above returns an object where proj4 property is a Proj4 string and coordinatesConversionParameters is conversion parameters which we'll use later
		let projection = proj4(projObj.proj4, "WGS84"); // Project our GeoTIFF to WGS84

		// Now you may want to deal with errors. Unfortunately, errors are unavoidable, but in most cases, you can warn the user or just continue on.
		// All occurred errors will be in projObj.errors object. See the docs for more information.

		// Work with pixels
		// For looping over pixels
		let maxX = image.getWidth(), maxY = image.getHeight();
		// Pixel dimensions for converting image coordinates to CRS coordinates
		let origin = image.getOrigin(), resolution = image.getResolution(), xSize = resolution[0],
			ySize = resolution[1];

		for (let y = 0; y < maxY; y++) {
			// Read one row of pixels. Easier to deal with coordinates, takes less RAM.
			let raster = image.readRasters({window: [0, y, maxX, maxY]});
			let color0 = raster[0]; // Raster is a TypedArray where elements are colors and their elements are pixel values of that color
			let x = 0;

			for (let pixel of color0) {
				// Convert current pixel's coordinates to CRS by:
				// 1. Multiplying current coordinates by pixel size which will result in distance from top-left corner in CRS units.
				// 2. Adding this value to top-left corner coordinates which will result in "global" coordinates in CRS units.
				let crsX = origin[0] + x * xSize, crsY = origin[1] + y * ySize;
				x++; // Don't forget to increment x

				// Check if coordinates are already in meters (or other "standard" units). If not, convert them.
				let point;
				if (projObj.shouldConvertCoordinates)
					point = geokeysToProj4.convertCoordinates(crsX, crsY, projObj.coordinatesConversionParameters);
				else
					point = {x: crsX, y: crsY};
				// Or just multiply manually to speed up execution by removing function calls:
				point = {
					x: crsX * projObj.coordinatesConversionParameters.x,
					y: crsX * projObj.coordinatesConversionParameters.y,
				}

				let projectedPoint = projection.forward(point); // Project these coordinates
				// Work with projected coordinates
				// ...
			}
		}
	}
}
```

# Known issues

Only like a third of EPSG datums is mapped to +towgs transforms. Other datums are fine to use, but you'll lose some degree of precision.

I don't know which geokeys should take precedence over which. I did what seems to be logical, but I might be wrong. If you know anything about it, please, create an issue and describe whether I'm wrong (and how to fix it) or right (so I'll remove this text).

# Manually updating from EPSG database

This section is intended for the maintainers, but since there're no maintainers for now, it might be useful for the regular users.

Unfortunately, [epsg.org](https://epsg.org) doesn't provide public access to their database. You need to register an account, and only then you'll be able to download database. Since all of that is for the users and not for bots, both client and server might change in the future, so there's no point in writing self-update script.

To update:

1. Clone this repo *(or navigate to `node_modules` if you want to use it from there, though, you'll lose all changes when you'll run `npm install` on your project).*
1. Run `npm install` on cloned repo.
1. Set up [PostgreSQL](https://www.postgresql.org/) server *(other RDBMS are not supported)*. Default configuration should be fine, just create a user and a database for that user.
1. Head over to [here](https://epsg.org/download-dataset.html), create an account (if you don't have one) and download PostgreSQL scripts.
1. Extract downloaded scripts to `postgres_prep` directory.
1. Run `npm run-script update-all` to update everything and rebuilds the project. See arguments below. **Warning: this script utilises `epsg` schema and will erase it completely! It's hardcoded and can't be changed.** To avoid data loss, create a separate database solely to run this script.
1. **For maintainers:** commit the whole project to the GitHub and create a pull request.

There're actually two scripts: `update-all` which has been described above and `update-existing` which will update project files from existing database. Both of these scripts accepts following arguments:

```
--host          - PostgreSQL host                      - Defaults to "localhost"
--port          - PostgreSQL port                      - Defaults to "5432"
--database      - Database containing "epsg" schema    - Defaults to "postgres"
--user          - PostgreSQL database user             - Defaults to "user"
--password      - Password for the user                - Defaults to "12345"
```

Arguments passed to npm scripts in following manner: `npm run-script [script name] -- [script arguments]`, for example: `npm run-script update-all -- --user myuser --password mypassword`. Note the `--` separator, it should always present when using this library's scripts.

# FAQ

## Why beta?

Because this library is new. I'll wait for a couple of months to see if there're any bugs, fix them and release a finished version.

## How is it different from [epsg-index](https://github.com/derhuerst/epsg-index)?

epsg-index only provides projections definitions, GeoTIFF uses more than that. Actually, this library uses epsg-index under-the-hood!

## How does it compare to already existing and battle-proven libraries such as GDAL?

Pros:

1. Can be used in a browser. There're no alternatives for now except for compiling another library to WebAssembly. Even then this library wins because it can run in ES3 environment (any browser from 2000 year).
1. Easier to use in Node since this library is written in pure JS. Non-JS libraries requires a wrapper or use of CLI.

Cons:

1. Libraries such as GDAL are, in fact, already battle-proven. Since this library is new, I'm the sole developer for now, and I'm not a cartographer, there might be some bugs.
1. Since there're no maintainers to update database, more popular libraries 

**To summarize:** use this library for a frontend, but existing libraries with a wrapper might be better for a backend;

## This library produces wrong results!

This library only maps geokeys to their Proj4 definitions and builds a final Proj4 string. It doesn't perform any projections.

If you've encountered a bug, please, take a look at Proj4 string first and compare it to one generated by a professional GIS. If something is fundamentally wrong, it's the issue of this library. Otherwise, there's something wrong with Proj4.

Please, don't report redundant parameters *(for example, `+a` and `+b` that are the same as `+ellps` provides)* as a bug. This behavior simplifies development, increases performance by not making useless comparisons and ensures that the right parameters are used.

Missing `+units` is also not a bug, you're converting coordinates to meters by using `geokeysToProj4.convertCoordinates()`.

# Contributing

You can contribute by solving [described issues](#known-issues) or by [maintaining the database](#looking-for-maintainers).

# Related projects

1. [geotiff.js](https://github.com/geotiffjs/geotiff.js/) is a library that can read GeoTIFF images.
1. [proj4js](https://github.com/proj4js/proj4js) is a port of Proj4 to JS.
1. [epsg-index](https://github.com/derhuerst/epsg-index) is a machine-readable index of all EPSG coordinate systems, used by this library.
1. [epsg.io](https://epsg.io) is a website that provides all the EPSG stuff mostly in human-readable form, and an API to access it. Used by this library with [epsg-index](https://github.com/derhuerst/epsg-index) to grab projections definitions.
1. [geokeys-to-proj4js](https://github.com/GeoTIFF/geokeys-to-proj4js) is a project with the same goal but far from to be finished, and looks abandoned.