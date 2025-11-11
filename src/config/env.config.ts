import {IEnvConfig} from './env.model';

// Load runtime environment variables
const runtimeEnv = (window as any).__env__ || {};

export const defaultEnvConfig: IEnvConfig = {
  API_BASE_URL: 'http://localhost:3000',
  DYNATRACE_RUM_URL: 'assets/test-rum.js'
}

// Merge runtime environment variables with default configuration
export const envConfig: IEnvConfig = {
  ...defaultEnvConfig,
  ...runtimeEnv
};
