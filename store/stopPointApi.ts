import { emptySplitApi as api } from "./emptyApi";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    stopPointMetaCategories: build.query<
      StopPointMetaCategoriesApiResponse,
      StopPointMetaCategoriesApiArg
    >({
      query: () => ({ url: `/Meta/Categories` }),
    }),
    forwardProxy: build.query<ForwardProxyApiResponse, ForwardProxyApiArg>({
      query: () => ({ url: `/*` }),
    }),
    stopPointMetaStopTypes: build.query<
      StopPointMetaStopTypesApiResponse,
      StopPointMetaStopTypesApiArg
    >({
      query: () => ({ url: `/Meta/StopTypes` }),
    }),
    stopPointMetaModes: build.query<
      StopPointMetaModesApiResponse,
      StopPointMetaModesApiArg
    >({
      query: () => ({ url: `/Meta/Modes` }),
    }),
    stopPointGetByPathIdQueryIncludeCrowdingData: build.query<
      StopPointGetByPathIdQueryIncludeCrowdingDataApiResponse,
      StopPointGetByPathIdQueryIncludeCrowdingDataApiArg
    >({
      query: (queryArg) => ({
        url: `/${queryArg.id}`,
        params: { includeCrowdingData: queryArg.includeCrowdingData },
      }),
    }),
    stopPointGetByPathIdsQueryIncludeCrowdingData: build.query<
      StopPointGetByPathIdsQueryIncludeCrowdingDataApiResponse,
      StopPointGetByPathIdsQueryIncludeCrowdingDataApiArg
    >({
      query: (queryArg) => ({
        url: `/${queryArg.ids}`,
        params: { includeCrowdingData: queryArg.includeCrowdingData },
      }),
    }),
    stopPointGetByPathIdQueryPlaceTypes: build.query<
      StopPointGetByPathIdQueryPlaceTypesApiResponse,
      StopPointGetByPathIdQueryPlaceTypesApiArg
    >({
      query: (queryArg) => ({
        url: `/${queryArg.id}/placeTypes`,
        params: { placeTypes: queryArg.placeTypes },
      }),
    }),
    stopPointCrowdingByPathIdPathLineQueryDirection: build.query<
      StopPointCrowdingByPathIdPathLineQueryDirectionApiResponse,
      StopPointCrowdingByPathIdPathLineQueryDirectionApiArg
    >({
      query: (queryArg) => ({
        url: `/${queryArg.id}/Crowding/${queryArg.line}`,
        params: { direction: queryArg.direction },
      }),
    }),
    stopPointGetByTypeByPathTypes: build.query<
      StopPointGetByTypeByPathTypesApiResponse,
      StopPointGetByTypeByPathTypesApiArg
    >({
      query: (queryArg) => ({ url: `/Type/${queryArg.types}` }),
    }),
    stopPointGetByTypeWithPaginationByPathTypesPathPage: build.query<
      StopPointGetByTypeWithPaginationByPathTypesPathPageApiResponse,
      StopPointGetByTypeWithPaginationByPathTypesPathPageApiArg
    >({
      query: (queryArg) => ({
        url: `/Type/${queryArg.types}/page/${queryArg.page}`,
      }),
    }),
    stopPointGetServiceTypesByQueryIdQueryLineIdsQueryModes: build.query<
      StopPointGetServiceTypesByQueryIdQueryLineIdsQueryModesApiResponse,
      StopPointGetServiceTypesByQueryIdQueryLineIdsQueryModesApiArg
    >({
      query: (queryArg) => ({
        url: `/ServiceTypes`,
        params: {
          id: queryArg.id,
          lineIds: queryArg.lineIds,
          modes: queryArg.modes,
        },
      }),
    }),
    stopPointArrivalsByPathId: build.query<
      StopPointArrivalsByPathIdApiResponse,
      StopPointArrivalsByPathIdApiArg
    >({
      query: (queryArg) => ({ url: `/${queryArg.id}/Arrivals` }),
    }),
    stopPointArrivalDeparturesByPathIdQueryLineIds: build.query<
      StopPointArrivalDeparturesByPathIdQueryLineIdsApiResponse,
      StopPointArrivalDeparturesByPathIdQueryLineIdsApiArg
    >({
      query: (queryArg) => ({
        url: `/${queryArg.id}/ArrivalDepartures`,
        params: { lineIds: queryArg.lineIds },
      }),
    }),
    stopPointReachableFromByPathIdPathLineIdQueryServiceTypes: build.query<
      StopPointReachableFromByPathIdPathLineIdQueryServiceTypesApiResponse,
      StopPointReachableFromByPathIdPathLineIdQueryServiceTypesApiArg
    >({
      query: (queryArg) => ({
        url: `/${queryArg.id}/CanReachOnLine/${queryArg.lineId}`,
        params: { serviceTypes: queryArg.serviceTypes },
      }),
    }),
    stopPointRouteByPathIdQueryServiceTypes: build.query<
      StopPointRouteByPathIdQueryServiceTypesApiResponse,
      StopPointRouteByPathIdQueryServiceTypesApiArg
    >({
      query: (queryArg) => ({
        url: `/${queryArg.id}/Route`,
        params: { serviceTypes: queryArg.serviceTypes },
      }),
    }),
    stopPointDisruptionByModeByPathModesQueryIncludeRouteBlockedStops:
      build.query<
        StopPointDisruptionByModeByPathModesQueryIncludeRouteBlockedStopsApiResponse,
        StopPointDisruptionByModeByPathModesQueryIncludeRouteBlockedStopsApiArg
      >({
        query: (queryArg) => ({
          url: `/Mode/${queryArg.modes}/Disruption`,
          params: {
            includeRouteBlockedStops: queryArg.includeRouteBlockedStops,
          },
        }),
      }),
    stopPointDisruptionByPathIdsQueryGetFamilyQueryIncludeRouteBlockedStopsQuer:
      build.query<
        StopPointDisruptionByPathIdsQueryGetFamilyQueryIncludeRouteBlockedStopsQuerApiResponse,
        StopPointDisruptionByPathIdsQueryGetFamilyQueryIncludeRouteBlockedStopsQuerApiArg
      >({
        query: (queryArg) => ({
          url: `/${queryArg.ids}/Disruption`,
          params: {
            getFamily: queryArg.getFamily,
            includeRouteBlockedStops: queryArg.includeRouteBlockedStops,
            flattenResponse: queryArg.flattenResponse,
          },
        }),
      }),
    stopPointDirectionByPathIdPathToStopPointIdQueryLineId: build.query<
      StopPointDirectionByPathIdPathToStopPointIdQueryLineIdApiResponse,
      StopPointDirectionByPathIdPathToStopPointIdQueryLineIdApiArg
    >({
      query: (queryArg) => ({
        url: `/${queryArg.id}/DirectionTo/${queryArg.toStopPointId}`,
        params: { lineId: queryArg.lineId },
      }),
    }),
    stopPointGetByGeoPointByQueryLatQueryLonQueryStopTypesQueryRadiusQueryUseSt:
      build.query<
        StopPointGetByGeoPointByQueryLatQueryLonQueryStopTypesQueryRadiusQueryUseStApiResponse,
        StopPointGetByGeoPointByQueryLatQueryLonQueryStopTypesQueryRadiusQueryUseStApiArg
      >({
        query: (queryArg) => ({
          url: `/`,
          params: {
            lat: queryArg.lat,
            lon: queryArg.lon,
            stopTypes: queryArg.stopTypes,
            radius: queryArg.radius,
            useStopPointHierarchy: queryArg.useStopPointHierarchy,
            modes: queryArg.modes,
            categories: queryArg.categories,
            returnLines: queryArg.returnLines,
          },
        }),
      }),
    stopPointGetByModeByPathModesQueryPage: build.query<
      StopPointGetByModeByPathModesQueryPageApiResponse,
      StopPointGetByModeByPathModesQueryPageApiArg
    >({
      query: (queryArg) => ({
        url: `/Mode/${queryArg.modes}`,
        params: { page: queryArg.page },
      }),
    }),
    stopPointSearchByPathQueryQueryModesQueryFaresOnlyQueryMaxResultsQueryLines:
      build.query<
        StopPointSearchByPathQueryQueryModesQueryFaresOnlyQueryMaxResultsQueryLinesApiResponse,
        StopPointSearchByPathQueryQueryModesQueryFaresOnlyQueryMaxResultsQueryLinesApiArg
      >({
        query: (queryArg) => ({
          url: `/Search/${queryArg.query}`,
          params: {
            modes: queryArg.modes,
            faresOnly: queryArg.faresOnly,
            maxResults: queryArg.maxResults,
            lines: queryArg.lines,
            includeHubs: queryArg.includeHubs,
            tflOperatedNationalRailStationsOnly:
              queryArg.tflOperatedNationalRailStationsOnly,
          },
        }),
      }),
    stopPointSearchByQueryQueryQueryModesQueryFaresOnlyQueryMaxResultsQueryLine:
      build.query<
        StopPointSearchByQueryQueryQueryModesQueryFaresOnlyQueryMaxResultsQueryLineApiResponse,
        StopPointSearchByQueryQueryQueryModesQueryFaresOnlyQueryMaxResultsQueryLineApiArg
      >({
        query: (queryArg) => ({
          url: `/Search`,
          params: {
            query: queryArg.query,
            modes: queryArg.modes,
            faresOnly: queryArg.faresOnly,
            maxResults: queryArg.maxResults,
            lines: queryArg.lines,
            includeHubs: queryArg.includeHubs,
            tflOperatedNationalRailStationsOnly:
              queryArg.tflOperatedNationalRailStationsOnly,
          },
        }),
      }),
    stopPointGetBySmsByPathIdQueryOutput: build.query<
      StopPointGetBySmsByPathIdQueryOutputApiResponse,
      StopPointGetBySmsByPathIdQueryOutputApiArg
    >({
      query: (queryArg) => ({
        url: `/Sms/${queryArg.id}`,
        params: { output: queryArg.output },
      }),
    }),
    stopPointGetTaxiRanksByIdsByPathStopPointId: build.query<
      StopPointGetTaxiRanksByIdsByPathStopPointIdApiResponse,
      StopPointGetTaxiRanksByIdsByPathStopPointIdApiArg
    >({
      query: (queryArg) => ({ url: `/${queryArg.stopPointId}/TaxiRanks` }),
    }),
    stopPointGetCarParksByIdByPathStopPointId: build.query<
      StopPointGetCarParksByIdByPathStopPointIdApiResponse,
      StopPointGetCarParksByIdByPathStopPointIdApiArg
    >({
      query: (queryArg) => ({ url: `/${queryArg.stopPointId}/CarParks` }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as stopPointApi };
export type StopPointMetaCategoriesApiResponse =
  /** status 200 OK */ TflApiPresentationEntitiesStopPointCategory[];
export type StopPointMetaCategoriesApiArg = void;
export type ForwardProxyApiResponse = /** status 200 OK */ object;
export type ForwardProxyApiArg = void;
export type StopPointMetaStopTypesApiResponse = /** status 200 OK */ string[];
export type StopPointMetaStopTypesApiArg = void;
export type StopPointMetaModesApiResponse =
  /** status 200 OK */ TflApiPresentationEntitiesMode[];
export type StopPointMetaModesApiArg = void;
export type StopPointGetByPathIdQueryIncludeCrowdingDataApiResponse =
  /** status 200 OK */ TflApiPresentationEntitiesStopPoint;
export type StopPointGetByPathIdQueryIncludeCrowdingDataApiArg = {
  /** stop point id (station naptan code e.g. 940GZZLUASL). Max. approx. 20 ids.
                You can use /StopPoint/Search/{query} endpoint to find a stop point id from a station name. */
  id: string;
  /** Include the crowding data (static). To Filter further use: /StopPoint/{ids}/Crowding/{line} */
  includeCrowdingData?: boolean;
};
export type StopPointGetByPathIdsQueryIncludeCrowdingDataApiResponse =
  /** status 200 OK */ TflApiPresentationEntitiesStopPoint[];
export type StopPointGetByPathIdsQueryIncludeCrowdingDataApiArg = {
  /** A comma-separated list of stop point ids (station naptan code e.g. 940GZZLUASL). Max. approx. 20 ids.
                You can use /StopPoint/Search/{query} endpoint to find a stop point id from a station name. */
  ids: string;
  /** Include the crowding data (static). To Filter further use: /StopPoint/{ids}/Crowding/{line} */
  includeCrowdingData?: boolean;
};
export type StopPointGetByPathIdQueryPlaceTypesApiResponse =
  /** status 200 OK */ TflApiPresentationEntitiesPlace[];
export type StopPointGetByPathIdQueryPlaceTypesApiArg = {
  /** A naptan id for a stop point (station naptan code e.g. 940GZZLUASL). */
  id: string;
  /** A comcomma-separated value representing the place types. */
  placeTypes: string;
};
export type StopPointCrowdingByPathIdPathLineQueryDirectionApiResponse =
  /** status 200 OK */ TflApiPresentationEntitiesStopPoint[];
export type StopPointCrowdingByPathIdPathLineQueryDirectionApiArg = {
  /** The Naptan id of the stop */
  id: string;
  /** A particular line e.g. victoria, circle, northern etc. */
  line: string;
  /** The direction of travel. Can be inbound or outbound. */
  direction: "inbound" | "outbound" | "all";
};
export type StopPointGetByTypeByPathTypesApiResponse =
  /** status 200 OK */ TflApiPresentationEntitiesStopPoint[];
export type StopPointGetByTypeByPathTypesApiArg = {
  /** A comma-separated list of the types to return. Max. approx. 12 types.
                A list of valid stop types can be obtained from the StopPoint/meta/stoptypes endpoint. */
  types: string;
};
export type StopPointGetByTypeWithPaginationByPathTypesPathPageApiResponse =
  /** status 200 OK */ TflApiPresentationEntitiesStopPoint[];
export type StopPointGetByTypeWithPaginationByPathTypesPathPageApiArg = {
  types: string;
  /** Format - int32. */
  page: number;
};
export type StopPointGetServiceTypesByQueryIdQueryLineIdsQueryModesApiResponse =
  /** status 200 OK */ TflApiPresentationEntitiesLineServiceType[];
export type StopPointGetServiceTypesByQueryIdQueryLineIdsQueryModesApiArg = {
  /** The Naptan id of the stop */
  id: string;
  /** The lines which contain the given Naptan id (all lines relevant to the given stoppoint if empty) */
  lineIds?: string[];
  /** The modes which the lines are relevant to (all if empty) */
  modes?: string[];
};
export type StopPointArrivalsByPathIdApiResponse =
  /** status 200 OK */ TflApiPresentationEntitiesPrediction[];
export type StopPointArrivalsByPathIdApiArg = {
  /** A StopPoint id (station naptan code e.g. 940GZZLUASL, you can use /StopPoint/Search/{query} endpoint to find a stop point id from a station name) */
  id: string;
};
export type StopPointArrivalDeparturesByPathIdQueryLineIdsApiResponse =
  /** status 200 OK */ TflApiPresentationEntitiesArrivalDeparture[];
export type StopPointArrivalDeparturesByPathIdQueryLineIdsApiArg = {
  /** A StopPoint id (station naptan code e.g. 940GZZLUASL, you can use /StopPoint/Search/{query} endpoint to find a stop point id from a station name) */
  id: string;
  /** A comma-separated list of line ids e.g. tfl-rail, london-overground */
  lineIds: string;
};
export type StopPointReachableFromByPathIdPathLineIdQueryServiceTypesApiResponse =
  /** status 200 OK */ TflApiPresentationEntitiesStopPoint[];
export type StopPointReachableFromByPathIdPathLineIdQueryServiceTypesApiArg = {
  /** The id (station naptan code e.g. 940GZZLUASL, you can use /StopPoint/Search/{query} endpoint to find a stop point id from a station name) of the stop point to filter by */
  id: string;
  /** Line id of the line to filter by (e.g. victoria) */
  lineId: string;
  /** A comma-separated list of service types to filter on. If not specified. Supported values: Regular, Night. Defaulted to 'Regular' if not specified */
  serviceTypes?: "Regular" | "Night";
};
export type StopPointRouteByPathIdQueryServiceTypesApiResponse =
  /** status 200 OK */ TflApiPresentationEntitiesStopPointRouteSection[];
export type StopPointRouteByPathIdQueryServiceTypesApiArg = {
  /** A stop point id (station naptan codes e.g. 940GZZLUASL, you can use /StopPoint/Search/{query} endpoint to find a stop point id from a station name) */
  id: string;
  /** A comma-separated list of service types to filter on. If not specified. Supported values: Regular, Night. Defaulted to 'Regular' if not specified */
  serviceTypes?: "Regular" | "Night";
};
export type StopPointDisruptionByModeByPathModesQueryIncludeRouteBlockedStopsApiResponse =
  /** status 200 OK */ TflApiPresentationEntitiesDisruptedPoint[];
export type StopPointDisruptionByModeByPathModesQueryIncludeRouteBlockedStopsApiArg =
  {
    /** A comma-seperated list of modes e.g. tube,dlr */
    modes: string;
    includeRouteBlockedStops?: boolean;
  };
export type StopPointDisruptionByPathIdsQueryGetFamilyQueryIncludeRouteBlockedStopsQuerApiResponse =
  /** status 200 OK */ TflApiPresentationEntitiesDisruptedPoint[];
export type StopPointDisruptionByPathIdsQueryGetFamilyQueryIncludeRouteBlockedStopsQuerApiArg =
  {
    /** A comma-seperated list of stop point ids. Max. approx. 20 ids.
                You can use /StopPoint/Search/{query} endpoint to find a stop point id from a station name. */
    ids: string;
    /** Specify true to return disruptions for entire family, or false to return disruptions for just this stop point. Defaults to false. */
    getFamily?: boolean;
    includeRouteBlockedStops?: boolean;
    /** Specify true to associate all disruptions with parent stop point. (Only applicable when getFamily is true). */
    flattenResponse?: boolean;
  };
export type StopPointDirectionByPathIdPathToStopPointIdQueryLineIdApiResponse =
  /** status 200 OK */ string;
export type StopPointDirectionByPathIdPathToStopPointIdQueryLineIdApiArg = {
  /** Originating stop id (station naptan code e.g. 940GZZLUASL, you can use /StopPoint/Search/{query} endpoint to find a stop point id from a station name) */
  id: string;
  /** Destination stop id (station naptan code e.g. 940GZZLUASL, you can use /StopPoint/Search/{query} endpoint to find a stop point id from a station name) */
  toStopPointId: string;
  /** Optional line id filter e.g. victoria */
  lineId?: string;
};
export type StopPointGetByGeoPointByQueryLatQueryLonQueryStopTypesQueryRadiusQueryUseStApiResponse =
  /** status 200 OK */ TflApiPresentationEntitiesStopPointsResponse;
export type StopPointGetByGeoPointByQueryLatQueryLonQueryStopTypesQueryRadiusQueryUseStApiArg =
  {
    /** Format - double. the latitude of the centre of the bounding circle */
    lat: number;
    /** Format - double. the longitude of the centre of the bounding circle */
    lon: number;
    /** a list of stopTypes that should be returned (a list of valid stop types can be obtained from the StopPoint/meta/stoptypes endpoint) */
    stopTypes: string;
    /** Format - int32. the radius of the bounding circle in metres (default : 200) */
    radius?: number;
    /** Re-arrange the output into a parent/child hierarchy */
    useStopPointHierarchy?: boolean;
    /** the list of modes to search (comma separated mode names e.g. tube,dlr) */
    modes?: string[];
    /** an optional list of comma separated property categories to return in the StopPoint's property bag. If null or empty, all categories of property are returned. Pass the keyword "none" to return no properties (a valid list of categories can be obtained from the /StopPoint/Meta/categories endpoint) */
    categories?: string[];
    /** true to return the lines that each stop point serves as a nested resource */
    returnLines?: boolean;
  };
export type StopPointGetByModeByPathModesQueryPageApiResponse =
  /** status 200 OK */ TflApiPresentationEntitiesStopPointsResponse;
export type StopPointGetByModeByPathModesQueryPageApiArg = {
  /** A comma-seperated list of modes e.g. tube,dlr */
  modes: string;
  /** Format - int32. The data set page to return. Page 1 equates to the first 1000 stop points, page 2 equates to 1001-2000 etc. Must be entered for bus mode as data set is too large. */
  page?: number;
};
export type StopPointSearchByPathQueryQueryModesQueryFaresOnlyQueryMaxResultsQueryLinesApiResponse =
  /** status 200 OK */ TflApiPresentationEntitiesSearchResponse;
export type StopPointSearchByPathQueryQueryModesQueryFaresOnlyQueryMaxResultsQueryLinesApiArg =
  {
    /** The query string, case-insensitive. Leading and trailing wildcards are applied automatically. */
    query: string;
    /** An optional, parameter separated list of the modes to filter by */
    modes?: string[];
    /** True to only return stations in that have Fares data available for single fares to another station. */
    faresOnly?: boolean;
    /** Format - int32. An optional result limit, defaulting to and with a maximum of 50. Since children of the stop point heirarchy are returned for matches,
                it is possible that the flattened result set will contain more than 50 items. */
    maxResults?: number;
    /** An optional, parameter separated list of the lines to filter by */
    lines?: string[];
    /** If true, returns results including HUBs. */
    includeHubs?: boolean;
    /** If the national-rail mode is included, this flag will filter the national rail stations so that only those operated by TfL are returned */
    tflOperatedNationalRailStationsOnly?: boolean;
  };
export type StopPointSearchByQueryQueryQueryModesQueryFaresOnlyQueryMaxResultsQueryLineApiResponse =
  /** status 200 OK */ TflApiPresentationEntitiesSearchResponse;
export type StopPointSearchByQueryQueryQueryModesQueryFaresOnlyQueryMaxResultsQueryLineApiArg =
  {
    /** The query string, case-insensitive. Leading and trailing wildcards are applied automatically. */
    query: string;
    /** An optional, parameter separated list of the modes to filter by */
    modes?: string[];
    /** True to only return stations in that have Fares data available for single fares to another station. */
    faresOnly?: boolean;
    /** Format - int32. An optional result limit, defaulting to and with a maximum of 50. Since children of the stop point heirarchy are returned for matches,
                it is possible that the flattened result set will contain more than 50 items. */
    maxResults?: number;
    /** An optional, parameter separated list of the lines to filter by */
    lines?: string[];
    /** If true, returns results including HUBs. */
    includeHubs?: boolean;
    /** If the national-rail mode is included, this flag will filter the national rail stations so that only those operated by TfL are returned */
    tflOperatedNationalRailStationsOnly?: boolean;
  };
export type StopPointGetBySmsByPathIdQueryOutputApiResponse =
  /** status 200 OK */ SystemObject;
export type StopPointGetBySmsByPathIdQueryOutputApiArg = {
  /** A 5-digit Countdown Bus Stop Code e.g. 73241, 50435, 56334. */
  id: string;
  /** If set to "web", a 302 redirect to relevant website bus stop page is returned. Valid values are : web. All other values are ignored. */
  output?: string;
};
export type StopPointGetTaxiRanksByIdsByPathStopPointIdApiResponse =
  /** status 200 OK */ TflApiPresentationEntitiesPlace[];
export type StopPointGetTaxiRanksByIdsByPathStopPointIdApiArg = {
  /** stopPointId is required to get the taxi ranks. */
  stopPointId: string;
};
export type StopPointGetCarParksByIdByPathStopPointIdApiResponse =
  /** status 200 OK */ TflApiPresentationEntitiesPlace[];
export type StopPointGetCarParksByIdByPathStopPointIdApiArg = {
  /** stopPointId is required to get the car parks. */
  stopPointId: string;
};
export type TflApiPresentationEntitiesStopPointCategory = {
  category?: string;
  availableKeys?: string[];
};
export type TflApiPresentationEntitiesMode = {
  isTflService?: boolean;
  isFarePaying?: boolean;
  isScheduledService?: boolean;
  modeName?: string;
};
export type TflApiPresentationEntitiesPassengerFlow = {
  timeSlice?: string;
  value?: number;
};
export type TflApiPresentationEntitiesTrainLoading = {
  line?: string;
  lineDirection?: string;
  platformDirection?: string;
  direction?: string;
  naptanTo?: string;
  timeSlice?: string;
  value?: number;
};
export type TflApiPresentationEntitiesCrowding = {
  passengerFlows?: TflApiPresentationEntitiesPassengerFlow[];
  trainLoadings?: TflApiPresentationEntitiesTrainLoading[];
};
export type TflApiPresentationEntitiesIdentifier = {
  id?: string;
  name?: string;
  uri?: string;
  fullName?: string;
  type?: string;
  crowding?: TflApiPresentationEntitiesCrowding;
  routeType?:
    | "Unknown"
    | "All"
    | "Cycle Superhighways"
    | "Quietways"
    | "Cycleways"
    | "Mini-Hollands"
    | "Central London Grid"
    | "Streetspace Route";
  status?:
    | "Unknown"
    | "All"
    | "Open"
    | "In Progress"
    | "Planned"
    | "Planned - Subject to feasibility and consultation."
    | "Not Open";
};
export type TflApiPresentationEntitiesLineGroup = {
  naptanIdReference?: string;
  stationAtcoCode?: string;
  lineIdentifier?: string[];
};
export type TflApiPresentationEntitiesLineModeGroup = {
  modeName?: string;
  lineIdentifier?: string[];
};
export type TflApiPresentationEntitiesAdditionalProperties = {
  category?: string;
  key?: string;
  sourceSystemKey?: string;
  value?: string;
  modified?: string;
};
export type TflApiPresentationEntitiesStopPoint = {
  naptanId?: string;
  platformName?: string;
  indicator?: string;
  stopLetter?: string;
  modes?: string[];
  icsCode?: string;
  smsCode?: string;
  stopType?: string;
  stationNaptan?: string;
  accessibilitySummary?: string;
  hubNaptanCode?: string;
  lines?: TflApiPresentationEntitiesIdentifier[];
  lineGroup?: TflApiPresentationEntitiesLineGroup[];
  lineModeGroups?: TflApiPresentationEntitiesLineModeGroup[];
  fullName?: string;
  naptanMode?: string;
  status?: boolean;
  id?: string;
  url?: string;
  commonName?: string;
  distance?: number;
  placeType?: string;
  additionalProperties?: TflApiPresentationEntitiesAdditionalProperties[];
  children?: TflApiPresentationEntitiesStopPoint[];
  childrenUrls?: string[];
  lat?: number;
  lon?: number;
};
export type TflApiPresentationEntitiesPlace = {
  id?: string;
  url?: string;
  commonName?: string;
  distance?: number;
  placeType?: string;
  additionalProperties?: TflApiPresentationEntitiesAdditionalProperties[];
  children?: TflApiPresentationEntitiesPlace[];
  childrenUrls?: string[];
  lat?: number;
  lon?: number;
};
export type TflApiPresentationEntitiesLineServiceTypeInfo = {
  name?: string;
  uri?: string;
};
export type TflApiPresentationEntitiesLineSpecificServiceType = {
  serviceType?: TflApiPresentationEntitiesLineServiceTypeInfo;
  stopServesServiceType?: boolean;
};
export type TflApiPresentationEntitiesLineServiceType = {
  lineName?: string;
  lineSpecificServiceTypes?: TflApiPresentationEntitiesLineSpecificServiceType[];
};
export type TflApiPresentationEntitiesPredictionTiming = {
  countdownServerAdjustment?: string;
  source?: string;
  insert?: string;
  read?: string;
  sent?: string;
  received?: string;
};
export type TflApiPresentationEntitiesPrediction = {
  id?: string;
  operationType?: number;
  vehicleId?: string;
  naptanId?: string;
  stationName?: string;
  lineId?: string;
  lineName?: string;
  platformName?: string;
  direction?: string;
  bearing?: string;
  destinationNaptanId?: string;
  destinationName?: string;
  timestamp?: string;
  timeToStation?: number;
  currentLocation?: string;
  towards?: string;
  expectedArrival?: string;
  timeToLive?: string;
  modeName?: string;
  timing?: TflApiPresentationEntitiesPredictionTiming;
};
export type TflApiPresentationEntitiesArrivalDeparture = {
  platformName?: string;
  destinationNaptanId?: string;
  destinationName?: string;
  naptanId?: string;
  stationName?: string;
  estimatedTimeOfArrival?: string;
  scheduledTimeOfArrival?: string;
  estimatedTimeOfDeparture?: string;
  scheduledTimeOfDeparture?: string;
  minutesAndSecondsToArrival?: string;
  minutesAndSecondsToDeparture?: string;
  cause?: string;
  departureStatus?: "OnTime" | "Delayed" | "Cancelled" | "NotStoppingAtStation";
  timing?: TflApiPresentationEntitiesPredictionTiming;
};
export type TflApiPresentationEntitiesStopPointRouteSection = {
  naptanId?: string;
  lineId?: string;
  mode?: string;
  validFrom?: string;
  validTo?: string;
  direction?: string;
  routeSectionName?: string;
  lineString?: string;
  isActive?: boolean;
  serviceType?: string;
  vehicleDestinationText?: string;
  destinationName?: string;
};
export type TflApiPresentationEntitiesDisruptedPoint = {
  atcoCode?: string;
  fromDate?: string;
  toDate?: string;
  description?: string;
  commonName?: string;
  type?: string;
  mode?: string;
  stationAtcoCode?: string;
  appearance?: string;
  additionalInformation?: string;
};
export type TflApiPresentationEntitiesStopPointsResponse = {
  centrePoint?: number[];
  stopPoints?: TflApiPresentationEntitiesStopPoint[];
  pageSize?: number;
  total?: number;
  page?: number;
};
export type TflApiPresentationEntitiesSearchMatch = {
  id?: string;
  url?: string;
  name?: string;
  lat?: number;
  lon?: number;
};
export type TflApiPresentationEntitiesSearchResponse = {
  query?: string;
  from?: number;
  page?: number;
  pageSize?: number;
  provider?: string;
  total?: number;
  matches?: TflApiPresentationEntitiesSearchMatch[];
  maxScore?: number;
};
export type SystemObject = object;
export const {
  useStopPointMetaCategoriesQuery,
  useForwardProxyQuery,
  useStopPointMetaStopTypesQuery,
  useStopPointMetaModesQuery,
  useStopPointGetByPathIdQueryIncludeCrowdingDataQuery,
  useStopPointGetByPathIdsQueryIncludeCrowdingDataQuery,
  useStopPointGetByPathIdQueryPlaceTypesQuery,
  useStopPointCrowdingByPathIdPathLineQueryDirectionQuery,
  useStopPointGetByTypeByPathTypesQuery,
  useStopPointGetByTypeWithPaginationByPathTypesPathPageQuery,
  useStopPointGetServiceTypesByQueryIdQueryLineIdsQueryModesQuery,
  useStopPointArrivalsByPathIdQuery,
  useStopPointArrivalDeparturesByPathIdQueryLineIdsQuery,
  useStopPointReachableFromByPathIdPathLineIdQueryServiceTypesQuery,
  useStopPointRouteByPathIdQueryServiceTypesQuery,
  useStopPointDisruptionByModeByPathModesQueryIncludeRouteBlockedStopsQuery,
  useStopPointDisruptionByPathIdsQueryGetFamilyQueryIncludeRouteBlockedStopsQuerQuery,
  useStopPointDirectionByPathIdPathToStopPointIdQueryLineIdQuery,
  useStopPointGetByGeoPointByQueryLatQueryLonQueryStopTypesQueryRadiusQueryUseStQuery,
  useStopPointGetByModeByPathModesQueryPageQuery,
  useStopPointSearchByPathQueryQueryModesQueryFaresOnlyQueryMaxResultsQueryLinesQuery,
  useStopPointSearchByQueryQueryQueryModesQueryFaresOnlyQueryMaxResultsQueryLineQuery,
  useStopPointGetBySmsByPathIdQueryOutputQuery,
  useStopPointGetTaxiRanksByIdsByPathStopPointIdQuery,
  useStopPointGetCarParksByIdByPathStopPointIdQuery,
} = injectedRtkApi;
