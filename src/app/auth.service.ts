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
  roleSetEvent = new EventEmitter<string>();

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

    return this.isAuthenticated;
  }



  private setupRole() {
    this.dataService.getRole().subscribe(
      next => {
        this.role = next.role;
        this.roleSetEvent.emit(next.role);
      }
    )
  }

  checkIfAlreadyAuthenticated() {
    this.dataService.getRole().subscribe(
      next => {
        if(next.role !== '') {
          this.role = next.role;
          this.roleSetEvent.emit(next.role);
          this.isAuthenticated = true;
          this.authenticationResultEvent.emit(true);
        }
      }

    )
  }

  logout() {
    this.dataService.logoutUser().subscribe();
    this.isAuthenticated = false;
    this.authenticationResultEvent.emit(false);
  }

}
