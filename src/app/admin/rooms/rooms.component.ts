import { Component, OnInit } from '@angular/core';
import {DataService} from "../../data.service";
import {Room} from "../../model/Room";
import {ActivatedRoute, Router} from "@angular/router";
import {FormResetService} from "../../form-reset.service";
import {AuthService} from "../../auth.service";

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {


  rooms: Array<Room>;
  selectedRoom: Room;
  action: string;
  loadingData = true;
  message = 'Please wait... getting the list of rooms.';
  reloadAttemps = 0;
  isAdminUser = false;

  constructor(private dataService: DataService,
              private route: ActivatedRoute,
              private router: Router,
              private formResetService: FormResetService,
              private authService: AuthService) { }

  ngOnInit(): void {

    this.loadData();
    if (this.authService.getRole() === 'ADMIN') {
      this.isAdminUser = true;
    }
    // this.route.snapshot.queryParams['id'];
  }

  private processUrlParams() {
    this.route.queryParams.subscribe(
      (params) => {
        const id = params['id'];
        this.action = null;
        if (id) {
          this.selectedRoom = this.rooms.find(room => room.id === +id);
          if (this.selectedRoom) console.log("SELECTED!");
          this.action = params['action'];

        }
        if (params['action'] === 'add') {
          this.selectedRoom = new Room();
          this.action = 'edit';
          this.formResetService.resetRoomFormEvent.emit(this.selectedRoom);
        }
      }
    );
  }

  private loadData() {
    this.dataService.getRooms(this.authService.jwtToken).subscribe(
      (next) => {
        this.rooms = next;
        this.loadingData = false;
      },
      (error) => {
        if (error.status === 402) {
          this.message = 'Sorry - you need to pay to use this application';
        } else {
          console.log(error)
          this.reloadAttemps++;
          if (this.reloadAttemps <= 10) {
            this.message = 'Sorry - something went wrong, please trying again!... please wait! ';
            setTimeout(() => this.loadData(), 1500);
          } else {
            this.message = ' Sorry - something went wrong, please contact support.';
          }
        }
      },
      () => {
        this.processUrlParams();
      }
    );
  }

  setRoom(id: number) {
    this.router.navigate(['admin', 'rooms'], {queryParams : {id, action: 'view'}});
  }

  addRoom() {
    this.router.navigate(['admin', 'rooms'], {queryParams : { action: 'add'}});
  }

}
