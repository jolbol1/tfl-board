import { writeFile } from "node:fs/promises";

const SOURCE_URL = "https://api.tfl.gov.uk/StopPoint/Mode/tube";
const OUTPUT_PATH = new URL("../data/tube-stations.json", import.meta.url);

function normalizeStationName(name) {
  return name.trim();
}

function toStationEntries(stopPoints) {
  const dedupedStations = new Map();

  for (const stopPoint of stopPoints) {
    if (!stopPoint?.stationNaptan || !stopPoint?.commonName) {
      continue;
    }

    if (!dedupedStations.has(stopPoint.stationNaptan)) {
      dedupedStations.set(stopPoint.stationNaptan, {
        id: stopPoint.stationNaptan,
        name: normalizeStationName(stopPoint.commonName),
      });
    }
  }

  return [...dedupedStations.values()].sort((a, b) =>
    a.name.localeCompare(b.name)
  );
}

async function main() {
  const response = await fetch(SOURCE_URL, {
    headers: {
      accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`TfL request failed: ${response.status}`);
  }

  const payload = await response.json();
  const stations = toStationEntries(payload.stopPoints ?? []);

  await writeFile(OUTPUT_PATH, `${JSON.stringify(stations, null, 2)}\n`, "utf8");

  console.log(`Wrote ${stations.length} tube stations to ${OUTPUT_PATH.pathname}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
