import { Injectable } from '@angular/core';
import {Layout, LayoutCapacity, Room} from "./model/Room";
import {User} from "./model/User";
import {Observable, of} from "rxjs";
import {Booking} from "./model/Booking";
import {formatDate} from "@angular/common";
import {environment} from "../environments/environment";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class DataService {


  getRooms() : Observable<Array<Room>> {
    return this.http.get<Array<Room>>(environment.restUrl + '/api/v1/rooms')
      .pipe(
        map( data => {
          const rooms = new Array<Room>();
          for (const room of data) {
            rooms.push(Room.fromHttp(room));
          }
          return rooms;
        })
      );
  }

  getUsers() : Observable<Array<User>> {
    return this.http.get<Array<User>>(environment.restUrl + '/api/v1/users')
      .pipe(
        map( data => {
          const users = new Array<User>();
          for (const user of data) {
            users.push(User.fromhttp(user));
          }
          return users;
        })
      );
  }

  getBookings(date: string) : Observable<Array<Booking>> {
    return this.http.get<Array<Booking>>(environment.restUrl + '/api/v1/bookings/' + date)
      .pipe(
        map(data => {
          const bookings = new Array<Booking>();
          for (const booking of data) {
            bookings.push(Booking.fromHttp(booking));
          }
          return bookings;
        })
      );
  }

  getBooking(id: number) : Observable<Booking> {
    return this.http.get<Booking>(environment.restUrl + '/api/v1/bookings?id=' + id)
      .pipe(
        map(data => Booking.fromHttp(data))
      );
  }

  saveBooking(booking: Booking) : Observable<Booking> {
    return this.http.put<Booking>(environment.restUrl + '/api/v1/bookings/', Booking.toHttp(booking));

  }

  addBooking(newBooking: Booking): Observable<Booking> {
    return this.http.post<Booking>(environment.restUrl + '/api/v1/bookings/', Booking.toHttp(newBooking));
  }

  deleteBooking(id: number): Observable<any> {
    return this.http.delete(environment.restUrl + '/api/v1/bookings/' + id);
      }

  updateUser(user: User) : Observable<User> {
    return this.http.put<User>(environment.restUrl + '/api/v1/users', user);
  }

  addUser(newUser: User, password: string) : Observable<User> {
    const fullUser = {id: newUser.id, name: newUser.name, password: password};
    return this.http.post<User>(environment.restUrl + '/api/v1/users', fullUser);
  }

  updateRomm(room: Room) : Observable<Room> {
    return this.http.put<Room>(environment.restUrl +  '/api/v1/rooms', Room.toHttp(room));

  }

  addRoom(newRoom : Room) : Observable<Room> {
    return this.http.post<Room>(environment.restUrl +  '/api/v1/rooms', Room.toHttp(newRoom));
    // return of(null);

  }

  deleteRoom(id: number) : Observable<any> {
    return this.http.delete(environment.restUrl + '/api/v1/rooms/' + id);
  }

  deleteUser(id: number) : Observable<any> {
    return this.http.delete(environment.restUrl + '/api/v1/users/' + id);
  }

  resetUserPassword(id: number) : Observable<any> {
    return this.http.get(environment.restUrl + '/api/v1/users/resetPassword/' + id);
  }


  constructor(private http: HttpClient) {

  }

}
