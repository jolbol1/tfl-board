"use client";

import { ArrivalRow } from "./ArrivalRow";
import { BoardRow, TrainApproaching } from "./BoardRow";
import { COUNTDOWN_INTERVAL_MS, isTrainApproaching, useNow } from "./time";
import type { BoardVariant, TrainArrivalView } from "./types";

export const FinalBoardSlot = ({
  arrivals,
  arrival,
  index,
  variant,
}: {
  arrivals: TrainArrivalView[];
  arrival?: TrainArrivalView;
  index: number;
  variant: BoardVariant;
}) => {
  const now = useNow(COUNTDOWN_INTERVAL_MS);

  if (
    !arrivals.some((candidate) =>
      isTrainApproaching(candidate.timeOfExpectedArrival, now)
    )
  ) {
    if (arrival) {
      return <ArrivalRow arrival={arrival} index={index} variant={variant} />;
    }

    return <BoardRow variant={variant} />;
  }

  return <TrainApproaching variant={variant} />;
};
