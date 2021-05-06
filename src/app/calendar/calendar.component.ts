import {Component, OnDestroy, OnInit} from '@angular/core';
import {formatDate} from "@angular/common";
import {Booking} from "../model/Booking";
import {DataService} from "../data.service";
import {Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit, OnDestroy {

  constructor(private dataService: DataService,
              private router: Router,
              private route: ActivatedRoute,
              private authService: AuthService) { }

  bookings: Array<Booking>;

  selectedDate : string;

  resetSubscription: Subscription;

  dataLoaded = false;
  isAdminUser = false;
  message = '';

  ngOnInit(): void {
    this.loadData();

    if (this.authService.role === "ADMIN") {
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

    // const data = formatDate(this.selectDate, 'yyyy-MM-dd', 'pl-PL');

  }


  private loadData() {
    this.message = 'Loading data...'
    this.route.queryParams.subscribe(
      params => {
        this.selectedDate = params['date'];
        if (!this.selectedDate) {
          this.selectedDate = formatDate(new Date(), 'yyyy-MM-dd', 'en-GB');

        }
        this.resetSubscription = this.dataService.getBookings(this.selectedDate).subscribe(
          (next) => {
            this.bookings = next;
            this.dataLoaded = true;
            this.message = '';
          },
          (error) => {
            this.message = 'Sorry, the data could not be loaded.';
          }
        );
      }
    )
  }

  ngOnDestroy() {
    this.resetSubscription.unsubscribe();
  }

  editBooking(id: number) {
    this.router.navigate(['editBooking'], {queryParams: {id}});

  }

  addBooking() {
    this.router.navigate(['editBooking']);

  }


  deleteBooking(id: number) {
    this.message = 'deleting, p[lease wait...';
    this.dataService.deleteBooking(id).subscribe(
      next => {
        this.loadData();
        this.message = '';
      },
      error => {
        this.message = 'Error has occured. Cannot remove this booking.';
      }
    );
  }

  dateChange() {
    this.router.navigate([''], {queryParams : {date : this.selectedDate}});
  }

}
