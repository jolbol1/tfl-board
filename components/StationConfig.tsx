"use client";

import { useQuery } from "@tanstack/react-query";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import {
  fetchStopPoint,
  tflQueryKeys,
  TflLineModeGroup,
  TflSearchMatch,
} from "@/lib/tfl";
import { FormEvent, useMemo, useState } from "react";
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
import { usePathname, useRouter } from "next/navigation";
import {
  Input,
} from "./ui/input";
import tubeStations from "@/data/tube-stations.json";

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
  spDirection?: string;
  spLines?: string[];
  spVariant?: string;
  spSize?: number;
}) => {
  const [query, setQuery] = useState<string>();
  const [direction, setDirection] = useState(spDirection ?? "inbound");
  const [stationId, setStationId] = useState<string | undefined>(spStationId);
  const [selectedLines, setSelectedLines] = useState<string[] | null>(
    spLines ?? null
  );
  const [variant, setVariant] = useState(spVariant ?? "new");
  const [size, setSize] = useState(spSize ?? 3);
  const [dialogOpen, setDialogOpen] = useState(false);

  const pathname = usePathname();
  const router = useRouter();

  const [name, setName] = useState<string | undefined>(spName);

  const { data: linesData } = useQuery({
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
      return spLines ?? [];
    }

    return extractLines("tube", linesData.lineModeGroups);
  }, [linesData, spLines]);

  const selectedOrAvailableLines = selectedLines ?? availableLines;
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
    const parsedValue = Number.parseInt(value, 10);

    if (Number.isNaN(parsedValue)) {
      setSize(0);
      return;
    }

    setSize(Math.max(0, parsedValue));
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!resolvedStationId || !name) {
      return;
    }

    const params = new URLSearchParams();
    params.set("stationId", resolvedStationId);
    params.set("direction", direction);
    params.set("lines", selectedOrAvailableLines.join(","));
    params.set("name", name);
    params.set("variant", variant);
    params.set("size", size.toString());
    router.push(pathname + "?" + params.toString());
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
                aria-label="station select"
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
                <Label>Search Station</Label>
                <ComboboxInput
                  className="w-full"
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
                onValueChange={setDirection}
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
              <RadioGroup
                name="theme"
                onValueChange={setVariant}
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
            <Button form="stationForm" type="submit">
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
    </Dialog>
  );
};
