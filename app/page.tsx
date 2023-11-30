import { Clock } from "@/components/Clock";
import { TrainTimes } from "@/components/TrainTimes";
import { cn } from "@/lib/utils";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 font-tfl text-yellow-400 text-4xl">
      <DepartureBoard variant="new">
        <TrainTimes variant="new" />
        <Clock variant="new" />
      </DepartureBoard>
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
      "grid grid-rows-4 w-4/5 border-[20px] max-w-[1200px] border-black gap-4",
      {
        "bg-black": variant === "old",
        "bg-zinc-950": variant === "new",
      }
    )}
    {...props}
  />
);
