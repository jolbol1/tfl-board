import { Clock } from "@/components/Clock";
import { TrainTimes } from "@/components/TrainTimes";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 font-tfl text-yellow-400 text-4xl">
      <div className="grid grid-rows-4 w-4/5 border-[20px] max-w-[1200px] border-black bg-black gap-4">
        <TrainTimes />
        <div className="flex w-full justify-center bg-black h-fit">
          <Clock />
        </div>
      </div>
    </main>
  );
}
