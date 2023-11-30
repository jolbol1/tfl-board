import { emptyLineApi as api } from "./emptyLineApi";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    lineMetaModes: build.query<LineMetaModesApiResponse, LineMetaModesApiArg>({
      query: () => ({ url: `/Meta/Modes` }),
    }),
    lineMetaSeverity: build.query<
      LineMetaSeverityApiResponse,
      LineMetaSeverityApiArg
    >({
      query: () => ({ url: `/Meta/Severity` }),
    }),
    lineMetaDisruptionCategories: build.query<
      LineMetaDisruptionCategoriesApiResponse,
      LineMetaDisruptionCategoriesApiArg
    >({
      query: () => ({ url: `/Meta/DisruptionCategories` }),
    }),
    lineMetaServiceTypes: build.query<
      LineMetaServiceTypesApiResponse,
      LineMetaServiceTypesApiArg
    >({
      query: () => ({ url: `/Meta/ServiceTypes` }),
    }),
    lineGetByPathIds: build.query<
      LineGetByPathIdsApiResponse,
      LineGetByPathIdsApiArg
    >({
      query: (queryArg) => ({ url: `/${queryArg.ids}` }),
    }),
    lineGetByModeByPathModes: build.query<
      LineGetByModeByPathModesApiResponse,
      LineGetByModeByPathModesApiArg
    >({
      query: (queryArg) => ({ url: `/Mode/${queryArg.modes}` }),
    }),
    lineRouteByQueryServiceTypes: build.query<
      LineRouteByQueryServiceTypesApiResponse,
      LineRouteByQueryServiceTypesApiArg
    >({
      query: (queryArg) => ({
        url: `/Route`,
        params: { serviceTypes: queryArg.serviceTypes },
      }),
    }),
    lineLineRoutesByIdsByPathIdsQueryServiceTypes: build.query<
      LineLineRoutesByIdsByPathIdsQueryServiceTypesApiResponse,
      LineLineRoutesByIdsByPathIdsQueryServiceTypesApiArg
    >({
      query: (queryArg) => ({
        url: `/${queryArg.ids}/Route`,
        params: { serviceTypes: queryArg.serviceTypes },
      }),
    }),
    lineRouteByModeByPathModesQueryServiceTypes: build.query<
      LineRouteByModeByPathModesQueryServiceTypesApiResponse,
      LineRouteByModeByPathModesQueryServiceTypesApiArg
    >({
      query: (queryArg) => ({
        url: `/Mode/${queryArg.modes}/Route`,
        params: { serviceTypes: queryArg.serviceTypes },
      }),
    }),
    lineRouteSequenceByPathIdPathDirectionQueryServiceTypesQueryExcludeCrowding:
      build.query<
        LineRouteSequenceByPathIdPathDirectionQueryServiceTypesQueryExcludeCrowdingApiResponse,
        LineRouteSequenceByPathIdPathDirectionQueryServiceTypesQueryExcludeCrowdingApiArg
      >({
        query: (queryArg) => ({
          url: `/${queryArg.id}/Route/Sequence/${queryArg.direction}`,
          params: {
            serviceTypes: queryArg.serviceTypes,
            excludeCrowding: queryArg.excludeCrowding,
          },
        }),
      }),
    lineStatusByPathIdsPathStartDatePathEndDateQueryDetail: build.query<
      LineStatusByPathIdsPathStartDatePathEndDateQueryDetailApiResponse,
      LineStatusByPathIdsPathStartDatePathEndDateQueryDetailApiArg
    >({
      query: (queryArg) => ({
        url: `/${queryArg.ids}/Status/${queryArg.startDate}/to/${queryArg.endDate}`,
        params: { detail: queryArg.detail },
      }),
    }),
    lineStatusByIdsByPathIdsQueryDetail: build.query<
      LineStatusByIdsByPathIdsQueryDetailApiResponse,
      LineStatusByIdsByPathIdsQueryDetailApiArg
    >({
      query: (queryArg) => ({
        url: `/${queryArg.ids}/Status`,
        params: { detail: queryArg.detail },
      }),
    }),
    lineSearchByPathQueryQueryModesQueryServiceTypes: build.query<
      LineSearchByPathQueryQueryModesQueryServiceTypesApiResponse,
      LineSearchByPathQueryQueryModesQueryServiceTypesApiArg
    >({
      query: (queryArg) => ({
        url: `/Search/${queryArg.query}`,
        params: { modes: queryArg.modes, serviceTypes: queryArg.serviceTypes },
      }),
    }),
    lineStatusBySeverityByPathSeverity: build.query<
      LineStatusBySeverityByPathSeverityApiResponse,
      LineStatusBySeverityByPathSeverityApiArg
    >({
      query: (queryArg) => ({ url: `/Status/${queryArg.severity}` }),
    }),
    lineStatusByModeByPathModesQueryDetailQuerySeverityLevel: build.query<
      LineStatusByModeByPathModesQueryDetailQuerySeverityLevelApiResponse,
      LineStatusByModeByPathModesQueryDetailQuerySeverityLevelApiArg
    >({
      query: (queryArg) => ({
        url: `/Mode/${queryArg.modes}/Status`,
        params: {
          detail: queryArg.detail,
          severityLevel: queryArg.severityLevel,
        },
      }),
    }),
    lineStopPointsByPathIdQueryTflOperatedNationalRailStationsOnly: build.query<
      LineStopPointsByPathIdQueryTflOperatedNationalRailStationsOnlyApiResponse,
      LineStopPointsByPathIdQueryTflOperatedNationalRailStationsOnlyApiArg
    >({
      query: (queryArg) => ({
        url: `/${queryArg.id}/StopPoints`,
        params: {
          tflOperatedNationalRailStationsOnly:
            queryArg.tflOperatedNationalRailStationsOnly,
        },
      }),
    }),
    lineTimetableByPathFromStopPointIdPathId: build.query<
      LineTimetableByPathFromStopPointIdPathIdApiResponse,
      LineTimetableByPathFromStopPointIdPathIdApiArg
    >({
      query: (queryArg) => ({
        url: `/${queryArg.id}/Timetable/${queryArg.fromStopPointId}`,
      }),
    }),
    lineTimetableToByPathFromStopPointIdPathIdPathToStopPointId: build.query<
      LineTimetableToByPathFromStopPointIdPathIdPathToStopPointIdApiResponse,
      LineTimetableToByPathFromStopPointIdPathIdPathToStopPointIdApiArg
    >({
      query: (queryArg) => ({
        url: `/${queryArg.id}/Timetable/${queryArg.fromStopPointId}/to/${queryArg.toStopPointId}`,
      }),
    }),
    lineDisruptionByPathIds: build.query<
      LineDisruptionByPathIdsApiResponse,
      LineDisruptionByPathIdsApiArg
    >({
      query: (queryArg) => ({ url: `/${queryArg.ids}/Disruption` }),
    }),
    lineDisruptionByModeByPathModes: build.query<
      LineDisruptionByModeByPathModesApiResponse,
      LineDisruptionByModeByPathModesApiArg
    >({
      query: (queryArg) => ({ url: `/Mode/${queryArg.modes}/Disruption` }),
    }),
    lineArrivalsWithStopPointByPathIdsPathStopPointIdQueryDirectionQueryDestina:
      build.query<
        LineArrivalsWithStopPointByPathIdsPathStopPointIdQueryDirectionQueryDestinaApiResponse,
        LineArrivalsWithStopPointByPathIdsPathStopPointIdQueryDirectionQueryDestinaApiArg
      >({
        query: (queryArg) => ({
          url: `/${queryArg.ids}/Arrivals/${queryArg.stopPointId}`,
          params: {
            direction: queryArg.direction,
            destinationStationId: queryArg.destinationStationId,
          },
        }),
      }),
    lineArrivalsByPathIds: build.query<
      LineArrivalsByPathIdsApiResponse,
      LineArrivalsByPathIdsApiArg
    >({
      query: (queryArg) => ({ url: `/${queryArg.ids}/Arrivals` }),
    }),
    forwardProxy: build.query<ForwardProxyApiResponse, ForwardProxyApiArg>({
      query: () => ({ url: `/*` }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as lineApi };
export type LineMetaModesApiResponse =
  /** status 200 OK */ MetaModesGet200ApplicationJsonResponse;
export type LineMetaModesApiArg = void;
export type LineMetaSeverityApiResponse =
  /** status 200 OK */ MetaSeverityGet200ApplicationJsonResponse;
export type LineMetaSeverityApiArg = void;
export type LineMetaDisruptionCategoriesApiResponse =
  /** status 200 OK */ MetaDisruptionCategoriesGet200ApplicationJsonResponse;
export type LineMetaDisruptionCategoriesApiArg = void;
export type LineMetaServiceTypesApiResponse =
  /** status 200 OK */ MetaServiceTypesGet200ApplicationJsonResponse;
export type LineMetaServiceTypesApiArg = void;
export type LineGetByPathIdsApiResponse =
  /** status 200 OK */ IdsGet200ApplicationJsonResponse;
export type LineGetByPathIdsApiArg = {
  /** A comma-separated list of line ids e.g. victoria,circle,N133. Max. approx. 20 ids. */
  ids: string;
};
export type LineGetByModeByPathModesApiResponse =
  /** status 200 OK */ ModeModesGet200ApplicationJsonResponse;
export type LineGetByModeByPathModesApiArg = {
  /** A comma-separated list of modes e.g. tube,dlr */
  modes: string;
};
export type LineRouteByQueryServiceTypesApiResponse =
  /** status 200 OK */ RouteGet200ApplicationJsonResponse;
export type LineRouteByQueryServiceTypesApiArg = {
  /** A comma seperated list of service types to filter on. Supported values: Regular, Night. Defaulted to 'Regular' if not specified */
  serviceTypes?: "Regular" | "Night";
};
export type LineLineRoutesByIdsByPathIdsQueryServiceTypesApiResponse =
  /** status 200 OK */ IdsRouteGet200ApplicationJsonResponse;
export type LineLineRoutesByIdsByPathIdsQueryServiceTypesApiArg = {
  /** A comma-separated list of line ids e.g. victoria,circle,N133. Max. approx. 20 ids. */
  ids: string;
  /** A comma seperated list of service types to filter on. Supported values: Regular, Night. Defaulted to 'Regular' if not specified */
  serviceTypes?: "Regular" | "Night";
};
export type LineRouteByModeByPathModesQueryServiceTypesApiResponse =
  /** status 200 OK */ ModeModesRouteGet200ApplicationJsonResponse;
export type LineRouteByModeByPathModesQueryServiceTypesApiArg = {
  /** A comma-separated list of modes e.g. tube,dlr */
  modes: string;
  /** A comma seperated list of service types to filter on. Supported values: Regular, Night. Defaulted to 'Regular' if not specified */
  serviceTypes?: "Regular" | "Night";
};
export type LineRouteSequenceByPathIdPathDirectionQueryServiceTypesQueryExcludeCrowdingApiResponse =
  /** status 200 OK */ Tfl23;
export type LineRouteSequenceByPathIdPathDirectionQueryServiceTypesQueryExcludeCrowdingApiArg =
  {
    /** A single line id e.g. victoria */
    id: string;
    /** The direction of travel. Can be inbound or outbound. */
    direction: "inbound" | "outbound" | "all";
    /** A comma seperated list of service types to filter on. Supported values: Regular, Night. Defaulted to 'Regular' if not specified */
    serviceTypes?: "Regular" | "Night";
    /** That excludes crowding from line disruptions. Can be true or false. */
    excludeCrowding?: boolean;
  };
export type LineStatusByPathIdsPathStartDatePathEndDateQueryDetailApiResponse =
  /** status 200 OK */ IdsStatusStartDateToEndDateGet200ApplicationJsonResponse;
export type LineStatusByPathIdsPathStartDatePathEndDateQueryDetailApiArg = {
  /** A comma-separated list of line ids e.g. victoria,circle,N133. Max. approx. 20 ids. */
  ids: string;
  /** Format - date-time (as date-time in RFC3339). Start date for start of the period */
  startDate: string;
  /** Format - date-time (as date-time in RFC3339). End date for the period that the disruption will fall within to be included in the results */
  endDate: string;
  /** Include details of the disruptions that are causing the line status including the affected stops and routes */
  detail?: boolean;
};
export type LineStatusByIdsByPathIdsQueryDetailApiResponse =
  /** status 200 OK */ IdsStatusGet200ApplicationJsonResponse;
export type LineStatusByIdsByPathIdsQueryDetailApiArg = {
  /** A comma-separated list of line ids e.g. victoria,circle,N133. Max. approx. 20 ids. */
  ids: string;
  /** Include details of the disruptions that are causing the line status including the affected stops and routes */
  detail?: boolean;
};
export type LineSearchByPathQueryQueryModesQueryServiceTypesApiResponse =
  /** status 200 OK */ Tfl27;
export type LineSearchByPathQueryQueryModesQueryServiceTypesApiArg = {
  /** Search term e.g victoria */
  query: string;
  /** Optionally filter by the specified modes */
  modes?: any;
  /** A comma seperated list of service types to filter on. Supported values: Regular, Night. Defaulted to 'Regular' if not specified */
  serviceTypes?: "Regular" | "Night";
};
export type LineStatusBySeverityByPathSeverityApiResponse =
  /** status 200 OK */ StatusSeverityGet200ApplicationJsonResponse;
export type LineStatusBySeverityByPathSeverityApiArg = {
  /** Format - int32. The level of severity (eg: a number from 0 to 14) */
  severity: number;
};
export type LineStatusByModeByPathModesQueryDetailQuerySeverityLevelApiResponse =
  /** status 200 OK */ ModeModesStatusGet200ApplicationJsonResponse;
export type LineStatusByModeByPathModesQueryDetailQuerySeverityLevelApiArg = {
  /** A comma-separated list of modes to filter by. e.g. tube,dlr */
  modes: string;
  /** Include details of the disruptions that are causing the line status including the affected stops and routes */
  detail?: boolean;
  /** If specified, ensures that only those line status(es) are returned within the lines that have disruptions with the matching severity level. */
  severityLevel?: string;
};
export type LineStopPointsByPathIdQueryTflOperatedNationalRailStationsOnlyApiResponse =
  /** status 200 OK */ IdStopPointsGet200ApplicationJsonResponse;
export type LineStopPointsByPathIdQueryTflOperatedNationalRailStationsOnlyApiArg =
  {
    /** A single line id e.g. victoria */
    id: string;
    /** If the national-rail line is requested, this flag will filter the national rail stations so that only those operated by TfL are returned */
    tflOperatedNationalRailStationsOnly?: boolean;
  };
export type LineTimetableByPathFromStopPointIdPathIdApiResponse =
  /** status 200 OK */ Tfl39;
export type LineTimetableByPathFromStopPointIdPathIdApiArg = {
  /** The originating station's stop point id (station naptan code e.g. 940GZZLUASL, you can use /StopPoint/Search/{query} endpoint to find a stop point id from a station name) */
  fromStopPointId: string;
  /** A single line id e.g. victoria */
  id: string;
};
export type LineTimetableToByPathFromStopPointIdPathIdPathToStopPointIdApiResponse =
  /** status 200 OK */ Tfl39;
export type LineTimetableToByPathFromStopPointIdPathIdPathToStopPointIdApiArg =
  {
    /** The originating station's stop point id (station naptan code e.g. 940GZZLUASL, you can use /StopPoint/Search/{query} endpoint to find a stop point id from a station name) */
    fromStopPointId: string;
    /** A single line id e.g. victoria */
    id: string;
    /** The destination stations's Naptan code */
    toStopPointId: string;
  };
export type LineDisruptionByPathIdsApiResponse =
  /** status 200 OK */ IdsDisruptionGet200ApplicationJsonResponse;
export type LineDisruptionByPathIdsApiArg = {
  /** A comma-separated list of line ids e.g. victoria,circle,N133. Max. approx. 20 ids. */
  ids: string;
};
export type LineDisruptionByModeByPathModesApiResponse =
  /** status 200 OK */ ModeModesDisruptionGet200ApplicationJsonResponse;
export type LineDisruptionByModeByPathModesApiArg = {
  /** A comma-separated list of modes e.g. tube,dlr */
  modes: string;
};
export type LineArrivalsWithStopPointByPathIdsPathStopPointIdQueryDirectionQueryDestinaApiResponse =
  /** status 200 OK */ IdsArrivalsStopPointIdGet200ApplicationJsonResponse;
export type LineArrivalsWithStopPointByPathIdsPathStopPointIdQueryDirectionQueryDestinaApiArg =
  {
    /** A comma-separated list of line ids e.g. victoria,circle,N133. Max. approx. 20 ids. */
    ids: string;
    /** Optional. Id of stop to get arrival predictions for (station naptan code e.g. 940GZZLUASL, you can use /StopPoint/Search/{query} endpoint to find a stop point id from a station name) */
    stopPointId: string;
    /** Optional. The direction of travel. Can be inbound or outbound or all. If left blank, and destinationStopId is set, will default to all */
    direction?: "inbound" | "outbound" | "all";
    /** Optional. Id of destination stop */
    destinationStationId?: string;
  };
export type LineArrivalsByPathIdsApiResponse =
  /** status 200 OK */ IdsArrivalsGet200ApplicationJsonResponse;
export type LineArrivalsByPathIdsApiArg = {
  /** A comma-separated list of line ids e.g. victoria,circle,N133. Max. approx. 20 ids. */
  ids: string;
};
export type ForwardProxyApiResponse =
  /** status 200 OK */ Get200ApplicationJsonResponse;
export type ForwardProxyApiArg = void;
export type Tfl = {
  isTflService?: boolean;
  isFarePaying?: boolean;
  isScheduledService?: boolean;
  modeName?: string;
};
export type MetaModesGet200ApplicationJsonResponse = Tfl[];
export type Tfl2 = {
  modeName?: string;
  severityLevel?: number;
  description?: string;
};
export type MetaSeverityGet200ApplicationJsonResponse = Tfl2[];
export type MetaDisruptionCategoriesGet200ApplicationJsonResponse = string[];
export type MetaServiceTypesGet200ApplicationJsonResponse = string[];
export type Tfl3 = {
  timeSlice?: string;
  value?: number;
};
export type Tfl4 = {
  line?: string;
  lineDirection?: string;
  platformDirection?: string;
  direction?: string;
  naptanTo?: string;
  timeSlice?: string;
  value?: number;
};
export type Tfl5 = {
  passengerFlows?: Tfl3[];
  trainLoadings?: Tfl4[];
};
export type Tfl6 = {
  id?: string;
  name?: string;
  uri?: string;
  fullName?: string;
  type?: string;
  crowding?: Tfl5;
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
export type Tfl7 = {
  naptanIdReference?: string;
  stationAtcoCode?: string;
  lineIdentifier?: string[];
};
export type Tfl8 = {
  modeName?: string;
  lineIdentifier?: string[];
};
export type Tfl9 = {
  category?: string;
  key?: string;
  sourceSystemKey?: string;
  value?: string;
  modified?: string;
};
export type Tfl10 = {
  id?: string;
  url?: string;
  commonName?: string;
  distance?: number;
  placeType?: string;
  additionalProperties?: Tfl9[];
  children?: Tfl10[];
  childrenUrls?: string[];
  lat?: number;
  lon?: number;
};
export type Tfl11 = {
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
  lines?: Tfl6[];
  lineGroup?: Tfl7[];
  lineModeGroups?: Tfl8[];
  fullName?: string;
  naptanMode?: string;
  status?: boolean;
  id?: string;
  url?: string;
  commonName?: string;
  distance?: number;
  placeType?: string;
  additionalProperties?: Tfl9[];
  children?: Tfl10[];
  childrenUrls?: string[];
  lat?: number;
  lon?: number;
};
export type Tfl12 = {
  ordinal?: number;
  stopPoint?: Tfl11;
};
export type Tfl13 = {
  id?: string;
  lineId?: string;
  routeCode?: string;
  name?: string;
  lineString?: string;
  direction?: string;
  originationName?: string;
  destinationName?: string;
  validTo?: string;
  validFrom?: string;
  routeSectionNaptanEntrySequence?: Tfl12[];
};
export type Tfl14 = {
  category?:
    | "Undefined"
    | "RealTime"
    | "PlannedWork"
    | "Information"
    | "Event"
    | "Crowding"
    | "StatusAlert";
  type?: string;
  categoryDescription?: string;
  description?: string;
  summary?: string;
  additionalInfo?: string;
  created?: string;
  lastUpdate?: string;
  affectedRoutes?: Tfl13[];
  affectedStops?: Tfl11[];
  closureText?: string;
};
export type Tfl15 = {
  fromDate?: string;
  toDate?: string;
  isNow?: boolean;
};
export type Tfl16 = {
  id?: number;
  lineId?: string;
  statusSeverity?: number;
  statusSeverityDescription?: string;
  reason?: string;
  created?: string;
  modified?: string;
  validityPeriods?: Tfl15[];
  disruption?: Tfl14;
};
export type Tfl17 = {
  routeCode?: string;
  name?: string;
  direction?: string;
  originationName?: string;
  destinationName?: string;
  originator?: string;
  destination?: string;
  serviceType?: string;
  validTo?: string;
  validFrom?: string;
};
export type Tfl18 = {
  name?: string;
  uri?: string;
};
export type Tfl19 = {
  id?: string;
  name?: string;
  modeName?: string;
  disruptions?: Tfl14[];
  created?: string;
  modified?: string;
  lineStatuses?: Tfl16[];
  routeSections?: Tfl17[];
  serviceTypes?: Tfl18[];
  crowding?: Tfl5;
};
export type IdsGet200ApplicationJsonResponse = Tfl19[];
export type ModeModesGet200ApplicationJsonResponse = Tfl19[];
export type RouteGet200ApplicationJsonResponse = Tfl19[];
export type IdsRouteGet200ApplicationJsonResponse = Tfl19[];
export type ModeModesRouteGet200ApplicationJsonResponse = Tfl19[];
export type Tfl20 = {
  routeId?: number;
  parentId?: string;
  stationId?: string;
  icsId?: string;
  topMostParentId?: string;
  direction?: string;
  towards?: string;
  modes?: string[];
  stopType?: string;
  stopLetter?: string;
  zone?: string;
  accessibilitySummary?: string;
  hasDisruption?: boolean;
  lines?: Tfl6[];
  status?: boolean;
  id?: string;
  url?: string;
  name?: string;
  lat?: number;
  lon?: number;
};
export type Tfl21 = {
  lineId?: string;
  lineName?: string;
  direction?: string;
  branchId?: number;
  nextBranchIds?: number[];
  prevBranchIds?: number[];
  stopPoint?: Tfl20[];
  serviceType?: "Regular" | "Night";
};
export type Tfl22 = {
  name?: string;
  naptanIds?: string[];
  serviceType?: string;
};
export type Tfl23 = {
  lineId?: string;
  lineName?: string;
  direction?: string;
  isOutboundOnly?: boolean;
  mode?: string;
  lineStrings?: string[];
  stations?: Tfl20[];
  stopPointSequences?: Tfl21[];
  orderedLineRoutes?: Tfl22[];
};
export type IdsStatusStartDateToEndDateGet200ApplicationJsonResponse = Tfl19[];
export type IdsStatusGet200ApplicationJsonResponse = Tfl19[];
export type Tfl24 = {
  routeId?: number;
  direction?: string;
  destination?: string;
  fromStation?: string;
  toStation?: string;
  serviceType?: string;
  vehicleDestinationText?: string;
};
export type Tfl25 = {
  id?: number;
};
export type Tfl26 = {
  lineId?: string;
  mode?: string;
  lineName?: string;
  lineRouteSection?: Tfl24[];
  matchedRouteSections?: Tfl25[];
  matchedStops?: Tfl20[];
  id?: string;
  url?: string;
  name?: string;
  lat?: number;
  lon?: number;
};
export type Tfl27 = {
  input?: string;
  searchMatches?: Tfl26[];
};
export type StatusSeverityGet200ApplicationJsonResponse = Tfl19[];
export type ModeModesStatusGet200ApplicationJsonResponse = Tfl19[];
export type IdStopPointsGet200ApplicationJsonResponse = Tfl11[];
export type Tfl28 = {
  stopId?: string;
  timeToArrival?: number;
};
export type Tfl29 = {
  id?: string;
  intervals?: Tfl28[];
};
export type Tfl30 = {
  hour?: string;
  minute?: string;
  intervalId?: number;
};
export type Tfl31 = {
  hour?: string;
  minute?: string;
};
export type Tfl32 = {
  lowestFrequency?: number;
  highestFrequency?: number;
};
export type Tfl33 = {
  type?: "Normal" | "FrequencyHours" | "FrequencyMinutes" | "Unknown";
  fromTime?: Tfl31;
  toTime?: Tfl31;
  frequency?: Tfl32;
};
export type Tfl34 = {
  name?: string;
  knownJourneys?: Tfl30[];
  firstJourney?: Tfl30;
  lastJourney?: Tfl30;
  periods?: Tfl33[];
};
export type Tfl35 = {
  stationIntervals?: Tfl29[];
  schedules?: Tfl34[];
};
export type Tfl36 = {
  departureStopId?: string;
  routes?: Tfl35[];
};
export type Tfl37 = {
  description?: string;
  uri?: string;
};
export type Tfl38 = {
  disambiguationOptions?: Tfl37[];
};
export type Tfl39 = {
  lineId?: string;
  lineName?: string;
  direction?: string;
  pdfUrl?: string;
  stations?: Tfl20[];
  stops?: Tfl20[];
  timetable?: Tfl36;
  disambiguation?: Tfl38;
  statusErrorMessage?: string;
};
export type IdsDisruptionGet200ApplicationJsonResponse = Tfl14[];
export type ModeModesDisruptionGet200ApplicationJsonResponse = Tfl14[];
export type Tfl40 = {
  countdownServerAdjustment?: string;
  source?: string;
  insert?: string;
  read?: string;
  sent?: string;
  received?: string;
};
export type Tfl41 = {
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
  timing?: Tfl40;
};
export type IdsArrivalsStopPointIdGet200ApplicationJsonResponse = Tfl41[];
export type IdsArrivalsGet200ApplicationJsonResponse = Tfl41[];
export type Get200ApplicationJsonResponse = object;
export const {
  useLineMetaModesQuery,
  useLineMetaSeverityQuery,
  useLineMetaDisruptionCategoriesQuery,
  useLineMetaServiceTypesQuery,
  useLineGetByPathIdsQuery,
  useLineGetByModeByPathModesQuery,
  useLineRouteByQueryServiceTypesQuery,
  useLineLineRoutesByIdsByPathIdsQueryServiceTypesQuery,
  useLineRouteByModeByPathModesQueryServiceTypesQuery,
  useLineRouteSequenceByPathIdPathDirectionQueryServiceTypesQueryExcludeCrowdingQuery,
  useLineStatusByPathIdsPathStartDatePathEndDateQueryDetailQuery,
  useLineStatusByIdsByPathIdsQueryDetailQuery,
  useLineSearchByPathQueryQueryModesQueryServiceTypesQuery,
  useLineStatusBySeverityByPathSeverityQuery,
  useLineStatusByModeByPathModesQueryDetailQuerySeverityLevelQuery,
  useLineStopPointsByPathIdQueryTflOperatedNationalRailStationsOnlyQuery,
  useLineTimetableByPathFromStopPointIdPathIdQuery,
  useLineTimetableToByPathFromStopPointIdPathIdPathToStopPointIdQuery,
  useLineDisruptionByPathIdsQuery,
  useLineDisruptionByModeByPathModesQuery,
  useLineArrivalsWithStopPointByPathIdsPathStopPointIdQueryDirectionQueryDestinaQuery,
  useLineArrivalsByPathIdsQuery,
  useForwardProxyQuery,
} = injectedRtkApi;
