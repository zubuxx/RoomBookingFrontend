import {EventEmitter, Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {DataService} from "./data.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuthenticated = false;
  authenticationResultEvent = new EventEmitter<boolean>();
  role: string;

  constructor(private dataService: DataService) { }




  authenticate(name: string, password: string)  {
    this.dataService.validateUser(name, password).subscribe(
      next => {
        this.setupRole();
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



  private setupRole() {
    this.dataService.getRole().subscribe(
      next => {
        this.role = next.role;
      }
    )
  }

  checkIfAlreadyAuthenticated() {
    this.dataService.getRole().subscribe(
      next => {
        if(next.role !== '') {
          this.isAuthenticated = true;
          this.authenticationResultEvent.emit(true);
        }
      }

    )
  }

}
