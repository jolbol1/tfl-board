import { cn } from "@/lib/utils";

import type { BoardVariant } from "./types";

export const TrainApproaching = ({ ...props }: { variant?: BoardVariant }) => (
  <BoardRow className="justify-center" {...props}>
    <p className="blink text-center">*** STAND BACK - TRAIN APPROACHING ***</p>
  </BoardRow>
);

export const BoardRow = ({
  className,
  variant = "old",
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { variant?: BoardVariant }) => (
  <div
    className={cn(
      "w-full flex justify-between pt-2 px-1 ",
      { "bg-yellow-400/5": variant === "old" },
      className
    )}
    {...props}
  />
);
