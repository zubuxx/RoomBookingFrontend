import {Component, Input, OnInit} from '@angular/core';
import {Room} from "../../../model/Room";
import {Router} from "@angular/router";
import {DataService} from "../../../data.service";

@Component({
  selector: 'app-room-detail',
  templateUrl: './room-detail.component.html',
  styleUrls: ['./room-detail.component.css']
})
export class RoomDetailComponent implements OnInit {

  @Input()
  room: Room;

  constructor(private router: Router,
              private dataSevice: DataService) { }

  ngOnInit(): void {
  }


  editRoom() {
    this.router.navigate(['admin', 'rooms'],
      {queryParams : {action : 'edit', id: this.room.id}}
    );
  }

  deleteRoom() {
    this.dataSevice.deleteRoom(this.room.id);
    this.router.navigate(['admin', 'rooms'])
  }


}
