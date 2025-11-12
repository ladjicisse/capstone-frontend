import {IEnvConfig} from './env.model';

// Load runtime environment variables
const runtimeEnv = (window as any).__env__ || {};
const runtimeLocalEnv = (window as any).__env__local || {};

// Destructure and export environment variables
export const envConfig: IEnvConfig = {
  ...runtimeEnv,
  ...runtimeLocalEnv
};
