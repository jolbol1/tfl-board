"use client";

import { useEffect, useState } from "react";

export const COUNTDOWN_INTERVAL_MS = 10_000;

export const getTimeToStation = (timeOfExpectedArrival: number, now: number) =>
  (timeOfExpectedArrival - now) / 1000;

export const isTrainApproaching = (timeOfExpectedArrival: number, now: number) =>
  getTimeToStation(timeOfExpectedArrival, now) < 30;

export const buildArrivalTime = (timeOfExpectedArrival: number, now: number) => {
  const timeToStation = getTimeToStation(timeOfExpectedArrival, now);

  let arrivalTime = "";
  let arrivalText = "";

  if (timeToStation >= 60) {
    arrivalTime = Math.ceil(timeToStation / 60).toString();
    arrivalText = " mins";
  } else if (timeToStation > 30) {
    arrivalTime = Math.ceil(timeToStation / 60).toString();
    arrivalText = " min";
  }

  return arrivalTime + arrivalText;
};

export const useNow = (intervalMs: number) => {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const interval = setInterval(() => setNow(Date.now()), intervalMs);
    return () => clearInterval(interval);
  }, [intervalMs]);

  return now;
};
