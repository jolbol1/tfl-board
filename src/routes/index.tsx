import { createFileRoute, stripSearchParams } from "@tanstack/react-router";

import { Clock } from "@/components/Clock";
import { StationConfig } from "@/components/StationConfig";
import { TrainTimes } from "@/components/TrainTimes";
import { cn } from "@/lib/utils";

const defaultSearch = {
  name: "Victoria",
  stationId: "940GZZLUVIC",
  direction: "inbound" as const,
  lines: ["circle", "district", "victoria"],
  variant: "new" as const,
  size: 3,
};

function readString(value: unknown, fallback: string) {
  return typeof value === "string" && value.length > 0 ? value : fallback;
}

function readLines(value: unknown) {
  if (Array.isArray(value)) {
    const lines = value.filter((line): line is string => typeof line === "string");
    return lines.length > 0 ? lines : defaultSearch.lines;
  }

  if (typeof value === "string") {
    const lines = value.split(",").filter(Boolean);
    return lines.length > 0 ? lines : defaultSearch.lines;
  }

  return defaultSearch.lines;
}

function readSize(value: unknown) {
  const parsed = typeof value === "number" ? value : Number(value);
  return Number.isInteger(parsed) && parsed >= 0 ? parsed : defaultSearch.size;
}

const validateSearch = (search: Record<string, unknown>) => ({
  name: readString(search.name, defaultSearch.name),
  stationId: readString(search.stationId, defaultSearch.stationId),
  direction: search.direction === "outbound" ? "outbound" as const : "inbound" as const,
  lines: readLines(search.lines),
  variant: search.variant === "old" ? "old" as const : "new" as const,
  size: readSize(search.size),
});

export const Route = createFileRoute("/")({
  validateSearch,
  search: {
    middlewares: [stripSearchParams(defaultSearch)],
  },
  component: Home,
});

function Home() {
  const { name, stationId, direction, lines, variant, size } = Route.useSearch();

  return (
    <main className="relative flex grow flex-col items-center justify-center gap-4 py-2 font-sans text-xs text-gray-200 sm:text-base md:text-lg lg:text-2xl 2xl:text-4xl">
      <h1 className="text-center font-sans text-xl font-bold text-balance sm:text-2xl">
        {name}
      </h1>
      <DepartureBoard variant={variant}>
        <TrainTimes
          stationId={stationId}
          availableLines={lines}
          direction={direction}
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
        spVariant={variant}
        spSize={size}
      />
    </main>
  );
}

function DepartureBoard({
  variant = "old",
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  variant?: "old" | "new";
}) {
  return (
    <div
      className={cn(
        "grid w-full max-w-[1200px] grid-rows-4 gap-4 border-[20px] border-black font-tfl text-yellow-400 md:w-4/5",
        {
          "bg-black": variant === "old",
          "bg-zinc-950": variant === "new",
        },
      )}
      {...props}
    />
  );
}
