"use client";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

import { ArrivalCountdown } from "./ArrivalCountdown";
import { BoardRow } from "./BoardRow";
import type { BoardVariant, TrainArrivalView } from "./types";

export const ArrivalRow = ({
  arrival,
  index,
  variant,
}: {
  arrival: TrainArrivalView;
  index: number;
  variant: BoardVariant;
}) => (
  <Popover key={arrival.id}>
    <PopoverTrigger className="hover:underline underline-offset-4 focus:outline-none focus:underline">
      <BoardRow variant={variant}>
        <span>{`${index + 1} ${arrival.destinationName}`}</span>
        <ArrivalCountdown
          timeOfExpectedArrival={arrival.timeOfExpectedArrival}
        />
      </BoardRow>
    </PopoverTrigger>
    <PopoverContent
      className="w-fit max-w-[95%]"
      side="bottom"
      align="start"
    >
      <div className="grid gap-4 focus:outline-none">
        <div className="space-y-2">
          <h4 className="font-medium leading-none">Details</h4>
          <p className="text-sm text-muted-foreground">
            Last location updates every 90s.
          </p>
        </div>{" "}
        <div className="grid gap-2">
          <div className="grid grid-cols-2 items-center gap-4">
            <span className="font-medium">Platform</span>
            {arrival.platformName}
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <span className="font-medium">Line</span>
            {arrival.lineName}
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <span className="font-medium">Last Location</span>
            {arrival.currentLocation}
          </div>
        </div>
      </div>
    </PopoverContent>
  </Popover>
);
