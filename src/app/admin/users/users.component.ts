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

  constructor(private dataService: DataService,
              private route: ActivatedRoute,
              private router: Router,
              private formResetService: FormResetService) { }

  ngOnInit(): void {
    this.dataService.getUsers().subscribe(
      (next) => {
        this.users = next;
      }
    );

    this.route.queryParams.subscribe(
      (params) => {
        const id = params['id'];
        this.action = params['action'];
        if (id) {
          this.selectedUser = this.users.find(user => user.id === +id);
        }
        else {
          this.selectedUser = new User();
          this.formResetService.resetUserFormEvent.emit(this.selectedUser);
        }
      }
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
