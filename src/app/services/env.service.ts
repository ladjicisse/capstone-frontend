import { Injectable } from '@angular/core';
import {IEnvConfig} from '../../config/env.model';
import {envConfig} from '../../config/env.config';

@Injectable({
  providedIn: 'root',
})
export class EnvService {
  private readonly config: IEnvConfig = envConfig;
  private isDynamicRumEnabled: boolean = false;

  constructor() {
    this.injectDynamicRumScript();
  }

  // Generic method to get environment variables
  get(key: keyof IEnvConfig): string | string[] | undefined {
    return this.config[key];
  }

  getDynamicRumUrl(): string | undefined {
    return this.config.DYNATRACE_RUM_URL;
  }

  private injectDynamicRumScript(): void {

    if(this.isDynamicRumEnabled) return;

    const dynatraceRumUrl = this.config.DYNATRACE_RUM_URL;

    if (!dynatraceRumUrl) {
      console.error('Dynamic RUM URL is not configured');
      return;
    }

    const script = document.createElement('script');

    script.src = dynatraceRumUrl;
    script.type = 'text/javascript';
    script.async = true;
    script.onload = () => {
      this.isDynamicRumEnabled = true;
      console.log('Dynamic RUM script loaded successfully');
    };
    script.onerror = () => {
      this.isDynamicRumEnabled = false;
      console.error('Failed to load Dynamic RUM script');
    };

    document.head.appendChild(script);
  }

  logConfig(): void {
    console.log('Environment Configuration:');
    console.table(this.config);
  }
}
