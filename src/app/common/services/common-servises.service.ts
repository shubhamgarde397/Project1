import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CommonServisesService {
  private msgService = new BehaviorSubject([]);
  public data = this.msgService.asObservable();

  saveData(data) {
    this.msgService.next(data);
    console.log(this.msgService);

  }
  constructor() { }
}
