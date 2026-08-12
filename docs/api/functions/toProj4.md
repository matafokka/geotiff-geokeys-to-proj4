[geotiff-geokeys-to-proj4](../index.md) / toProj4

# Function: toProj4()

```ts
function toProj4(geoKeys): object;
```

Converts GeoTIFF's geokeys to Proj4 string

## Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`geoKeys`

</td>
<td>

[`GeoKeys`](../interfaces/GeoKeys.md)

</td>
<td>

Geokeys

</td>
</tr>
</tbody>
</table>

## Returns

Proj4 string and associated data

### conversionParameters

```ts
conversionParameters: CoordinateConversionParameters;
```

Coordinates conversion parameters

### convertCoordinates

```ts
convertCoordinates: (coord) => ConvertedCoordinate;
```

[convertCoordinates](convertCoordinates.md) but for these exact geokeys

#### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`coord`

</td>
<td>

[`SourceCoordinate`](../interfaces/SourceCoordinate.md)

</td>
</tr>
</tbody>
</table>

#### Returns

[`ConvertedCoordinate`](../interfaces/ConvertedCoordinate.md)

### coordinatesUnits

```ts
coordinatesUnits: CoordinateUnits;
```

Coordinates units after conversion. See [CoordinateUnits](../type-aliases/CoordinateUnits.md) for more info.

### errors

```ts
errors: ConversionErrors;
```

Errors that have occurred while processing geokeys.

If no errors have occurred then this will be an empty object.

### isGCS

```ts
isGCS: boolean;
```

If `true` then geographic (either 2D or 3D) CRS is used.

### proj4

```ts
proj4: string = proj;
```

Proj4 string
