import { parseFloatLoose } from "@/utils/misc";

const DEFAULT_PORT = 5432;

export const ARGS = {
  user: "user",
  host: "localhost",
  database: "postgres",
  password: "",
  port: DEFAULT_PORT,
  schema: "epsg",
  mode: "all",
  help: false,
};

function toArgName(v: string) {
  if (v.startsWith("--")) {
    return v.substring(2);
  }

  if (v.startsWith("-") && v.length === 2) {
    return v[1];
  }

  return "";
}

function isArg(v: string) {
  return !!toArgName(v);
}

function isKnownArg(v: string): v is keyof typeof ARGS | "h" {
  return v in ARGS;
}

function toBool(v: string, def = true): boolean {
  if (!v) {
    return def;
  }

  v = v.toLowerCase();
  return v !== "0" && v !== "false";
}

const argsStart = process.argv.findIndex((arg) => arg.startsWith("--"));

if (argsStart !== -1) {
  const modes = new Set(["all", "db", "code"]);
  let i = argsStart;

  while (i < process.argv.length) {
    const name = toArgName(process.argv[i]);
    let value = process.argv[i + 1] || "";

    if (isArg(value)) {
      value = "";
      i++;
    } else {
      i += 2;
    }

    if (!isKnownArg(name)) {
      continue;
    }

    switch (name) {
      case "port":
        ARGS[name] = parseFloatLoose(value, DEFAULT_PORT);
        break;

      case "mode":
        if (modes.has(value)) {
          ARGS[name] = value;
        }

        break;

      case "h":
      case "help":
        ARGS.help = toBool(value);
        break;

      default:
        ARGS[name] = value;
        break;
    }
  }
}
