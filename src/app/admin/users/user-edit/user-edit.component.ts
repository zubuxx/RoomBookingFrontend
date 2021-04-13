import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {User} from "../../../model/User";
import {DataService} from "../../../data.service";
import {Router} from "@angular/router";
import {FormResetService} from "../../../form-reset.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit, OnDestroy {


  @Input()
  user: User;
  message: string;

  formUser: User;

  password: string;
  password2: string;

  nameIsValid = false;
  passwordIsValid = false;
  passwordsMatches = false;

  resetEventSubscription: Subscription;



  constructor(private dataService: DataService,
              private router: Router,
              private formResetService: FormResetService) { }

  ngOnInit(): void {
    this.initialize();
    this.resetEventSubscription = this.formResetService.resetUserFormEvent.subscribe(
      user  => {
        this.user = user;
        this.initialize();
      }
    );

  }

  initialize() {
    this.formUser = Object.assign({}, this.user);
    this.checkIfNameIsValid();
    this.checkIfPasswordIsValid();
  }

  onSubmit() {
    if (this.formUser.id == null) {
      this.dataService.addUser(this.formUser, this.password).subscribe(
        (user) => {
          this.router.navigate(['admin', 'users'],
            {queryParams: {id: this.formUser.id, action: 'view'}});
        }
      );
    } else {
      this.dataService.updateUser(this.formUser).subscribe(
        (user) => {
          this.router.navigate(['admin', 'users'],
            {queryParams: {id: this.formUser.id, action: 'view'}});
        }
      );
    }
  }

  checkIfNameIsValid() {
    if (this.formUser.name) {
      this.nameIsValid = this.formUser.name.trim().length > 0;
    }
    else {
      this.nameIsValid = false;
    }
  }

  checkIfPasswordIsValid() {
    if (this.formUser.id != null) {
      this.passwordIsValid = true;
      this.passwordsMatches = true;
    }
    else {
      this.passwordsMatches = this.password === this.password2;
      if (this.password) {
        this.passwordIsValid = this.password.trim().length > 0;
      }
      else {
        this.passwordIsValid = false;
      }
    }
  }
  ngOnDestroy(): void {
    this.resetEventSubscription.unsubscribe();
  }

  }


