import {EventEmitter, Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {DataService} from "./data.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuthenticated = false;
  authenticationResultEvent = new EventEmitter<boolean>();
  jwtToken: string;

  constructor(private dataService: DataService) { }




  authenticate(name: string, password: string)  {
    this.dataService.validateUser(name, password).subscribe(
      next => {
        // valid
        this.jwtToken = next.result;
        this.isAuthenticated = true;
        this.authenticationResultEvent.emit(true);
      },
      error => {
        // not valid
        this.isAuthenticated = false;
        this.authenticationResultEvent.emit(false);
      }

    );

    if (name === 'kacper' && password === 'secret') {
      this.isAuthenticated = true;
    }
    return this.isAuthenticated;
  }

  getRole() : string {
    if (this.jwtToken == null) return null;
    const encodedPayload = this.jwtToken.split(".")[1];
    const payload = atob(encodedPayload);
    return JSON.parse(payload).role;
  }


}
