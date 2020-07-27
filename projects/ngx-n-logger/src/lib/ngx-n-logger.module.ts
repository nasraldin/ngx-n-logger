import { ModuleWithProviders, NgModule } from '@angular/core';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoggerConfig } from './logger.config';
import { NgxNLoggerInterceptor } from './ngx-n-logger.interceptor';
import { NgxNLoggerService } from './ngx-n-logger.service';

export function enableInterceptorLogging(config: LoggerConfig): any {
  if (config.enableInterceptorLogging) {
    return {
      provide: HTTP_INTERCEPTORS,
      useClass: NgxNLoggerInterceptor,
      multi: true,
    };
  }
}

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
        {
          provide: LoggerConfig,
          useValue: config || {},
        },
        NgxNLoggerService,
        enableInterceptorLogging(config),
      ],
    };
  }
}
