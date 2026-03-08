"use client";

import { buildArrivalTime, COUNTDOWN_INTERVAL_MS, useNow } from "./time";

export const ArrivalCountdown = ({
  timeOfExpectedArrival,
}: {
  timeOfExpectedArrival: number;
}) => {
  const now = useNow(COUNTDOWN_INTERVAL_MS);

  return <span>{buildArrivalTime(timeOfExpectedArrival, now)}</span>;
};
