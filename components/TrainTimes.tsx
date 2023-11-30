"use client";
import { useEffect, useState } from "react";

import {
  TflApiPresentationEntitiesLineModeGroup,
  useStopPointGetByPathIdQueryIncludeCrowdingDataQuery,
  useStopPointSearchByPathQueryQueryModesQueryFaresOnlyQueryMaxResultsQueryLinesQuery,
} from "@/store/stopPointApi";
import { useLineArrivalsWithStopPointByPathIdsPathStopPointIdQueryDirectionQueryDestinaQuery } from "@/store/lineApi";

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

export const TrainTimes = ({}) => {
  const [upcomingArrivals, setUpcomingArrivals] = useState<TrainArrival[]>([]);
  const [direction, setDirection] = useState<TravelDirection>("inbound");
  const [stationName, setStationName] = useState<string>();
  const [stationId, setStationId] = useState<string>();
  const [availableLines, setAvailableLines] = useState<string[]>();

  const {
    data: searchData,
    error: searchError,
    isLoading: searchLoading,
  } = useStopPointSearchByPathQueryQueryModesQueryFaresOnlyQueryMaxResultsQueryLinesQuery(
    {
      query: "victoria",
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
          <TrainApproaching key="trainApproach" />
        ) : (
          <div
            key={arr.id}
            className="w-full flex justify-between pt-2 px-1 bg-yellow-400/5"
          >
            <span>{`${index + 1} ${arr.destinationName}`}</span>
            <span>{buildArrivalTime(arr)}</span>
          </div>
        )
      )}
      {upcomingArrivals?.slice(0, 3).length < 3 &&
        new Array(3 - upcomingArrivals.length).fill("").map((emp, index) =>
          index === 0 ? (
            <div
              className="w-full text-center pt-2 px-1 bg-yellow-400/5"
              key={index}
            >
              Not in Service
            </div>
          ) : index === 2 &&
            upcomingArrivals.some((arr) => arr.isTrainApproaching) ? (
            <TrainApproaching key="trainApproach" />
          ) : (
            <div
              key={index}
              className="w-full flex justify-between pt-2 px-1 bg-yellow-400/5"
            />
          )
        )}
    </>
  );
};

export const TrainApproaching = () => (
  <div className="w-full text-center pt-2 px-1 bg-yellow-400/5">
    <p className="blink">*** STAND BACK - TRAIN APPROACHING ***</p>
  </div>
);

export const BoardRow = ({ ...props }) => (
  <div
    className="w-full flex justify-between pt-2 px-1 bg-yellow-400/5"
    {...props}
  />
);
