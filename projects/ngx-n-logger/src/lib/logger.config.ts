import { LoggerLevel } from './logger.level';

export class LoggerConfig {
  applicationName?: string;
  appVersion?: string;
  isProduction?: boolean;
  environment?: string;
  logLevel ? = LoggerLevel.All;
  enableInterceptorLogging ? = false;
  showStyles ? = true;
  showTime ? = true;
  showEmoji ? = true;
  showLabel ? = true;
  disableLogs ? = false;
  fontSize?: number;
  labelColor?: {
    [logLevel: number]: string;
  } = {};
  bgColor?: {
    [logLevel: number]: string;
  } = {};
  logEmoji?: {
    [logLevel: number]: string;
  } = {};
}

export const DefaultColors = {
  [LoggerLevel.Trace]: '#fff',
  [LoggerLevel.Debug]: '#000000',
  [LoggerLevel.Info]: '#000000',
  [LoggerLevel.Warn]: '#fff',
  [LoggerLevel.Error]: '#fff',
  [LoggerLevel.Fatal]: '#fff',
};

export const DefaultLableColors = {
  [LoggerLevel.Trace]: '#000080',
  [LoggerLevel.Debug]: '#1976d2',
  [LoggerLevel.Info]: '#000000',
  [LoggerLevel.Warn]: '#FF6419',
  [LoggerLevel.Error]: '#F1062D',
  [LoggerLevel.Fatal]: 'red',
};

export const DefaultBGColors = {
  [LoggerLevel.Trace]: '#e42c64',
  [LoggerLevel.Debug]: '#00BFFE',
  [LoggerLevel.Info]: '#1ee3cf',
  [LoggerLevel.Warn]: '#FF6419',
  [LoggerLevel.Error]: '#F1062D',
  [LoggerLevel.Fatal]: '#6b48ff',
};

export const DefaultEmojis = {
  [LoggerLevel.Trace]: '🤿',
  [LoggerLevel.Debug]: '💻',
  [LoggerLevel.Info]: '✔',
  [LoggerLevel.Warn]: '🙄',
  [LoggerLevel.Error]: '😲',
  [LoggerLevel.Fatal]: '😱',
};

export interface HeaderConfig {
  color?: string;
  fontSize?: number;
}

export interface FormatOutput {
  label: string;
  style: string;
}
