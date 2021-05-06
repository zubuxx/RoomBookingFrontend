import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Layout, LayoutCapacity, Room} from "../../../model/Room";
import {Router} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {DataService} from "../../../data.service";
import {FormResetService} from "../../../form-reset.service";
import {Subscription} from "rxjs";
import {AuthService} from "../../../auth.service";

@Component({
  selector: 'app-room-edit',
  templateUrl: './room-edit.component.html',
  styleUrls: ['./room-edit.component.css']
})
export class RoomEditComponent implements OnInit, OnDestroy {




  @Input()
  room: Room;

  @Output()
  dataChangedEvent = new EventEmitter();

  message = '';

  layoutEnum = Layout;
  layouts = Object.keys(Layout);

//   roomForm = new FormGroup(
//     {
//       roomName: new FormControl('roomName'),
//       location: new FormControl('location'),
//     }
// );

  roomForm: FormGroup;

  resetEventSubscription: Subscription;


  constructor(private formBuilder: FormBuilder,
              private dataService: DataService,
              private router: Router,
              private formResetService: FormResetService,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.initializeForm();
    this.resetEventSubscription = this.formResetService.resetRoomFormEvent.subscribe(
      room => {
        this.room = room;
        this.initializeForm();
      }
    )

  }

  initializeForm() {
    this.roomForm = this.formBuilder.group(
      {
        roomName: [this.room.name, Validators.required],
        location: [this.room.location, [Validators.required, Validators.minLength(2)]]
      }
    );


    // this.roomForm.patchValue({
    //   roomName : this.room.name,
    //   location : this.room.location,
    // });

    for (const layout of this.layouts) {
      // this.roomForm.addControl( `layout${layout}`, new FormControl(`layout${layout}`));
      const layoutCapacity = this.room.capacities.find( lc => lc.layout === Layout[layout]);
      const initialCapacity = layoutCapacity == null ? 0 :  layoutCapacity.capacity;
      this.roomForm.addControl( `layout${layout}`, this.formBuilder.control(initialCapacity));
    }

  }


  onSubmit() {
    this.message = 'Saving data. Please wait...';
    this.room.name = this.roomForm.controls['roomName'].value;
    this.room.location = this.roomForm.controls['location'].value;
    this.room.capacities = new Array<LayoutCapacity>();
    for (const layout of this.layouts) {
      const layoutCapacity = new LayoutCapacity();
      layoutCapacity.layout = Layout[layout];
      layoutCapacity.capacity = this.roomForm.controls[`layout${layout}`].value;
      this.room.capacities.push(layoutCapacity);
    }

    if (this.room.id == null) {
      this.dataService.addRoom(this.room).subscribe(
        (next) => {
          this.dataChangedEvent.emit();
          this.router.navigate(['admin', 'rooms'], {queryParams: {action: 'view', id: next.id}});
        },
        (error) => {
          this.message = 'Error has occured!';
        }
      );
    } else {
      this.dataService.updateRomm(this.room).subscribe(
        (next) => {
          this.dataChangedEvent.emit();
          this.router.navigate(['admin', 'rooms'], {queryParams: {action: 'view', id: next.id}});
        },
        (error) => {
          this.message = "Something went wrong. Please try again later.";

        }
      );
    }

    // call a method in a date service to save the room.
  }

  ngOnDestroy(): void {
    this.resetEventSubscription.unsubscribe();
  }
}
