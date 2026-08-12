import { ARGS } from "@/cli/args";

(async function () {
  if (ARGS.help) {
    const { printHelp } = await import("@/cli/printHelp");
    printHelp();
    return;
  }

  const isAll = ARGS.mode === "all";

  if (isAll || ARGS.mode === "db") {
    const { importDb } = await import("@/cli/importDb");
    await importDb();
  }

  if (isAll || ARGS.mode === "code") {
    const { generateCode } = await import("@/cli/generateCode");
    await generateCode();
  }
})();
