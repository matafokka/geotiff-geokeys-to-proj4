[geotiff-geokeys-to-proj4](../index.md) / GeokeysNotSupportedErrors

# Type Alias: GeokeysNotSupportedErrors

```ts
type GeokeysNotSupportedErrors = { [K in keyof GeoKeys as `${K}NotSupported`]?: number };
```

Which geokeys are not supported. Values are geokeys' EPSG codes.
