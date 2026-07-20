const BASE_URL = "https://api.tfl.gov.uk";

export type TflArrival = {
  id: string;
  destinationName: string;
  expectedArrival: string;
  lineName?: string;
  platformName?: string;
  currentLocation?: string;
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

function readOptionalString(value: unknown) {
  return typeof value === "string" ? value : undefined;
}

export function parseTflArrivals(value: unknown): TflArrival[] {
  if (!Array.isArray(value)) {
    throw new Error("TfL arrivals response was not an array");
  }

  return value.flatMap((candidate) => {
    if (!candidate || typeof candidate !== "object") {
      return [];
    }

    const { id, destinationName, expectedArrival } = candidate as Record<
      string,
      unknown
    >;

    if (
      typeof id !== "string" ||
      id.length === 0 ||
      typeof destinationName !== "string" ||
      destinationName.length === 0 ||
      typeof expectedArrival !== "string" ||
      !Number.isFinite(Date.parse(expectedArrival))
    ) {
      return [];
    }

    const arrival = candidate as Record<string, unknown>;

    return [
      {
        id,
        destinationName,
        expectedArrival,
        lineName: readOptionalString(arrival.lineName),
        platformName: readOptionalString(arrival.platformName),
        currentLocation: readOptionalString(arrival.currentLocation),
      },
    ];
  });
}

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

  const payload = await fetchTflJson<unknown>({
    path: `Line/${ids}/Arrivals/${stopPointId}`,
    searchParams,
  });

  return parseTflArrivals(payload);
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
