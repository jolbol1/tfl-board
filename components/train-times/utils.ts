import { type TflArrival } from "@/lib/tfl";

import type { TrainArrivalView } from "./types";

const DEFAULT_REFETCH_INTERVAL_MS = 90_000;
const MIN_REFETCH_INTERVAL_MS = 1_000;

export const formatDestinationStationName = (stationName: string) =>
  stationName
    .replace("Underground Station", "")
    .trim();

export const getExpectedArrivalTime = (arrival: TflArrival) => {
  if (!arrival.expectedArrival) {
    return Number.MAX_SAFE_INTEGER;
  }

  const timestamp = new Date(arrival.expectedArrival).getTime();

  return Number.isFinite(timestamp) ? timestamp : Number.MAX_SAFE_INTEGER;
};

export const sortArrivals = (arrivals: TflArrival[]) =>
  [...arrivals].sort(
    (a, b) => getExpectedArrivalTime(a) - getExpectedArrivalTime(b)
  );

export const getArrivalsRefetchInterval = (arrivals?: TflArrival[]) => {
  if (!arrivals?.length) {
    return DEFAULT_REFETCH_INTERVAL_MS;
  }

  const nextArrivalTime = getExpectedArrivalTime(sortArrivals(arrivals)[0]);

  if (!Number.isFinite(nextArrivalTime)) {
    return DEFAULT_REFETCH_INTERVAL_MS;
  }

  const msUntilNextArrival = nextArrivalTime - Date.now();

  if (msUntilNextArrival <= 0) {
    return MIN_REFETCH_INTERVAL_MS;
  }

  return Math.min(
    DEFAULT_REFETCH_INTERVAL_MS,
    Math.max(MIN_REFETCH_INTERVAL_MS, msUntilNextArrival + MIN_REFETCH_INTERVAL_MS)
  );
};

export const toArrivalView = (arrival: TflArrival): TrainArrivalView => ({
  id: arrival.id!,
  destinationName: formatDestinationStationName(arrival.destinationName!),
  timeOfExpectedArrival: getExpectedArrivalTime(arrival),
  lineName: arrival.lineName,
  platformName: arrival.platformName,
  currentLocation: arrival.currentLocation,
});
