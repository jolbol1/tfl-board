"use client";
import React, { useCallback, useEffect, useState } from "react";

import {
  TflApiPresentationEntitiesLineModeGroup,
  useStopPointGetByPathIdQueryIncludeCrowdingDataQuery,
  useStopPointSearchByPathQueryQueryModesQueryFaresOnlyQueryMaxResultsQueryLinesQuery,
} from "@/store/stopPointApi";
import { useLineArrivalsWithStopPointByPathIdsPathStopPointIdQueryDirectionQueryDestinaQuery } from "@/store/lineApi";
import { cn } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

class TrainArrival {
  id: string;
  timeOfExpectedArrival: number;
  timeToStation: number;
  destinationName: string;
  isTrainApproaching: boolean;

  constructor(item: {
    id: string;
    timeOfExpectedArrival: number;
    timeToStation?: number;
    destinationName: string;
  }) {
    this.id = item.id;
    this.timeOfExpectedArrival = item.timeOfExpectedArrival; // Date.now() returns milliseconds
    this.timeToStation =
      item.timeToStation ?? (this.timeOfExpectedArrival - Date.now()) / 1000;
    this.destinationName = this.formatDestinationStationName(
      item.destinationName
    );
    this.isTrainApproaching = this.timeToStation < 30;
  }

  private formatDestinationStationName(stationName: string): string {
    // Implement the logic to format the station name
    // Adapted from your Python function 'format_destination_station_name'
    return stationName
      .replace("Underground Station", "")
      .replace("(H&C Line)", "")
      .trim();
  }
}

type TravelDirection = "inbound" | "outbound" | "all";

const extractLines = (
  mode: string,
  data: TflApiPresentationEntitiesLineModeGroup[]
) => {
  return data
    .filter((group) => group["modeName"] == mode)
    .filter((group) => group["lineIdentifier"] != null)
    .map((group) => group["lineIdentifier"]!)
    .flat();
};

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

export const TrainTimes: React.FC<{ variant?: "old" | "new" }> = ({
  variant = "old",
}) => {
  const [upcomingArrivals, setUpcomingArrivals] = useState<TrainArrival[]>([]);
  const [direction, setDirection] = useState<TravelDirection>("inbound");
  const [stationName, setStationName] = useState<string>();
  const [stationId, setStationId] = useState<string>();
  const [availableLines, setAvailableLines] = useState<string[]>();

  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams()!;
  const stationQuery = "victoria";

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const {
    data: searchData,
    error: searchError,
    isLoading: searchLoading,
  } = useStopPointSearchByPathQueryQueryModesQueryFaresOnlyQueryMaxResultsQueryLinesQuery(
    {
      query: stationQuery ?? "victoria",
      modes: ["tube"],
      maxResults: 1,
    }
  );

  useEffect(() => {
    if (searchData && searchData.matches && searchData.matches.length > 0) {
      setStationName(searchData.matches[0].name);
      setStationId(searchData.matches[0].id);
    }
  }, [searchData]);

  useEffect(() => {
    if (stationId)
      router.push(pathname + "?" + createQueryString("stationId", stationId));
  }, [stationId]);

  const {
    data: linesData,
    error: linesError,
    isLoading: linesLoading,
  } = useStopPointGetByPathIdQueryIncludeCrowdingDataQuery(
    {
      id: `${stationId}`,
    },
    { skip: stationId == undefined }
  );

  useEffect(() => {
    if (linesData) {
      if (
        linesData.stopType === "NaptanMetroStation" &&
        linesData?.lineModeGroups
      ) {
        setAvailableLines(extractLines("tube", linesData?.lineModeGroups));
      } else if (
        linesData.stopType === "TransportInterchange" &&
        linesData.children
      ) {
        linesData.children.forEach((child) => {
          if (
            child.stopType === "NaptanMetroStation" &&
            linesData?.lineModeGroups
          ) {
            setStationId(child.stationNaptan);
            setAvailableLines(extractLines("tube", linesData?.lineModeGroups));
          }
        });
      }
    }
  }, [linesData]);

  const {
    data: arrivalData,
    error: arrivalError,
    isLoading: loadingError,
  } = useLineArrivalsWithStopPointByPathIdsPathStopPointIdQueryDirectionQueryDestinaQuery(
    {
      ids: availableLines!?.join(","),
      stopPointId: stationId!,
      direction: direction,
    },
    {
      skip: stationId == null || !availableLines || availableLines.length == 0,
    }
  );

  useEffect(() => {
    if (arrivalData) {
      arrivalData.sort(
        (a, b) =>
          (a.timeToStation ?? Number.MAX_SAFE_INTEGER) -
          (b.timeToStation ?? Number.MAX_SAFE_INTEGER)
      );

      setUpcomingArrivals(
        arrivalData.map(
          (arrival) =>
            new TrainArrival({
              id: arrival.id!,
              destinationName: arrival.destinationName!,
              timeOfExpectedArrival: Date.now() + arrival.timeToStation! * 1000,
            })
        )
      );
    }
  }, [arrivalData]);

  return (
    <>
      {upcomingArrivals?.slice(0, 3).map((arr, index) =>
        index === 2 &&
        upcomingArrivals.some((arr) => arr.isTrainApproaching) ? (
          <TrainApproaching variant={variant} key="trainApproach" />
        ) : (
          <BoardRow
            variant={variant}
            key={arr.id}
            className="w-full flex justify-between pt-2 px-1 bg-yellow-400/5"
          >
            <span>{`${index + 1} ${arr.destinationName}`}</span>
            <span>{buildArrivalTime(arr)}</span>
          </BoardRow>
        )
      )}
      {upcomingArrivals?.slice(0, 3).length < 3 &&
        new Array(3 - upcomingArrivals.length).fill("").map((_, index) =>
          index === 0 || index === 2 ? (
            <BoardRow
              variant={variant}
              className="justify-center"
              key={"infoLine" + index}
            >
              {index === 0 ? (
                "Not in Service"
              ) : upcomingArrivals.some((arr) => arr.isTrainApproaching) ? (
                <p className="blink">*** STAND BACK - TRAIN APPROACHING ***</p>
              ) : null}
            </BoardRow>
          ) : (
            <BoardRow variant={variant} key={"emptyLine" + index} />
          )
        )}
    </>
  );
};

export const TrainApproaching: React.FC<{ variant?: "old" | "new" }> = ({
  ...props
}) => <BoardRow className="justify-center" {...props} />;

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
