import {IEnvConfig} from './env.model';

// Load runtime environment variables
const runtimeEnv = (window as any).__env__ || {};

export const defaultEnvConfig: IEnvConfig = {
  API_BASE_URL: 'http://localhost:3000',
  DYNATRACE_RUM_URL: 'assets/test-rum.js',
  AZURE_CLIENT_ID: 'e08d263a-755d-4a31-a390-e5e2846443cb',
  AZURE_TENANT_ID: '7e451056-8a8c-4287-8f99-22c7ea99fb77',
}

// Merge runtime environment variables with default configuration
export const envConfig: IEnvConfig = {
  ...defaultEnvConfig,
  ...runtimeEnv
};
