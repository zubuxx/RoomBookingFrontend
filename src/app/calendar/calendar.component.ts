import {Component, OnDestroy, OnInit} from '@angular/core';
import {formatDate} from "@angular/common";
import {Booking} from "../model/Booking";
import {DataService} from "../data.service";
import {Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit, OnDestroy {

  constructor(private dataService: DataService,
              private router: Router,
              private route: ActivatedRoute) { }

  bookings: Array<Booking>;

  selectedDate : string;

  resetSubscription: Subscription;

  ngOnInit(): void {

    this.route.queryParams.subscribe(
      params => {
        this.selectedDate = params['date'];
        if(!this.selectedDate) {
          this.selectedDate = formatDate(new Date(), 'yyyy-MM-dd', 'en-GB');

        }
        this.resetSubscription = this.dataService.getBookings(this.selectedDate).subscribe(
          (next) => {
            this.bookings = next;
          }
        );
      }
    )


    // const data = formatDate(this.selectDate, 'yyyy-MM-dd', 'pl-PL');

  }


  ngOnDestroy() {
    this.resetSubscription.unsubscribe();
  }

  editBooking(id: number) {
    this.router.navigate(['editBooking'], {queryParams: {id}});

  }

  addBooking() {
    this.router.navigate(['addBooking']);
  }


  deleteBooking(id: number) {
    this.dataService.deleteBooking(id).subscribe();
  }

  dateChange() {
    this.router.navigate([''], {queryParams : {date : this.selectedDate}});
  }

}
