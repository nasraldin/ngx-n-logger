# NgxNLogger

This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.0.5.

NGX N Logger is a simple logging module for angular (v6 and above). It allows "pretty print" to the console, as well as make debugging easier with more readable and full configurable fancy logs.

<img src="https://github.com/nasraldin/ngx-n-logger/blob/master/img/ngx-n-logger.png">

# Key Features:

- 📌 Log Levels Labels (All, Debug, Info, Warn, Error, Fatal, Off)
- 📌 Config isProduction, Can Disable all Logs
- 📌 Show/Hide Styles, Log Time, Labels, Emoji 😎 for each log level,
- 📌 Log Level colors and emojis are configurable
- 📌 Show Header on console configurable
- 📌 Debug RxJS Observable Stream using debugOperator() operator function
- 📌 Can configure each setting
- 📌 Environment Specific Log Level Restriction. eg. if you set logLevel to LogLevel.WARNING, it will only show logs for WARNING and ERROR
- 📌 .....

## Options will support in next release

- 📌 log writers to Endpoint, Loggly, Logstash, LocalStorage, Files

## Dependencies

- @angular/common
- @angular/core

## Installation

```shell
npm install --save ngx-n-logger
```

Once installed you need to import our main module:

```typescript
import { NgxNLoggerModule } from 'ngx-n-logger';
```

The only remaining part is to list the imported module in your application module, passing in a config to intialize the logger.

```typescript
@NgModule({
  ...,
  imports: [
    ...,
    NgxNLoggerModule,
    // NgxNLoggerModule.forRoot({
    //   isProduction: false,
    //   applicationName: 'Ngx N Logger',
    //   showStyles: false,
    //   showLabel: true,
    //   showTime: true,
    // }),
    ]
  bootstrap: [AppComponent]
})
export class AppModule {
}
```

## Usage

To use the Logger, you will need import it locally, then call one of the logging functions

```typescript
import { Component } from '@angular/core';
import { NgxNLoggerService } from 'ngx-n-logger';

@Component({
  selector: 'your-component',
  templateUrl: './your.component.html',
  styleUrls: ['your.component.scss'],
})
export class YourComponent {
  info = {
    auther: {
      email: 'nasr2ldin@gmail.com',
      website: 'http://nasraldin.com',
      twitter: 'https://twitter.com/nasraldin',
    },
    git: 'https://github.com/nasraldin/ngx-n-logger',
    npm: 'https://www.npmjs.com/package/ngx-n-logger',
  };

  constructor(private logger: NgxNLoggerService) {
    logger.clear();
    logger.header('ngx-n-logger is running! - faster logging 😎');
    logger.log(this.info);
    logger.debug('log debug', this.info);
    logger.info('log info', this.info);
    logger.warn('log warn', this.info);
    logger.error('log error', this.info);
    logger.fatal('log fatal', this.info);
    logger.trace('log trace', this.info);
    logger.table('log trace', this.info);
  }
}
```
