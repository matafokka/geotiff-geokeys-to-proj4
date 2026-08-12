# geotiff-geokeys-to-proj4

## Interfaces

| Interface | Description |
| ------ | ------ |
| [ConversionErrors](interfaces/ConversionErrors.md) | Errors that have occurred during conversion. |
| [ConvertedCoordinate](interfaces/ConvertedCoordinate.md) | - |
| [CoordinateConversionParameters](interfaces/CoordinateConversionParameters.md) | Parameters to pass to [convertCoordinates](functions/convertCoordinates.md) or to convert coordinates manually |
| [GeoKeys](interfaces/GeoKeys.md) | Geokeys |
| [SourceCoordinate](interfaces/SourceCoordinate.md) | - |

## Type Aliases

| Type Alias | Description |
| ------ | ------ |
| [CoordinateUnits](type-aliases/CoordinateUnits.md) | Base units types. |
| [GeokeysNotSupportedErrors](type-aliases/GeokeysNotSupportedErrors.md) | Which geokeys are not supported. Values are geokeys' EPSG codes. |

## Functions

| Function | Description |
| ------ | ------ |
| [convertCoordinates](functions/convertCoordinates.md) | Converts given coordinates to the coordinates accepted by Proj4. |
| [toProj4](functions/toProj4.md) | Converts GeoTIFF's geokeys to Proj4 string |
