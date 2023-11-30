"use client";

import { Form, Text, NumberField, Group } from "react-aria-components";
import { Label } from "./ui/label";
import { Radio, RadioGroup } from "./ui/radio-group";
import {
  TflApiPresentationEntitiesLineModeGroup,
  TflApiPresentationEntitiesSearchMatch,
  useStopPointGetByPathIdQueryIncludeCrowdingDataQuery,
  useStopPointSearchByPathQueryQueryModesQueryFaresOnlyQueryMaxResultsQueryLinesQuery,
} from "@/store/stopPointApi";
import { FormEvent, useEffect, useState } from "react";
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
  data: TflApiPresentationEntitiesLineModeGroup[]
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
  const [availableLines, setAvailableLines] = useState<string[]>(spLines ?? []);
  const [selectedLines, setSelectedLines] = useState<string[]>(spLines ?? []);
  const [variant, setVariant] = useState(spVariant ?? "new");
  const [size, setSize] = useState(spSize ?? 3);

  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams()!;

  const [name, setName] = useState<string | undefined>(spName);

  const {
    data: searchData,
    error: searchError,
    isLoading: searchLoading,
  } = useStopPointSearchByPathQueryQueryModesQueryFaresOnlyQueryMaxResultsQueryLinesQuery(
    {
      query: query ?? "a",
      modes: ["tube"],
    }
  );

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
        const lines = extractLines("tube", linesData?.lineModeGroups);
        setAvailableLines(lines);
        if (availableLines) {
          setSelectedLines(lines);
        }
      } else if (
        linesData.stopType === "TransportInterchange" &&
        linesData.children
      ) {
        linesData.children.forEach((child) => {
          if (
            child.stopType === "NaptanMetroStation" &&
            linesData?.lineModeGroups
          ) {
            setStationId(child.stationNaptan!);
            const lines = extractLines("tube", linesData?.lineModeGroups);
            setAvailableLines(lines);
            if (availableLines) {
              setSelectedLines(lines);
            }
          }
        });
      }
    }
  }, [linesData]);

  const onSubmit = (e: FormEvent<HTMLFormElement>, close: () => void) => {
    e.preventDefault();
    const params = new URLSearchParams();
    params.set("stationId", stationId!);
    params.set("direction", direction);
    params.set("lines", (selectedLines ?? availableLines).join(","));
    params.set("name", name!);
    params.set("variant", variant);
    params.set("size", size.toString());
    router.push(pathname + "?" + params.toString());
    close();
  };

  console.log("Matches", searchData?.matches);

  return (
    <DialogTrigger>
      <Button variant="secondary">Change Station</Button>
      <DialogOverlay>
        <DialogContent className="w-full">
          {({ close }) => (
            <>
              <DialogHeader className="text-left">
                <DialogTitle>Change Station</DialogTitle>
                <Form
                  onSubmit={(e) => {
                    onSubmit(e, close);
                  }}
                  // @ts-ignore react-aria-components doest expose this but it does work
                  id="stationForm"
                  className=" text-gray-200 flex flex-col gap-4 pt-6"
                >
                  <Combobox
                    onInputChange={setQuery}
                    aria-label="station select"
                    name="station"
                    isRequired
                    defaultInputValue={searchParams.get("name") ?? ""}
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
                      <ComboboxListBox<TflApiPresentationEntitiesSearchMatch>>
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
                    value={selectedLines}
                    defaultValue={selectedLines}
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
                    defaultValue={"new"}
                    value={variant}
                    isRequired
                  >
                    <Label>Board Style</Label>
                    <Radio value="old">Old</Radio>
                    <Radio value="new">New</Radio>
                  </RadioGroup>
                  <NumberField
                    defaultValue={3}
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
                </Form>
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
