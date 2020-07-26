import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { NgxNLoggerModule } from './../../../ngx-n-logger/src/lib/ngx-n-logger.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxNLoggerModule.forRoot({
      isProduction: false,
      applicationName: 'Ngx N Logger',
      showStyles: false,
      showLabel: true,
      showTime: true,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
