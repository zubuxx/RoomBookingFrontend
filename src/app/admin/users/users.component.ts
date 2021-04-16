import { Component, OnInit } from '@angular/core';
import {DataService} from "../../data.service";
import {User} from "../../model/User";
import {ActivatedRoute, Router} from "@angular/router";
import {FormResetService} from "../../form-reset.service";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: Array<User>;
  selectedUser: User;
  action: string;
  message = '';
  isLoading = true;
  loadingAttempts = 0;

  constructor(private dataService: DataService,
              private route: ActivatedRoute,
              private router: Router,
              private formResetService: FormResetService) { }

  ngOnInit(): void {
    this.loadData();
  }

  private processUrlParams() {
    this.route.queryParams.subscribe(
      (params) => {
        const id = params['id'];
        this.action = params['action'];
        if (id) {
          this.selectedUser = this.users.find(user => user.id === +id);
        } else {
          this.selectedUser = new User();
          this.formResetService.resetUserFormEvent.emit(this.selectedUser);
        }
      }
    );
  }

  private loadData() {
    this.message = 'The page is loading. Please wait.';
    this.dataService.getUsers().subscribe(
      (next) => {
        this.users = next;
        this.isLoading = false;
      },
      (error) => {
        if (this.loadingAttempts < 10) {
          this.loadingAttempts++;
          setTimeout(() => this.loadData(), 700);
        } else {
         this.message = "Sorry, something went wrong. Please contact support.";
        }
      },
      () => this.processUrlParams()
    );
  }

  setUser(id: number) {
    this.router.navigate(['admin', 'users'], {queryParams : {id, action: 'view'}});
  }

  addUser() {
    this.selectedUser = new User();
    this.router.navigate(['admin', 'users'], {queryParams : {action: 'add'}});

  }

}
