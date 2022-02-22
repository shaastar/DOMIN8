import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModeHandlerService {

  constructor() { }
  darkModeEnabled= new BehaviorSubject(false);
  // private mode = new BehaviorSubject(this.darkModeEnabled);

  toggleMode(mode:boolean){
    this.darkModeEnabled.next(mode);
  }

  observeModeChange(){
    return this.darkModeEnabled.asObservable();
  }

}
