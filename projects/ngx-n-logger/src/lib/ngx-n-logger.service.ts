import { Injectable, Optional } from '@angular/core';
import { tap } from 'rxjs/operators';
import { MonoTypeOperatorFunction } from 'rxjs';
import {
  LoggerConfig,
  DefaultColors,
  DefaultBGColors,
  DefaultEmojis,
  HeaderConfig,
  DefaultLableColors,
} from './logger.config';
import { LoggerLevel } from './logger.level';

@Injectable({
  providedIn: 'root',
})
export class NgxNLoggerService {
  private defaultConfig = new LoggerConfig();
  private config: LoggerConfig;
  private levelPrefix = {};

  constructor(@Optional() loggerConfig: LoggerConfig) {
    this.config = this.defaultConfig;
    this.updateConfig(loggerConfig);
  }

  private setPrefix(): void {
    if (this.config.disableLogs) {
      return;
    }

    for (const key in LoggerLevel) {
      if (!isNaN(Number(key))) {
        let prefix = this.config.showEmoji
          ? this.config.logEmoji[key] || `${DefaultEmojis[key]} `
          : '';
        if (this.config.showLabel) {
          prefix += `[${LoggerLevel[key].toUpperCase()}]`;
        }
        if (this.config.applicationName) {
          prefix += ` App: ${this.config.applicationName}`;
        }
        if (this.config.appVersion) {
          prefix += ` AppVersion: ${this.config.appVersion}`;
        }
        this.levelPrefix[key] = prefix;
      }
    }
  }

  private showTime = () => {
    return this.config.showTime ? ` @ ${new Date().toLocaleTimeString()}` : '';
  }

  private showStyles = (level: LoggerLevel) => {
    return this.config.showStyles
      ? this.getStyles(level)
      : this.labelColors(level);
  }

  private getStyles = (level: LoggerLevel) =>
    `font-size: ${this.config.fontSize || 13}px; color:${
      DefaultColors[level]
    }; background-color:${
      this.config.bgColor[level] || DefaultBGColors[level]
    }; padding: 0px 2px; border-radius: 2px`;

  private labelColors = (level: LoggerLevel) => `color:${DefaultLableColors[level]};`;

  private logger(level: LoggerLevel, ...args: any[]): void {
    if (this.config.isProduction) {
      return;
    }

    let method = 'log';
    switch (level) {
      case LoggerLevel.Trace:
        method = 'trace';
        break;
      case LoggerLevel.Debug:
        method = 'debug';
        break;
      case LoggerLevel.Info:
        method = 'info';
        break;
      case LoggerLevel.Warn:
        method = 'warn';
        break;
      case LoggerLevel.Error:
        method = 'error';
        break;
      case LoggerLevel.Fatal:
        method = 'error';
        break;
      case 8:
        method = 'table';
        break;
      default:
        method = 'log';
        break;
    }
    if (this.config.disableLogs || level < this.config.logLevel) {
      return;
    }
    console[method](
      `%c${this.levelPrefix[level]}${this.showTime()}`,
      this.showStyles(level),
      ...args,
    );
  }

  updateConfig(loggerConfig: LoggerConfig | null | undefined): void {
    this.config = { ...this.config, ...loggerConfig };
    this.setPrefix();
  }

  resetConfig(): void {
    this.config = this.defaultConfig;
    this.setPrefix();
  }

  log(...args: any[]): void {
    this.logger(LoggerLevel.Debug, ...args);
  }

  trace(...args: any[]): void {
    this.logger(LoggerLevel.Trace, ...args);
  }

  debug(...args: any[]): void {
    this.logger(LoggerLevel.Debug, ...args);
  }

  info(...args: any[]): void {
    this.logger(LoggerLevel.Info, ...args);
  }

  warn(...args: any[]): void {
    this.logger(LoggerLevel.Warn, ...args);
  }

  error(...args: any[]): void {
    this.logger(LoggerLevel.Error, ...args);
  }

  fatal(...args: any[]): void {
    this.logger(LoggerLevel.Fatal, ...args);
  }

  table(...args: any[]): void {
    this.logger(8, ...args);
  }

  clear(): void {
    console.clear();
  }

  header(title: string, config: HeaderConfig = {}): void {
    const styles = `font-size: ${config.fontSize || 20}px; color:${
      config.color || '#001871'
    }; text-shadow: #ddd 2px 2px 2px`;
    console.log(`%c${title}`, styles);
  }

  debugOperator = <T>(
    message?: string,
    logLevel = LoggerLevel.Debug,
  ): MonoTypeOperatorFunction<T> => tap((data) => { this.logger(logLevel, message || '', data); })
}
