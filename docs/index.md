<!-- DO NOT EDIT! This file has been automatically generated. -->
# geotiff-geokeys-to-proj4

This library converts GeoTIFF's geokeys to Proj4 string for correct image processing.


## Rationale

Every GeoTIFF has a Coordinate Reference System (CRS). CRS in combination with georeferencing data defines where pixel
coordinates physically are on Earth.

These CRS may be quite different from what you may find in, for example, Leaflet or OpenLayers where WGS
*(which is a CRS too)* is used by default.

To process the images, you need to convert image coordinates from one CRS to another.

[proj4js](https://github.com/proj4js/proj4js) is the simplest tool to do that. Give it an **input CRS**
(whatever GeoTIFF is using), an **output CRS** (whatever your software is using), and a **coordinate** on an image.
It'll transform coordinate from input to output CRS in a pinch.

**Note:** Proj4 calls CRS a projection which is quite confusing.

GeoTIFF encodes CRS information in **geokeys** - key-value pairs. Geokeys are really hard to handle and require external
data sources to get transformation parameters from. Here were this library comes in: it already includes all necessary
parameters and it'll convert geokeys to proj4 string.

## Features

1. Intended to be used with [geotiff.js](https://github.com/geotiffjs/geotiff.js/)
and [proj4js](https://github.com/proj4js/proj4js).

   It's basically a glue between these libraries. Can be used with the alternatives *(if any exist)*.

1. Designed for everything: frontend, backend, desktop apps, mobile apps, etc.

1. Built with modern syntax to take advantage of modern environments.

1. Can be transpiled down to ES3 *(any browser from year 2000)*.

1. Sizes at ≈1.1 Mb (≈130 Kb gzipped). Compare that to existing libraries weighting at ≈20 Mb.

## Installation

Install the whole trio: `npm i geotiff proj4 geotiff-geokeys-to-proj4`

Or just this library: `npm i geotiff-geokeys-to-proj4`.

## Example usage

This is an example of image processing with [geotiff.js](https://github.com/geotiffjs/geotiff.js/)
and [proj4js](https://github.com/proj4js/proj4js).

**Note**: In real world, you probably need to parallelize image processing. See [Tips](https://github.com/matafokka/geotiff-geokeys-to-proj4/tree/main/#tips) for more info.

```ts
import { fromBlob, type GeoTIFFImage } from "geotiff";
import proj4 from "proj4";
import {
  toProj4,
  convertCoordinates,
  type ConversionErrors,
} from "geotiff-geokeys-to-proj4";

// Example target projection. Use your own target projection.
const TARGET_PROJECTION = "WGS84";

/**
 * Processes GeoTIFF
 *
 * @param blob GeoTIFF blob
 */
export async function processGeotiff(blob: Blob) {
  // Read image
  const tiff = await fromBlob(blob);
  const imagesCount = await tiff.getImageCount();

  // Process each image
  return await Promise.all(
    Array.from({ length: imagesCount }).map(
      async (_, i) => await processImage(await tiff.getImage(i)),
    ),
  );
}

async function processImage(image: GeoTIFFImage) {
  // Get Proj4 string and meta from the geokeys
  const projObj = toProj4(image.getGeoKeys() || {});

  // Create a function that transforms coordinates from GeoTIFF's projection
  // to the target projection
  const projection = proj4(projObj.proj4, TARGET_PROJECTION);

  // Report errors that may have occurred.
  // In most cases, it's enough to just warn the user or even ignore them.
  for (const error in projObj.errors) {
    console.warn(
      "Error during reading geokeys: " +
        error +
        " - " +
        projObj.errors[error as keyof ConversionErrors],
    );
  }

  // Get necessary metadata
  const [originX, originY] = image.getOrigin();
  const [xSize, ySize] = image.getResolution();

  // Loop over each pixel row-by-row and pixel-by-pixel
  // You may prefer using another window for your specific case

  const width = image.getWidth();
  const height = image.getHeight();

  for (let y = 0; y < height; y++) {
    // This is a TypedArray where elements are bands ("colors")
    // and their elements are pixels of that color
    const rasters = await image.readRasters({ window: [0, y, width, y + 1] });

    const band0 = rasters[0];

    for (let x = 0; x < band0.length; x++) {
      // Convert pixel to source CRS coordinates by:
      //
      // 1. Multiplying current coordinates by pixel size.
      //    This results in distance from top-left corner in CRS units.
      // 2. Adding this value to top-left corner coordinates.
      //    This results in "global" coordinates in CRS units.
      //
      // This works because image is transformed by Affine Transformation
      // which preserves parallelism.
      //
      // Warning: this logic works only for the source CRS.
      // Target CRS may not preserve parallel lines, so pixel dimensions
      // will not be constant!

      const crsX = originX + x * xSize;
      const crsY = originY + y * ySize;

      // DEM or geocentric CRS only: Z coordinate is the pixel's value.
      // If you don't need heights then you may omit Z coordinate entirely.
      //
      // In practice, you may encounter DEMs with multiple bands,
      // and heights may not be encoded in the first band.
      // GeoTIFF specification doesn't limit that in any way.
      // Handle these situations as you see fit.

      const crsZ = band0[x];

      // Convert coordinates for projection
      const point = projObj.convertCoordinates({ x: crsX, y: crsY, z: crsZ });
      // Or:
      const point = convertCoordinates(
        { x: crsX, y: crsY, z: crsZ },
        projObj.conversionParameters,
      );

      // Project into the target CRS
      const projectedPoint = projection.forward(point);

      // Process projected point...
    }
  }
}
```

## Reference projects

### GeoTIFF 3D DEM Viewer

> Sorry for the bad code, I was just starting back then

[GeoTIFF 3D DEM Viewer](https://matafokka.github.io/geotiff-3d-dem-viewer) demonstrates how to read GeoTIFF files
and display them in [CesiumJS](https://cesium.com/) as 3D terrain.
Check the [source code](https://github.com/matafokka/geotiff-3d-dem-viewer) for more.

**Most important files:**

1. [File management](https://github.com/matafokka/geotiff-3d-dem-viewer/blob/master/src/components/Menu.tsx).
1. [Image loading](https://github.com/matafokka/geotiff-3d-dem-viewer/blob/master/src/etc/GeoTIFFManager.ts).

## Tips

1. Load this library with dynamic imports (`const { ... } = await import("geotiff-geokeys-to-proj-4")`).

   Even gzipped, this library is huge. If you import it using regular `import` then your users will have to wait while
   this library is loading.

   Use dynamic imports to load it on-demand. Optionally add prefetching.

1. Parallelize image processing.

   Doing processing pixel-by-pixel on a single thread is slow. Blocking the main thread in a web app is worse.

   Use web workers in a browser or threads in Node to process different parts of an image simultaneously.

## Known issues

### Arbitrary geokeys precedence

There's seemingly no document that mentions which geokeys should take precedence over which.

This library does what seems to be logical but this might be wrong.

If you know anything about it then please create an issue and tell whether current behavior is wrong (and how to fix it)
or right (so this text will be removed).

### Local depth is not supported

Local depth is not supported because reference points are needed. Following has been excluded:

1. Vertical CS: 1049 and 1050.
2. Vertical CRS: 8378 and 8897.

### Vertical datums are not supported

Vertical datums are not supported at all because mappings are needed.

If you have at least some mappings please post them in an issue, they'll be integrated into the library.

## FAQ

### How is it different from [epsg-index](https://github.com/derhuerst/epsg-index)?

`epsg-index` only provides projections definitions, GeoTIFF uses more than that.

### How does it compare to battle-proven libraries such as GDAL?

**Pros:**

1. Can be used in any JS environment like any other JS library. No need for WebAssembly or wrappers.
1. Faster than a wrapped library because there's no inter-process communication. The whole things runs synchronously.
1. Way lighter than GDAL and probably others.

**Cons:**

1. Not as widely-used as GDAL and others, so community knowledge is lacking. That's why there are
[unresolved issues](https://github.com/matafokka/geotiff-geokeys-to-proj4/tree/main/#known-issues).

### This library produces wrong results!

This library only maps geokeys to their Proj4 definitions and builds a final Proj4 string. It doesn't perform any
projections.

If you've encountered a bug please take a look at Proj4 string first and compare it to a string generated by a GIS.
If something is fundamentally wrong then it's the issue of this library. Otherwise, there's something wrong with Proj4.

Be careful when comparing results with [epsg.io](https://epsg.io). While [epsg.io](https://epsg.io) is mostly right,
it's not an official data source. For example, [epsg.io](https://epsg.io) maps CRS `21780` to `+proj=somerc`
but the right projection seems to be `+proj=omerc`.

Redundant parameters *(for example, `+a` and `+b` that are the same as `+ellps`)* are not a bug.
This behavior simplifies development, increases performance by not making useless comparisons and ensures that the right
parameters are used.

Missing `+units` is also not a bug because `convertCoordinates()` should be used for the transformation.

### The data is outdated!

Please request an update by creating an issue.

But EPSG rarely introduces major changes so even 1 year old data should be just fine.

### Why the data is outdated though?

Because [epsg.org](https://epsg.org) doesn't provide public access to their database.

You need to register an account to download the database.

There's no API to do so.

Because client's UI and backend's endpoints might change in the future, there's no point in automating the updates.

### What data sources are used?

1. **Main source:** [official EPSG database](https://epsg.org).

1. [Community data](https://github.com/matafokka/geotiff-geokeys-to-proj4/tree/main/EPSG/data/AdditionalCRS.js).

1. [epsg.io](https://epsg.io) is used to selectively check if Proj4 strings are correct.

## Contributing

You can contribute by:

1. Solving [known issues](https://github.com/matafokka/geotiff-geokeys-to-proj4/tree/main/#known-issues).
1. Reporting bugs.
1. Providing suggestions.
1. Everything else that comes to mind.

Thank you for your support!

## Related projects

1. [geotiff.js](https://github.com/geotiffjs/geotiff.js/) is a library that can read GeoTIFF images.

1. [proj4js](https://github.com/proj4js/proj4js) is a port of Proj4 to JS.

1. [epsg-index](https://github.com/derhuerst/epsg-index) is a machine-readable index of all EPSG coordinate reference
systems.

1. [epsg.io](https://epsg.io) is a website that provides the EPSG data and an API to access it.

1. [geokeys-to-proj4js](https://github.com/GeoTIFF/geokeys-to-proj4js) is an unfinished and probably abandoned project
with the same goal.
