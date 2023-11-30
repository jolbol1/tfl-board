import { Clock } from "@/components/Clock";
import { StationConfig } from "@/components/StationConfig";
import { TrainTimes } from "@/components/TrainTimes";
import { cn } from "@/lib/utils";
import { parseAsArrayOf, parseAsString } from "next-usequerystate/parsers";

type PageProps = {
  searchParams: {
    name?: string;
    stationId?: string;
    direction?: string;
    lines?: string[];
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

export default async function Home({ searchParams }: PageProps) {
  const name = nameParser.parseServerSide(searchParams.name);
  const stationId = stationIdParser.parseServerSide(searchParams.stationId);
  const direction = directionParser.parseServerSide(searchParams.direction);
  const lines = linesParser.parseServerSide(searchParams.lines);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 font-sans text-gray-200 relative gap-4">
      <h1 className="font-bold font-sans ">{name}</h1>
      <DepartureBoard variant="old">
        <TrainTimes
          stationId={stationId}
          availableLines={lines}
          direction={direction as "inbound" | "outbound"}
          variant="old"
        />
        <Clock variant="old" />
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
      "grid grid-rows-4 w-4/5 border-[20px] max-w-[1200px] border-black gap-4 font-tfl text-yellow-400",
      {
        "bg-black": variant === "old",
        "bg-zinc-950": variant === "new",
      }
    )}
    {...props}
  />
);
