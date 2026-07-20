import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import {
  fetchStopPoint,
  tflQueryKeys,
} from "@/lib/tfl";
import type { TflLineModeGroup, TflSearchMatch } from "@/lib/tfl";
import { useMemo, useState } from "react";
import type { FormEvent } from "react";
import {
  Combobox,
  ComboboxContent,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "./ui/combobox";
import { Checkbox } from "./ui/checkbox";
import { CheckboxGroup } from "@base-ui/react/checkbox-group";
import {
  Dialog,
  DialogDescription,
  DialogContent,
  DialogClose,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import {
  Input,
} from "./ui/input";
import tubeStations from "@/data/tube-stations.json";
import { MAX_BOARD_ROWS, normalizeBoardSize } from "@/lib/board-size";

const extractLines = (
  mode: string,
  data: TflLineModeGroup[]
) => {
  return data
    .filter((group) => group["modeName"] == mode)
    .filter((group) => group["lineIdentifier"] != null)
    .map((group) => group["lineIdentifier"]!)
    .flat();
};

const STATION_SEARCH_INPUT_ID = "station-search";

export const StationConfig = ({
  spStationId,
  spDirection,
  spName,
  spLines,
  spVariant,
  spSize,
}: {
  spName?: string;
  spStationId?: string;
  spDirection?: "inbound" | "outbound";
  spLines?: string[];
  spVariant?: "old" | "new";
  spSize?: number;
}) => {
  const [query, setQuery] = useState<string>();
  const [direction, setDirection] = useState<"inbound" | "outbound">(
    spDirection ?? "inbound",
  );
  const [stationId, setStationId] = useState<string | undefined>(spStationId);
  const [selectedLines, setSelectedLines] = useState<string[] | null>(
    spLines ?? null
  );
  const [variant, setVariant] = useState<"old" | "new">(spVariant ?? "new");
  const [size, setSize] = useState(spSize ?? 3);
  const [dialogOpen, setDialogOpen] = useState(false);

  const navigate = useNavigate({ from: "/" });

  const [name, setName] = useState<string | undefined>(spName);

  const {
    data: linesData,
    isError: isStationMetadataError,
    isFetching: isStationMetadataFetching,
    refetch: refetchStationMetadata,
  } = useQuery({
    queryKey: tflQueryKeys.stopPoint(stationId ?? ""),
    queryFn: () =>
      fetchStopPoint({
        id: stationId!,
      }),
    enabled: stationId != null,
  });

  const resolvedStationId = useMemo(() => {
    if (linesData?.stopType !== "TransportInterchange" || !linesData.children) {
      return stationId;
    }

    const stationChild = linesData.children.find(
      (child) => child.stopType === "NaptanMetroStation" && child.stationNaptan
    );

    return stationChild?.stationNaptan ?? stationId;
  }, [linesData, stationId]);

  const availableLines = useMemo(() => {
    if (!linesData?.lineModeGroups) {
      return stationId === spStationId ? (spLines ?? []) : [];
    }

    return extractLines("tube", linesData.lineModeGroups);
  }, [linesData, spLines, spStationId, stationId]);

  const selectedOrAvailableLines = selectedLines ?? availableLines;
  const needsStationMetadata = Boolean(
    stationId && stationId !== spStationId && !linesData
  );
  const isLoadingStationMetadata =
    needsStationMetadata && isStationMetadataFetching;
  const hasStationMetadataError =
    needsStationMetadata && isStationMetadataError;
  const selectedStation = useMemo<TflSearchMatch | null>(() => {
    if (!stationId || !name) {
      return null;
    }

    return { id: stationId, name };
  }, [name, stationId]);
  const stationMatches = useMemo(
    () => {
      const normalizedQuery = query?.trim().toLowerCase();
      const matches = normalizedQuery
        ? tubeStations.filter((station) =>
            station.name.toLowerCase().includes(normalizedQuery)
          )
        : tubeStations;

      return matches.slice(0, 50);
    },
    [query]
  );

  const resetFormState = () => {
    setQuery(spName);
    setDirection(spDirection ?? "inbound");
    setStationId(spStationId);
    setSelectedLines(spLines ?? null);
    setVariant(spVariant ?? "new");
    setSize(spSize ?? 3);
    setName(spName);
  };

  const updateSize = (value: string) => {
    setSize(normalizeBoardSize(value, 0));
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      !resolvedStationId ||
      !name ||
      selectedOrAvailableLines.length === 0 ||
      needsStationMetadata
    ) {
      return;
    }

    void navigate({
      search: {
        stationId: resolvedStationId,
        direction,
        lines: selectedOrAvailableLines,
        name,
        variant,
        size,
      },
    });
    setDialogOpen(false);
  };

  return (
    <Dialog
      open={dialogOpen}
      onOpenChange={(open) => {
        if (open) {
          resetFormState();
        }
        setDialogOpen(open);
      }}
    >
      <DialogTrigger render={<Button variant="secondary" />}>
        Change Station
      </DialogTrigger>
        <DialogContent className="w-full max-h-full overflow-y-auto">
          <DialogHeader className="text-left">
            <DialogTitle>Change Station</DialogTitle>
            <form
              onSubmit={onSubmit}
              id="stationForm"
              className=" text-gray-200 flex flex-col gap-4 pt-6"
            >
              <Combobox<TflSearchMatch>
                onInputValueChange={(value) => {
                  setQuery(value || undefined);
                }}
                name="station"
                required
                value={selectedStation}
                items={stationMatches}
                itemToStringLabel={(item) => item.name ?? ""}
                itemToStringValue={(item) => item.id ?? ""}
                isItemEqualToValue={(item, value) => item.id === value.id}
                onValueChange={(value) => {
                  setStationId(value?.id);
                  setSelectedLines(null);
                  setName(value?.name);
                }}
              >
                <Label htmlFor={STATION_SEARCH_INPUT_ID}>Search Station</Label>
                <ComboboxInput
                  className="w-full"
                  id={STATION_SEARCH_INPUT_ID}
                  placeholder="Search Station"
                />
                <DialogDescription className="text-sm text-muted-foreground">
                  Begin typing to search for a station
                </DialogDescription>
                <ComboboxContent>
                  <ComboboxList>
                    {(item: TflSearchMatch) => (
                      <ComboboxItem
                        key={item.id}
                        className="font-sans"
                        value={item}
                      >
                        {item.name}
                      </ComboboxItem>
                    )}
                  </ComboboxList>
                </ComboboxContent>
              </Combobox>
              <RadioGroup
                name="direction"
                onValueChange={(value) => {
                  setDirection(value === "outbound" ? "outbound" : "inbound");
                }}
                value={direction}
                required
              >
                <Label>Direction</Label>
                <Label className="font-normal">
                  <RadioGroupItem value="inbound" />
                  <span>Inbound</span>
                </Label>
                <Label className="font-normal">
                  <RadioGroupItem value="outbound" />
                  <span>Outbound</span>
                </Label>
              </RadioGroup>
              <CheckboxGroup
                className="flex flex-col gap-2"
                value={selectedOrAvailableLines}
                onValueChange={setSelectedLines}
              >
                <Label>Lines</Label>
                {availableLines && availableLines?.length > 0
                  ? availableLines.map((line) => (
                      <Label
                        className="font-normal capitalize"
                        key={line}
                      >
                        <Checkbox name="lines" value={line} />
                        <span>{line}</span>
                      </Label>
                    ))
                  : null}
              </CheckboxGroup>
              {isLoadingStationMetadata ? (
                <p className="text-sm text-muted-foreground" role="status">
                  Loading lines for the selected station…
                </p>
              ) : null}
              {hasStationMetadataError ? (
                <div className="flex items-center gap-2" role="alert">
                  <p className="text-sm text-destructive">
                    Unable to load lines for this station.
                  </p>
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={() => void refetchStationMetadata()}
                  >
                    Retry
                  </Button>
                </div>
              ) : null}
              <RadioGroup
                name="theme"
                onValueChange={(value) => {
                  setVariant(value === "old" ? "old" : "new");
                }}
                value={variant}
                required
              >
                <Label>Board Style</Label>
                <Label className="font-normal">
                  <RadioGroupItem value="old" />
                  <span>Old</span>
                </Label>
                <Label className="font-normal">
                  <RadioGroupItem value="new" />
                  <span>New</span>
                </Label>
              </RadioGroup>
              <div className="flex flex-col gap-2">
                <Label htmlFor="rows">Rows</Label>
                <Input
                  id="rows"
                  type="number"
                  min={0}
                  max={MAX_BOARD_ROWS}
                  value={size}
                  onChange={(event) => {
                    updateSize(event.target.value);
                  }}
                />
                <p className="text-sm text-muted-foreground">
                  Set to 0 to display all available data. Minimum displayed is 3
                </p>
              </div>
            </form>
          </DialogHeader>
          <DialogFooter>
            <DialogClose render={<Button variant="outline" />}>
              Cancel
            </DialogClose>
            <Button
              disabled={
                !resolvedStationId ||
                !name ||
                selectedOrAvailableLines.length === 0 ||
                needsStationMetadata
              }
              form="stationForm"
              type="submit"
            >
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
    </Dialog>
  );
};
