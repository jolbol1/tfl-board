export type BoardVariant = "old" | "new";

export type TrainArrivalView = {
  id: string;
  timeOfExpectedArrival: number;
  destinationName: string;
  lineName?: string;
  platformName?: string;
  currentLocation?: string;
};
