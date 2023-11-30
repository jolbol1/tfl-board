"use client";
import React, { useEffect, useState } from "react";

import { useLineArrivalsWithStopPointByPathIdsPathStopPointIdQueryDirectionQueryDestinaQuery } from "@/store/lineApi";
import { cn } from "@/lib/utils";
import { Label, Input, Button } from "react-aria-components";
import { PopoverTrigger, Popover } from "./ui/popover";

class TrainArrival {
  id: string;
  timeOfExpectedArrival: number;
  timeToStation: number;
  destinationName: string;
  isTrainApproaching: boolean;
  lineName?: string;
  platformName?: string;
  currentLocation?: string;

  constructor(item: {
    id: string;
    timeOfExpectedArrival: number;
    timeToStation?: number;
    destinationName: string;
    lineName?: string;
    platformName?: string;
    currentLocation?: string;
  }) {
    this.id = item.id;
    this.timeOfExpectedArrival = item.timeOfExpectedArrival; // Date.now() returns milliseconds
    this.timeToStation =
      item.timeToStation ?? (this.timeOfExpectedArrival - Date.now()) / 1000;
    this.destinationName = this.formatDestinationStationName(
      item.destinationName
    );
    this.isTrainApproaching = this.timeToStation < 30;
    this.lineName = item.lineName;
    this.platformName = item.platformName;
    this.currentLocation = item.currentLocation;
  }

  private formatDestinationStationName(stationName: string): string {
    return stationName
      ?.replace("Underground Station", "")
      .replace("(H&C Line)", "")
      .trim();
  }
}

const buildArrivalTime = (arrival: TrainArrival) => {
  const timeToStation = arrival.timeToStation;

  let arrivalTime: string = "";
  let arrivalText: string = "";

  if (timeToStation >= 60) {
    // Round up to the next minute
    arrivalTime = Math.ceil(timeToStation / 60).toString();
    arrivalText = " mins";
  } else if (timeToStation < 60 && timeToStation > 30) {
    // Round up to 1 minute
    arrivalTime = Math.ceil(timeToStation / 60).toString();
    arrivalText = " min";
  } else {
    // Return an empty string indicating that train is due
    arrivalText = "";
  }

  return arrivalTime + arrivalText;
};

export const TrainTimes: React.FC<{
  variant?: "old" | "new";
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
  const [upcomingArrivals, setUpcomingArrivals] = useState<TrainArrival[]>([]);

  const {
    data: arrivalData,
    error: arrivalError,
    isLoading: loadingError,
    refetch: refetchArrivals,
  } = useLineArrivalsWithStopPointByPathIdsPathStopPointIdQueryDirectionQueryDestinaQuery(
    {
      ids: availableLines!?.join(","),
      stopPointId: stationId!,
      direction: direction,
    },
    {
      skip: stationId == null || !availableLines || availableLines.length == 0,
      pollingInterval: 90000,
    }
  );

  useEffect(() => {
    // Define a function to perform the desired action
    const fetchData = () => {
      if (arrivalData) {
        const sorted = [...arrivalData].sort(
          (a, b) =>
            (a.timeToStation ?? Number.MAX_SAFE_INTEGER) -
            (b.timeToStation ?? Number.MAX_SAFE_INTEGER)
        );

        setUpcomingArrivals(
          sorted.map(
            (arrival) =>
              new TrainArrival({
                id: arrival.id!,
                destinationName: arrival.destinationName!,
                timeOfExpectedArrival: new Date(
                  arrival.expectedArrival!
                ).getTime(),
                lineName: arrival.lineName,
                platformName: arrival.platformName,
                currentLocation: arrival.currentLocation,
              })
          )
        );
      }
    };

    // Run the function immediately
    fetchData();

    // Set up the interval to run the function every 10 seconds
    const interval = setInterval(fetchData, 10000);

    // Clear the interval when the component unmounts or arrivalData changes
    return () => clearInterval(interval);
  }, [arrivalData]);

  useEffect(() => {
    if (
      upcomingArrivals.length > 0 &&
      upcomingArrivals.some((arr) => arr.timeToStation < 0)
    ) {
      refetchArrivals();
    }
  }, [upcomingArrivals]);

  let dataArray = upcomingArrivals
    .map((arr, index) => (
      <PopoverTrigger key={arr.id}>
        <Button className="hover:underline underline-offset-4 focus:outline-none">
          <BoardRow variant={variant} key={arr.id}>
            <span>{`${index + 1} ${arr.destinationName}`}</span>
            <span>{buildArrivalTime(arr)}</span>
          </BoardRow>
        </Button>
        <Popover className="w-fit" placement="bottom start">
          <div className="grid gap-4">
            <div className="space-y-2">
              <h4 className="font-medium leading-none">Details</h4>
              <p className="text-sm text-muted-foreground">
                Last location updates every 90s.
              </p>
            </div>{" "}
            <div className="grid gap-2">
              <div className="grid grid-cols-2 items-center gap-4">
                <Label htmlFor="width">Platform</Label>
                {arr.platformName}
              </div>
              <div className="grid grid-cols-2 items-center gap-4">
                <Label htmlFor="maxWidth">Line</Label>
                {arr.lineName}
              </div>
              <div className="grid grid-cols-2 items-center gap-4">
                <Label htmlFor="height">Last Location</Label>
                {arr.currentLocation}
              </div>
            </div>
          </div>
        </Popover>
      </PopoverTrigger>
    ))
    .concat(
      new Array(Math.max(0, 3 - upcomingArrivals.length))
        .fill("")
        .map((s, index) => (
          <BoardRow variant={variant} key={"emptyIdx" + index} />
        ))
    );

  if (size > 0) {
    dataArray = dataArray.slice(0, size < 3 ? 3 : size);
  }

  if (upcomingArrivals.some((s) => s.isTrainApproaching)) {
    dataArray[dataArray.length - 1] = (
      <TrainApproaching key="trainApproach" variant={variant} />
    );
  }

  return <>{dataArray}</>;
};

export const TrainApproaching: React.FC<{ variant?: "old" | "new" }> = ({
  ...props
}) => (
  <BoardRow className="justify-center" {...props}>
    <p className="blink text-center">*** STAND BACK - TRAIN APPROACHING ***</p>
  </BoardRow>
);

export const BoardRow = ({
  className,
  variant = "old",
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { variant?: "old" | "new" }) => (
  <div
    className={cn(
      "w-full flex justify-between pt-2 px-1 ",
      { "bg-yellow-400/5": variant === "old" },
      className
    )}
    {...props}
  />
);
