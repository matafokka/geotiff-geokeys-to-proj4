[geotiff-geokeys-to-proj4](../index.md) / CoordinateUnits

# Type Alias: CoordinateUnits

```ts
type CoordinateUnits = 
  | "metre"
  | "metre per second"
  | "second"
  | "radian"
  | "radian per second"
  | "scale"
  | "scale per second"
  | "degree";
```

Base units types.

EPSG defines speed, angular speed and scale as linear units, and GeoTIFF relies on EPSG.

There's a chance that coordinates will represent something's different from distance (in case of PCS).

**Notes:**

1. GCS will always use degrees.
1. If PCS uses angles then radians will be used.
