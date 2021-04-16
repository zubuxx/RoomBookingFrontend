import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from "../../../model/User";
import {DataService} from "../../../data.service";
import {Router} from "@angular/router";

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

  constructor(private router: Router,
              private dataService: DataService) { }

  ngOnInit(): void {
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
