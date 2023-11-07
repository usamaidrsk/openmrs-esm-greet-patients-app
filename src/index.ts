import { getAsyncLifecycle, defineConfigSchema } from "@openmrs/esm-framework";
import { configSchema } from "./config-schema";

const moduleName = "@openmrs/esm-greet-patients-app";

const options = {
  featureName: "greet-patients",
  moduleName,
};

export const importTranslation = require.context(
  "../translations",
  false,
  /.json$/,
  "lazy"
);

export function startupApp() {
  defineConfigSchema(moduleName, configSchema);
}

export const greetPatients = getAsyncLifecycle(
  () => import("./greet-patients.component"),
  options
);

export const greetPatientsLink = getAsyncLifecycle(
  () => import("./components/greet-patients-link"),
  options
);

