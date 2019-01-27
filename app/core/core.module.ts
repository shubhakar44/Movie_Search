import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { LoggerService } from './logger-service';
import { ApiService } from './api-service';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [
    HttpClientModule
  ],
  providers: [ApiService, LoggerService, DatePipe],
})

export class CoreModule {}
