export interface IEnvConfig {
  API_BASE_URL: string;
  DYNATRACE_RUM_URL: string;
  AZURE_CLIENT_ID: string;
  AZURE_TENANT_ID: string;
  [key: string]: string | string[];
}
