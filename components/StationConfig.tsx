"use client";

import { useQuery } from "@tanstack/react-query";
import { Text, NumberField, Group } from "react-aria-components";
import { Label } from "./ui/label";
import { Radio, RadioGroup } from "./ui/radio-group";
import {
  fetchStopPoint,
  fetchStopPointSearch,
  tflQueryKeys,
  TflLineModeGroup,
  TflSearchMatch,
} from "@/lib/tfl";
import { FormEvent, useMemo, useState } from "react";
import {
  Combobox,
  ComboboxInput,
  ComboboxItem,
  ComboboxListBox,
  ComboboxPopover,
} from "./ui/combobox";
import { Checkbox, CheckboxGroup } from "./ui/checkbox";
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Input } from "./ui/input";

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

  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [name, setName] = useState<string | undefined>(spName);
  const searchTerm = query ?? "a";

  const { data: searchData } = useQuery({
    queryKey: tflQueryKeys.stopPointSearch(searchTerm, ["tube"]),
    queryFn: () =>
      fetchStopPointSearch({
        query: searchTerm,
        modes: ["tube"],
      }),
  });

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

  const onSubmit = (e: FormEvent<HTMLFormElement>, close: () => void) => {
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
    close();
  };

  return (
    <DialogTrigger>
      <Button variant="secondary">Change Station</Button>
      <DialogOverlay>
        <DialogContent className="w-full max-h-full overflow-y-auto">
          {({ close }) => (
            <>
              <DialogHeader className="text-left">
                <DialogTitle>Change Station</DialogTitle>
                <form
                  onSubmit={(e) => {
                    onSubmit(e, close);
                  }}
                  id="stationForm"
                  className=" text-gray-200 flex flex-col gap-4 pt-6"
                >
                  <Combobox
                    onInputChange={setQuery}
                    aria-label="station select"
                    name="station"
                    isRequired
                    defaultInputValue={searchParams.get("name") ?? "Victoria"}
                    defaultItems={[...(searchData?.matches ?? [])].sort(
                      (a, b) => {
                        if (a.name! < b.name!) {
                          return -1;
                        }
                        if (a.name! > b.name!) {
                          return 1;
                        }
                        return 0;
                      }
                    )}
                    onSelectionChange={(value) => {
                      setStationId(value as string);
                      setSelectedLines(null);
                      setName(
                        searchData?.matches?.find(
                          (ma) => ma.id === (value as string)
                        )?.name
                      );
                    }}
                  >
                    <Label>Search Station</Label>
                    <ComboboxInput
                      className="w-full"
                      placeholder="Search Station"
                    />
                    <Text
                      slot="description"
                      className="text-sm text-muted-foreground"
                    >
                      Begin typing to search for a station
                    </Text>
                    <ComboboxPopover>
                      <ComboboxListBox<TflSearchMatch>>
                        {(item) => (
                          <ComboboxItem
                            key={item.name}
                            id={item.id}
                            textValue={item.name}
                            className="font-sans"
                            value={item}
                          >
                            {item.name}
                          </ComboboxItem>
                        )}
                      </ComboboxListBox>
                    </ComboboxPopover>
                  </Combobox>
                  <RadioGroup
                    name="direction"
                    onChange={setDirection}
                    value={direction}
                    isRequired
                  >
                    <Label>Direction</Label>
                    <Radio value="inbound">Inbound</Radio>
                    <Radio value="outbound">Outbound</Radio>
                  </RadioGroup>
                  <CheckboxGroup
                    className="flex flex-col gap-2"
                    value={selectedOrAvailableLines}
                    onChange={setSelectedLines}
                    name="lines"
                  >
                    <Label>Lines</Label>
                    {availableLines && availableLines?.length > 0 ? (
                      <>
                        {availableLines?.map((line) => (
                          <Checkbox
                            className="capitalize"
                            key={line}
                            value={line}
                          >
                            {line}
                          </Checkbox>
                        ))}
                      </>
                    ) : null}
                  </CheckboxGroup>
                  <RadioGroup
                    name="theme"
                    onChange={setVariant}
                    value={variant}
                    isRequired
                  >
                    <Label>Board Style</Label>
                    <Radio value="old">Old</Radio>
                    <Radio value="new">New</Radio>
                  </RadioGroup>
                  <NumberField
                    minValue={0}
                    value={size}
                    onChange={setSize}
                  >
                    <Label>Rows</Label>
                    <Group className="flex group data-[focus-within]:outline-none data-[focus-visible]:outline-none data-[focus-visible]:ring-2 data-[focus-visible]:ring-ring data-[focus-visible]:ring-offset-background data-[focus-within]:ring-2 data-[focus-within]:ring-ring data-[focus-within]:ring-offset-0">
                      <Button
                        className="border-r-0 "
                        variant="outline"
                        size="icon"
                        slot="decrement"
                      >
                        -
                      </Button>
                      <Input className="focus-visible:ring-0 focus-visible:ring-offset-0" />
                      <Button
                        className="border-l-0 "
                        variant="outline"
                        size="icon"
                        slot="increment"
                      >
                        +
                      </Button>
                    </Group>
                    <Text
                      className="text-sm text-muted-foreground"
                      slot="description"
                    >
                      Set to 0 to display all available data. Minimum displayed
                      is 3
                    </Text>
                  </NumberField>
                </form>
              </DialogHeader>
              <DialogFooter>
                <Button form="stationForm" type="submit">
                  Save changes
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </DialogOverlay>
    </DialogTrigger>
  );
};
