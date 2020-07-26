import { Component } from '@angular/core';
// import { LogService } from 'projects/ngx-n-logger/src/lib/services/log.service';
import { NgxNLoggerService } from '../../../ngx-n-logger/src/lib/ngx-n-logger.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'ngx-n-logger demo';

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
  }
}
