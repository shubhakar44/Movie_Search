import * as logger from 'loglevel';


import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class LoggerService {

  constructor(public datePipe: DatePipe) {
  }

  formatMSG(msg: string) {
    // const datePipe: DatePipe = new DatePipe();
    const logDate = new Date();
    const formatdate: string = this.datePipe.transform(logDate, 'dd/MM hh:mm');
    //custom format
    return ('[' + formatdate + ']'  + ': ' + msg);
  }


  console(msg: string) {
    logger.debug(this.formatMSG(msg));
  }


}
