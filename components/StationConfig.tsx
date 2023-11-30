"use client";

import { Form } from "react-aria-components";
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
}: {
  spName?: string;
  spStationId?: string;
  spDirection?: string;
  spLines?: string[];
}) => {
  const [query, setQuery] = useState<string>();
  const [direction, setDirection] = useState(spDirection ?? "inbound");
  const [stationId, setStationId] = useState<string | undefined>(spStationId);
  const [availableLines, setAvailableLines] = useState<string[]>(spLines ?? []);
  const [selectedLines, setSelectedLines] = useState<string[]>(spLines ?? []);

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
      query: query ?? "victoria",
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
        setAvailableLines(extractLines("tube", linesData?.lineModeGroups));
        if (availableLines) {
          setSelectedLines(availableLines);
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
            setAvailableLines(extractLines("tube", linesData?.lineModeGroups));
            if (availableLines) {
              setSelectedLines(availableLines);
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
    router.push(pathname + "?" + params.toString());
    close();
  };

  return (
    <DialogTrigger>
      <Button>Change Station</Button>
      <DialogOverlay>
        <DialogContent className="w-fit">
          {({ close }) => (
            <>
              <DialogHeader>
                <DialogTitle>Change Station</DialogTitle>
                <Form
                  onSubmit={(e) => {
                    onSubmit(e, close);
                  }}
                  // @ts-ignore react-aria-components doest expose this but it does work
                  id="stationForm"
                  className=" text-gray-200 flex flex-col"
                >
                  <Combobox
                    onInputChange={setQuery}
                    aria-label="station select"
                    name="station"
                    isRequired
                    defaultInputValue={searchParams.get("name") ?? ""}
                    defaultItems={searchData?.matches ?? []}
                    onSelectionChange={(value) => {
                      setStationId(value as string);
                      setName(
                        searchData?.matches?.find(
                          (ma) => ma.id === (value as string)
                        )?.name
                      );
                    }}
                  >
                    <ComboboxInput
                      className="w-full"
                      placeholder="Search Station"
                    />
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
