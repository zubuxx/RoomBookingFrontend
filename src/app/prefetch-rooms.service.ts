import { Injectable } from '@angular/core';
import {Resolve} from "@angular/router";
import {Observable} from "rxjs";
import {Room} from "./model/Room";
import {DataService} from "./data.service";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class PrefetchRoomsService implements Resolve<Observable<Array<Room>>>{

  constructor(private dataService: DataService,
              private authService: AuthService) { }

  resolve() {
    return this.dataService.getRooms(this.authService.jwtToken);
  }
}
