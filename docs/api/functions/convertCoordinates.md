[geotiff-geokeys-to-proj4](../index.md) / convertCoordinates

# Function: convertCoordinates()

```ts
function convertCoordinates(coord, parameters): ConvertedCoordinate;
```

Converts given coordinates to the coordinates accepted by Proj4.

Accepts only CRS coordinates, not pixel coordinates!

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

`coord`

</td>
<td>

[`SourceCoordinate`](../interfaces/SourceCoordinate.md)

</td>
<td>

Source coordinate

</td>
</tr>
<tr>
<td>

`parameters`

</td>
<td>

[`CoordinateConversionParameters`](../interfaces/CoordinateConversionParameters.md)

</td>
<td>

Conversion parameters

</td>
</tr>
</tbody>
</table>

## Returns

[`ConvertedCoordinate`](../interfaces/ConvertedCoordinate.md)

Converted coordinates
