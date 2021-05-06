import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from "../../../model/User";
import {DataService} from "../../../data.service";
import {Router} from "@angular/router";
import {AuthService} from "../../../auth.service";

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  @Input()
  user: User;

  @Output()
  dataChangedEvent = new EventEmitter();

  message = '';
  passwordMessage = '';
  passwordResetSuccess = false;

  isAdminUser = false;

  constructor(private router: Router,
              private dataService: DataService,
              private authService: AuthService) { }

  ngOnInit(): void {
    if (this.authService.role === 'ADMIN') {
      this.isAdminUser = true;
    }
    this.authService.roleSetEvent.subscribe(
      next => {
        if (next === 'ADMIN') {
          this.isAdminUser = true;
        }
        else {
          this.isAdminUser = false;
        }
      }
    )
  }

  clear() {
    this.router.navigate(['admin', 'users']);
  }

  edit() {
    this.router.navigate(['admin', 'users'], {queryParams : {id : this.user.id,
      action : 'edit'}});
  }
  deleteUser() {
    this.message = 'Deleting...';
    this.dataService.deleteUser(this.user.id).subscribe(
      next => {
        this.dataChangedEvent.emit();
        this.router.navigate(['admin', 'users']);
      },
      (error) => {
        this.message = "Sorry - this room cannot be deleted at this time.";
      }
    );
  }


  resetPassword() {
    this.dataService.resetUserPassword(this.user.id).subscribe(
      (next) => {
        this.passwordMessage = 'Password has been reseted.';
        this.passwordResetSuccess = true;
      },
      (error) => {
        this.passwordMessage = 'Error. Cannot reset the password.';
        this.passwordResetSuccess = false;
      }
    );
  }

}
