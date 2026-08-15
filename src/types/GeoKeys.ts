/**
 * Geokeys
 *
 * See GeoTIFF specification for the descriptions of the keys.
 */
export interface GeoKeys {
  GeodeticCRSGeoKey?: number;
  GeographicTypeGeoKey?: number;
  GeodeticDatumGeoKey?: number;
  GeogGeodeticDatumGeoKey?: number;
  PrimeMeridianGeoKey?: number;
  GeogPrimeMeridianGeoKey?: number;
  GeogLinearUnitsGeoKey?: number;
  GeogLinearUnitSizeGeoKey?: number;
  GeogAngularUnitsGeoKey?: number;
  GeogAngularUnitSizeGeoKey?: number;
  GeogEllipsoidGeoKey?: number;

  /** Ellipsoid. Same as {@link GeogEllipsoidGeoKey} but newer. */
  EllipsoidGeoKey?: number;
  EllipsoidSemiMajorAxisGeoKey?: number;
  GeogSemiMajorAxisGeoKey?: number;
  EllipsoidSemiMinorAxisGeoKey?: number;
  GeogSemiMinorAxisGeoKey?: number;
  EllipsoidInvFlatteningGeoKey?: number;
  GeogInvFlatteningGeoKey?: number;
  PrimeMeridianLongitudeGeoKey?: number;
  GeogPrimeMeridianLongGeoKey?: number;
  ProjectedCRSGeoKey?: number;
  ProjectedCSTypeGeoKey?: number;
  ProjectionGeoKey?: number;
  ProjMethodGeoKey?: number;
  ProjCoordTransGeoKey?: number;
  ProjLinearUnitsGeoKey?: number;
  ProjLinearUnitSizeGeoKey?: number;
  ProjStdParallel1GeoKey?: number;
  ProjStdParallel2GeoKey?: number;
  ProjNatOriginLongGeoKey?: number;
  ProjNatOriginLatGeoKey?: number;
  ProjFalseEastingGeoKey?: number;
  ProjFalseNorthingGeoKey?: number;
  ProjFalseOriginLongGeoKey?: number;
  ProjFalseOriginLatGeoKey?: number;
  ProjFalseOriginEastingGeoKey?: number;
  ProjFalseOriginNorthingGeoKey?: number;
  ProjCenterLongGeoKey?: number;
  ProjCenterLatGeoKey?: number;
  ProjCenterEastingGeoKey?: number;
  ProjCenterNorthingGeoKey?: number;
  ProjScaleAtNatOriginGeoKey?: number;
  ProjScaleAtCenterGeoKey?: number;
  ProjAzimuthAngleGeoKey?: number;
  ProjStraightVertPoleLongGeoKey?: number;
  VerticalGeoKey?: number;
  VerticalCSTypeGeoKey?: number;
  VerticalUnitsGeoKey?: number;

  /** Same as {@link ProjStdParallel1GeoKey} */
  ProjStdParallelGeoKey?: number;
  /** Same as {@link ProjNatOriginLongGeoKey} */
  ProjOriginLongGeoKey?: number;
  /** Same as {@link ProjNatOriginLatGeoKey} */
  ProjOriginLatGeoKey?: number;
  /** Same as {@link ProjScaleAtNatOriginGeoKey} */
  ProjScaleAtOriginGeoKey?: number;

  /** Vertical datum. Vertical datums are not supported by this library. */
  VerticalDatumGeoKey?: number;

  /** Datum to WGS transformation parameters. This key is unofficial. */
  GeogTOWGS84GeoKey?: number[];
}
