const BASE_URL = "https://api.tfl.gov.uk";

export type TflArrival = {
  id?: string;
  destinationName?: string;
  expectedArrival?: string;
  lineName?: string;
  platformName?: string;
  currentLocation?: string;
  timeToStation?: number;
};

export type TflSearchMatch = {
  id?: string;
  name?: string;
  lat?: number;
  lon?: number;
};

export type TflLineModeGroup = {
  modeName?: string;
  lineIdentifier?: string[];
};

export type TflStopPoint = {
  stopType?: string;
  stationNaptan?: string;
  lineModeGroups?: TflLineModeGroup[];
  children?: TflStopPoint[];
};

type FetchTflJsonOptions = {
  path: string;
  searchParams?: URLSearchParams;
};

async function fetchTflJson<T>({
  path,
  searchParams,
}: FetchTflJsonOptions): Promise<T> {
  const url = new URL(path, `${BASE_URL}/`);

  if (searchParams) {
    url.search = searchParams.toString();
  }

  const response = await fetch(url, {
    headers: {
      accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`TfL request failed: ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export const tflQueryKeys = {
  arrivals: (ids: string, stopPointId: string, direction: string) =>
    ["arrivals", ids, stopPointId, direction] as const,
  stopPoint: (stationId: string) => ["stopPoint", stationId] as const,
};

export async function fetchArrivals({
  ids,
  stopPointId,
  direction,
}: {
  ids: string;
  stopPointId: string;
  direction: "inbound" | "outbound";
}) {
  const searchParams = new URLSearchParams();
  searchParams.set("direction", direction);

  return fetchTflJson<TflArrival[]>({
    path: `Line/${ids}/Arrivals/${stopPointId}`,
    searchParams,
  });
}

export async function fetchStopPoint({
  id,
}: {
  id: string;
}) {
  return fetchTflJson<TflStopPoint>({
    path: `StopPoint/${id}`,
  });
}
