/**
 * Env-variables initialization module
 * @remark If the value of at least one variable is not found,
 * The application will immediately throw an error when initializing the module
 * @module
 */

/**
 * Getting an env variable
 * @throwable
 */
const getEnvVar = (key: string): string | never => {
  if (process.env[key] === undefined) {
    throw new Error(`Env variable ${key} is required`);
  }
  return process.env[key] ?? "";
};

/** API entrypoint */
export const API_URL = getEnvVar("REACT_APP_API_URL");

/** Program start mode */
export const NODE_ENV = getEnvVar("NODE_ENV");
/** Development mode */
export const isDevEnv = NODE_ENV === "development";
/** Production mode */
export const isProdEnv = NODE_ENV === "production";
