import {IEnvConfig} from './env.model';

// Load runtime environment variables
const runtimeLocalEnv = (window as any).__env__local || {};
const runtimeEnv = (window as any).__env__ || {};

// Destructure and export environment variables
export const envConfig: IEnvConfig = {
  ...runtimeLocalEnv,
  ...runtimeEnv
};
