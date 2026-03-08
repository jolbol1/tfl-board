import { Clock } from "@/components/Clock";
import { StationConfig } from "@/components/StationConfig";
import { TrainTimes } from "@/components/TrainTimes";
import { cn } from "@/lib/utils";
import {
  createLoader,
  parseAsArrayOf,
  parseAsInteger,
  parseAsString,
} from "nuqs/server";

type PageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

const nameParser = parseAsString.withDefault("Victoria");
const stationIdParser = parseAsString.withDefault("940GZZLUVIC");
const directionParser = parseAsString.withDefault("inbound");
const linesParser = parseAsArrayOf(parseAsString).withDefault([
  "circle",
  "district",
  "victoria",
]);
const variantParser = parseAsString.withDefault("new");
const sizeParser = parseAsInteger.withDefault(3);
const loadSearchParams = createLoader({
  name: nameParser,
  stationId: stationIdParser,
  direction: directionParser,
  lines: linesParser,
  variant: variantParser,
  size: sizeParser,
});

export default async function Home({ searchParams }: PageProps) {
  const { name, stationId, direction, lines, variant, size } =
    await loadSearchParams(searchParams);

  const boardVariant = variant as
    | "old"
    | "new";

  return (
    <main className="flex grow flex-col items-center justify-center py-2 font-sans text-gray-200 relative gap-4 text-xs sm:text-base md:text-lg lg:text-2xl 2xl:text-4xl">
      <h1
        style={{ textWrap: "balance" as const }}
        className="font-bold font-sans text-center text-xl sm:text-2xl"
      >
        {name}
      </h1>
      <DepartureBoard variant={boardVariant}>
        <TrainTimes
          stationId={stationId}
          availableLines={lines}
          direction={direction as "inbound" | "outbound"}
          variant={boardVariant}
          size={size}
        />
        <Clock variant={boardVariant} />
      </DepartureBoard>
      <StationConfig
        spStationId={stationId}
        spName={name}
        spDirection={direction}
        spLines={lines}
        spVariant={boardVariant}
        spSize={size}
      />
    </main>
  );
}

const DepartureBoard = ({
  variant = "old",
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  variant?: "old" | "new";
}) => (
  <div
    className={cn(
      "grid grid-rows-4 w-full md:w-4/5 border-[20px] max-w-[1200px] border-black gap-4 font-tfl text-yellow-400",
      {
        "bg-black": variant === "old",
        "bg-zinc-950": variant === "new",
      }
    )}
    {...props}
  />
);
