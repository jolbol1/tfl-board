"use client";
import { useQuery } from "@tanstack/react-query";
import React, { useMemo } from "react";

import { fetchArrivals, tflQueryKeys } from "@/lib/tfl";

import { ArrivalRow } from "./train-times/ArrivalRow";
import { BoardRow } from "./train-times/BoardRow";
import { FinalBoardSlot } from "./train-times/FinalBoardSlot";
import type { BoardVariant, TrainArrivalView } from "./train-times/types";
import {
  getArrivalsRefetchInterval,
  sortArrivals,
  toArrivalView,
} from "./train-times/utils";

export const TrainTimes: React.FC<{
  variant?: BoardVariant;
  stationId: string;
  direction: "inbound" | "outbound";
  availableLines: string[];
  size?: number;
}> = ({
  variant = "old",
  direction = "inbound",
  availableLines,
  stationId,
  size = 3,
}) => {
  const ids = availableLines.join(",");

  const { data: arrivalData } = useQuery({
    queryKey: tflQueryKeys.arrivals(ids, stationId, direction),
    queryFn: () =>
      fetchArrivals({
        ids,
        stopPointId: stationId,
        direction,
      }),
    enabled: stationId != null && availableLines.length > 0,
    refetchInterval: (query) => getArrivalsRefetchInterval(query.state.data),
    select: sortArrivals,
  });

  const arrivals = useMemo<TrainArrivalView[]>(() => {
    if (!arrivalData) {
      return [];
    }

    return arrivalData.map(toArrivalView);
  }, [arrivalData]);

  const rowCount = size > 0 ? (size < 3 ? 3 : size) : Math.max(3, arrivals.length);
  const filledRows = Array.from({ length: rowCount }, (_, index) => arrivals[index]);

  const dataArray = filledRows.map((arrival, index) => {
    const isLastRow = index === filledRows.length - 1;

    if (isLastRow) {
      return (
        <FinalBoardSlot
          key={arrival?.id ?? `final-row-${index}`}
          arrivals={arrivals}
          arrival={arrival}
          index={index}
          variant={variant}
        />
      );
    }

    if (!arrival) {
      return <BoardRow variant={variant} key={`emptyIdx${index}`} />;
    }

    return (
      <ArrivalRow
        key={arrival.id}
        arrival={arrival}
        index={index}
        variant={variant}
      />
    );
  });

  return <>{dataArray}</>;
};
