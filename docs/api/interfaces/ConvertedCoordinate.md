[geotiff-geokeys-to-proj4](../index.md) / ConvertedCoordinate

# Interface: ConvertedCoordinate

## Properties

### x

```ts
x: number;
```

X coordinate (coordinate of a first axis of CRS) of a point

***

### y

```ts
y: number;
```

Y coordinate (coordinate of a second axis of CRS) of a point

***

### z

```ts
z: number;
```

Z coordinate (coordinate of a third axis of CRS) of a point, i.e. transformed pixel value. Always points up.

If source coordinate doesn't have Z axis then this will be 0.
