import { Clock } from "@/components/Clock";
import { StationConfig } from "@/components/StationConfig";
import { TrainTimes } from "@/components/TrainTimes";
import { cn } from "@/lib/utils";
import {
  parseAsArrayOf,
  parseAsInteger,
  parseAsString,
} from "next-usequerystate/parsers";

type PageProps = {
  searchParams: {
    name?: string;
    stationId?: string;
    direction?: string;
    lines?: string[];
    variant?: string;
    size?: string;
  };
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

export default async function Home({ searchParams }: PageProps) {
  const name = nameParser.parseServerSide(searchParams.name);
  const stationId = stationIdParser.parseServerSide(searchParams.stationId);
  const direction = directionParser.parseServerSide(searchParams.direction);
  const lines = linesParser.parseServerSide(searchParams.lines);
  const variant = variantParser.parseServerSide(searchParams.variant) as
    | "old"
    | "new";
  const size = sizeParser.parseServerSide(searchParams.size);

  return (
    <main className="flex grow flex-col items-center justify-center py-2 font-sans text-gray-200 relative gap-4 text-xs sm:text-base md:text-lg lg:text-2xl 2xl:text-4xl">
      <h1
        // @ts-ignore supported in latest chrome
        style={{ textWrap: "balance" }}
        className="font-bold font-sans text-center text-xl sm:text-2xl"
      >
        {name}
      </h1>
      <DepartureBoard variant={variant}>
        <TrainTimes
          stationId={stationId}
          availableLines={lines}
          direction={direction as "inbound" | "outbound"}
          variant={variant}
          size={size}
        />
        <Clock variant={variant} />
      </DepartureBoard>
      <StationConfig
        spStationId={stationId}
        spName={name}
        spDirection={direction}
        spLines={lines}
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
