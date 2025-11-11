export interface IEnvConfig {
  API_BASE_URL: string;
  DYNATRACE_RUM_URL: string;
  [key: string]: string | string[];
}
