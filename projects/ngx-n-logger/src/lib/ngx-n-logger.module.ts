import { ModuleWithProviders, NgModule } from '@angular/core';

import { LoggerConfig } from './logger.config';
import { NgxNLoggerService } from './ngx-n-logger.service';

@NgModule({
  providers: [NgxNLoggerService],
})
export class NgxNLoggerModule {
  static forRoot(
    config: LoggerConfig | null | undefined,
  ): ModuleWithProviders<NgxNLoggerModule> {
    return {
      ngModule: NgxNLoggerModule,
      providers: [
        { provide: LoggerConfig, useValue: config || {} },
        NgxNLoggerService,
      ],
    };
  }
}
