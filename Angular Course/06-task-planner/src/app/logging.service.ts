import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggingService {
  log(message: string): void {
    const timeStamp = new Date().toLocaleTimeString();
    console.log(`${timeStamp} - ${message}`);
  }
}
