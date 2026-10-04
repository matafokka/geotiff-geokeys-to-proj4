import { ARGS } from "@/cli/args";
import { measure } from "@/shared/utils/perf";

(async function () {
  if (ARGS.help) {
    const { printHelp } = await import("@/cli/printHelp");
    printHelp();
    return;
  }

  const isAll = ARGS.mode === "all";

  if (isAll || ARGS.mode === "db") {
    const { importEPSG } = await import("@/cli/importEPSG");
    await measure("Import EPSG database", importEPSG); // There
  }

  if (isAll || ARGS.mode === "code") {
    const { generateMappings } = await import("@/cli/generateMappings");
    await generateMappings();
  }
})();
