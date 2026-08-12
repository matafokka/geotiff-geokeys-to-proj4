[geotiff-geokeys-to-proj4](../index.md) / ConversionErrors

# Interface: ConversionErrors

Errors that have occurred during conversion.

If an error has not occurred, it won't be present in this object.

**How to process these errors:**

1. If it's your program's user's GeoTIFF then show a warning.
1. If it's your GeoTIFF then fix it.
1. If you're sure that file is fine then please create an issue at
https://github.com/matafokka/geotiff-geokeys-to-proj4

## Extends

- [`GeokeysNotSupportedErrors`](../type-aliases/GeokeysNotSupportedErrors.md)

## Properties

### bothGCSAndPCSAreSet?

```ts
optional bothGCSAndPCSAreSet?: boolean;
```

`true` when the specified CRS is both geodetic and projected, i.e. when both conditions are met:

1. `GeodeticCRSGeoKey` and/or `GeographicTypeGeoKey` is set.
1. `ProjectedCRSGeoKey` and/or `ProjectedCSTypeGeoKey` is set.

In this case, `GeographicTypeGeoKey` is used.

The cause of this error is invalid geokeys.

***

### conversionNotSupported?

```ts
optional conversionNotSupported?: number;
```

Conversion specified in `ProjectionGeoKey` is not supported by this library.

Value is EPSG conversion code.

***

### coordinateTransformationNotSupported?

```ts
optional coordinateTransformationNotSupported?: number;
```

Transformation specified in `ProjMethodGeoKey` or `ProjCoordTransGeoKey` is not supported by this library.

Value is the projection's code.

See http://geotiff.maptools.org/spec/geotiff6.html#6.3.3.3 for more information.

***

### CRSNotSupported?

```ts
optional CRSNotSupported?: number;
```

EPSG code of the specified CRS that either:

1. Can't be represented as Proj4 string.
2. Is new and hasn't been added to this library.

***

### EllipsoidGeoKeyNotSupported?

```ts
optional EllipsoidGeoKeyNotSupported?: number;
```

#### Inherited from

[`GeoKeys`](GeoKeys.md).[`EllipsoidGeoKey`](GeoKeys.md#ellipsoidgeokey)

***

### EllipsoidInvFlatteningGeoKeyNotSupported?

```ts
optional EllipsoidInvFlatteningGeoKeyNotSupported?: number;
```

#### Inherited from

[`GeoKeys`](GeoKeys.md).[`EllipsoidInvFlatteningGeoKey`](GeoKeys.md#ellipsoidinvflatteninggeokey)

***

### EllipsoidSemiMajorAxisGeoKeyNotSupported?

```ts
optional EllipsoidSemiMajorAxisGeoKeyNotSupported?: number;
```

#### Inherited from

[`GeoKeys`](GeoKeys.md).[`EllipsoidSemiMajorAxisGeoKey`](GeoKeys.md#ellipsoidsemimajoraxisgeokey)

***

### EllipsoidSemiMinorAxisGeoKeyNotSupported?

```ts
optional EllipsoidSemiMinorAxisGeoKeyNotSupported?: number;
```

#### Inherited from

[`GeoKeys`](GeoKeys.md).[`EllipsoidSemiMinorAxisGeoKey`](GeoKeys.md#ellipsoidsemiminoraxisgeokey)

***

### GeodeticCRSGeoKeyNotSupported?

```ts
optional GeodeticCRSGeoKeyNotSupported?: number;
```

#### Inherited from

[`GeoKeys`](GeoKeys.md).[`GeodeticCRSGeoKey`](GeoKeys.md#geodeticcrsgeokey)

***

### GeodeticDatumGeoKeyNotSupported?

```ts
optional GeodeticDatumGeoKeyNotSupported?: number;
```

#### Inherited from

[`GeoKeys`](GeoKeys.md).[`GeodeticDatumGeoKey`](GeoKeys.md#geodeticdatumgeokey)

***

### GeogAngularUnitsGeoKeyNotSupported?

```ts
optional GeogAngularUnitsGeoKeyNotSupported?: number;
```

#### Inherited from

[`GeoKeys`](GeoKeys.md).[`GeogAngularUnitsGeoKey`](GeoKeys.md#geogangularunitsgeokey)

***

### GeogAngularUnitSizeGeoKeyNotDefined?

```ts
optional GeogAngularUnitSizeGeoKeyNotDefined?: boolean;
```

Geokey `GeogAngularUnitsGeoKey` is set to user-defined but `GeogAngularUnitSizeGeoKey` is not specified.

In this case, it is assumed that every other key using this key is in degrees.

***

### GeogAngularUnitSizeGeoKeyNotSupported?

```ts
optional GeogAngularUnitSizeGeoKeyNotSupported?: number;
```

#### Inherited from

[`GeoKeys`](GeoKeys.md).[`GeogAngularUnitSizeGeoKey`](GeoKeys.md#geogangularunitsizegeokey)

***

### GeogEllipsoidGeoKeyNotSupported?

```ts
optional GeogEllipsoidGeoKeyNotSupported?: number;
```

#### Inherited from

[`GeoKeys`](GeoKeys.md).[`GeogEllipsoidGeoKey`](GeoKeys.md#geogellipsoidgeokey)

***

### GeogGeodeticDatumGeoKeyNotSupported?

```ts
optional GeogGeodeticDatumGeoKeyNotSupported?: number;
```

#### Inherited from

[`GeoKeys`](GeoKeys.md).[`GeogGeodeticDatumGeoKey`](GeoKeys.md#geoggeodeticdatumgeokey)

***

### GeogInvFlatteningGeoKeyNotSupported?

```ts
optional GeogInvFlatteningGeoKeyNotSupported?: number;
```

#### Inherited from

[`GeoKeys`](GeoKeys.md).[`GeogInvFlatteningGeoKey`](GeoKeys.md#geoginvflatteninggeokey)

***

### GeogLinearUnitsGeoKeyNotSupported?

```ts
optional GeogLinearUnitsGeoKeyNotSupported?: number;
```

#### Inherited from

[`GeoKeys`](GeoKeys.md).[`GeogLinearUnitsGeoKey`](GeoKeys.md#geoglinearunitsgeokey)

***

### GeogLinearUnitSizeGeoKeyNotDefined?

```ts
optional GeogLinearUnitSizeGeoKeyNotDefined?: boolean;
```

Geokey `GeogLinearUnitsGeoKey` is set to user-defined but `GeogLinearUnitSizeGeoKey` is not specified.

In this case, it is assumed that every other key using this key is in meters.

***

### GeogLinearUnitSizeGeoKeyNotSupported?

```ts
optional GeogLinearUnitSizeGeoKeyNotSupported?: number;
```

#### Inherited from

[`GeoKeys`](GeoKeys.md).[`GeogLinearUnitSizeGeoKey`](GeoKeys.md#geoglinearunitsizegeokey)

***

### GeogPrimeMeridianGeoKeyNotSupported?

```ts
optional GeogPrimeMeridianGeoKeyNotSupported?: number;
```

#### Inherited from

[`GeoKeys`](GeoKeys.md).[`GeogPrimeMeridianGeoKey`](GeoKeys.md#geogprimemeridiangeokey)

***

### GeogPrimeMeridianLongGeoKeyNotSupported?

```ts
optional GeogPrimeMeridianLongGeoKeyNotSupported?: number;
```

#### Inherited from

[`GeoKeys`](GeoKeys.md).[`GeogPrimeMeridianLongGeoKey`](GeoKeys.md#geogprimemeridianlonggeokey)

***

### GeographicTypeGeoKeyNotSupported?

```ts
optional GeographicTypeGeoKeyNotSupported?: number;
```

#### Inherited from

[`GeoKeys`](GeoKeys.md).[`GeographicTypeGeoKey`](GeoKeys.md#geographictypegeokey)

***

### GeogSemiMajorAxisGeoKeyNotSupported?

```ts
optional GeogSemiMajorAxisGeoKeyNotSupported?: number;
```

#### Inherited from

[`GeoKeys`](GeoKeys.md).[`GeogSemiMajorAxisGeoKey`](GeoKeys.md#geogsemimajoraxisgeokey)

***

### GeogSemiMinorAxisGeoKeyNotSupported?

```ts
optional GeogSemiMinorAxisGeoKeyNotSupported?: number;
```

#### Inherited from

[`GeoKeys`](GeoKeys.md).[`GeogSemiMinorAxisGeoKey`](GeoKeys.md#geogsemiminoraxisgeokey)

***

### GeogTOWGS84GeoKeyNotSupported?

```ts
optional GeogTOWGS84GeoKeyNotSupported?: number;
```

#### Inherited from

[`GeoKeys`](GeoKeys.md).[`GeogTOWGS84GeoKey`](GeoKeys.md#geogtowgs84geokey)

***

### PrimeMeridianGeoKeyNotSupported?

```ts
optional PrimeMeridianGeoKeyNotSupported?: number;
```

#### Inherited from

[`GeoKeys`](GeoKeys.md).[`PrimeMeridianGeoKey`](GeoKeys.md#primemeridiangeokey)

***

### PrimeMeridianLongitudeGeoKeyNotSupported?

```ts
optional PrimeMeridianLongitudeGeoKeyNotSupported?: number;
```

#### Inherited from

[`GeoKeys`](GeoKeys.md).[`PrimeMeridianLongitudeGeoKey`](GeoKeys.md#primemeridianlongitudegeokey)

***

### ProjAzimuthAngleGeoKeyNotSupported?

```ts
optional ProjAzimuthAngleGeoKeyNotSupported?: number;
```

#### Inherited from

[`GeoKeys`](GeoKeys.md).[`ProjAzimuthAngleGeoKey`](GeoKeys.md#projazimuthanglegeokey)

***

### ProjCenterEastingGeoKeyNotSupported?

```ts
optional ProjCenterEastingGeoKeyNotSupported?: number;
```

#### Inherited from

[`GeoKeys`](GeoKeys.md).[`ProjCenterEastingGeoKey`](GeoKeys.md#projcentereastinggeokey)

***

### ProjCenterLatGeoKeyNotSupported?

```ts
optional ProjCenterLatGeoKeyNotSupported?: number;
```

#### Inherited from

[`GeoKeys`](GeoKeys.md).[`ProjCenterLatGeoKey`](GeoKeys.md#projcenterlatgeokey)

***

### ProjCenterLongGeoKeyNotSupported?

```ts
optional ProjCenterLongGeoKeyNotSupported?: number;
```

#### Inherited from

[`GeoKeys`](GeoKeys.md).[`ProjCenterLongGeoKey`](GeoKeys.md#projcenterlonggeokey)

***

### ProjCenterNorthingGeoKeyNotSupported?

```ts
optional ProjCenterNorthingGeoKeyNotSupported?: number;
```

#### Inherited from

[`GeoKeys`](GeoKeys.md).[`ProjCenterNorthingGeoKey`](GeoKeys.md#projcenternorthinggeokey)

***

### ProjCoordTransGeoKeyNotSupported?

```ts
optional ProjCoordTransGeoKeyNotSupported?: number;
```

#### Inherited from

[`GeoKeys`](GeoKeys.md).[`ProjCoordTransGeoKey`](GeoKeys.md#projcoordtransgeokey)

***

### ProjectedCRSGeoKeyNotSupported?

```ts
optional ProjectedCRSGeoKeyNotSupported?: number;
```

#### Inherited from

[`GeoKeys`](GeoKeys.md).[`ProjectedCRSGeoKey`](GeoKeys.md#projectedcrsgeokey)

***

### ProjectedCSTypeGeoKeyNotSupported?

```ts
optional ProjectedCSTypeGeoKeyNotSupported?: number;
```

#### Inherited from

[`GeoKeys`](GeoKeys.md).[`ProjectedCSTypeGeoKey`](GeoKeys.md#projectedcstypegeokey)

***

### ProjectionGeoKeyNotSupported?

```ts
optional ProjectionGeoKeyNotSupported?: number;
```

#### Inherited from

[`GeoKeys`](GeoKeys.md).[`ProjectionGeoKey`](GeoKeys.md#projectiongeokey)

***

### ProjFalseEastingGeoKeyNotSupported?

```ts
optional ProjFalseEastingGeoKeyNotSupported?: number;
```

#### Inherited from

[`GeoKeys`](GeoKeys.md).[`ProjFalseEastingGeoKey`](GeoKeys.md#projfalseeastinggeokey)

***

### ProjFalseNorthingGeoKeyNotSupported?

```ts
optional ProjFalseNorthingGeoKeyNotSupported?: number;
```

#### Inherited from

[`GeoKeys`](GeoKeys.md).[`ProjFalseNorthingGeoKey`](GeoKeys.md#projfalsenorthinggeokey)

***

### ProjFalseOriginEastingGeoKeyNotSupported?

```ts
optional ProjFalseOriginEastingGeoKeyNotSupported?: number;
```

#### Inherited from

[`GeoKeys`](GeoKeys.md).[`ProjFalseOriginEastingGeoKey`](GeoKeys.md#projfalseorigineastinggeokey)

***

### ProjFalseOriginLatGeoKeyNotSupported?

```ts
optional ProjFalseOriginLatGeoKeyNotSupported?: number;
```

#### Inherited from

[`GeoKeys`](GeoKeys.md).[`ProjFalseOriginLatGeoKey`](GeoKeys.md#projfalseoriginlatgeokey)

***

### ProjFalseOriginLongGeoKeyNotSupported?

```ts
optional ProjFalseOriginLongGeoKeyNotSupported?: number;
```

#### Inherited from

[`GeoKeys`](GeoKeys.md).[`ProjFalseOriginLongGeoKey`](GeoKeys.md#projfalseoriginlonggeokey)

***

### ProjFalseOriginNorthingGeoKeyNotSupported?

```ts
optional ProjFalseOriginNorthingGeoKeyNotSupported?: number;
```

#### Inherited from

[`GeoKeys`](GeoKeys.md).[`ProjFalseOriginNorthingGeoKey`](GeoKeys.md#projfalseoriginnorthinggeokey)

***

### ProjLinearUnitsGeoKeyNotSupported?

```ts
optional ProjLinearUnitsGeoKeyNotSupported?: number;
```

#### Inherited from

[`GeoKeys`](GeoKeys.md).[`ProjLinearUnitsGeoKey`](GeoKeys.md#projlinearunitsgeokey)

***

### ProjLinearUnitSizeGeoKeyNotDefined?

```ts
optional ProjLinearUnitSizeGeoKeyNotDefined?: boolean;
```

Geokey `ProjLinearUnitsGeoKey` is set to user-defined but `ProjLinearUnitSizeGeoKey` is not specified.

In this case, it is assumed that every other key using this key is in meters.

***

### ProjLinearUnitSizeGeoKeyNotSupported?

```ts
optional ProjLinearUnitSizeGeoKeyNotSupported?: number;
```

#### Inherited from

[`GeoKeys`](GeoKeys.md).[`ProjLinearUnitSizeGeoKey`](GeoKeys.md#projlinearunitsizegeokey)

***

### ProjMethodGeoKeyNotSupported?

```ts
optional ProjMethodGeoKeyNotSupported?: number;
```

#### Inherited from

[`GeoKeys`](GeoKeys.md).[`ProjMethodGeoKey`](GeoKeys.md#projmethodgeokey)

***

### ProjNatOriginLatGeoKeyNotSupported?

```ts
optional ProjNatOriginLatGeoKeyNotSupported?: number;
```

#### Inherited from

[`GeoKeys`](GeoKeys.md).[`ProjNatOriginLatGeoKey`](GeoKeys.md#projnatoriginlatgeokey)

***

### ProjNatOriginLongGeoKeyNotSupported?

```ts
optional ProjNatOriginLongGeoKeyNotSupported?: number;
```

#### Inherited from

[`GeoKeys`](GeoKeys.md).[`ProjNatOriginLongGeoKey`](GeoKeys.md#projnatoriginlonggeokey)

***

### ProjScaleAtCenterGeoKeyNotSupported?

```ts
optional ProjScaleAtCenterGeoKeyNotSupported?: number;
```

#### Inherited from

[`GeoKeys`](GeoKeys.md).[`ProjScaleAtCenterGeoKey`](GeoKeys.md#projscaleatcentergeokey)

***

### ProjScaleAtNatOriginGeoKeyNotSupported?

```ts
optional ProjScaleAtNatOriginGeoKeyNotSupported?: number;
```

#### Inherited from

[`GeoKeys`](GeoKeys.md).[`ProjScaleAtNatOriginGeoKey`](GeoKeys.md#projscaleatnatorigingeokey)

***

### ProjStdParallel1GeoKeyNotSupported?

```ts
optional ProjStdParallel1GeoKeyNotSupported?: number;
```

#### Inherited from

[`GeoKeys`](GeoKeys.md).[`ProjStdParallel1GeoKey`](GeoKeys.md#projstdparallel1geokey)

***

### ProjStdParallel2GeoKeyNotSupported?

```ts
optional ProjStdParallel2GeoKeyNotSupported?: number;
```

#### Inherited from

[`GeoKeys`](GeoKeys.md).[`ProjStdParallel2GeoKey`](GeoKeys.md#projstdparallel2geokey)

***

### ProjStraightVertPoleLongGeoKeyNotSupported?

```ts
optional ProjStraightVertPoleLongGeoKeyNotSupported?: number;
```

#### Inherited from

[`GeoKeys`](GeoKeys.md).[`ProjStraightVertPoleLongGeoKey`](GeoKeys.md#projstraightvertpolelonggeokey)

***

### verticalCsNotSupported?

```ts
optional verticalCsNotSupported?: number;
```

Vertical CS specified in `VerticalGeoKey` or `VerticalCSTypeGeoKey` is not supported by this library.

Value is EPSG CS code.

***

### VerticalCSTypeGeoKeyNotSupported?

```ts
optional VerticalCSTypeGeoKeyNotSupported?: number;
```

#### Inherited from

[`GeoKeys`](GeoKeys.md).[`VerticalCSTypeGeoKey`](GeoKeys.md#verticalcstypegeokey)

***

### verticalCsUnitsNotSupported?

```ts
optional verticalCsUnitsNotSupported?: number;
```

Vertical CS specified in `VerticalUnitsGeoKey` is not supported by this library.

Value is EPSG units of measure code.

***

### VerticalDatumGeoKeyNotSupported?

```ts
optional VerticalDatumGeoKeyNotSupported?: number;
```

#### Inherited from

[`GeoKeys`](GeoKeys.md).[`VerticalDatumGeoKey`](GeoKeys.md#verticaldatumgeokey)

***

### verticalDatumsNotSupported?

```ts
optional verticalDatumsNotSupported?: number;
```

Vertical datums are not supported by this library.

This error is reported when vertical CRS is user-defined and `VerticalDatumGeoKey` is set.

Value is EPSG datum code.

***

### VerticalGeoKeyNotSupported?

```ts
optional VerticalGeoKeyNotSupported?: number;
```

#### Inherited from

[`GeoKeys`](GeoKeys.md).[`VerticalGeoKey`](GeoKeys.md#verticalgeokey)

***

### VerticalUnitsGeoKeyNotSupported?

```ts
optional VerticalUnitsGeoKeyNotSupported?: number;
```

#### Inherited from

[`GeoKeys`](GeoKeys.md).[`VerticalUnitsGeoKey`](GeoKeys.md#verticalunitsgeokey)
