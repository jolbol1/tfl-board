"use client";

import { Label, Button, Dialog } from "react-aria-components";

import { PopoverTrigger, Popover } from "@/components/ui/popover";

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
  <PopoverTrigger key={arrival.id}>
    <Button className="hover:underline underline-offset-4 focus:outline-none focus:underline">
      <BoardRow variant={variant}>
        <span>{`${index + 1} ${arrival.destinationName}`}</span>
        <ArrivalCountdown
          timeOfExpectedArrival={arrival.timeOfExpectedArrival}
        />
      </BoardRow>
    </Button>
    <Popover
      isKeyboardDismissDisabled={false}
      className="w-fit max-w-[95%]"
      placement="bottom start"
    >
      <Dialog className="grid gap-4 focus:outline-none">
        <div className="space-y-2">
          <h4 className="font-medium leading-none">Details</h4>
          <p className="text-sm text-muted-foreground">
            Last location updates every 90s.
          </p>
        </div>{" "}
        <div className="grid gap-2">
          <div className="grid grid-cols-2 items-center gap-4">
            <Label htmlFor="width">Platform</Label>
            {arrival.platformName}
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <Label htmlFor="maxWidth">Line</Label>
            {arrival.lineName}
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <Label htmlFor="height">Last Location</Label>
            {arrival.currentLocation}
          </div>
        </div>
      </Dialog>
    </Popover>
  </PopoverTrigger>
);
